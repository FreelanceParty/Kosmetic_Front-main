import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const MenuNav = styled.nav`
  display: flex;

  justify-content: center;
  align-items: center;
`;

export const List = styled.ul`
  display: flex;
  /* justify-content: space-between; */
  justify-content: center;
  align-items: center;
  /* width: 100%; */
  /* height: 100%; */
`;

export const MenuWrapper = styled.nav`
	background-color: white;
	border-top:       1px solid #eee;
	border-bottom:    1px solid #eee;
`;

export const MenuList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  gap: 40px;
`;

export const MenuItem = styled(NavLink)`
  font-size: 14px;
  font-family: Montserrat;
  font-weight: 600;
  line-height: 19.6px;
  word-wrap: break-word;
  text-decoration: none;
  padding: 24px 0;

  color: ${(p) =>
    p.$highlight ? p.theme.colors.accent_red : p.theme.colors.primary_text};
  transition: color 0.3s;

  &:hover {
    color: ${(p) =>
      p.$highlight ? p.theme.colors.accent_red : p.theme.colors.accent_pink};
  }
`;
