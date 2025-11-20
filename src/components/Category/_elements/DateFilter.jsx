import ChevronRightIcon from "../../Icons/ChevronRightIcon";
import React, {useState, useRef} from "react";
import "rc-slider/assets/index.css";
import RightArrowAltIcon from "../../Icons/RightArrowAltIcon";

const DateFilter = ({dateFromFilter, setDateFromFilter, dateToFilter, setDateToFilter}) => {
	const [isOpen, setIsOpen] = useState(false);
	const contentRef = useRef(null);

	return (
		<div className="flex flex-col">
			<div
				className="flex justify-between items-center h-11 border-b px-[10px] cursor-pointer select-none"
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className="uppercase font-medium">ДАТА</div>
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
					<div className="flex gap-3 items-center">
						<input
							id="date-from-input"
							type="date"
							onChange={(e) => setDateFromFilter(e.target.value)}
							value={dateFromFilter}
							className="p-2 border border-gray-300 rounded h-9 w-[118px]"
						/>
						<RightArrowAltIcon/>
						<input
							id="date-to-input"
							type="date"
							onChange={(e) => setDateToFilter(e.target.value)}
							value={dateToFilter}
							className="p-2 border border-gray-300 rounded h-9 w-[118px]"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DateFilter;
