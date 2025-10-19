import ChevronRightIcon from "../../Icons/ChevronRightIcon";
import Checkbox from "../../Inputs/Checkbox";
import {useState, useRef} from "react";

const Filter = ({title, options}) => {
	const [isOpen, setIsOpen] = useState(false);
	const contentRef = useRef(null);

	return (
		<div className="flex flex-col gap-1">
			<div
				className="flex justify-between items-center h-11 border-b px-[10px] cursor-pointer select-none"
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className="uppercase font-medium">{title}</div>
				<ChevronRightIcon
					classes={`w-3 h-3 transform transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
				/>
			</div>

			<div
				ref={contentRef}
				className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
				style={{
					maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
				}}
			>
				<div className="flex flex-col gap-3 py-[7px] max-h-[400px] overflow-y-auto">
					{options.map((option, index) => (
						<Checkbox key={index} label={option.title} labelClasses={option.style}/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Filter;
