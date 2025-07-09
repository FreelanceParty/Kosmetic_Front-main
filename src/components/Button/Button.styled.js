import styled, {css} from "styled-components";

export const ButtonStyle = styled.button`
	background-color: ${(p) => (p.disabled ? "#CCCCCC" : "transparent")};
	border:           1px solid ${(p) => (p.disabled ? `#CCCCCC` : p.theme.colors.accentColor)};
	border-radius:    50px;
	display:          flex;
	text-align:       center;
	justify-content:  center;
	align-items:      center;
	font-family:      "Mulish", sans-serif;
	font-weight:      ${(p) => p.theme.fontWeights.bold};
	font-size:        12px;
	text-decoration:  none;
	padding:          7px 20px;
	color:            ${(p) =>
			p.disabled ? p.theme.colors.white : p.theme.colors.accentColor};
	transition:       all 250ms ease-in-out;
	cursor:           ${(p) => (p.disabled ? "not-allowed" : "pointer")};
	
	&:hover {
		color:            ${(p) => (p.disabled ? p.theme.colors.white : p.theme.colors.white)};
		border:           1px solid ${(p) => (p.disabled ? `#CCCCCC` : "none")};
		background-color: ${(p) =>
				p.disabled ? "#CCCCCC" : p.theme.colors.accentColor};
	}
	
	&.goods {
		background-color:                         ${(p) =>
				p.disabled ? "#ccc" : p.theme.colors.accentColor};
		font-size:                                12px;
		padding:                                  7px 20px;
		width:                                    220px;
		color:                                    ${(p) => p.theme.colors.white};
		border:                                   ${(p) => (p.disabled ? `1px solid #8A8A8A` : `1px solid #8a8a8a`)};
		
		&:hover {
			background-color: ${(p) =>
					p.disabled ? "#ccc" : p.theme.colors.hoverAccentColor};
			color:            ${(p) => p.theme.colors.white};
				/* border: ${(p) =>
					p.disabled ? `1px solid black` : `1px solid #8a8a8a`}; */
		}
		
		${(p) =>
				p.slider &&
				css`
					font-size: 7px;
					@media screen and (min-width: 768px) {
						font-size: 12px;
					}
				`} @media screen and ( min-width: 1024px) {
		font-size:                                ${(p) => p.theme.fontSizes.sm}px;
		font-size:                                16px;
		width:                                    300px;
		padding:                                  10px 20px;
	}
	}
	
	&.list {
		background-color:                         ${(p) => (p.disabled ? "#CCCCCC" : "transparent")};
		font-size:                                12px;
		padding:                                  7px 20px;
		color:                                    ${(p) => (p.disabled ? p.theme.colors.white : "#616161")};
		border:                                   ${(p) => (p.disabled ? `1px solid #8A8A8A` : `1px solid #8a8a8a`)};
		
		&:hover {
			background-color: ${(p) =>
					p.disabled ? "#CCCCCC" : p.theme.colors.hoverAccentColor};
			color:            ${(p) => p.theme.colors.white};
				/* border: ${(p) =>
					p.disabled ? `1px solid black` : `1px solid #8a8a8a`}; */
		}
		
		${(p) =>
				p.slider &&
				css`
					font-size: 7px;
					@media screen and (min-width: 768px) {
						font-size: 12px;
					}
				`} @media screen and ( min-width: 1024px) {
		font-size:                                ${(p) => p.theme.fontSizes.sm}px;
		padding:                                  10px 30px;
	}
	}
	
	@media screen and (min-width: 768px) {
		font-size: ${(p) => p.theme.fontSizes.sm}px;
		/* height: 40px; */
		/* padding: 0px 20px; */
	}
	@media screen and (min-width: 1024px) {
		font-size:       ${(p) => p.theme.fontSizes.l}px;
		display:         flex;
		padding:         10px 60px;
		align-items:     center;
		justify-content: center;
	}
	@media screen and (min-width: 1440px) {
		font-size:       ${(p) => p.theme.fontSizes.l}px;
		display:         flex;
		/* padding: 0px 60px; */
		align-items:     center;
		justify-content: center;
	}
	
	&.user-menu {
		@media (min-width: 1240px) and (max-width: 1439px) {
			font-size: 20px;
			padding:   0px 60px;
		}
		@media (min-width: 1024px) and (max-width: 1239px) {
			font-size: 20px;
			padding:   18px 50px;
		}
		@media screen and (min-width: 768px) and (max-width: 1023px) {
			font-size: 18px;
			padding:   16px 50px;
		}
		@media (max-width: 767px) {
			font-size: 16px;
			padding:   18px 20px;
		}
	}
	
	&.opt {
		font-weight:      ${(p) => p.theme.fontWeights.title};
		font-size:        14px;
		padding:          10px 20px;
		background-color: #FFA5D6;
		border:           1px solid #616161;
		opacity:          0.8;
		color:            #FFFFFF;
		transition:       all 500ms ease-in-out;
		
		&:hover {
			opacity: 1;
		}
		
		@media screen and (min-width: 768px) {
			font-size: 16px;
			padding:   22px 50px;
		}
		@media screen and (min-width: 1024px) {
			padding:   28px 60px;
			font-size: 18px;
		}
		@media screen and (min-width: 1440px) {
			padding:   28px 60px;
			font-size: 18px;
    }
  }
`;
