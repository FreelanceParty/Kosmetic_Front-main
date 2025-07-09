import styled from "styled-components";
import { CgClose } from "react-icons/cg";

export const ModalClose = styled.button`
	z-index:    100;
	top:        5px;
	right:      5px;
	cursor:     pointer;
	transition: color 0.5s;
	position:   absolute;
	color:      #B2B2B2;
	background: transparent;
	border:     none;
	
	&:hover {
		color: ${(p) => p.theme.colors.accentColor};
	}
	
	@media screen and (min-width: 768px) {
		top:   9px;
		right: 9px;
	}
	@media screen and (min-width: 1440px) {
		top:   9px;
		right: 9px;
	}
`;
export const IconClose = styled(CgClose)`
  width: 10px;
  height: 10px;
  @media screen and (min-width: 768px) {
    width: 24px;
    height: 24px;
  }

  @media screen and (min-width: 1440px) {
    width: 24px;
    height: 24px;
  }
`;
