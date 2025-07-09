/* global fbq */

export const trackLeadSubmitted = () => {

	fbq('track', 'LeadSubmitted', {
		event_time:        new Date().toISOString(),
		event_name:        'LeadSubmitted',
		event_source:      'website_form',
		messaging_channel: 'email',
		page_id:           '12345',
		event_source_url:  window.location.href,
		client_user_agent: navigator.userAgent, // Do Not Hash
	});
}

export const trackCheckoutStart = () => {

	fbq('track', 'InitiateCheckout', {
		event_time:        new Date().toISOString(),
		event_name:        'InitiateCheckout',
		event_source_url:  window.location.href,
		client_user_agent: navigator.userAgent, // Do Not Hash
	});
}

export const trackAddToCart = (contentId) => {

	fbq('track', 'AddToCart', {
		event_time:        new Date().toISOString(),
		event_name:        'AddToCart',
		event_source_url:  window.location.href,
		content_type:      'product',
		content_ids:       [contentId], // ID товару
		client_user_agent: navigator.userAgent, // Do Not Hash
	});
}

export const trackContentView = (contentId) => {

	fbq('track', 'ViewContent', {
		event_time:        new Date().toISOString(),
		event_name:        'ViewContent',
		event_source_url:  window.location.href,
		content_type:      'product',
		content_ids:       [contentId],
		client_user_agent: navigator.userAgent, // Do Not Hash
	});
}

export const trackSearch = (searchQuery) => {

	fbq('track', 'Search', {
		event_time:        new Date().toISOString(),
		event_name:        'Search',
		event_source_url:  window.location.href,
		search_query:      searchQuery,
		client_user_agent: navigator.userAgent, // Do Not Hash
	});
}

export const trackPageView = () => {

	fbq('track', 'PageView', {
		event_time:        new Date().toISOString(),
		event_name:        'PageView',
		event_source_url:  window.location.href,
		client_user_agent: navigator.userAgent, // Do Not Hash
	});
}

export const trackAddPaymentInfo = (email, name, phoneNumber) => {

	fbq('track', 'AddPaymentInfo', {
		event_time:        new Date().toISOString(),
		event_name:        'AddPaymentInfo',
		event_source_url:  window.location.href,
		email:             email, // Do Not Hash
		name:              name,   // Do Not Hash
		phone_number:      phoneNumber, // Do Not Hash
		client_user_agent: navigator.userAgent, // Do Not Hash
	});
}

export const trackPurchase = (messaging_channel, orderId, value,) => {

	fbq('track', 'Purchase', {
		event_time:        new Date().toISOString(),
		event_name:        'Purchase',
		order_id:          orderId,
		value:             value,
		currency:          "UAH",
		event_source_url:  window.location.href,
		messaging_channel: messaging_channel || 'email',
		page_id:           'https://www.beautyblossom.com.ua/order',
		client_user_agent: navigator.userAgent, // Do Not Hash
	});
}
