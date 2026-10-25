import {createContext, useCallback, useContext, useEffect, useMemo, useRef} from "react";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {getDropUser, getOptUser} from "../redux/auth/selectors";
import {
	trackCartView,
	trackItemListView,
	trackItemSelect,
	trackItemView,
	trackOrderPurchase,
	trackPromotionSelect,
	trackPromotionView,
	trackRemarketingPageView,
} from "./Ecommerce";

const LIST_SETTLE_MS = 700;
const PROMOTION_VISIBLE_RATIO = 0.5;

export const ItemListContext = createContext(null);

export const useUserFlags = () => {
	const isOptUser = useSelector(getOptUser);
	const isDropUser = useSelector(getDropUser);
	return useMemo(() => ({isOptUser, isDropUser}), [isOptUser, isDropUser]);
};

export const useItemListView = (products, {listName, listId, isSearch = false, isLoading = false}) => {
	const userFlags = useUserFlags();
	const productsRef = useRef(products);
	productsRef.current = products;
	const signature = (Array.isArray(products) ? products : []).map((product) => product?._id).join(',');

	useEffect(() => {
		if (!signature || !listName || isLoading) {
			return;
		}
		const timer = setTimeout(() => {
			trackItemListView(productsRef.current, {listName, listId, isSearch, userFlags});
		}, LIST_SETTLE_MS);
		return () => clearTimeout(timer);
	}, [signature, listName, listId, isSearch, isLoading, userFlags]);

	return useMemo(() => ({listName, listId, products}), [listName, listId, products]);
};

export const useItemSelect = (product) => {
	const list = useContext(ItemListContext);
	const userFlags = useUserFlags();

	return useCallback(() => {
		if (!list?.listName) {
			return;
		}
		const position = (list.products ?? []).findIndex((item) => item?._id === product?._id);
		trackItemSelect(product, {
			listName: list.listName,
			listId:   list.listId,
			index:    position >= 0 ? position + 1 : undefined,
			userFlags,
		});
	}, [list, product, userFlags]);
};

export const useRemarketingPageView = () => {
	const {pathname} = useLocation();
	const previousPathnameRef = useRef(pathname);

	useEffect(() => {
		if (previousPathnameRef.current === pathname) {
			return;
		}
		previousPathnameRef.current = pathname;
		trackRemarketingPageView();
	}, [pathname]);
};

export const useItemView = (product) => {
	const userFlags = useUserFlags();
	const productRef = useRef(product);
	productRef.current = product;
	const productId = product?._id;

	useEffect(() => {
		if (!productId) {
			return;
		}
		trackItemView(productRef.current, {userFlags});
	}, [productId, userFlags]);
};

export const useCartView = (cartItems) => {
	const userFlags = useUserFlags();
	const isTrackedRef = useRef(false);
	const hasItems = Array.isArray(cartItems) && cartItems.some((item) => item && !item.isDeleted);

	useEffect(() => {
		if (!hasItems || isTrackedRef.current) {
			return;
		}
		isTrackedRef.current = true;
		trackCartView(cartItems, {userFlags});
	}, [hasItems, cartItems, userFlags]);
};

export const usePurchase = (transactionId, items, value) => {
	const userFlags = useUserFlags();
	const itemsRef = useRef(items);
	itemsRef.current = items;

	useEffect(() => {
		if (!transactionId || !Array.isArray(itemsRef.current) || itemsRef.current.length === 0) {
			return;
		}
		trackOrderPurchase(transactionId, itemsRef.current, {value, userFlags});
	}, [transactionId, value, userFlags]);
};

export const usePromotion = (promotion) => {
	const ref = useRef(null);
	const promotionRef = useRef(promotion);
	promotionRef.current = promotion;

	useEffect(() => {
		const element = ref.current;
		if (!element || typeof IntersectionObserver === "undefined") {
			return;
		}
		const observer = new IntersectionObserver((entries) => {
			if (entries.some((entry) => entry.isIntersecting)) {
				observer.disconnect();
				trackPromotionView(promotionRef.current);
			}
		}, {threshold: PROMOTION_VISIBLE_RATIO});
		observer.observe(element);
		return () => observer.disconnect();
	}, []);

	const onClick = useCallback(() => trackPromotionSelect(promotionRef.current), []);

	return {ref, onClick};
};
