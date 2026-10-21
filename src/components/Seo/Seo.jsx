import {useEffect} from "react";

const SITE_NAME = "Beauty Blossom";
const MAX_DESCRIPTION_LENGTH = 160;

const defaults = {
	title:       document.title,
	description: getMetaContent("name", "description"),
	robots:      getMetaContent("name", "robots"),
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

function truncate(text, maxLength) {
	const clean = String(text).replace(/\s+/g, " ").trim();
	if (clean.length <= maxLength) {
		return clean;
	}
	return clean.slice(0, maxLength - 1).replace(/\s+\S*$/, "") + "…";
}

const Seo = ({title, description, noindex = false}) => {
	useEffect(() => {
		const fullTitle = title ? `${title} | ${SITE_NAME}` : defaults.title;
		const fullDescription = description ? truncate(description, MAX_DESCRIPTION_LENGTH) : defaults.description;

		document.title = fullTitle;
		setMeta("name", "description", fullDescription);
		setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
		setMeta("property", "og:title", fullTitle);
		setMeta("property", "og:description", fullDescription);

		return () => {
			document.title = defaults.title;
			setMeta("name", "description", defaults.description);
			setMeta("name", "robots", defaults.robots);
			setMeta("property", "og:title", null);
			setMeta("property", "og:description", null);
		};
	}, [title, description, noindex]);

	return null;
};

export default Seo;
