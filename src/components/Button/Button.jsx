import {ButtonStyle} from "./Button.styled";

const Button = ({
	type,
	text,
	onClick,
	disabled,
	goods,
	userMenu,
	opt,
	list,
	slider,
}) => {
	return (
		<ButtonStyle
			className={
				(goods && "goods") ||
				(userMenu && "user-menu") ||
				(opt && "opt") ||
				(list && "list")
			}
			slider={slider}
			type={type}
			onClick={onClick}
			disabled={disabled}
		>
			{text}
		</ButtonStyle>
	);
};

export default Button;
