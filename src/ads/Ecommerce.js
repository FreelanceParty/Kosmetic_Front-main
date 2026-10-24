import {resolveUserPrice} from "../utils/helpers/priceByUser";

const ADS_ID = 'AW-16897946922';
const CURRENCY = 'UAH';
const IS_PROD = process.env.REACT_APP_APP_ENV === 'production';
const REPEAT_GUARD_MS = 1000;
const PURCHASES_STORAGE_KEY = 'bb_tracked_purchases';
const PURCHASES_STORAGE_LIMIT = 20;

const lastViewEvents = new Map();

const canSend = () => {
	if (typeof window === 'undefined') {
		return false;
	}
	if (window.__ENABLE_TRACKING__ === false) {
		return true;
	}
	return IS_PROD;
};

const toNumber = (value) => {
	const number = Number(value);
	return Number.isFinite(number) ? number : 0;
};

const roundMoney = (value) => Math.round(toNumber(value) * 100) / 100;

const cleanCategory = (value) => {
	const text = String(value ?? '').trim();
	return text && text !== '-' ? text : undefined;
};

export const getUserType = ({isOptUser, isDropUser} = {}) => {
	if (isDropUser) {
		return 'drop';
	}
	if (isOptUser) {
		return 'opt';
	}
	return 'retail';
};

export const buildItem = (product, {userFlags, quantity, index, listName, listId} = {}) => {
	const itemId = product?._id;
	if (!itemId) {
		return null;
	}
	const item = {
		item_id:        String(itemId),
		item_name:      product.name,
		item_brand:     product.brand || undefined,
		item_category:  cleanCategory(product.category),
		item_category2: cleanCategory(product.subCategory),
		item_category3: cleanCategory(product.subSubCategory),
		price:          roundMoney(resolveUserPrice(product, userFlags)),
		quantity:       Math.max(1, Math.trunc(toNumber(quantity ?? product.quantity ?? 1))),
	};
	if (index != null) {
		item.index = index;
	}
	if (listName) {
		item.item_list_name = listName;
	}
	if (listId) {
		item.item_list_id = listId;
	}
	return Object.fromEntries(Object.entries(item).filter(([, value]) => value !== undefined));
};

export const buildItems = (products, options = {}) =>
	(Array.isArray(products) ? products : [])
		.filter((product) => product && !product.isDeleted)
		.map((product, position) => buildItem(product, {
			...options,
			index: options.listName ? position + 1 : undefined,
		}))
		.filter(Boolean);

const sumItems = (items) => roundMoney(items.reduce((total, item) => total + item.price * item.quantity, 0));

const isRepeatedView = (event, items, extraKey = '') => {
	const signature = `${event}|${extraKey}|${items.map((item) => item.item_id).join(',')}`;
	const now = Date.now();
	const last = lastViewEvents.get(signature);
	lastViewEvents.set(signature, now);
	return last != null && now - last < REPEAT_GUARD_MS;
};

const pushToDataLayer = (payload) => {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ecommerce: null});
	window.dataLayer.push({...payload, ecommerce_event: true});
	window.dataLayer.push({ecommerce: null, ecommerce_event: false});
};

const pushEcommerce = (event, ecommerce, userFlags) => {
	pushToDataLayer({
		event,
		user_type: getUserType(userFlags),
		ecommerce: {currency: CURRENCY, ...ecommerce},
	});
};

const sendRemarketing = (event, value, items) => {
	if (typeof window.gtag !== 'function') {
		return;
	}
	window.gtag('event', event, {
		send_to:  ADS_ID,
		value,
		currency: CURRENCY,
		items:    items.map((item) => ({id: item.item_id, google_business_vertical: 'retail'})),
	});
};

const track = (event, {items, value, extra, userFlags, remarketingEvent = null}) => {
	if (!canSend() || items.length === 0) {
		return;
	}
	const total = value ?? sumItems(items);
	try {
		if (remarketingEvent) {
			sendRemarketing(remarketingEvent, total, items);
		}
		pushEcommerce(event, {value: total, ...extra, items}, userFlags);
	} catch (e) {
		console.error(`Ecommerce ${event}:`, e);
	}
};

