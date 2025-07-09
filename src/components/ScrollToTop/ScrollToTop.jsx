import React, {useEffect, useState} from "react";
import {FaArrowUpLong} from "react-icons/fa6";

import {ScrollToTopBtn} from "./scrollToTop.styled";

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			setIsVisible(window.scrollY > 500);
		};
		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	const handleScrollToTop = () => {
		window.scrollTo({
			top:      0,
			behavior: "smooth",
		});
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
