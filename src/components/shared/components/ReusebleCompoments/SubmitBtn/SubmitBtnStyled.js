import styled from "styled-components";

export const SubmitBTN = styled.button`
	color:         #F9F8F6;
	border:        0;
	background:    ${(p) => p.theme.colors.accentColor};
	box-shadow:    none;
	width:         ${(props) => props.width || "auto"};
	height:        40px;
	border-radius: 7px;
	cursor:        pointer;
	
	&:hover {
		color: #FF0000;
	}
`;
