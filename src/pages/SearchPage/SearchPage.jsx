import React, {useEffect, useState} from "react";
import {Loader} from "../../components/Loader/Loader";
// import {
//   // fetchSearchResults,
//   selectSearchError,
//   selectSearchItems,
//   selectSearchLoading,
//   selectSearchPagination,
// } from "../../redux/search/selectors";
// import { fetchSearchResults } from "../../redux/search/operation";
import {fetchSearchResults} from "../../redux/products/operation";

import {useDispatch, useSelector} from "react-redux";
import ProductItem from "../../components/ProductItem/ProductItem";

import {Container, List} from "./SearchPage.styled";
import {useLocation, useNavigate} from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import {selectFilter} from "../../redux/filter/selectors";
import {
	selectErrorByParams,
	selectLoadingByParams,
	selectPaginationByParams,
	selectProductsByParams,
} from "../../redux/products/productsSelectors";

const SearchPage = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const searchParams = new URLSearchParams(location.search);
	const queryParam = searchParams.get("query") || "";
	const pageParam = parseInt(searchParams.get("page")) || 1;

	// Локальний стан для фільтрів
	const [params, setParams] = useState({
		query: queryParam,
		page:  pageParam,
		limit: 2,
	});

	//   const items = useSelector(selectSearchItems);
	// console.log("items", items);
	// const pagination = useSelector(selectSearchPagination);
	// console.log("pagination", pagination);
	// const loading = useSelector(selectSearchLoading);
	// const error = useSelector(selectSearchError);

	const items = useSelector((state) => selectProductsByParams(state, params));
	const pagination = useSelector((state) =>
		selectPaginationByParams(state, params)
	);
	const loading = useSelector((state) => selectLoadingByParams(state, params));

	const error = useSelector((state) => selectErrorByParams(state, params));

	// Оновлюємо дані при зміні параметрів URL
	useEffect(() => {
		setParams({
			query: queryParam,
			page:  pageParam,
			limit: 2,
		});
	}, [queryParam, pageParam]);

	// Запит на сервер
	useEffect(() => {
		if (params.query.trim() !== "") {
			dispatch(fetchSearchResults(params));
		}
	}, [params, dispatch]);

	const handlePageChange = ({selected}) => {
		const newPage = selected + 1;
		searchParams.set("page", newPage);
		navigate(`${location.pathname}?${searchParams.toString()}`);
	};

	return (
		<>
			{/* список продуктів */}
			<Container>
				{loading ? (
					<Loader/>
				) : (
					<List>
						{items.length > 0
							? items.map((item) => (
								<ProductItem key={item.id} product={item}/>
							))
							: (loading || error) && <p>Товари не знайдено</p>}
					</List>
				)}
			</Container>
			{/* пагінація */}
			{!loading && pagination.totalPages > 1 && (
				<Pagination
					currentPage={pagination.currentPage}
					totalPages={pagination.totalPages}
					onPageChange={handlePageChange}
				/>
			)}
		</>
	);
};

export default SearchPage;
