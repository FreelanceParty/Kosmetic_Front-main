import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import ChevronRightIcon from "../../components/Icons/ChevronRightIcon";
import axios from "axios";
import ProductCard from "../../components/ProductSlider/ProductCard/ProductCard";
import Paginator from "../../components/Paginator";
import {routeHelper} from "../../utils/helpers/routeHelper";
import Filter from "./_elements/Filter";
import BrandFilter from "./_elements/BrandFilter";
import PriceFilter from "./_elements/PriceFilter";
import {combinedSortComparator, sortOptions} from "../../utils/helpers/sort";
import {applyFiltersToProducts, defaultFilters, getConvertedFiltersForProducts} from "../../utils/helpers/filter";
import {useSelector} from "react-redux";
import {getOptUser} from "../../redux/auth/selectors";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const Category = () => {
	const isOptUser = useSelector(getOptUser);
	const {getCategoryByRoute} = routeHelper();
	const navigate = useNavigate();
	const location = useLocation();

	const category = getCategoryByRoute(location.pathname);

	const [initialProducts, setInitialProducts] = useState(null);
	const [subCategories, setSubCategories] = useState(null);

	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const pageSize = 6;
	const [currentPageItems, setCurrentPageItems] = useState(null);

	const [filteredItems, setFilteredItems] = useState(null);
	const [chosenSubCategory, setChosenSubCategory] = useState(null);

	const [selectedSortOption, setSelectedSortOption] = useState(
		localStorage.getItem('selectedSortOption') ?? 'default'
	);
	const [isSortOpen, setSortOpen] = useState(false);

	const [filters, setFilters] = useState(defaultFilters);
	const [priceFilter, setPriceFilter] = useState(null);
	const [chosenFilters, setChosenFilters] = useState([]);
	const [brands, setBrands] = useState([]);
	const [minPrice, setMinPrice] = useState(null);
	const [maxPrice, setMaxPrice] = useState(null);

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
			sorted = chosenSubCategory
				? sorted.filter(p => p.subCategory === chosenSubCategory)
				: sorted;
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
		if (!initialProducts) {
			return;
		}

		let items = chosenSubCategory
			? initialProducts.filter(p => p.subCategory === chosenSubCategory)
			: initialProducts;
		items = applyFiltersToProducts(items, chosenFilters, priceFilter);
		items.sort((a, b) => combinedSortComparator(a, b, selectedSortOption));
		setFilteredItems(items);
		setCurrentPageItems(items.slice(0, pageSize));
		setTotalPages(Math.ceil(items.length / pageSize));
		setPage(1);
	}, [chosenSubCategory, initialProducts, selectedSortOption, chosenFilters, priceFilter]);

	useEffect(() => {
		const fetchProducts = async () => {
			//setLoading(true);
			try {
				const response = await axios.get(`${REACT_APP_API_URL}/goods/findByCategory/${category}`);
				//setLoading(false);
				const products = response.data;
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
			} catch (error) {
				console.log(error);
			}
		};
		if (initialProducts === null) {
			fetchProducts();
		}
	}, [category]);

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

	const handlePriceChange = (priceRange) => {
		setPriceFilter(priceRange);
	};

	function handleFilterOptionChange(optionId, isChecked) {
		if (isChecked) {
			setChosenFilters(prev => [...prev, optionId]);
		} else {
			setChosenFilters(prev => prev.filter(item => item !== optionId));
		}
	}

	return (
		<div className="flex flex-col gap-8 md:gap-10 mx-auto w-full max-w-[1440px] pt-2 px-5">
			<div className="flex md:hidden py-[10px] font-semibold text-lg justify-center border-b border-[#F6F6F6]">
				{category}
			</div>
			<div className="flex justify-between w-full">
				<div className="gap-[10px] items-center text-[#000E55] text-sm hidden lg:flex h-6">
					<div className="cursor-pointer" onClick={() => navigate('/')}>Головна</div>
					<div className="border-l border-gray-700 h-full"></div>
					<div>{category}</div>
				</div>
				<div className="gap-[10px] items-center text-[#000E55] text-sm flex lg:hidden h-6">
					<div className="border-l border-gray-700 h-full"></div>
					<div>Фільтри</div>
					<div className="border-l border-gray-700 h-full"></div>
				</div>
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
						<BrandFilter title={"Бренди"} options={brands}/>
					}
					{(minPrice && maxPrice) &&
						<PriceFilter title={'Ціна'} onChange={handlePriceChange} from={minPrice} to={maxPrice}/>
					}
				</div>
				{category !== null && (
					<div className="flex flex-col gap-10">
						{subCategories !== null && (
							<div className="flex flex-wrap gap-4">
								{subCategories.map((category, index) => (
									<div
										key={index}
										className={`bg-[#F6F6F6] px-4 py-[10px] rounded-[30px] cursor-pointer hover:bg-[#FFE8F5] leading-[10px] ${chosenSubCategory === category && 'bg-[#FFE8F5]'}`}
										onClick={() =>
											setChosenSubCategory(prev => prev === category ? null : category)
										}
									>
										{category}
									</div>
								))}
							</div>
						)}
						{currentPageItems && (
							<div className="flex flex-col gap-5 items-center mb-5">
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
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Category;
