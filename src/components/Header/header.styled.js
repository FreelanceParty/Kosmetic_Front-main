import styled from "styled-components";

import {BsSearch} from "react-icons/bs";
// import { HiMenu } from "react-icons/hi";
import {IoMenuOutline} from "react-icons/io5";

import {IoPersonOutline} from "react-icons/io5";
import {PiShoppingCartFill} from "react-icons/pi"; // повний кошик
import {PiShoppingCartLight} from "react-icons/pi"; // пустий кошик

export const ContainerHeader = styled.header`
	position:   relative;
	z-index:    200;
	background: ${(p) => p.theme.colors.white};
	max-width:  767px;
	padding:    0 20px;
	margin:     0 auto;
	@media screen and (min-width: 768px) {
		max-width: 1023px;
	}
	@media screen and (min-width: 1024px) {
		max-width: 1440px;
	}
`;
export const ContainerMobile = styled.div`
	position:   relative;
	background: ${(p) => p.theme.colors.white};
	z-index:    1;
`;
export const Container = styled.div`
	background: ${(p) => p.theme.colors.white};
`;

export const HeaderTop = styled.div`
	color: ${(p) => p.theme.colors.textColor};
`;
export const HeaderWrap = styled.div`
	max-width: 767px;
	/* padding: 0 20px; */
	margin:    0 auto;
	@media screen and (min-width: 768px) {
		max-width: 1023px;
	}
	@media screen and (min-width: 1024px) {
		max-width: 1440px;
	}
`;
export const HeaderLayout = styled.div`
	margin:          15px 0;
	position:        relative;
	display:         flex;
	/* justify-content: space-between; */
	justify-content: center;
	align-items:     center;
`;
export const WrapTop = styled.div`
	display:     flex;
	align-items: center;
	max-width:   100%;
`;

export const Wrap = styled.div`
	display:     flex;
	align-items: center;
`;
export const WrapContacts = styled.div`
	display:        flex;
	flex-direction: column;
	gap:            10px;
	position:       relative;
	@media screen and (min-width: 768px) {
		gap: 5px;
	}
	@media screen and (min-width: 1024px) {
		gap: 10px;
	}
`;

export const LoginShipingThumb = styled.div`
	/* margin-left: 20px; */
	position:        absolute;
	justify-content: space-between;
	width:           120px;
	right:           0;
	display:         flex;
	align-items:     flex-end;
	@media screen and (min-width: 768px) {
		/* margin-left: 20px; */
	}
	@media screen and (min-width: 1024px) {
		/* margin-left: 20px; */
		/* width: 195px; */
	}
	@media screen and (min-width: 1440px) {
		/* margin-left: 30px; */
	}
`;
// basket
export const BasketWrap = styled.div``;
export const BasketFullWrap = styled.div``;
export const CartQuantityWrap = styled.div`
	position:        absolute;
	top:             0;
	background:      ${(p) => p.theme.colors.accentColor};
	width:           15px;
	height:          15px;
	border-radius:   10px;
	display:         flex;
	justify-content: center;
	align-items:     center;
	padding:         5px;
`;
export const CartQuantitySpan = styled.span`
	color:     ${(p) => p.theme.colors.white};
	font-size: ${(p) => p.theme.fontSizes.xxs}px;
`;

