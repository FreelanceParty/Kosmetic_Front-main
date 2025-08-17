import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineRight, AiOutlineDown } from "react-icons/ai";

// _____________first_______________
export const Item = styled.li`
  position: relative;

  list-style: none;
  margin: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LinkStyle = styled(NavLink)`
	text-decoration: none;
	font-weight:     400;
	font-size:       16px;
	line-height:     1.02312;
	text-transform:  lowercase;
	text-align:      center;
	color:           #616161;
	padding:         12px;
	display:         flex;
	align-items:     center;
	/* align-items: center; */
	gap:             3px;
	transition:      all 250ms linear;
	
	&.active {
		color: #ff63b8;
	}
	
	&:hover,
	&:focus {
		color: #ff63b8;
	}
	
	@media screen and (min-width: 1024px) {
		font-size: 18px;
	}
	@media screen and (min-width: 1440px) {
		font-size: 22px;
	}
`;

export const DownIcon = styled(AiOutlineDown)`
  width: 12px;
  height: 12px;

  @media screen and (min-width: 1024px) {
    width: 18px;
    height: 18px;
  }
`;

export const RightIcon = styled(AiOutlineRight)`
  width: 12px;
  height: 12px;
  @media screen and (min-width: 1024px) {
    width: 18px;
    height: 18px;
  }
`;

export const ContactLink = styled.a`
  text-decoration: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.02312;
  text-transform: lowercase;
  text-align: center;
  color: #616161;
  /* padding: 10px 20px; */
  padding: 10px;
  display: flex;
  align-items: center;

  &:hover,
  &:focus {
    color: #ff63b8;
  }

  @media screen and (min-width: 1024px) {
    font-size: 18px;
    padding: 14px;
  }
  @media screen and (min-width: 1440px) {
    font-size: 22px;
    padding: 18px;
  }
`;

// _____________second_______________
export const MenuWrap = styled.div`
  min-height: 350px;
  width: auto;
  top: 100%;
  left: 0;
  right: auto;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  position: absolute;
  background: ${(p) => p.theme.colors.white};
  box-shadow: ${(p) => p.theme.colors.menuHoverShadow};
  @media screen and (min-width: 1024px) {
    min-height: 425px;
  }
`;

export const ListSub = styled.ul`
  min-width: 230px;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1024px) {
    min-width: 260px;
  }
  @media screen and (min-width: 1440px) {
    min-width: 300px;
  }
`;
// _____________list-brands_______________
export const MenuBrandList = styled.ul`
  position: absolute;
  top: 100%;
  left: -110%;
  right: auto;

  width: 650px;
  min-height: 425px;
  padding: 0 20px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: ${(p) => p.theme.colors.white};
  box-shadow: ${(p) => p.theme.colors.menuHoverShadow};

  @media screen and (min-width: 1024px) {
    left: -150%;
    width: 900px;
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
    left: -200%;
    width: 1200px;
  }
`;

// ______________item-brands_______________
export const ItemBrands = styled.li`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px 0;

  &:nth-child(3n)::after {
    position: absolute;
    bottom: 0;
    right: 50%;
    content: "";
    display: block;
    width: 220%;
    height: 1px;
    background-color: #9a9a9a;
  }
  &:last-child:after {
    display: none;
  }
  @media screen and (min-width: 1024px) {
    gap: 20px;
    padding: 15px 0;
  }

  @media screen and (min-width: 1440px) {
    gap: 30px;
    &:nth-child(3n)::after {
      display: none;
    }
    &:nth-child(4n)::after {
      position: absolute;
      bottom: 0;
      right: 50%;
      content: "";
      display: block;
      width: 310%;
      height: 1px;
      background-color: #9a9a9a;
    }
    &:last-child:after {
      display: none;
    }
  }
`;
export const BrandLetter = styled.h3`
  font-weight: 700;
  font-size: 20px;
  line-height: 1.02312;
  text-transform: uppercase;
  text-align: center;
  color: #ff63b8;
  min-width: 20px;

  @media screen and (min-width: 1024px) {
    min-width: 35px;
    font-size: 40px;
  }
`;
export const ListBrand = styled.ul`
  display: flex;
  flex-direction: column;
`;

// ______________brand_______________
export const LinkBrand = styled(NavLink)`
  font-weight: 700;
  font-size: 12px;
  line-height: 1.02312;
  text-transform: uppercase;
  text-align: center;
  color: #616161;
  text-decoration: none;

  margin: 0;
  display: flex;
  text-align: start;
  text-decoration: none;
  padding: 4px 0;

  &.active {
    color: #ff63b8;
  }
  &:hover,
  &:focus {
    color: #ff63b8;
  }
  @media screen and (min-width: 1024px) {
    font-size: 15px;
    padding: 6px 0;
  }
`;
