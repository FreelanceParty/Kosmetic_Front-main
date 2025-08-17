import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineRight, AiOutlineDown } from "react-icons/ai";

export const MenuLevel = styled.div``;

export const LinkWrap = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  justify-content: center;
`;

export const StyleLink = styled(NavLink)`
	font-weight:     300;
	font-size:       14px;
	line-height:     1.57;
	text-transform:  lowercase;
	text-align:      center;
	color:           #616161;
	text-decoration: none;
	padding:         7px 0;
	
	&:hover,
	&:focus {
		color: #ff96cf;
	}
	
	&.active {
		color: #ff96cf;
	}
`;

export const LinkHref = styled.a`
  font-weight: 300;
  font-size: 14px;
  line-height: 1.57;
  text-transform: lowercase;
  text-align: center;
  color: #616161;

  text-decoration: none;

  padding: 7px 0;
  cursor: pointer;
  &:hover,
  &:focus {
    color: #ff96cf;
  }
  &.active {
    color: #ff96cf;
  }
`;

export const RightIcon = styled(AiOutlineRight)`
  width: 22px;
  height: 22px;
  padding: 5px;
  margin-left: 5px;
  cursor: pointer;
  &:hover,
  &:focus {
    color: #ff96cf;
  }
`;

export const DownIcon = styled(AiOutlineDown)`
  width: 22px;
  height: 22px;
  padding: 5px;
  margin-left: 5px;
  cursor: pointer;
  &:hover,
  &:focus {
    color: #ff96cf;
  }
`;

export const BrandStyleLink = styled(NavLink)`
  font-weight: 300;
  font-size: 14px;
  line-height: 1.57;
  text-transform: uppercase;
  text-align: center;
  color: #616161;

  text-decoration: none;

  padding: 7px 0;
  &:hover,
  &:focus {
    color: #ff96cf;
  }
  &.active {
    color: #ff96cf;
  }
`;
