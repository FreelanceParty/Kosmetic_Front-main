const EditableField = ({title, value, isEdit}) => {
	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="font-semibold text-xs leading-2 text-[#B2B2B2]">{title}</div>
			{isEdit
				?
				<div>editable {value}</div>
				:
				<div className="font-medium text-sm">{value}</div>
			}
		</div>
	)
}
export default EditableField;