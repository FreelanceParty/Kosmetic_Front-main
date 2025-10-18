import {useEffect, useRef, useState} from "react";
import ChevronIcon from "../Icons/ChevronIcon";

const Select = ({
	title,
	options = [],
	onSelect,
	isWithSearch = false,
	onSearchChange,
	isDisabled = false,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState(null);
	const [search, setSearch] = useState("");

	const selectRef = useRef(null);

	const handleSelect = (option) => {
		setSelected(option);
		setIsOpen(false);
		setSearch("");
		onSelect?.(option);
	};

	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearch(value);
		onSearchChange?.(value);
	};

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (selectRef.current && !selectRef.current.contains(e.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div ref={selectRef} className={`relative w-full ${isDisabled ? "opacity-70" : ""}`}>
			<div
				className="w-full flex justify-between items-center border bg-[#F6F6F6] px-5 h-[43px] cursor-pointer"
				onClick={() => isDisabled ? null : setIsOpen(!isOpen)}
			>
				<div className="truncate">{selected ? selected.label : title}</div>
				{!isDisabled &&
					<ChevronIcon classes={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}/>
				}
			</div>

			{isOpen && (
				<div className="absolute top-[43px] w-full bg-white border z-10 max-h-60 overflow-y-auto shadow-md">
					{isWithSearch && (
						<input
							type="text"
							value={search}
							onChange={handleSearchChange}
							placeholder="Пошук..."
							className="w-full px-3 py-2 border-b outline-none text-sm"
							autoFocus
						/>
					)}

					{options.length > 0 ? (
						options.map((option) => (
							<div
								key={option.id}
								onClick={() => handleSelect(option)}
								className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
							>
								{option.label}
							</div>
						))
					) : (
						<div className="py-2 px-4 text-gray-400 text-sm">
							Нічого не знайдено
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Select;
