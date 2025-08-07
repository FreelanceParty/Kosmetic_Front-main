const Button = ({type, text}) => {
	let typeClasses = "";
	if (type === "primary") {
		typeClasses = "bg-[#000E55] text-white";
	} else if (type === "secondary") {
		typeClasses = "bg-white text-[#000E55] border border-[#000E55]";
	}
	return (
		<div className={`flex justify-center items-center font-medium text-md text-center w-[306px] h-[51px] rounded-[30px] ${typeClasses}`}>{text}</div>
	)
}

export default Button