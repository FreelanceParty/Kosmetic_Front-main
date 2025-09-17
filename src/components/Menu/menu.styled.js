import { NavLink } from "react-router-dom";
import tw from "tailwind-styled-components";

export const MenuNav = tw.nav`
  flex justify-center align-center
`;

export const List = tw.ul`
  flex justify-center align-center
`;

export const MenuWrapper = tw.nav`
	bg-white border-y border-gray-200
`;
export const MenuList = tw.div`
  flex justify-center flex-wrap gap-10
`;

export const MenuItem = tw(NavLink)`
  text-sm font-montserrat font-semibold leading-[19.6px] break-words no-underline py-6
  ${(p) => p.$highlight ? 'text-[theme.colors.accent_red]' : 'text-[theme.colors.primary_text]'}
  transition-colors duration-300
  hover:${(p) => p.$highlight ? 'text-[theme.colors.accent_red]' : 'text-[theme.colors.accent_pink]'}
`;