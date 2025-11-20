import FieldInput from "./FieldInput";

const EditableField = ({type, name, title, value, setValue, isEdit, containerClasses, options}) => {
	return (
		<div className={`flex flex-col gap-2 w-full ${containerClasses ?? ''}`}>
			<div className="font-semibold text-xs leading-2 text-[#B2B2B2]">{title}</div>
			{isEdit
				?
				<FieldInput
					type={type}
					name={name}
					value={value}
					setValue={setValue}
					options={options}
				/>
				:
				<div className={`flex items-center font-medium text-sm truncate text-wrap ${value ? 'min-h-[30px]' : '' }`}>{value}</div>
			}
		</div>
	)
}
export default EditableField;