import React from "react";
import {ButtonStyle} from "./SecondButton.styled";

const SecondButton = ({type, text, onClick, disabled}) => {
	return (
		<ButtonStyle type={type} onClick={onClick} disabled={disabled}>
			{text}
		</ButtonStyle>
	);
};

export default SecondButton;
