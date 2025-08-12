const TextArea = ({placeholder, inputClasses}) => {
	return (
		<textarea
			placeholder={placeholder}
			className={`bg-[#F8F8F8] border border-[#E8E8E8] p-5 pr-0 ${inputClasses ?? ''}`}
		/>
	);
}

export default TextArea;