import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {fetchBrands} from "../../redux/brands/operation";
import {selectedBrand} from "../../redux/brands/selectors";
import SearchInput from "../../components/SearchForm/SearchInput";

const AllBrandsPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [searchQuery, setSearchQuery] = useState("");
	const [foundBrands, setFoundBrands] = useState([]);
	const [selectedLetter, setSelectedLetter] = useState(null);
	const [initLetters, setInitLetters] = useState([]);
	const [letters, setLetters] = useState([]);
	const [groupedBrands, setGroupedBrands] = useState({});

	const brands = useSelector(selectedBrand);

	useEffect(() => {
		dispatch(fetchBrands());
	}, [dispatch]);

	useEffect(() => {
		if (!brands.items) {
			return;
		}

		const grouped = brands.items.reduce((acc, item) => {
			const firstLetter = item.name[0].toUpperCase();
			if (!acc[firstLetter]) {
				acc[firstLetter] = [];
			}
			acc[firstLetter].push(item);
			return acc;
		}, {});

		setGroupedBrands(grouped);

		const allLetters = Object.keys(grouped).sort();
		setInitLetters(allLetters);
		setLetters(prevLetters => {
			if (selectedLetter) {
				return allLetters.filter(l => l.startsWith(selectedLetter));
			}
			return allLetters;
		});
	}, [brands.items, selectedLetter]);

	// Debounce пошуку
	useEffect(() => {
		const delayDebounce = setTimeout(() => {
			if (searchQuery.trim() !== "") {
				const brandsX = brands.items.filter(brand =>
					brand.name.toLowerCase().includes(searchQuery.toLowerCase())
				);
				setFoundBrands(brandsX);
			} else {
				setFoundBrands([]);
			}
		}, 200);

		return () => clearTimeout(delayDebounce);
	}, [searchQuery, brands.items]);

	const handleCloseCrossClick = () => setSearchQuery("");

	const handleItemClick = brand => navigate("/brands/" + brand.name);

	const handleLetterClick = (letter) => {
		if (selectedLetter === letter) {
			setSelectedLetter(null);
		} else {
			setSelectedLetter(letter);
		}
	};

	return (
		<div className="flex flex-col pt-[34px] pb-[84px] px-4 md:px-[100px]">
			<div className="relative flex-col gap-8 w-full bg-white">
				<div className="flex md:hidden py-[10px] font-semibold text-lg justify-center border-b border-[#F6F6F6]">
					БРЕНДИ
				</div>
				<div className="hidden md:flex gap-[10px]">
					<div className="py-[7px] cursor-pointer">Головна</div>
					<div className="border-r border-[#000E55] h-full"></div>
					<div className="py-[7px]">Бренди</div>
				</div>

				<div className="flex md:hidden gap-4 pt-[30px] flex-wrap">
					{initLetters.map(letter => (
						<div
							key={letter}
							className={`font-medium text-xl leading-[14px] cursor-pointer ${
								selectedLetter === letter ? "text-[#DA469A]" : "text-[#B2B2B2]"
							}`}
							onClick={() => handleLetterClick(letter)}
						>
							{letter}
						</div>
					))}
				</div>

				<SearchInput
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					onCloseCrossClick={handleCloseCrossClick}
					placeholder="Пошук брендів"
					containerClasses="mb-[30px] md:mb-10"
				/>

				{foundBrands.length > 0 && (
					<div className="absolute left-0 top-32 w-full">
						<div className="px-[100px] flex flex-col max-h-[200px] overflow-y-auto bg-white border-b border-[#E8E8E8]">
							{foundBrands.map(brand => (
								<div
									onClick={() => handleItemClick(brand)}
									key={brand.name}
									className="flex items-center gap-3 h-[36px] py-[10px] cursor-pointer"
								>
									<div className="font-medium leading-[10px]">{brand.name}</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-[clamp(20px,2vw,100px)] max-w-[1100px] mx-0 md:mx-auto">
				{letters.map(letter => (
					<div className="flex gap-[34px] pb-6 border-b border-[#E8E8E8] w-full" key={letter}>
						<div className="text-[#DA469A] text-[40px] leading-[28px] font-semibold w-[30px]">{letter}</div>
						<div className="flex flex-col gap-4">
							{groupedBrands[letter]?.map(brand => (
								<div
									key={brand.name}
									className="font-medium text-md leading-[11px] cursor-pointer uppercase"
									onClick={() => handleItemClick(brand)}
								>
									{brand.name}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AllBrandsPage;