export const BasketIconFull = styled(PiShoppingCartFill)`
	width:  25px;
	height: 25px;
		/* color: ${(p) => p.theme.colors.textColor}; */
	color:  #616161;
	/* @media screen and (min-width: 768px) {
	  width: 20px;
	  height: 20px;
	} */
	margin: 3px;
	cursor: pointer;
	
	&:hover,
	&:focus {
		color: #FF96CF;
	}
`;
export const BasketIcon = styled(PiShoppingCartLight)`
	width:  25px;
	height: 25px;
		/* color: ${(p) => p.theme.colors.textColor}; */
	color:  #616161;
	/* @media screen and (min-width: 768px) {
	  width: 20px;
	  height: 20px;
	} */
	margin: 3px;
	cursor: pointer;
	
	&:hover,
	&:focus {
		color: #FF96CF;
	}
`;
// search
export const Link = styled.a`
	text-decoration: none;
	color:           ${(p) => p.theme.colors.textColor};
	
	&:hover,
	&:focus {
		color: ${(p) => p.theme.colors.accentColor};
	}
`;
export const MenuBottom = styled.div`
	position: relative;
	/* top: 20px; */
	/* margin: -20px 0 20px; */
		/* background: ${(p) =>
			p.$pathname === "/"
					? p.theme.colors.white
					: p.theme.colors.topHeaderLine}; */
	color:    ${(p) => p.theme.colors.textColor};
`;
export const MenuWrap = styled.div`
	max-width: 1100px;
	/* max-width: 1440px; */
	/* padding: 0 20px; */
	margin:    0 auto;
`;

export const Line = styled.div`
	background: #AA9E9E;
	width:      100%;
	height:     1px;
	margin-top: 10px;
`;
// ///////////////////////////////

export const TopWrap = styled.div`
	display:         flex;
	justify-content: center;
	align-items:     center;
	padding:         3px 28px;
		/* background: ${(p) => p.theme.colors.topLine}; */
`;

export const ButtonMenu = styled.button`
	display:          flex;
	justify-content:  center;
	align-items:      center;
	border:           ${(p) => p.theme.borders.none};
	background-color: transparent;
	cursor:           pointer;
	margin:           0;
	/* margin-right: 30px; */
	color:            #616161;
	transition:       all 0.15s ease 0s;
	padding:          0;
	
	&:hover,
	&:focus {
		color: ${(p) => p.theme.colors.accentColor};
	}
`;

export const MenuIcon = styled(IoMenuOutline)`
	width:   28px;
	height:  28px;
	padding: 0px;
`;
export const Schedule = styled.a`
		/* color: ${(p) => p.theme.colors.textColor}; */
	text-align:               center;
		/* font-size: ${(p) => p.theme.fontSizes.xxs}px; */
	/* font-style: normal; */
	font-weight:              ${(p) => p.theme.fontWeights.body};
	line-height:              1.2;
	/* letter-spacing: -0.135px; */
	font-family:              "Mulish", sans-serif;
	/* font-weight: 400; */
	font-size:                12px;
	/* line-height: 1.079; */
	text-decoration:          underline;
	text-decoration-skip-ink: none;
	text-align:               justify;
	color:                    #616161;
	/* display: flex;
	justify-content: center; */
`;
export const CenterWrap = styled.div`
	display:         flex;
	align-items:     flex-end;
	justify-content: space-evenly;
	padding:         12px 5px 6px 3px;
	@media screen and (min-width: 1024px) {
		padding: 3px 23px 3px 30px;
	}
`;

export const IconWrap = styled.div`
	display:     flex;
	align-items: flex-end;
`;
export const UserWrap = styled.div`
	display:     flex;
	align-items: center;
`;
export const UserName = styled.p`
	font-size: ${(p) => p.theme.fontSizes.xxs}px;
	@media screen and (min-width: 768px) {
		font-size: ${(p) => p.theme.fontSizes.xs}px;
	}
	@media screen and (min-width: 1024px) {
		font-size: ${(p) => p.theme.fontSizes.s}px;
	}
	@media screen and (min-width: 1440px) {
		font-size: ${(p) => p.theme.fontSizes.sm}px;
	}
`;
//user
export const UserIcon = styled(IoPersonOutline)`
	width:  25px;
	height: 25px;
		/* color: ${(p) => p.theme.colors.textColor}; */
	color:  #616161;
	/* @media screen and (min-width: 768px) {
	  width: 20px;
	  height: 20px;
	} */
	margin: 3px;
	cursor: pointer;
	
	&:hover,
	&:focus {
		color: #FF96CF;
	}
`;
//search
export const SearchIcon = styled(BsSearch)`
	width:  25px;
	height: 25px;
		/* color: ${(p) => p.theme.colors.textColor}; */
	color:  #616161;
	/* @media screen and (min-width: 768px) {
	  width: 20px;
	  height: 20px;
	} */
	margin: 3px;
	cursor: pointer;
	
	&:hover,
	&:focus {
		color: #FF96CF;
	}
`;

