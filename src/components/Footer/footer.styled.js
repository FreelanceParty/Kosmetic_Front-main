import {NavLink} from "react-router-dom";
import styled from "styled-components";

// export const FooterWrap = styled.footer`
//   /* background: ${(p) => p.theme.colors.topLine}; */
//   border-top: 1px solid #c4c4c4;
//   border-bottom: 1px solid #c4c4c4;
// `;

// export const Wrap = styled.div`
//   max-width: 1440px;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column-reverse;
//   justify-content: center;
//   align-items: center;
//   padding: 20px 0;

//   @media screen and (min-width: 768px) {
//     padding: 10px 30px 20px 50px;
//     justify-content: space-between;
//   }

//   @media screen and (min-width: 868px) {
//     padding: 10px 20px 20px 20px;
//     justify-content: space-between;
//     flex-direction: row;
//   }
// `;
// export const InfoWrap = styled.div`
//   display: flex;
//   @media screen and (min-width: 768px) {
//     width: 90%;
//     justify-content: space-around;
//   }
// `;
// //===================work schedule==========================================
// export const ScheduleBlock = styled.div`
//   display: flex;
//   flex-direction: column;
//   border-top: 1px solid #c4c4c4;
//   padding-top: 17px;
//   padding-bottom: 40px;
//   @media screen and (min-width: 768px) {
//     display: none;
//   }
// `;
// export const ScheduleTitle = styled.h4`
//   font-family: "Mulish", sans-serif;
//   font-weight: 600;
//   font-size: 12px;
//   line-height: 1.03;
//   text-transform: lowercase;
//   text-align: center;
//   color: #616161;
//   margin-bottom: 8px;

//   @media screen and (min-width: 768px) {
//     margin-bottom: 0px;
//   }
// `;
// export const ScheduleText = styled.p`
//   font-family: "Mulish", sans-serif;
//   font-weight: 400;
//   font-size: 12px;
//   line-height: 1.03;
//   text-transform: lowercase;
//   text-align: center;
//   color: #616161;
//   margin-bottom: 4px;
//   /* @media screen and (min-width: 768px) {
//     margin-bottom: 0;
//   } */
// `;
// _______________________v2____________________

export const FooterWrapper = styled.footer`
	background: #F6F6F6;
	padding:    60px 16px 40px;
`;

export const FooterInner = styled.div`
	max-width: 375px;
	margin:    0 auto;
	padding:   0 16px;
`;

export const Logo = styled.a`
	display:         flex;
	/* flex-direction: column; */
	align-items:     center;
	justify-content: center;
	margin-bottom:   24px;
	gap:             4px;
	text-decoration: none;
`;

export const LogoText = styled.span`
	font-size:   26.1px;
	font-family: Montserrat;
	font-weight: 600;
	line-height: 36.53px;
	word-wrap:   break-word;
	color:       ${({color}) => color || "#8F49A3"};
`;

export const Socials = styled.div`
	display:         flex;
	justify-content: center;
	gap:             24px;
	padding:         0 0 32px;
	border-bottom:   1.09px solid #E8E8E8;
	margin-bottom:   32px;
`;

export const SocialLink = styled.a`
	width:           42px;
	height:          43px;
	display:         flex;
	flex-direction:  column;
	align-items:     center;
	justify-content: center;
	background:      #EFEFEF;
	border-radius:   3px;
	text-decoration: none;
	color:           ${(p) => p.theme.colors.primary_text};
	font-size:       8px;
	font-family:     Montserrat;
	font-weight:     500;
	text-transform:  uppercase;
	line-height:     11.2px;
	gap:             8px; /* зменшено з 8px */
	overflow:        hidden;
	
	& > img {
		width:   16px;
		height:  16px;
		display: block;
	}
`;

export const FooterNav = styled.nav`
	display:        flex;
	flex-direction: column;
	align-items:    flex-start;
	gap:            24px;
	margin-bottom:  60px;
`;

export const FooterNavLink = styled(NavLink)`
	color:           ${(p) => p.theme.colors.primary_text};
	font-size:       14px;
	font-family:     Montserrat;
	font-weight:     400;
	line-height:     19.6px;
	word-wrap:       break-word;
	text-decoration: none;
	
	&:hover,
	&:focus {
		color: ${(p) => p.theme.colors.accent_pink};
	}
`;

export const Copyright = styled.div`
	color:       ${(p) => p.theme.colors.primary_text};
	font-size:   10px;
	font-family: Montserrat;
	font-weight: 400;
	line-height: 14px;
	word-wrap:   break-word;
	text-align:  center;
`;
