import {NavLink} from "react-router-dom";
import styled from "styled-components";
export const Wrap = styled.div`
	width: 150px;
	@media screen and (min-width: 1024px) {
		width: 180px;
	}
	@media screen and (min-width: 1440px) {
		width: 225px;
	}
`;

export const TitleWrap = styled.div`
	margin-bottom: 5px;
`;
export const Title = styled.h3`
	color:          #616161;
	font-weight:    700;
	font-size:      12px;
	line-height:    1.03;
	text-transform: uppercase;
	margin-bottom:  20px;
		/* font-weight: ${(p) => p.theme.fontWeights.subtitle}; */
	/* font-style: normal; */
	/* letter-spacing: 2.21px;
	letter-spacing: 0.745px; */
	@media screen and (min-width: 768px) {
		font-size: ${(p) => p.theme.fontSizes.s}px;
	}
	@media screen and (min-width: 1024px) {
		font-size: ${(p) => p.theme.fontSizes.l}px;
	}
	@media screen and (min-width: 1440px) {
		font-size: ${(p) => p.theme.fontSizes.xl}px;
	}
`;

export const ListWrap = styled.nav`
	display:        flex;
	flex-direction: column;
`;
export const List = styled.ul``;
export const Item = styled.li`
	margin-bottom: 8px;
	font-size:     ${(p) => p.theme.fontSizes.xxxs}px;
`;

export const LinkStyled = styled(NavLink)`
	position:        relative;
	text-decoration: none;
	font-weight:     400;
	font-size:       12px;
	line-height:     1.03;
	text-transform:  lowercase;
	color:           #616161;
	
	&:hover {
		color: #FFA5D6;
	}
		
		/* &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: ${(p) => p.theme.colors.accentColor};
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover:after {
    opacity: 1;
  } */
		/* &:active {
    color: ${(p) => p.theme.colors.accentColor};
  } */
	@media screen and (min-width: 1024px) {
			/* font-size: ${(p) => p.theme.fontSizes.sm}px; */
		font-size: 14px;
	}
	@media screen and (min-width: 1440px) {
			/* font-size: ${(p) => p.theme.fontSizes.l}px; */
		font-size: 14px;
	}
`;

export const CategoryLink = styled.a`
	position:        relative;
	text-decoration: none;
	font-weight:     400;
	font-size:       12px;
	line-height:     1.03;
	text-transform:  lowercase;
	color:           #616161;
	
	&:hover {
		color: #FFA5D6;
	}
		
		/* &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: ${(p) => p.theme.colors.accentColor};
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover:after {
    opacity: 1;
  } */
		/* &:active {
    color: ${(p) => p.theme.colors.accentColor};
  } */
	@media screen and (min-width: 1024px) {
			/* font-size: ${(p) => p.theme.fontSizes.sm}px; */
		font-size: 14px;
	}
	@media screen and (min-width: 1440px) {
			/* font-size: ${(p) => p.theme.fontSizes.l}px; */
		font-size: 14px;
	}
`;
