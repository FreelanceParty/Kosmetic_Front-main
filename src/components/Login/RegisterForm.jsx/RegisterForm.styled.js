import styled from "styled-components";

export const Input = styled.input`
	width:            100%;
	padding:          10px;
	margin-bottom:    12px;
	border:           1px solid #F2D4E5;
	border-radius:    20px;
	outline:          none;
	background-color: #FFFFFF;
	font-size:        14px;
`;

export const Row = styled.div`
	display: flex;
	gap:     10px;
`;

export const Button = styled.button`
	background:    transparent;
	border:        2px solid #ff9ac5;
	color:         #ff9ac5;
	padding:       10px 30px;
	font-weight:   bold;
	font-size:     16px;
	border-radius: 20px;
	margin-top:    10px;
	cursor:        pointer;
	
	&:hover {
		background: #ff9ac5;
		color:      white;
	}
`;

// ✅ Додаємо стилі чекбоксів і лейблів

export const CheckboxGroup = styled.div`
	display:        flex;
	flex-direction: column;
	gap:            10px;
	margin:         15px 0;
`;

export const Label = styled.label`
	display:     flex;
	align-items: center;
	font-size:   14px;
	color:       #444;
	gap:         8px;
	cursor:      pointer;
`;

export const Checkbox = styled.input.attrs({type: "checkbox"})`
	accent-color: #ff9ac5;
	width:        16px;
	height:       16px;
	cursor:       pointer;
`;