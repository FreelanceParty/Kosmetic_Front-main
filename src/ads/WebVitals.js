import {onCLS, onFCP, onINP, onLCP, onTTFB} from "web-vitals";

const GA4_ID = 'G-54B577SFCE';

const getPageType = (pathname) => {
	if (pathname === '/') return 'home';
	if (pathname.startsWith('/katehoriji')) return 'category';
	if (pathname.startsWith('/products/') || pathname.startsWith('/product/')) return 'product';
	if (pathname.startsWith('/brands/')) return 'brand';
	if (pathname === '/brands') return 'brands';
	if (pathname.startsWith('/search')) return 'search';
	return 'other';
};

export const reportWebVitals = () => {
	const pageType = getPageType(window.location.pathname);

	const send = ({name, value, rating, id, navigationType}) => {
		if (typeof window.gtag !== 'function') {
			return;
		}
		window.gtag('event', 'web_vitals', {
			send_to:         GA4_ID,
			metric_name:     name,
			metric_value:    Math.round(name === 'CLS' ? value * 1000 : value),
			metric_rating:   rating,
			metric_id:       id,
			navigation_type: navigationType,
			page_type:       pageType,
			non_interaction: true,
		});
	};

	try {
		onLCP(send);
		onINP(send);
		onCLS(send);
		onFCP(send);
		onTTFB(send);
	} catch (e) {
		console.error(e);
	}
};
