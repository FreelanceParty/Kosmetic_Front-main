import styled from "styled-components";
// import { ReactComponent as userIcon } from "../../../images/newUser.svg";
import {IoPersonOutline} from "react-icons/io5";
export const LinkBtn = styled.button`
	padding:        3px;
	border:         none;
	background:     transparent;
	cursor:         pointer;
	text-align:     center;
	color:          #616161;
	font-size:      ${(p) => p.theme.fontSizes.s + 1}px;
	font-style:     normal;
	font-weight:    ${(p) => p.theme.fontWeights.bold};
	line-height:    1;
	letter-spacing: 0.225px;
	text-transform: uppercase;
	
	&:hover,
	&:focus {
		color: ${(p) => p.theme.colors.accentColor};
		
		& div {
			background: ${(p) => p.theme.colors.accentColor};
		}
	}
	
	&.activ {
		color: ${(p) => p.theme.colors.accentColor};
		
		& div {
			background: ${(p) => p.theme.colors.accentColor};
		}
	}
	
	&.none {
		display: none;
	}
	
	@media screen and (min-width: 768px) {
		font-size: ${(p) => p.theme.fontSizes.m}px;
	}
	@media screen and (min-width: 1024px) {
		font-size:      ${(p) => p.theme.fontSizes.xl + 1}px;
		letter-spacing: 0.375px;
	}
`;

export const WrapLink = styled.div`
	display:         flex;
	justify-content: space-evenly;
	margin-bottom:   10px;
	@media screen and (min-width: 768px) {
		margin-bottom: 20px;
	}
	@media screen and (min-width: 1440px) {
		margin-bottom: 30px;
	}
`;

export const LogInElips = styled.div`
	width:           30px;
	height:          30px;
	border-radius:   50%;
	border:          1px solid ${(p) => p.theme.colors.border};
	display:         flex;
	align-items:     center;
	justify-content: center;
	margin-left:     20px;
	
	&:hover,
	&:focus {
		border: 1px solid ${(p) => p.theme.colors.accentColor};
		
		& svg {
			color: ${(p) => p.theme.colors.accentColor};
		}
	}
`;

export const LogInIcon = styled(IoPersonOutline)`
	width:  25px;
	height: 25px;
	fill:   ${(p) => p.theme.colors.textColor};
	
	&:hover {
		fill: ${(p) => p.theme.colors.accentColor};
	}
`;

export const DropDown = styled.div`
	position:      absolute;
	background:    ${(p) => p.theme.colors.white};
	box-shadow:    0px 2px 4px rgba(0, 0, 0, 0.1);
	border-radius: 4px;
	padding:       0 10px;
	z-index:       1;
	
	${LogInElips}:hover & {
		display: block;
	}
	
	ul {
		list-style: none;
		padding:    0;
	}
	
	${LogInElips}:hover & ul {
		display: block;
	}
	
	@media screen and (min-width: 768px) {
		top: 40px;
	}
	@media screen and (min-width: 1024px) {
		top: 40px;
	}
	@media screen and (min-width: 1440px) {
		top: 40px;
	}
`;

export const ListItem = styled.li`
	padding: 8px 0;
	
	a {
		display:         block;
		color:           ${(p) => p.theme.colors.textColor};
		text-decoration: none;
		
		&:hover {
			background-color: ${(p) => p.theme.colors.accentColor};
			color:            ${(p) => p.theme.colors.white};
		}
	}
`;

export const LogOut = styled.button`
	display:         flex;
	width:           100%;
	color:           ${(p) => p.theme.colors.textColor};
	text-decoration: none;
	padding:         0;
	border:          none;
	background:      transparent;
	padding:         4px 0;
	
	&:hover {
		background-color: ${(p) => p.theme.colors.accentColor};
		color:            ${(p) => p.theme.colors.white};
	}
`;

export const Modal = styled.div`
	max-width:     90%;
	max-height:    90%;
	padding:       10px;
	border:        1px solid ${(p) => p.theme.colors.border};
	border-radius: 4px;
	position:      fixed;
	top:           50%;
	left:          50%;
	transform:     translate(-50%, -50%);
	background:    ${(p) => p.theme.colors.white};
	box-shadow:    0 5px 35px rgba(0, 0, 0, 0.75);
	z-index:       5;
	@media screen and (min-width: 768px) {
		padding: 20px;
	}
	@media screen and (min-width: 1440px) {
		padding: 30px;
	}
`;

export const ModalBackdrop = styled.section`
	position:        fixed;
	top:             0;
	left:            0;
	width:           100%;
	height:          100%;
	background:      rgba(0, 0, 0, 0.5);
	display:         flex;
	justify-content: center;
	align-items:     center;
	z-index:         3;
`;

export const Underline = styled.div`
	flex:             1;
	height:           1px;
	background-color: ${(p) => p.theme.colors.black};
`;
