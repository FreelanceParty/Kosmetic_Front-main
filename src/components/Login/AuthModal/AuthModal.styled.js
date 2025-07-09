import styled from "styled-components";

export const ModalBackdrop = styled.div`
	position:        fixed;
	inset:           0;
	background:      rgba(0, 0, 0, 0.3);
	display:         flex;
	justify-content: center;
	align-items:     center;
	z-index:         9999;
`;

export const ModalContainer = styled.div`
	background:    #FFFFFF;
	padding:       30px;
	width:         480px;
	border-radius: 12px;
	box-shadow:    0 0 15px rgba(0, 0, 0, 0.2);
	position:      relative;
`;

export const TabGroup = styled.div`
	display:         flex;
	justify-content: center;
	gap:             40px;
	margin-bottom:   24px;
	position:        relative;
`;

export const Tab = styled.button`
	background:      none;
	border:          none;
	font-weight:     bold;
	font-size:       20px;
	color:           ${({active}) => (active ? "#ff7eb3" : "#555")};
	text-decoration: ${({active}) => (active ? "underline" : "none")};
	cursor:          pointer;
`;

export const CloseBtn = styled.button`
	position:   absolute;
	top:        -8px;
	right:      -8px;
	background: none;
	border:     none;
	font-size:  24px;
	cursor:     pointer;
`;

