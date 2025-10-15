import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ChevronRightIcon from "../../components/Icons/ChevronRightIcon";
import axios from "axios";
import ProductCard from "../../components/ProductSlider/ProductCard/ProductCard";
import Paginator from "../../components/Paginator";
import {useLocation} from "react-router-dom";
import {routeHelper} from "../../utils/helpers/routeHelper";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const Category = () => {
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
		const items = chosenSubCategory
			? initialProducts.filter(p => p.subCategory === chosenSubCategory)
			: initialProducts;

		setFilteredItems(items);
		setCurrentPageItems(items.slice(0, pageSize));
		setTotalPages(Math.ceil(items.length / pageSize));
		setPage(1);
	}, [chosenSubCategory]);

	useEffect(() => {
		const fetchProducts = async () => {
			//setLoading(true);
			try {
				const response = await axios.get(`${REACT_APP_API_URL}/goods/findByCategory/${category}`);
				//setLoading(false);
				const products = response.data;
				setInitialProducts(products);
				setFilteredItems(products);
				const subCategories = [...new Set(products.map(p => p.subCategory).filter(Boolean))].sort();
				setSubCategories(subCategories);
				setCurrentPageItems(products.slice(0, pageSize))
				setTotalPages(Math.ceil(products.length / pageSize));
			} catch (error) {
				console.log(error);
			}
		};
		fetchProducts();
	}, [category]);

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
				<div className="gap-[10px] items-center text-[#000E55] text-sm flex h-6">
					<div className="border-l border-gray-700 h-full"></div>
					<div>Сортувати ></div>
					<div className="border-l border-gray-700 h-full"></div>
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
									{currentPageItems.map((product, index) => (
										<ProductCard key={index} product={product}/>
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
