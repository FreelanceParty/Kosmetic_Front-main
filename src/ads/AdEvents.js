import axios from "axios";
import {v4 as uuidv4} from 'uuid';
import CryptoJS from "crypto-js";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const getProductId = (product) => product?._id || product?.id || product?.productId || product?.code;
const getProductPrice = (product) => Number(product?.price ?? product?.priceOPT ?? 0);

export const trackPageView = async (userSelectors = {}) => {
	const eventId  = uuidv4(),
	      userData = getHashedUserData(userSelectors);

	try {
		if (window.fbq) {
			window.fbq('track', 'PageView', {userData: userData}, {eventID: eventId});
		} else {
			console.log('Warning: fbq is not defined');
		}
	} catch (e) {
		console.error('❌ Помилка відправки Pixel PageView події:', e);
	}

	try {
		await sendConversionAPI('PageView', eventId, userData);
	} catch (e) {
		console.error('Error: ', e);
	}
}

export const trackAddToCart = async (product, userSelectors) => {
	const eventId    = uuidv4(),
	      userData   = getHashedUserData(userSelectors),
	      customData = {
		      content_ids:  [getProductId(product)],
		      content_type: 'product',
		      value:        getProductPrice(product),
		      currency:     'UAH',
	      };

	try {
		if (window.fbq) {
			window.fbq('track', 'AddToCart', {
				content_ids:  [getProductId(product)],
				content_type: 'product',
				value:        getProductPrice(product),
				currency:     'UAH',
				user_data:    userData,
			}, {eventID: eventId});
		} else {
			console.log('Warning: fbq is not defined');
		}
	} catch (e) {
		console.error('❌ Помилка відправки Pixel AddToCart події:', e);
	}

	try {
		await sendConversionAPI("AddToCart", eventId, userData, customData);
	} catch (e) {
		console.error('Error: ', e);
	}

	try {
		if (window.gtag) {
			window.gtag('event', 'conversion', {
				'send_to':  'AW-16897946922/BDTiCKvd_a0bEKrqyPk-',
				'value':    getProductPrice(product),
				'currency': 'UAH',
			});
		} else {
			console.log('Warning: gtag is not defined');
		}
	} catch (e) {
		console.error('Error: ', e);
	}
}

export const trackViewContent = async (product, userSelectors) => {
	const eventId    = uuidv4(),
	      userData   = getHashedUserData(userSelectors),
	      customData = {
		      content_ids:  [getProductId(product)],
		      content_type: 'product',
		      value:        getProductPrice(product),
		      currency:     'UAH',
	      };

	try {
		if (window.fbq) {
			window.fbq('track', 'ViewContent', {
				content_ids:  [getProductId(product)],
				content_type: 'product',
				value:        getProductPrice(product),
				currency:     'UAH',
				user_data:    userData,
			}, {eventID: eventId});
		} else {
			console.log('Warning: fbq is not defined');
		}
	} catch (e) {
		console.error('❌ Помилка відправки Pixel ViewContent події:', e);
	}

	try {
		await sendConversionAPI("ViewContent", eventId, userData, customData);
	} catch (e) {
		console.error('Error: ', e);
	}
}

export const trackInitiateCheckout = async (totalCost, items, userSelectors = {}) => {
	const eventId    = uuidv4(),
	      userData   = getHashedUserData(userSelectors),
	      customData = {
		      value:        totalCost,
		      currency:     'UAH',
		      content_ids:  items,
		      content_type: 'product',
	      };

	try {
		if (window.fbq) {
			window.fbq('track', 'InitiateCheckout', {
				source:       'manual',
				value:        totalCost,
				currency:     'UAH',
				content_ids:  items,
				content_type: 'product',
				user_data:    userData,
			}, {eventID: eventId});
		} else {
			console.log('Warning: fbq is not defined');
		}
	} catch (e) {
		console.error('❌ Помилка відправки Pixel InitiateCheckout події:', e);
	}

	try {
		await sendConversionAPI('InitiateCheckout', eventId, userData, customData);
	} catch (e) {
		console.error('Error: ', e);
	}

	try {
		if (window.gtag) {
			window.gtag('event', 'conversion', {
				'send_to':  'AW-16897946922/NdmWCP-Q9K0bEKrqyPk-',
				'value':    totalCost,
				'currency': 'UAH'
			});
		} else {
			console.log('Warning: gtag is not defined');
		}
	} catch (e) {
		console.error('Error: ', e);
	}
}

export const trackPurchase = async (totalCost, items, userSelectors = {}) => {
	const eventId    = uuidv4(),
	      userData   = getHashedUserData(userSelectors),
	      customData = {
		      value:        totalCost,
		      currency:     'UAH',
		      content_ids:  items,
		      content_type: 'product',
	      };

	try {
		if (window.fbq) {
			window.fbq('track', 'Purchase', {
				value:        totalCost,
				currency:     'UAH',
				content_ids:  items,
				content_type: 'product',
				user_data:    userData,
			}, {eventID: eventId});
		} else {
			console.log('Warning: fbq is not defined');
		}
	} catch (e) {
		console.error('❌ Помилка відправки Pixel Purchase події:', e);
	}

	try {
		await sendConversionAPI('Purchase', eventId, userData, customData);
	} catch (e) {
		console.error('Error: ', e);
	}

	try {
		if (window.gtag) {
			window.gtag('event', 'conversion', {
				'send_to':        'AW-16897946922/a7FtCIKR9K0bEKrqyPk-',
				'value':          totalCost,
				'currency':       'UAH',
				'transaction_id': eventId
			});
		} else {
			console.log('Warning: gtag is not defined');
		}
	} catch (e) {
		console.error('Error: ', e);
	}
}

const sendConversionAPI = async (eventName, eventId, userData = null, customData = null) => {
	if (!REACT_APP_API_URL) {
		return;
	}
	const payload = {
		event_name:       eventName,
		event_time:       Math.floor(Date.now() / 1000),
		event_id:         eventId,
		event_source_url: window.location.href,
	};

	if (userData != null) {
		payload.user_data = userData;
	}
	if (customData != null) {
		payload.custom_data = customData;
	}

	await axios.post(`${REACT_APP_API_URL}/conversion`, payload);
};

function getHashedUserData(userSelectors) {
	const hashedUserData = {};

	if (userSelectors.em) {
		const em = userSelectors.em;
		hashedUserData.em = CryptoJS.SHA256(em.trim().toLowerCase()).toString();
	}
	if (userSelectors.ph) {
		const ph = userSelectors.ph;
		hashedUserData.ph = CryptoJS.SHA256(ph).toString();
	}
	if (userSelectors.fn) {
		const fn = userSelectors.fn;
		hashedUserData.fn = CryptoJS.SHA256(fn.trim()).toString();
	}
	if (userSelectors.ln) {
		const ln = userSelectors.ln;
		hashedUserData.ln = CryptoJS.SHA256(ln.trim()).toString();
	}

	return hashedUserData;
}