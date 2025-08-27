import styled from "styled-components";

export const PromoWrapper = styled.div`
	background: ${(p) => p.theme.colors.button_open};
`;

export const PromoText = styled.a`
	color:           ${(p) => p.theme.colors.primary_text};
	word-wrap:       break-word;
	text-decoration: none;
`;
