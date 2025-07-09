import styled from "styled-components";
import {ReactComponent as PhoneIcon} from "../../assets/icon/newPhone.svg";
import {ReactComponent as EmailIcon} from "../../assets/icon/newEmail.svg";
import {AiOutlineInstagram} from "react-icons/ai";
import {RiTelegramLine} from "react-icons/ri";

export const ContactsElips = styled.div`
	display:         flex;
	align-items:     center;
	justify-content: center;
	margin-right:    3px;
	
	.burger {
		padding: 0;
	}
	
	@media screen and (min-width: 1440px) {
		margin-right: 10px;
	}
`;

export const IconPhone = styled(PhoneIcon)`
	width:  14px;
	height: 14px;
	fill:   ${(p) => p.theme.colors.textColor};
	
	&.head {
		width:  19px;
		height: 19px;
	}
	
	@media screen and (min-width: 768px) {
		width:  20px;
		height: 20px;
	}
	@media screen and (min-width: 1440px) {
		width:  28px;
		height: 28px;
	}
`;
export const IconEmail = styled(EmailIcon)`
	width:  14px;
	height: 14px;
	fill:   ${(p) => p.theme.colors.textColor};
	@media screen and (min-width: 768px) {
		width:  20px;
		height: 20px;
	}
	@media screen and (min-width: 1440px) {
		width:  28px;
		height: 28px;
	}
`;
export const InstagramIcon = styled(AiOutlineInstagram)`
	width:        14px;
	height:       14px;
	fill:         ${(p) => p.theme.colors.textColor};
	margin-right: 3px;
	@media screen and (min-width: 768px) {
		width:  20px;
		height: 20px;
	}
	@media screen and (min-width: 1440px) {
		width:  28px;
		height: 28px;
	}
`;
export const TelegramIcon = styled(RiTelegramLine)`
	width:        14px;
	height:       14px;
	fill:         ${(p) => p.theme.colors.textColor};
	margin-right: 3px;
	@media screen and (min-width: 768px) {
		width:  20px;
		height: 20px;
	}
	@media screen and (min-width: 1440px) {
		width:  28px;
		height: 28px;
	}
`;

export const Link = styled.a`
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
	
	&.head {
		font-size: ${(p) => p.theme.fontSizes.xs}px;
	}
	
	&.burger {
		font-weight:     400;
		font-size:       12px;
		line-height:     1.03;
		text-transform:  lowercase;
		text-align:      center;
		color:           #616161;
		text-decoration: none;
		padding:         3px 0;
		
		&:hover,
		&:focus {
			color: #FF96CF;
		}
	}
	
	@media screen and (min-width: 768px) {
		font-size: ${(p) => p.theme.fontSizes.xs}px;
		&.head {
			font-size: ${(p) => p.theme.fontSizes.xs}px;
		}
	}
	@media screen and (min-width: 1024px) {
		font-size: ${(p) => p.theme.fontSizes.s}px;
		&.head {
			font-size: ${(p) => p.theme.fontSizes.xs}px;
		}
	}
	@media screen and (min-width: 1440px) {
			/* font-size: ${(p) => p.theme.fontSizes.l}px; */
	}
`;

export const Wrap = styled.div`
	display:       flex;
	align-items:   center;
	margin-bottom: 8px;
	/* @media screen and (min-width: 768px) {
	  margin-bottom: 0px;
	} */
	
	&:hover,
	&:focus {
		color: #FF96CF;
		
		& ${Link}, & ${ContactsElips} {
			color: #FF96CF;
		}
		
		& ${IconPhone} {
			fill: ${(p) => p.theme.colors.accentColor};
		}
		
		& ${IconEmail} {
			fill: ${(p) => p.theme.colors.accentColor};
		}
		
		& ${InstagramIcon} {
			fill: ${(p) => p.theme.colors.accentColor};
		}
		
		& ${TelegramIcon} {
			fill: ${(p) => p.theme.colors.accentColor};
		}
	}
`;
