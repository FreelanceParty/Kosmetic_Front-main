import DangerIcon from "../Icons/DangerIcon";

const Input = ({type, name, value, placeholder, containerClasses, inputClasses, onChange, onBlur, errorMessage}) => {
	return (
		<div className={`relative w-full ${containerClasses ?? ''}`}>
			<input
				type={type}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				onBlur={onBlur}
				className={`bg-[#F8F8F8] border border-[#E8E8E8] p-5 pr-12 w-full h-[53px] rounded-[3px] ${inputClasses ?? ''} ${errorMessage ? 'border-red-500' : ''}`}
			/>

			{errorMessage && (
				<div className="absolute right-4 top-1/2 transform -translate-y-1/2 group">
					<DangerIcon className="w-5 h-5 text-red-500"/>

					<div className="absolute bottom-full mb-2 right-1/2 transform translate-x-1/2
						bg-red-500 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100
						transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
						{errorMessage}
					</div>
				</div>
			)}
		</div>
	);
}

export default Input;
