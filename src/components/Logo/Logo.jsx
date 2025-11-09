import React from "react";

import {LinkLogo} from "./logo.styled";

const logo = require('../../assets/images/logo/pink_simple_grateful_quote.png');

const Logo = () => {
	const scrollToTop = () => {
		window.scrollTo({
			top:      0,
			behavior: "smooth",
		});
	};
	return (
		<>
			<LinkLogo to="/" onClick={scrollToTop}>
				<img className={"w-[clamp(150px,10vw,210px)] max-w-[210px]"} src={logo} alt="logo"/>
			</LinkLogo>
		</>
	);
};

export default Logo;
