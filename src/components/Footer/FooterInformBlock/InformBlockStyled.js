import styled from "styled-components";
import {Link} from "react-router-dom";

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
	font-family:    "Mulish", sans-serif;
	color:          #616161;
	font-weight:    700;
	font-size:      12px;
	line-height:    1.03;
	text-transform: uppercase;
	margin-bottom:  18px;
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
export const List = styled.ul`
	display:        flex;
	flex-direction: column;
`;
export const Item = styled.li`
	font-size:     ${(p) => p.theme.fontSizes.xxxs}px;
	margin-bottom: 8px;
`;

export const LinkStyledSecond = styled.a`
	display:         flex;
	text-decoration: none;
		/* color: ${(p) => p.theme.colors.textColor};
  font-size: ${(p) => p.theme.fontSizes.xl}px;
  align-items: center;
  font-style: normal;
  font-weight: ${(p) => p.theme.fontWeights.body};
  line-height: 1; */
	font-family:     "Mulish", sans-serif;
	font-weight:     400;
	font-size:       12px;
	line-height:     1.03;
	text-transform:  lowercase;
	text-align:      center;
	color:           #616161;
	display:         inline-block;
	cursor:          pointer;
	
	&:hover {
			/* color: ${(p) => p.theme.colors.accentColor}; */
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
    color: ${(p) => p.theme.colors.accentColor};
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover:after {
    opacity: 1;
  } */
	@media screen and (min-width: 1024px) {
			/* font-size: ${(p) => p.theme.fontSizes.sm}px; */
		font-size: 14px;
	}
	@media screen and (min-width: 1440px) {
			/* font-size: ${(p) => p.theme.fontSizes.l}px; */
	}
`;

export const LinkStyled = styled(Link)`
	display:         flex;
	text-decoration: none;
		/* color: ${(p) => p.theme.colors.textColor};
  font-size: ${(p) => p.theme.fontSizes.xl}px;
  align-items: center;
  font-style: normal;
  font-weight: ${(p) => p.theme.fontWeights.body};
  line-height: 1; */
	font-family:     "Mulish", sans-serif;
	font-weight:     400;
	font-size:       12px;
	line-height:     1.03;
	text-transform:  lowercase;
	text-align:      center;
	color:           #616161;
	display:         inline-block;
	
	&:hover {
		color: ${(p) => p.theme.colors.accentColor};
	}
	
	&::after {
		content:          "";
		position:         absolute;
		left:             0;
		bottom:           0;
		width:            100%;
		height:           1px;
		background-color: ${(p) => p.theme.colors.accentColor};
		opacity:          0;
		transition:       opacity 0.3s ease-in-out;
	}
	
	&:hover::after {
		opacity: 1;
	}
	
	@media screen and (min-width: 1024px) {
		font-size: ${(p) => p.theme.fontSizes.sm}px;
	}
	@media screen and (min-width: 1440px) {
			/* font-size: ${(p) => p.theme.fontSizes.l}px; */
	}
`;
