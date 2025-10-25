import React, {useEffect, useState} from "react";
import axios from "axios";
import SearchInput from "./SearchInput";
import {CATEGORIES} from "../../utils/enums/categories";
import CategoryIcon from "../Icons/CategoryIcon";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getOptUser} from "../../redux/auth/selectors";

const API_URL = process.env.REACT_APP_API_URL;

const SearchForm = ({isSearchOpen, setIsSearchOpen}) => {
	const navigate = useNavigate();
	const isOptUser = useSelector(getOptUser);

	const [searchQuery, setSearchQuery] = useState("");
	const [foundCategories, setFoundCategories] = useState([]);
	const [foundProducts, setFoundProducts] = useState([]);

	useEffect(() => {
		const delayDebounce = setTimeout(async () => {
			if (searchQuery.trim() !== "") {
				try {
					setCategories();
					const result = await axios.get(`${API_URL}/goods/findByName/${searchQuery}`);
					setFoundProducts(result.data || []);
				} catch (error) {
					console.error("Помилка пошуку:", error);
				}
			} else {
				setFoundCategories([]);
				setFoundProducts([]);
			}
		}, 200);

		function setCategories() {
			const categories = Object.values(CATEGORIES)
				.filter(category => category.name.toLowerCase().includes(searchQuery.toLowerCase())
				);
			setFoundCategories(categories);
		}

		return () => clearTimeout(delayDebounce);
	}, [searchQuery]);

	function handleCloseCrossClick() {
		if (searchQuery.trim() === "") {
			setIsSearchOpen(false);
		} else {
			setSearchQuery("");
		}
	}

	function handleItemClick(link) {
		navigate(link);
		setIsSearchOpen(false);
	}

	return (isSearchOpen &&
		<div className="fixed w-full bg-white px-5">
			<div className="flex flex-col w-full max-w-[962px] mx-auto">
				<SearchInput
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					onCloseCrossClick={() => handleCloseCrossClick()}
				/>
				<div className="flex flex-col mt-2">
					{foundCategories.map((category, index) => (
						<div onClick={() => handleItemClick(category.route)} key={index} className="flex items-center gap-3 h-[36px] py-[10px] cursor-pointer">
							<CategoryIcon/>
							<div className="font-medium leading-[10px]">
								{category.name}
							</div>
						</div>
					))}
					<div className="flex flex-col overflow-y-auto max-h-full md:max-h-[306px]">
						{foundProducts.slice(0, 5).map((product, index) => (
							<div onClick={() => handleItemClick(`/products/${product.id}`)} key={index}
								className="w-full py-4 md:py-[10px] w-full h-[82px] md:h-[102px] cursor-pointer pr-2 border-b border-[#f6f6f6]">
								<div className="flex gap-3 w-full h-[58px] md:h-[82px]">
									<div className="flex items-center justify-center h-[58px] md:h-[72px] aspect-square">
										<img src={product.images} alt="product"/>
									</div>
									<div className="flex flex-col md:flex-row gap-4 md:gap-5 justify-between w-full">
										<div className="line-clamp-2 md:line-clamp-3 text-md w-full leading-[15px]">{product.name}</div>
										<div className="font-semibold text-md leading-[11px] my-auto whitespace-nowrap">{isOptUser ? product.priceOPT : product.price} грн</div>
									</div>
								</div>
							</div>
						))}
					</div>
					{foundProducts.length > 5 &&
						<div className="flex items-center justify-center py-6 ">
							<div className="capitalize font-semibold text-md leading-[11px] text-[#E667A4] cursor-pointer"
								onClick={() => handleItemClick(`/search?query=${encodeURIComponent(searchQuery)}&page=1`)}>
								Переглянути усі варіанти ({foundProducts.length})
							</div>
						</div>
					}
				</div>
			</div>
		</div>
	);
};

export default SearchForm;
