import ChevronRightIcon from "../../Icons/ChevronRightIcon";
import React, {useState, useRef} from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PriceFilter = ({title, from = 0, to = 5000, step = null, onChange}) => {
	const [range, setRange] = useState([from, to]);
	const [isOpen, setIsOpen] = useState(false);
	const contentRef = useRef(null);

	step = step || Math.max(1, Math.ceil((to - from) / 20));

	const handleChange = (newRange) => {
		setRange(newRange);
		if (onChange) {
			onChange(newRange);
		}
	};

	return (
		<div className="flex flex-col">
			<div
				className="flex justify-between items-center h-11 border-b px-[10px] cursor-pointer select-none"
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className="uppercase font-medium">{title}</div>
				<ChevronRightIcon
					classes={`w-3 h-3 transform transition-transform duration-300 ${
						isOpen ? "rotate-90" : ""
					}`}
				/>
			</div>

			<div
				ref={contentRef}
				className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
				style={{
					maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
				}}
			>
				<div className="flex flex-col w-full p-4 gap-2">
					<Slider
						range
						min={from}
						max={to}
						step={step}
						value={range}
						onChange={handleChange}
						trackStyle={[{backgroundColor: "#000E55"}]}
						handleStyle={[
							{borderColor: "#000E55", backgroundColor: "#000E55"},
							{borderColor: "#000E55", backgroundColor: "#000E55"},
						]}
						railStyle={{backgroundColor: "#D1D5DB"}}
					/>
					<div className="flex justify-between text-sm">
						<span>{range[0].toLocaleString()} грн</span>
						<span>{range[1].toLocaleString()} грн</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PriceFilter;