export const trackItemListView = (products, {listName, listId, userFlags, isSearch = false} = {}) => {
	const items = buildItems(products, {userFlags, listName, listId});
	if (isRepeatedView('view_item_list', items, listName)) {
		return;
	}
	track('view_item_list', {
		items,
		extra:            {item_list_name: listName, item_list_id: listId},
		userFlags,
		remarketingEvent: isSearch ? 'view_search_results' : 'view_item_list',
	});
};

export const trackItemView = (product, {userFlags} = {}) => {
	const items = buildItems([product], {userFlags, quantity: 1});
	if (isRepeatedView('view_item', items)) {
		return;
	}
	track('view_item', {items, userFlags, remarketingEvent: 'view_item'});
};

export const trackCartAdd = (product, {quantity = 1, userFlags, withRemarketing = true} = {}) => {
	const items = buildItems([product], {userFlags, quantity});
	track('add_to_cart', {items, userFlags, remarketingEvent: withRemarketing ? 'add_to_cart' : null});
};

export const trackCartQuantityChange = (product, nextQuantity, {userFlags} = {}) => {
	const delta = Math.trunc(toNumber(nextQuantity) - toNumber(product?.quantity));
	if (delta > 0) {
		trackCartAdd(product, {quantity: delta, userFlags, withRemarketing: false});
	} else if (delta < 0) {
		trackCartRemove(product, {quantity: -delta, userFlags});
	}
};

export const trackCartRemove = (product, {quantity, userFlags} = {}) => {
	const items = buildItems([product], {userFlags, quantity});
	track('remove_from_cart', {items, userFlags});
};

export const trackCartView = (cartItems, {userFlags} = {}) => {
	const items = buildItems(cartItems, {userFlags});
	if (isRepeatedView('view_cart', items)) {
		return;
	}
	track('view_cart', {items, userFlags});
};

export const trackCheckoutBegin = (cartItems, {userFlags} = {}) => {
	const items = buildItems(cartItems, {userFlags});
	track('begin_checkout', {items, userFlags, remarketingEvent: 'begin_checkout'});
};

export const trackShippingInfo = (cartItems, shippingTier, {userFlags} = {}) => {
	const items = buildItems(cartItems, {userFlags});
	track('add_shipping_info', {items, extra: {shipping_tier: shippingTier}, userFlags});
};

export const trackPaymentInfo = (cartItems, paymentType, {userFlags} = {}) => {
	const items = buildItems(cartItems, {userFlags});
	track('add_payment_info', {items, extra: {payment_type: paymentType}, userFlags});
};

const readTrackedPurchases = () => {
	try {
		const stored = JSON.parse(window.localStorage.getItem(PURCHASES_STORAGE_KEY) ?? '[]');
		return Array.isArray(stored) ? stored : [];
	} catch (e) {
		return [];
	}
};

const rememberPurchase = (transactionId) => {
	try {
		const next = [...readTrackedPurchases(), transactionId].slice(-PURCHASES_STORAGE_LIMIT);
		window.localStorage.setItem(PURCHASES_STORAGE_KEY, JSON.stringify(next));
	} catch (e) {
		console.error('Ecommerce purchase storage:', e);
	}
};

export const trackOrderPurchase = (transactionId, cartItems, {value, userFlags} = {}) => {
	const id = String(transactionId ?? '').trim();
	if (!id || !canSend() || readTrackedPurchases().includes(id)) {
		return;
	}
	const items = buildItems(cartItems, {userFlags});
	if (items.length === 0) {
		return;
	}
	rememberPurchase(id);
	track('purchase', {
		items,
		value:            value != null ? roundMoney(value) : undefined,
		extra:            {transaction_id: id},
		userFlags,
		remarketingEvent: 'purchase',
	});
};

const buildPromotion = ({promotionId, promotionName, creativeName, creativeSlot}) => ({
	promotion_id:   promotionId,
	promotion_name: promotionName,
	creative_name:  creativeName,
	creative_slot:  creativeSlot,
});

export const trackPromotionView = (promotion) => {
	if (!canSend()) {
		return;
	}
	pushToDataLayer({event: 'view_promotion', ecommerce: buildPromotion(promotion)});
};

export const trackPromotionSelect = (promotion) => {
	if (!canSend()) {
		return;
	}
	pushToDataLayer({event: 'select_promotion', ecommerce: buildPromotion(promotion)});
};
