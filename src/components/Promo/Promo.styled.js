import styled from "styled-components";

export const PromoWrapper = styled.div`
  position: relative;
  width: 100%;
  background: ${(p) => p.theme.colors.button_open};
  padding: 10px 0;
  text-align: center;
  z-index: 10;
`;

export const PromoText = styled.a`
	color:           ${(p) => p.theme.colors.primary_text};
	font-size:       12px;
	font-family:     Montserrat;
	font-weight:     500;
	line-height:     16.8px;
	word-wrap:       break-word;
	text-decoration: none;
`;
