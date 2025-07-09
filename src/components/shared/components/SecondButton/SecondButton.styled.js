import styled from "styled-components";

export const ButtonStyle = styled.button`
	padding:          10px 20px;
	border-radius:    4px;
	cursor:           ${(p) => (p.disabled ? "not-allowed" : "pointer")};
	transition:       background-color 0.3s ease color 0.3s ease;
	margin:           0 5px;
	border:           1px solid ${(p) => p.theme.colors.border};
	background-color: ${(p) => p.theme.colors.white};
	color:            ${(p) => p.theme.colors.textColor};
	
	&:hover {
		background-color: ${(p) => p.disabled || p.theme.colors.hoverAccentColor};
		color:            ${(p) => p.disabled || p.theme.colors.white};
		border:           ${(p) => p.disabled || "1px solid transparent"};
	}
`;
