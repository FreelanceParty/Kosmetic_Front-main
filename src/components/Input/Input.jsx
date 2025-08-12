const Input = ({type, value, placeholder, inputClasses, onChange}) => {
	return (
		<input
			type={type}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
			className={`bg-[#F8F8F8] border border-[#E8E8E8] p-5 pr-0 ${inputClasses ?? ''}`}
		/>
	);
}

export default Input;