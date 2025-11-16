import React, {useState} from "react";
import ChevronIcon from "../../../../components/Icons/ChevronIcon";
import StatusOptions from "../../../../pages/AdminPage/tabs/Orders/_elements/StatusOptions";

const FieldInput = ({type, name, value, setValue, options}) => {
	const [isOptionsOpen, setOptionsOpen] = useState(false);

	if (type === "select") {
		return (
			<div className="relative flex justify-between items-center h-[30px] w-full px-[10px] border rounded-[4px] cursor-pointer"
				onClick={() => setOptionsOpen(!isOptionsOpen)}
			>
				<div className={`font-medium text-[13px] leading-[16px] ${!value && 'opacity-50'}`}>
					{value}
				</div>
				<ChevronIcon/>
				{isOptionsOpen && (
					name === "status"
						?
						<StatusOptions setStatus={setValue} selected={value} classes="top-[110%] border shadow-sm w-[101%] -left-[1px] rounded-[4px]"/>
						:
						<div className={`absolute bg-white py-4 text-sm leading-[10px] z-10 top-[110%] border shadow-sm w-[101%] -left-[1px] rounded-[4px]`}>
							{options.map((option, index) => (
								<div key={index}
									className={`px-4 py-2 cursor-pointer ${value && value === option ? "bg-[#FFE8F5]" : ""}`}
									onClick={setValue ? () => setValue(option === value ? null : option) : null}
								>
									{option}
								</div>
							))}
						</div>
				)
				}
			</div>
		)
	} else if (type === "textarea") {
		return (
			<textarea
				name={name}
				value={value}
				onChange={setValue}
				onBlur={setValue}
				className="h-[93px] w-full bg-white rounded-[4px] font-medium text-sm leading-[14px] border p-2 resize-none"
			/>
		)
	}

	return (
		<input
			type={type ?? 'text'}
			name={name}
			value={value}
			onChange={setValue}
			onBlur={setValue}
			className="h-[30px] w-full bg-white rounded-[4px] font-medium text-sm leading-[10px] border pl-2"
		/>
	)
}
export default FieldInput;