import React from "react";
import PhoneInput from "react-phone-input-2";
import DangerIcon from "../Icons/DangerIcon";
import phoneCountriesUk from "../../i18n/phoneCountries.uk";
import "./PhoneInputField.css";

const PhoneInputField = ({
	name,
	value,
	onChange,
	onBlur,
	placeholder,
	containerClasses,
	inputClasses,
	errorMessage,
	defaultCountry,
}) => {
	const baseInputClasses = "!bg-[#F8F8F8] !border !border-[#E8E8E8] !p-5 !pr-12 !pl-[76px] !w-full !h-[53px] !rounded-[3px]";
	const baseButtonClasses = "!bg-[#F8F8F8] !border !border-[#E8E8E8] !h-[53px] !w-[60px] !rounded-l-[3px]";
	const errorClasses = errorMessage ? "!border-red-500" : "";

	return (
		<div className={`phone-input-field relative w-full ${containerClasses ?? ""}`}>
			<PhoneInput
				country={defaultCountry ?? "ua"}
				autoFormat={false}
				value={(value ?? "").replace(/^\+/, "")}
				onChange={(val) => {
					const next = val ? `+${val}` : "";
					onChange?.({
						target: {
							name,
							value: next,
						},
					});
				}}
				onBlur={onBlur}
				inputProps={{name, placeholder}}
				inputClass={`${baseInputClasses} ${errorClasses} ${inputClasses ?? ""}`}
				buttonClass={`${baseButtonClasses} ${errorClasses}`}
				containerClass="w-full"
				preferredCountries={["ua"]}
				localization={phoneCountriesUk}
				enableSearch
				specialLabel=""
			/>

			{errorMessage && (
				<div className="absolute right-4 top-1/2 transform -translate-y-1/2 group">
					<DangerIcon className="w-5 h-5 text-red-500"/>
					<div className="absolute bottom-full mb-2 right-1/2 transform translate-x-1/2 bg-red-500 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
						{errorMessage}
					</div>
				</div>
			)}
		</div>
	);
};

export default PhoneInputField;
