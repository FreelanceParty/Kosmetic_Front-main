import React, {useEffect, useState} from "react";
import {FaArrowUpLong} from "react-icons/fa6";
import {useLocation} from "react-router-dom";

import {ScrollToTopBtn} from "./scrollToTop.styled";

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const scrollEl = document.getElementById("app-scroll-container");
		if (scrollEl) {
			scrollEl.scrollTo({top: 0});
			return;
		}
		window.scrollTo({top: 0});
	}, [location.pathname, location.search]);

	useEffect(() => {
		const scrollEl = document.getElementById("app-scroll-container");
		const target = scrollEl || window;

		const getScrollTop = () => {
			if (scrollEl) return scrollEl.scrollTop;
			return window.scrollY;
		};

		const toggleVisibility = () => {
			setIsVisible(getScrollTop() > 500);
		};

		toggleVisibility();
		target.addEventListener("scroll", toggleVisibility);
		return () => target.removeEventListener("scroll", toggleVisibility);
	}, []);

	const handleScrollToTop = () => {
		const scrollEl = document.getElementById("app-scroll-container");
		if (scrollEl) {
			scrollEl.scrollTo({
				top: 0,
				behavior: "smooth",
			});
			return;
		}
		window.scrollTo({top: 0, behavior: "smooth"});
	};
	return (
		<>
			<ScrollToTopBtn
				className={isVisible ? "show" : ""}
				onClick={handleScrollToTop}
			>
				<FaArrowUpLong/>
			</ScrollToTopBtn>
		</>
	);
};

export default ScrollToTop;
