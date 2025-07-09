import { Link } from "react-router-dom";
import styled from "styled-components";

export const LinkLogo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin: 0px 12px;
`;
export const TextLogo = styled.p`
	font-family:             "Mulish", sans-serif;
	font-weight:             700;
	font-size:               27px;
	line-height:             1.03;
	letter-spacing:          0.11em;
	text-transform:          uppercase;
	text-align:              center;
	color:                   #D88DD1;
	background-clip:         text;
	-webkit-background-clip: text;
	/* -webkit-text-fill-color: transparent; */
	@media screen and (min-width: 768px) {
		font-size:   ${(p) => p.theme.fontSizes.xl + 2}px;
		line-height: 1;
	}
	@media screen and (min-width: 1024px) {
		font-size: ${(p) => p.theme.fontSizes.xxl + 6}px;
	}
	@media screen and (min-width: 1440px) {
		font-size: ${(p) => p.theme.fontSizes.xxxl + 2}px;
	}
`;
export const TextLogoSecondWord = styled.p`
  font-family: "Mulish", sans-serif;
  font-weight: 700;
  font-size: 27px;
  line-height: 1.03;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  text-align: center;
  color: #ff96cf;
  background-clip: text;
  -webkit-background-clip: text;
  /* -webkit-text-fill-color: transparent; */
  @media screen and (min-width: 768px) {
    font-size: ${(p) => p.theme.fontSizes.xl + 2}px;
    line-height: 1;
  }
  @media screen and (min-width: 1024px) {
    font-size: ${(p) => p.theme.fontSizes.xxl + 6}px;
  }
  @media screen and (min-width: 1440px) {
    font-size: ${(p) => p.theme.fontSizes.xxxl + 2}px;
  }
`;
