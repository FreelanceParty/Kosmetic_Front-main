import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useMedia} from "../../../utils/hooks/useMedia";
import {fetchProducts} from "../../../redux/products/operation";
import {
	selectErrorByParams,
	selectLoadingByParams,
	selectPaginationByParams,
	selectProductsByParams,
} from "../../../redux/products/productsSelectors";
import {Loader} from "../../Loader/Loader";
import SwiperSlider from "../SwiperSlider";
import ProductItem from "../../ProductItem/ProductItem";

import {Container, List, Title} from "./sliderList.styled";

const SliderList = ({title, sale, newness}) => {
	const dispatch = useDispatch();
	const {screenType} = useMedia();
	//   console.log("screenType", screenType);

	// Локальний стан для фільтрів
	const [params, setParams] = useState({
		page:    1,
		limit:   8,
		newness: newness || false,
		sale:    sale || false,
	});
	//   const items = useSelector(selectProductsByParams);
	const items = useSelector((state) => selectProductsByParams(state, params));
	const loading = useSelector((state) => selectLoadingByParams(state, params));

	// console.log("items", items);

	useEffect(() => {
		dispatch(fetchProducts(params));
	}, [dispatch, params]);

	return (
		<Container>
			{loading ? (
				<Loader/>
			) : (
				<div>
					<Title>{title}</Title>
					{screenType !== "desktop" ? (
						<SwiperSlider items={items}/>
					) : (
						<List>
							{items.map((item) => (
								<ProductItem product={item}/>
							))}
						</List>
					)}
					{/* <SwiperSlider items={items} /> */}
					{/* <li key={item.id}></li> */}
				</div>
			)}
		</Container>
	);
};

export default SliderList;
