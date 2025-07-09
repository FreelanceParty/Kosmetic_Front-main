import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AiOutlineRight, AiOutlineLeft} from "react-icons/ai";
import {BsChevronRight, BsChevronLeft} from "react-icons/bs";

import {fetchProducts} from "../../redux/products/operation";
import {
	selectErrorByParams,
	selectLoadingByParams,
	selectPaginationByParams,
	selectProductsByParams,
} from "../../redux/products/productsSelectors";

import {Loader} from "../Loader/Loader";
import {useMedia} from "../../utils/hooks/useMedia";
import ProductItem from "../ProductItem/ProductItem";

import {
	Button,
	ButtonWrap,
	Container,
	List,
	Title,
	TitleLine,
} from "./Slider.styled";

const Slider = ({title, newness, sale}) => {
	const dispatch = useDispatch();
	const {screenType} = useMedia();

	// Локальний стан для фільтрів
	const [params, setParams] = useState({
		page:    1,
		limit:   2,
		newness: newness || false,
		sale:    sale || false,
	});

	useEffect(() => {
		let newLimit;
		switch (screenType) {
			case "xs-mobile":
				newLimit = 1;
				break;
			case "mobile":
				newLimit = 2;
				break;
			case "tablet":
			case "small-desktop":
				newLimit = 3;
				break;
			case "desktop":
				newLimit = 8;
				break;
			default:
				newLimit = 2;
		}

		setParams({
			page:    1,
			limit:   newLimit,
			newness: newness || false,
			sale:    sale || false,
		});
	}, [screenType, newness, sale]);

	const items = useSelector((state) => selectProductsByParams(state, params));
	const pagination = useSelector((state) =>
		selectPaginationByParams(state, params)
	);
	const loading = useSelector((state) => selectLoadingByParams(state, params));
	const error = useSelector((state) => selectErrorByParams(state, params));

	useEffect(() => {
		dispatch(fetchProducts(params));
	}, [dispatch, params]);

	// Функції для зміни сторінки
	const handleNextPage = () => {
		if (pagination.currentPage < pagination.totalPages) {
			setParams((prev) => ({...prev, page: prev.page + 1}));
		}
	};

	const handlePrevPage = () => {
		if (pagination.currentPage > 1) {
			setParams((prev) => ({...prev, page: prev.page - 1}));
		}
	};

	return (
		<>
			<Container>
				<TitleLine/>
				<Title>{title}</Title>
				{loading && <Loader/>}
				<div>
					<List>
						{items.length > 0
							? items.map((item) => (
								<ProductItem key={item.id} product={item}/>
							))
							: loading && error && <p>Товари не знайдено</p>}
					</List>
				</div>
				{/* Кнопки пагінації */}
				{!loading && pagination.totalPages > 1 && items.length <= 3 && (
					<ButtonWrap>
						<Button
							onClick={handlePrevPage}
							disabled={pagination.currentPage === 1}
						>
							<BsChevronLeft/>
						</Button>

						<Button
							onClick={handleNextPage}
							disabled={pagination.currentPage === pagination.totalPages}
						>
							<BsChevronRight/>
						</Button>
					</ButtonWrap>
				)}
			</Container>
		</>
	);
};

export default Slider;
