import ChevronRightIcon from "../../Icons/ChevronRightIcon";
import Checkbox from "../../Inputs/Checkbox";
import React, {useEffect, useState} from "react";

const BrandFilter = ({title, options}) => {
	const [selectedLetter, setSelectedLetter] = useState(null);
	const [initLetters, setInitLetters] = useState([]);
	const [filteredOptions, setFilteredOptions] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const grouped = options.reduce((acc, item) => {
			const firstLetter = item.title[0].toUpperCase();
			if (!acc[firstLetter]) {
				acc[firstLetter] = [];
			}
			acc[firstLetter].push(item);
			return acc;
		}, {});

		const allLetters = Object.keys(grouped).sort();
		setInitLetters(allLetters);
		const filtered = selectedLetter ? grouped[selectedLetter] : options;
		setFilteredOptions(filtered);
	}, [options, selectedLetter]);

	const handleLetterClick = (letter) => {
		if (selectedLetter === letter) {
			setSelectedLetter(null);
		} else {
			setSelectedLetter(letter);
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between items-center h-11 border-b px-[10px] cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
				<div className="uppercase font-medium">{title}</div>
				<ChevronRightIcon
					classes={`w-3 h-3 transform transition-transform duration-300 ${
						isOpen ? "rotate-90" : ""
					}`}
				/>
			</div>
			<div className={`flex flex-col gap-4 ${!isOpen && 'hidden'}`}>
				<div className="flex gap-3 flex-wrap px-[10px]">
					{initLetters.map(letter => (
						<div
							key={letter}
							className={`font-medium text-md leading-[14px] cursor-pointer ${
								selectedLetter === letter ? "text-[#DA469A]" : "text-[#B2B2B2]"
							}`}
							onClick={() => handleLetterClick(letter)}
						>
							{letter}
						</div>
					))}
				</div>
				<div className={`flex flex-col gap-3 max-h-[290px] overflow-y-auto`}>
					{filteredOptions.map((option, index) => (
						<Checkbox key={index} label={option.title} labelClasses={option.style}/>
					))}
				</div>

			</div>
		</div>
	)
}
export default BrandFilter;