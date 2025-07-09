import {useEffect, useState} from "react";
import {
	RESOLUTIONS_LIST,
	RESOLUTIONS_MAP,
} from "../enums/breakPointConstants.js";

export const useMedia = () => {
	const getScreenType = () => {
		const width = window.innerWidth;

		if (width < RESOLUTIONS_MAP.mobile) {
			return "xs-mobile";
		}
		if (width < RESOLUTIONS_MAP.tablet) {
			return "mobile";
		}
		if (width < RESOLUTIONS_MAP.smallDesktop) {
			return "tablet";
		}
		if (width < RESOLUTIONS_MAP.desktop) {
			return "small-desktop";
		}
		return "desktop";
	};

	const [screenType, setScreenType] = useState(getScreenType());

	useEffect(() => {
		const updateScreenType = () => {
			setScreenType(getScreenType());
		};

		const mediaQueries = RESOLUTIONS_LIST.map(({size}) => {
			const rule = `(min-width: ${size}px)`;
			const MQ = window.matchMedia(rule);
			MQ.addEventListener("change", updateScreenType);
			return MQ;
		});

		return () => {
			mediaQueries.forEach((MQ) =>
				MQ.removeEventListener("change", updateScreenType)
			);
		};
	}, []);

	return {
		screenType,
		isMobileScreen:  screenType === "mobile" || screenType === "xs-mobile",
		isTabletScreen:  screenType === "tablet",
		isDesktopScreen: screenType === "small-desktop" || screenType === "desktop",
	};
};
