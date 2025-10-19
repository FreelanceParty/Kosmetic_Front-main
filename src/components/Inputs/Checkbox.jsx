import {useState} from "react";
import CheckMarkIcon from "../Icons/CheckMarkIcon";

const Checkbox = ({label, labelClasses, defaultChecked = false, onChange}) => {
	const [isChecked, setIsChecked] = useState(defaultChecked);

	const handleChange = (e) => {
		const newValue = e.target.checked;
		setIsChecked(newValue);
		onChange?.(newValue);
	};

	return (
		<label className="flex items-center gap-2 cursor-pointer select-none">
			<input
				type="checkbox"
				className="sr-only peer"
				checked={isChecked}
				onChange={handleChange}
			/>

			<span className="grid place-items-center w-5 h-5 rounded-md border border-blue-900 text-transparent peer-checked:text-pink-400">
		        <CheckMarkIcon/>
			</span>

			<span className={labelClasses ?? ''}>{label}</span>
		</label>
	);
};

export default Checkbox;
