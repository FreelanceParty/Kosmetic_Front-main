import styled from "styled-components";

export const ScrollToTopBtn = styled.button`
	position:         fixed;
	bottom:           20px;
	right:            20px;
	width:            50px;
	height:           50px;
	background-color: #ff63b8;
	color:            white;
	border:           none;
	border-radius:    50%;
	display:          flex;
	justify-content:  center;
	align-items:      center;
	font-size:        30px;
	cursor:           pointer;
	opacity:          0;
	visibility:       hidden;
	box-shadow:       0px 3.76642px 3.76642px 0px rgba(0, 0, 0, 0.25);
	transition:       opacity 0.3s ease, visibility 0.3s ease;
	
	&:hover {
		background-color: #eb4da3;
		box-shadow:       none;
	}
	
	&.show {
		opacity:    1;
		visibility: visible;
	}
`;
