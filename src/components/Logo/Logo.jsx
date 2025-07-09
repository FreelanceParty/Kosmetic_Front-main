import React from "react";

import {LinkLogo, TextLogo, TextLogoSecondWord} from "./logo.styled";

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
				<TextLogo>Beauty</TextLogo>
				<TextLogoSecondWord>Blossom</TextLogoSecondWord>
			</LinkLogo>
		</>
	);
};

export default Logo;
