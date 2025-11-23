import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ChevronRightIcon from "../../components/Icons/ChevronRightIcon";
import axios from "axios";
import ProductCard from "../../components/ProductSlider/ProductCard/ProductCard";
import Paginator from "../../components/Paginator";
import BrandDescription from "./BrandDescription";
import {sortOptions, combinedSortComparator} from "../../utils/helpers/sort";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const BrandPage = () => {
	const navigate = useNavigate();

	const {brands} = useParams();
	const [brand, setBrand] = useState(null);
	const [initialProducts, setInitialProducts] = useState(null);
	const [categories, setCategories] = useState(null);

	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const pageSize = 6;
	const [currentPageItems, setCurrentPageItems] = useState(null);

	const [selectedSortOption, setSelectedSortOption] = useState(
		localStorage.getItem('selectedSortOption') ?? 'default'
	);
	const [isSortOpen, setSortOpen] = useState(false);

	const [filteredItems, setFilteredItems] = useState(null);
	const [chosenCategory, setChosenCategory] = useState(null);

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
		const items = chosenCategory
			? initialProducts.filter(p => p.category === chosenCategory)
			: initialProducts;

		setFilteredItems(items);
		setCurrentPageItems(items.slice(0, pageSize));
		setTotalPages(Math.ceil(items.length / pageSize));
		setPage(1);
	}, [chosenCategory]);

	useEffect(() => {
		const fetchBrand = async () => {
			//setLoading(true);
			try {
				const response = await axios.get(`${REACT_APP_API_URL}/brands/${brands}`);
				//setLoading(false);
				setBrand(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		const fetchProducts = async () => {
			try {
				// setLoading(true);
				const response = await axios.get(`${REACT_APP_API_URL}/goods/findByBrandName/${brands}`);
				const products = response.data;

				setInitialProducts(products);
				setFilteredItems(products);
				const categories = [...new Set(products.map(p => p.category))].sort();
				setCategories(categories);
				setCurrentPageItems(products.slice(0, pageSize))
				setTotalPages(Math.ceil(products.length / pageSize));
				applySorting([...products]);
				// setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchBrand();
		fetchProducts();
	}, [brands]);

	useEffect(() => {
		if (!initialProducts) {
			return;
		}
		applySorting([...initialProducts]);
	}, [initialProducts, selectedSortOption]);

	function applySorting(items) {
		let sorted = [...items];
		sorted.sort((a, b) => combinedSortComparator(a, b, selectedSortOption));

		setFilteredItems(sorted);
		setTotalPages(Math.ceil(sorted.length / pageSize));
		setPage(1);
		setCurrentPageItems(sorted.slice(0, pageSize));
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

	return (
		<div className="flex flex-col gap-10 mx-auto w-full max-w-[1440px] pt-2 px-5">
			<div className="flex md:hidden py-[10px] font-semibold text-lg justify-center border-b border-[#F6F6F6]">
				{brands}
			</div>
			<div className="flex justify-between w-full">
				<div className="gap-[10px] items-center text-[#000E55] text-sm hidden lg:flex h-6">
					<div className="cursor-pointer" onClick={() => navigate('/')}>Головна</div>
					<div className="border-l border-gray-700 h-full"></div>
					<div className="cursor-pointer" onClick={() => navigate('/brands')}>Бренди</div>
					<div className="border-l border-gray-700 h-full"></div>
					<div>{brands}</div>
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
					{[...Array(10)].map((_, index) => (
						<div key={index} className="flex justify-between items-center h-11 border-b px-[10px]">
							<div className="font-medium">ФІЛЬТР {index}</div>
							<ChevronRightIcon className="w-3 h-3"/>
						</div>
					))}
				</div>
				{brand !== null && (
					<div className="flex flex-col gap-10">
						<div className="flex gap-12 pr-0 md:pr-[55px]">
							<div className="hidden md:block max-w-[150px]">
								<img src={brand.logo} alt=""/>
							</div>
							<BrandDescription title={brand.name} text={brand.description}/>
						</div>
						{categories !== null && (
							<div className="flex flex-wrap gap-4">
								{categories.map((category, index) => (
									<div
										key={index}
										className={`bg-[#F6F6F6] px-4 py-[10px] rounded-[30px] cursor-pointer hover:bg-[#FFE8F5] leading-[10px] ${chosenCategory === category && 'bg-[#FFE8F5]'}`}
										onClick={() =>
											setChosenCategory(prev => prev === category ? null : category)
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

export default BrandPage;
