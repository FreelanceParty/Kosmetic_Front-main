import {useEffect} from "react";

export const SITE_URL = "https://www.beautyblossom.com.ua";

const JsonLd = ({id, data}) => {
	const json = data ? JSON.stringify(data) : null;

	useEffect(() => {
		if (!json) {
			return;
		}
		const el = document.createElement("script");
		el.type = "application/ld+json";
		el.dataset.jsonld = id;
		el.textContent = json;
		document.head.appendChild(el);

		return () => el.remove();
	}, [id, json]);

	return null;
};

export const breadcrumbs = (items) => ({
	"@context":        "https://schema.org",
	"@type":           "BreadcrumbList",
	"itemListElement": items.map(({name, path}, index) => ({
		"@type":    "ListItem",
		"position": index + 1,
		"name":     name,
		"item":     SITE_URL + path,
	})),
});

const isValidGtin = (code) => /^(\d{8}|\d{12,14})$/.test(String(code ?? ""));

export const productSchema = (product) => {
	const url = `${SITE_URL}/products/${product.id}`;
	const reviewsCount = Number(product.reviewsCount) || 0;
	const reviewsAvg = Number(product.reviewsAvg) || 0;

	return {
		"@context":    "https://schema.org",
		"@type":       "Product",
		"@id":         `${url}#product`,
		"url":         url,
		"name":        product.name,
		"description": product.description ? String(product.description).slice(0, 5000) : undefined,
		"image":       product.images || undefined,
		"sku":         product.article || String(product.id),
		"gtin":        isValidGtin(product.code) ? String(product.code) : undefined,
		"brand":       product.brand ? {"@type": "Brand", "name": product.brand} : undefined,
		"category":    product.category || undefined,
		"offers":      product.price ? {
			"@type":         "Offer",
			"url":           url,
			"price":         String(product.price),
			"priceCurrency": "UAH",
			"availability":  Number(product.amount) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
			"itemCondition": "https://schema.org/NewCondition",
			"seller":        {"@id": `${SITE_URL}/#organization`},
		} : undefined,
		"aggregateRating": reviewsCount > 0 && reviewsAvg > 0 ? {
			"@type":       "AggregateRating",
			"ratingValue": reviewsAvg.toFixed(1),
			"reviewCount": reviewsCount,
			"bestRating":  5,
		} : undefined,
	};
};

export default JsonLd;
