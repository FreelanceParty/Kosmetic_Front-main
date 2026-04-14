import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import ChevronRightIcon from "../../components/Icons/ChevronRightIcon";
import axios from "axios";
import ProductCard from "../../components/ProductSlider/ProductCard/ProductCard";
import Paginator from "../../components/Paginator";
import Filter from "../../components/Category/_elements/Filter";
import BrandFilter from "../../components/Category/_elements/BrandFilter";
import PriceFilter from "../../components/Category/_elements/PriceFilter";
import {combinedSortComparator, sortOptions} from "../../utils/helpers/sort";
import {applyFiltersToProducts, defaultFilters, getConvertedFiltersForProducts} from "../../utils/helpers/filter";
import {useSelector} from "react-redux";
import {getOptUser} from "../../redux/auth/selectors";
import FilterIcon from "../../components/Icons/FilterIcon";
import CloseCrossIcon from "../../components/Icons/CloseCrossIcon";
import Button from "../../components/ButtonNew/Button";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const SearchPage = () => {
	const [searchParams] = useSearchParams();
	const searchText = searchParams.get('query');
	const searchMarker = searchParams.get('marker');

	const isOptUser = useSelector(getOptUser);
	const navigate = useNavigate();

	const [initialProducts, setInitialProducts] = useState(null);

	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const pageSize = 30;
	const [currentPageItems, setCurrentPageItems] = useState(null);

	const [filteredItems, setFilteredItems] = useState(null);

	const [selectedSortOption, setSelectedSortOption] = useState(
		localStorage.getItem('selectedSortOption') ?? 'default'
	);
	const [isSortOpen, setSortOpen] = useState(false);

	const [filters, setFilters] = useState(defaultFilters);
	const [chosenFilters, setChosenFilters] = useState([]);
	const [chosenBrands, setChosenBrands] = useState([]);
	const [brands, setBrands] = useState([]);
	const [priceFilter, setPriceFilter] = useState(null);
	const [minPrice, setMinPrice] = useState(null);
	const [maxPrice, setMaxPrice] = useState(null);
	const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

	function handleBrandOptionChange(brandTitle, isChecked) {
		if (isChecked) {
			setChosenBrands(prev => [...prev, brandTitle]);
		} else {
			setChosenBrands(prev => prev.filter(b => b !== brandTitle));
		}
	}

	function handleSortOptionChange(optionId) {
		setSelectedSortOption(optionId);
		localStorage.setItem('selectedSortOption', optionId);
		setSortOpen(false);

		if (!filteredItems) {
			return;
		}

		let sorted = [...filteredItems];

		if (optionId === 'default') {
			sorted = [...initialProducts];
		}

		sorted.sort((a, b) => combinedSortComparator(a, b, optionId));

		setFilteredItems(sorted);
		setCurrentPageItems(sorted.slice(0, pageSize));
		setPage(1);
	}

	function goToPage(pageNumber) {
		const start = (pageNumber - 1) * pageSize;
		const end = start + pageSize;
		setCurrentPageItems(filteredItems.slice(start, end));
		setPage(pageNumber);
	}

	useEffect(() => {
		if (searchMarker === 'new' || searchMarker === 'sale') {
			setChosenFilters([searchMarker]);
		}
	}, [searchParams])

	useEffect(() => {
		if (isMobileFiltersOpen) {
			document.body.style.overflow = "hidden";
			return;
		}
		document.body.style.overflow = "";
	}, [isMobileFiltersOpen]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				//setLoading(true);
				let response, products;
				if (searchText === '') {
					response = await axios.get(`${REACT_APP_API_URL}/goods`);
					products = response.data.goods;
				} else {
					response = await axios.get(`${REACT_APP_API_URL}/goods/findByName/${searchText}`);
					products = response.data;
				}

				setInitialProducts(products);
				setFilteredItems(products);

				const brands = [...new Set(products.map(p => p.brand).filter(Boolean))].sort();
				const brandObjects = getOptionsFromTitles(brands);
				setBrands(brandObjects);
				setCurrentPageItems(products.slice(0, pageSize))
				setTotalPages(Math.ceil(products.length / pageSize));
				const allFilters = await getConvertedFiltersForProducts(products);
				const merged = [...defaultFilters, ...allFilters];
				merged.sort((a, b) => a.order - b.order);
				setFilters(merged);

				const prices = products.map(p => isOptUser ? p.priceOPT : p.price);
				const min = Math.min(...prices);
				const max = Math.max(...prices);
				setMinPrice(min);
				setMaxPrice(max);
				//setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};

		if (initialProducts === null) {
			fetchProducts();
		}
	}, [searchText]);

	useEffect(() => {
		if (!initialProducts) {
			return;
		}
		let items = initialProducts;
		items = applyFiltersToProducts(items, chosenFilters, priceFilter, chosenBrands);
		items.sort((a, b) => combinedSortComparator(a, b, selectedSortOption));
		setFilteredItems(items);
		setCurrentPageItems(items.slice(0, pageSize));
		setTotalPages(Math.ceil(items.length / pageSize));
		setPage(1);
	}, [initialProducts, selectedSortOption, chosenFilters, priceFilter, chosenBrands]);

	function getOptionsFromTitles(titles) {
		return titles.map(title => ({
			title: title,
			id:    title
				       .toLowerCase()
				       .trim()
				       .replace(/\s+/g, '_')
				       .replace(/[^\w_]/g, '')
		}));
	}

	function handleFilterOptionChange(optionId, isChecked) {
		if (isChecked) {
			setChosenFilters(prev => [...prev, optionId]);
		} else {
			setChosenFilters(prev => prev.filter(item => item !== optionId));
		}
	}

	const handlePriceChange = (priceRange) => {
		setPriceFilter(priceRange);
	};

	return (
		<div className="flex flex-col gap-8 md:gap-10 mx-auto w-full max-w-[1440px] pt-2 px-5">
			<div className="flex justify-between w-full">
				<div className="gap-[10px] items-center text-[#000E55] text-sm hidden lg:flex h-6">
					<div className="cursor-pointer" onClick={() => navigate('/')}>Головна</div>
					<div className="border-l border-gray-700 h-full"></div>
					<div>Пошук: "{searchText}"</div>
				</div>
				<button
					type="button"
					className="gap-[10px] items-center text-[#000E55] text-sm flex lg:hidden h-6"
					onClick={() => setIsMobileFiltersOpen(true)}
				>
					<div className="border-l border-gray-700 h-full"></div>
					<div className="flex items-center gap-2">
						<FilterIcon classes="h-4 w-4"/>
						<div>Фільтри</div>
					</div>
					<div className="border-l border-gray-700 h-full"></div>
				</button>
				<div onClick={() => {
					setSortOpen(prev => !prev)
				}} className="relative gap-[10px] items-center text-[#000E55] text-sm flex h-6 cursor-pointer">
					<div className="border-l border-gray-700 h-full"></div>
					<div>Сортувати</div>
					<ChevronRightIcon classes="w-3 h-3"/>
					<div className="border-l border-gray-700 h-full"></div>
					{isSortOpen &&
						<div className="absolute top-full right-0 w-fit z-20 flex flex-col py-4 bg-white shadow-2xl cursor-default">
							{sortOptions.map(option => (
								<div
									key={option.id}
									className={`py-2 px-4 truncate cursor-pointer ${
										selectedSortOption === option.id
											? 'bg-[#FFE8F5]'
											: 'hover:bg-gray-100'
									}`}
									onClick={() => handleSortOptionChange(option.id)}
								>
									{option.label}
								</div>
							))}
						</div>
					}
				</div>
			</div>
			<div className="flex gap-6">
				<div className="hidden md:flex flex-col min-w-[335px] max-w-[335px]">
					{filters.map((filter, index) => (
						<Filter key={index} title={filter.title} options={filter.options} onOptionChange={handleFilterOptionChange}/>
					))}
					{brands.length > 0 &&
						<BrandFilter title={"Бренди"} options={brands} onOptionChange={handleBrandOptionChange}/>
					}
					{(minPrice && maxPrice) &&
						<PriceFilter title={'Ціна'} onChange={handlePriceChange} from={minPrice} to={maxPrice}/>
					}
				</div>
				{isMobileFiltersOpen && (
					<div className="fixed inset-0 z-50 bg-white">
						<div className="flex flex-col h-full">
							<div className="flex justify-between items-center px-5 py-5 border-b border-[#F6F6F6]">
								<div className="font-semibold text-sm leading-[10px]">ФІЛЬТРИ</div>
								<CloseCrossIcon
									classes="h-[13px] w-[13px] cursor-pointer"
									onClick={() => setIsMobileFiltersOpen(false)}
								/>
							</div>
							<div className="flex-1 overflow-y-auto px-5 pt-4 pb-6">
								<div className="flex flex-col">
									{filters.map((filter, index) => (
										<Filter
											key={index}
											title={filter.title}
											options={filter.options}
											onOptionChange={handleFilterOptionChange}
										/>
									))}
									{brands.length > 0 && (
										<BrandFilter
											title={"Бренди"}
											options={brands}
											onOptionChange={handleBrandOptionChange}
										/>
									)}
									{(minPrice && maxPrice) && (
										<PriceFilter
											title={'Ціна'}
											onChange={handlePriceChange}
											from={minPrice}
											to={maxPrice}
										/>
									)}
								</div>
							</div>
							<div className="px-5 py-4 border-t border-[#F6F6F6] mb-10">
								<Button
									type="primary"
									text="ЗАСТОСУВАТИ"
									classes="w-full h-[43px] rounded-md bg-[#DA469A] text-white font-semibold"
									onClick={() => setIsMobileFiltersOpen(false)}
								/>
							</div>
						</div>
					</div>
				)}
				{searchText !== null && (
					<div className="flex flex-col items-center gap-10 w-full">
						{currentPageItems?.length > 0 ? (
							<div className="flex flex-col gap-5 items-center mb-5 w-full">
								<div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
									{currentPageItems.map((product) => (
										<ProductCard key={product.id} product={product}/>
									))}
								</div>
								{totalPages > 1 &&
									<Paginator
										totalPages={totalPages}
										currentPage={page}
										onChange={(newPage) => goToPage(newPage)}
									/>}
							</div>
						) : (
							<div className="flex flex-col gap-5 items-center">
								<div>Нічого не знайдено</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchPage;
