const Button = ({type, text, classes = '', textClasses = '', isDisabled, onClick}) => {
	let typeClasses = "";
	if (type === "primary") {
		typeClasses = `bg-[#000E55] text-white ${isDisabled ? '' : 'hover:bg-[#E667A4] transition-colors'}`;
	} else if (type === "primary-pink") {
		typeClasses = `bg-[#E667A4] text-white ${isDisabled ? '' : 'hover:bg-[#000E55] transition-colors'}`;
	} else if (type === "secondary") {
		typeClasses = `bg-white text-[#000E55] border border-[#000E55] ${isDisabled ? '' : 'hover:bg-[#E667A4] hover:text-white transition-colors'}`;
	}
	return (
		<div
			onClick={isDisabled ? null : onClick}
			className={`
				flex justify-center items-center text-center w-[306px] h-[53px] rounded-[30px] duration-500 ease-in-out
				${isDisabled ? 'opacity-50' : 'cursor-pointer'} 
				${typeClasses} 
				${classes}
			`}
		>
			<div className={`text-md font-normal  ${textClasses ?? ''}`}>
				{text}
			</div>
		</div>
	)
}

export default Button