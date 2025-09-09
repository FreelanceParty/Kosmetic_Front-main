const Input = ({type, name, value, placeholder, inputClasses, onChange, onBlur}) => {
	return (
		<input
			type={type}
			name={name}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
			onBlur={onBlur}
			className={`bg-[#F8F8F8] border border-[#E8E8E8] p-5 pr-0 w-full h-[53px] rounded-[3px] ${inputClasses ?? ''}`}
		/>
	);
}

export default Input;