// __________________line__________________________

export const LineWrap = styled.div`
		/* background: ${(p) => p.theme.colors.topLine}; */
	display:         flex;
	justify-content: center;
	position:        relative;
	z-index:         10;
`;

export const LineLink = styled.a`
	text-decoration:          none;
	margin:                   0;
	font-size:                12px;
	padding:                  6px;
	font-family:              "Mulish", sans-serif;
	font-weight:              500;
	line-height:              1.079;
	text-decoration:          underline;
	text-decoration-skip-ink: none;
	text-align:               justify;
		/* color: ${(p) => p.theme.colors.accentColor}; */
	color:                    #616161;
	@media screen and (min-width: 1024px) {
		font-size: 12px;
	}
	@media screen and (min-width: 1280px) {
		font-size: 14px;
	}
`;

// _______________________v2____________________

export const HeaderWrapper = styled.header`
	background: ${(p) => p.theme.colors.white};
	box-shadow: 0px 4px 15px rgba(152.68, 152.68, 152.68, 0.1);
	padding:    10px;
	/* background: #fff;
	box-shadow: 0px 4px 15px 0px rgba(153, 153, 153, 0.1);
	padding: 10px 0; */
	width:      100%;
	height:     100%;
	/* justify-content: space-between;
	align-items: center;
	display: inline-flex; */
	z-index:    10;
	@media screen and (min-width: 768px) {
		padding: 0;
	}
`;

export const HeaderInner = styled.div`
	display:         flex;
	align-items:     center;
	justify-content: space-between;
	/* max-width: 375px; */
	margin:          0 auto;
	gap:             10px;
	/* padding: 0 16px; */
	@media screen and (min-width: 768px) {
		justify-content: space-evenly;
	}
	@media screen and (min-width: 1024px) {
		/* justify-content: space-evenly; */
		padding: 0 215px;
	}
`;

export const Logo = styled.a`
	display:         flex;
	/* flex-direction: column; */
	align-items:     center;
	gap:             2px;
	text-decoration: none;
	@media screen and (min-width: 768px) {
		gap: 6px;
	}
`;

export const LogoText = styled.span`
	font-family: Montserrat;
	color:       ${({color}) => color || "#8F49A3"};
	font-size:   14px;
	font-weight: 600;
	line-height: 36.53px;
	word-wrap:   break-word;
	@media screen and (min-width: 768px) {
		font-size:   36px;
		line-height: 50.4px;
	}
`;

export const IconsWrapper = styled.div`
	display: flex;
	gap:     0px;
	@media screen and (min-width: 768px) {
		gap: 46px;
	}
`;

export const IconButton = styled.button`
	background:  none;
	border:      none;
	display:     flex;
	align-items: center;
	gap:         10px;
	padding:     10px;
	cursor:      pointer;
	color:       ${(p) => p.theme.colors.primary_text};
	transition:  color 0.3s ease;
	
	.icon {
		width:      24px;
		height:     24px;
		fill:       ${(p) => p.theme.colors.primary_text};
		transition: fill 0.3s ease;
	}
	
	.basket {
		width:      24px;
		height:     24px;
		transition: fill 0.3s ease;
	}
	
	&:hover {
		color: ${(p) => p.theme.colors.accent_pink};
	}
	
	&:hover .icon {
		color: ${(p) => p.theme.colors.accent_pink};
		fill:  ${(p) => p.theme.colors.accent_pink};
	}
	
	@media screen and (min-width: 768px) {
		padding:     30px 0;
		font-size:   14px;
		font-family: Montserrat;
		font-weight: 400;
		line-height: 19.6px;
		
		.icon {
			width:  18px;
			height: 18px;
		}
	}
`;
