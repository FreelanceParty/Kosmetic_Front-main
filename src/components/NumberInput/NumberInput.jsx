import {useEffect, useMemo, useState} from "react";

const NumberInput = ({limit = 9999, number, setNumber, withNegative = false, min = 1}) => {
	const [displayValue, setDisplayValue] = useState(number ?? "");

	useEffect(() => {
		if (displayValue === "") {
			return;
		}
		setDisplayValue(number ?? "");
	}, [number]);

	const validationRegex = useMemo(() => (withNegative ? /^-?\d*$/ : /^\d*$/), [withNegative]);

	const clamp = (value) => {
		const numeric = Number.parseInt(value, 10);
		if (Number.isNaN(numeric)) {
			return "";
		}
		return Math.min(Math.max(numeric, min), limit);
	};

	const commit = (raw) => {
		if (raw === "") {
			setDisplayValue(min);
			setNumber(min);
			return;
		}

		const next = clamp(raw);
		if (next === "") {
			setDisplayValue(min);
			setNumber(min);
			return;
		}
		setDisplayValue(next);
		setNumber(next);
	};

	const currentNumeric = useMemo(() => {
		if (displayValue === "") {
			return Number.isInteger(number) ? number : min;
		}
		const parsed = Number.parseInt(displayValue, 10);
		return Number.isNaN(parsed) ? min : parsed;
	}, [displayValue, number, min]);

	return (
		<div className="flex w-[130px] border items-center justify-between rounded-md text-center h-[45px]">
			<div className="cursor-pointer w-1/3" onClick={() => commit(String(Math.max(currentNumeric - 1, min)))}>-</div>
			<input
				onChange={(e) => {
					const value = e.target.value;
					if (!validationRegex.test(value)) {
						return;
					}
					setDisplayValue(value);
					if (value === "" || value === "-" || value === "0") {
						return;
					}
					const parsed = Number.parseInt(value, 10);
					if (Number.isNaN(parsed)) {
						return;
					}
					setNumber(Math.min(Math.max(parsed, min), limit));
				}}
				onBlur={() => commit(String(displayValue))}
				className="h-full w-[50px] outline-none bg-transparent text-center"
				value={displayValue}
				maxLength={4}
			/>
			<div className="cursor-pointer w-1/3" onClick={() => commit(String(Math.min(currentNumeric + 1, limit)))}>+</div>
		</div>
	);
}

export default NumberInput