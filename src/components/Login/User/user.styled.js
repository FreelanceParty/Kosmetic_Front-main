import styled from "styled-components";

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

export const DropDown = styled.div`
	position:      absolute;
	background:    ${(p) => p.theme.colors.white};
	box-shadow:    0px 2px 4px rgba(0, 0, 0, 0.1);
	border-radius: 4px;
	z-index:       1;
	
	${LogInElips}:hover & {
		display: block;
	}
	
	${LogInElips}:hover & ul {
		display: block;
	}
	
	@media screen and (min-width: 768px) {
		top: 20px;
	}
	@media screen and (min-width: 1024px) {
		top: 20px;
	}
	@media screen and (min-width: 1440px) {
		top: 20px;
	}
`;
