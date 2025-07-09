import styled from "styled-components";
import { BsSearch } from "react-icons/bs";

export const SearchFormContainer = styled.div`
	overflow:   hidden;
	max-height: ${({$isSearchOpen}) =>
			$isSearchOpen ? "200px" : "0"}; // Висота форми, коли вона відкрита
	opacity:    ${({$isSearchOpen}) => ($isSearchOpen ? "1" : "0")}; // Прозорість
	transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out; // Анімація
	background: #8A8A8A;
	
	&:hover,
	&:focus {
		& svg {
			color: ${(p) => p.theme.colors.accentColor};
		}
	}
	
	@media screen and (min-width: 768px) {
		margin-left: auto;
		/* background: #fff; */
	}
	@media screen and (min-width: 1024px) {
		/* width: 300px; */
	}
	@media screen and (min-width: 1440px) {
		/* width: 410px; */
	}
`;

export const SearchInput = styled.input`
  font-size: ${(p) => p.theme.fontSizes.xs}px;
  font-style: normal;
  font-weight: ${(p) => p.theme.fontWeights.body};
  line-height: 1;
  letter-spacing: 0.19px;
  outline: none;
  border-radius: 25px;
  border: 0.574px solid ${(p) => p.theme.colors.textColor};
  box-sizing: border-box;
  width: -webkit-fill-available;
  margin: 6px 15px;

  /* padding: 5px 20px 5px 35px; */

  padding: 5px 20px;
  color: ${(p) => p.theme.colors.textColor};
  background: ${(p) => p.theme.colors.white};
  transition: all 0.15s ease 0s;
  &:hover,
  &:focus {
    border: 1px solid ${(p) => p.theme.colors.accentColor};
  }
  @media screen and (min-width: 768px) {
    border-radius: 50px;
    /* width: 275px; */
    height: 35px;
    padding: 0px 16px 0px 42px;
    font-size: ${(p) => p.theme.fontSizes.s}px;
    border: 1px solid ${(p) => p.theme.colors.border};
  }
  @media screen and (min-width: 1024px) {
    /* width: 350px; */
    height: 50px;
    font-size: ${(p) => p.theme.fontSizes.m}px;
  }
  @media screen and (min-width: 1440px) {
    /* width: 100%; */
  }
`;

export const SearchButton = styled.button`
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0px;
  left: 20px;
  bottom: 0px;
  padding: 0px;
  background-color: transparent;
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    left: 45px;
  }
  /* @media screen and (min-width: 768px) {
    display: block;

  } */
`;

export const SearchIcon = styled(BsSearch)`
  width: 18px;
  height: 18px;
  /* color: ${(p) => p.theme.colors.textColor}; */
  color: #ff96cf;
  @media screen and (min-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;
