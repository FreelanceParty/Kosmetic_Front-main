const TextArea = ({placeholder, value, inputClasses, onChange}) => {
	return (
		<textarea
			value={value}
			placeholder={placeholder}
			className={`bg-[#F8F8F8] border border-[#E8E8E8] p-5 pr-0 ${inputClasses ?? ''}`}
			onChange={onChange}
		/>
	);
}

export default TextArea;