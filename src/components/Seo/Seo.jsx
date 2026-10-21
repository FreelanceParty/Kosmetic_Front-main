import {useEffect} from "react";
import {useLocation} from "react-router-dom";

const SITE_URL = "https://www.beautyblossom.com.ua";
const SITE_NAME = "Beauty Blossom";
const MAX_DESCRIPTION_LENGTH = 160;

const defaults = {
	title:         document.title,
	description:   getMetaContent("name", "description"),
	robots:        getMetaContent("name", "robots"),
	ogTitle:       getMetaContent("property", "og:title"),
	ogDescription: getMetaContent("property", "og:description"),
	ogUrl:         getMetaContent("property", "og:url"),
};

function getMetaContent(attr, key) {
	return document.head.querySelector(`meta[${attr}="${key}"]`)?.getAttribute("content") ?? null;
}

function setMeta(attr, key, content) {
	let el = document.head.querySelector(`meta[${attr}="${key}"]`);
	if (content === null || content === undefined) {
		el?.remove();
		return;
	}
	if (!el) {
		el = document.createElement("meta");
		el.setAttribute(attr, key);
		document.head.appendChild(el);
	}
	el.setAttribute("content", content);
}

function setCanonical(href) {
	let el = document.head.querySelector('link[rel="canonical"]');
	if (!href) {
		el?.remove();
		return;
	}
	if (!el) {
		el = document.createElement("link");
		el.setAttribute("rel", "canonical");
		document.head.appendChild(el);
	}
	el.setAttribute("href", href);
}

function toCanonicalUrl(path) {
	const clean = path.split(/[?#]/)[0].replace(/\/+$/, "");
	return SITE_URL + (clean || "/");
}

function truncate(text, maxLength) {
	const clean = String(text).replace(/\s+/g, " ").trim();
	if (clean.length <= maxLength) {
		return clean;
	}
	return clean.slice(0, maxLength - 1).replace(/\s+\S*$/, "") + "…";
}

const Seo = ({title, description, canonical, noindex = false}) => {
	const {pathname} = useLocation();
	const canonicalUrl = noindex ? null : toCanonicalUrl(canonical ?? pathname);

	useEffect(() => {
		const fullTitle = title ? `${title} | ${SITE_NAME}` : defaults.title;
		const fullDescription = description ? truncate(description, MAX_DESCRIPTION_LENGTH) : defaults.description;

		document.title = fullTitle;
		setMeta("name", "description", fullDescription);
		setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
		setMeta("property", "og:title", fullTitle);
		setMeta("property", "og:description", fullDescription);
		setMeta("property", "og:url", canonicalUrl);
		setCanonical(canonicalUrl);

		return () => {
			document.title = defaults.title;
			setMeta("name", "description", defaults.description);
			setMeta("name", "robots", defaults.robots);
			setMeta("property", "og:title", defaults.ogTitle);
			setMeta("property", "og:description", defaults.ogDescription);
			setMeta("property", "og:url", defaults.ogUrl);
			setCanonical(null);
		};
	}, [title, description, noindex, canonicalUrl]);

	return null;
};

export default Seo;
