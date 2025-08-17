// MobileMenu.styled.js
import styled from "styled-components";
import { stack as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

export const MobileMenuContainer = styled(Menu)`
	background: ${(p) => p.theme.colors.white}; // Колір фону меню
	position:   fixed;
	top:        0;
	left:       0;
	padding:    50px 10px;
	box-shadow: 6px -2px 9px 0 rgba(0, 0, 0, 0.25);
	
	& div {
		overflow:        auto;
		scrollbar-width: thin; /* Товщина смуги прокрутки */
		scrollbar-color: ${(p) => p.theme.colors.textColor} transparent; /* Колір смуги прокрутки */
		/* Стилізація смуги прокрутки для WebKit (Chrome, Safari) */
		
		&::-webkit-scrollbar {
			padding: 10px;
			width:   8px; /* Товщина смуги прокрутки */
		}
		
		&::-webkit-scrollbar-thumb {
			padding:          10px;
			background-color: ${(p) =>
					p.theme.colors.textColor}; /* Колір смуги прокрутки */
			border-radius:    8px; /* Круглий вигляд смуги прокрутки */
		}
		
		&::-webkit-scrollbar-track {
			background-color: transparent; /* Колір фону смуги прокрутки */
		}
	}
`;

// export const MobileMenuItem = styled.div`
//   /* a {
//     font-weight: 300;
//     font-size: 14px;
//     line-height: 1.57;
//     text-transform: lowercase;
//     text-align: center;
//     color: #616161;
//     text-decoration: none;
//     &:hover,
//     &:focus {
//       color: #ff63b8;
//     }
//   } */
// `;

export const AuthenticatedLink = styled(Link)`
  font-weight: 600;
  font-size: 14px;
  line-height: 1.57;
  text-transform: lowercase;
  text-align: center;
  color: #616161;
  text-decoration: none;
  padding: 8px 0;

  &:hover,
  &:focus {
    color: #ff96cf;
  }
`;

export const InfoLink = styled.a`
  font-weight: 300;
  font-size: 14px;
  line-height: 1.57;
  text-transform: lowercase;
  text-align: center;
  color: #616161;
  text-decoration: none;

  padding: 8px 0;
  &:hover,
  &:focus {
    color: #ff96cf;
  }
`;
export const ContactBtn = styled.button`
  font-weight: 300;
  font-size: 14px;
  line-height: 1.57;
  text-transform: lowercase;
  text-align: center;
  color: #616161;
  text-decoration: none;
  background: transparent;
  border: none;

  padding: 8px 0;
  text-align: left;
  &:hover,
  &:focus {
    color: #ff96cf;
  }
`;
