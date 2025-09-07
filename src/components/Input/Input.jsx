const Input = ({type, name, value, placeholder, inputClasses, onChange}) => {
	return (
		<input
			type={type}
			name={name}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
			className={`bg-[#F8F8F8] border border-[#E8E8E8] p-5 pr-0 w-full h-[53px] ${inputClasses ?? ''}`}
		/>
	);
}

export default Input;