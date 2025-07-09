import React, {useEffect, useState} from "react";
import {
	Wrapper,
	Title,
	SliderRow,
	AllProductsButton,
} from "./ProductSlider.styled";
import ProductCard from "./ProductCard/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {useMedia} from "../../utils/hooks/useMedia";
import {
	selectLoadingByParams,
	selectProductsByParams,
} from "../../redux/products/productsSelectors";
import {fetchProducts} from "../../redux/products/operation";

// const demoProducts = [
//   {
//     image: require("../../assets/images/200x200.png"),
//     sale: true,
//     newness: false,
//     brand: "Cosrx",
//     desc: "Заспокійливий крем",
//     rating: 3,
//     reviews: 2,
//     oldPrice: 350,
//     newPrice: 299,
//     amount: 10,
//   },
//   {
//     image: require("../../assets/images/200x200.png"),
//     sale: true,
//     newness: false,
//     brand: "Cosrx",
//     desc: "Заспокійливий крем",
//     rating: 3,
//     reviews: 2,
//     oldPrice: 350,
//     newPrice: 299,
//     amount: 0,
//   },
//   {
//     image: require("../../assets/images/200x200.png"),
//     sale: true,
//     newness: false,
//     brand: "Cosrx",
//     desc: "Заспокійливий крем",
//     rating: 3,
//     reviews: 2,
//     oldPrice: 350,
//     newPrice: 299,
//     amount: 20,
//   },
//   {
//     image: require("../../assets/images/200x200.png"),
//     sale: false,
//     newness: true,
//     brand: "Cosrx",
//     desc: "Заспокійливий крем",
//     rating: 3,
//     reviews: 2,
//     oldPrice: 350,
//     newPrice: 299,
//     amount: 2,
//   },
//   {
//     image: require("../../assets/images/200x200.png"),
//     sale: true,
//     newness: false,
//     brand: "Cosrx",
//     desc: "Заспокійливий крем",
//     rating: 3,
//     reviews: 2,
//     oldPrice: 350,
//     newPrice: 299,
//     amount: 0,
//   },
//   {
//     image: require("../../assets/images/200x200.png"),
//     sale: true,
//     newness: false,
//     brand: "Cosrx",
//     desc: "Заспокійливий крем",
//     rating: 3,
//     reviews: 2,
//     oldPrice: 350,
//     newPrice: 299,
//     amount: 0,
//   },
//   {
//     image: require("../../assets/images/200x200.png"),
//     sale: true,
//     newness: false,
//     brand: "Cosrx",
//     desc: "Заспокійливий крем",
//     rating: 3,
//     reviews: 2,
//     oldPrice: 350,
//     newPrice: 299,
//     amount: 4,
//   },
//   {
//     image: require("../../assets/images/200x200.png"),
//     sale: false,
//     newness: true,
//     brand: "Cosrx",
//     desc: "Заспокійливий крем",
//     rating: 3,
//     reviews: 2,
//     oldPrice: 350,
//     newPrice: 299,
//     amount: 0,
//   },
// ];

const ProductSlider = ({newness, sale, type}) => {
	const title = type === "sale" ? "BEAUTY ЗНИЖКИ %" : "Новинки";

	const dispatch = useDispatch();
	const {screenType} = useMedia();

	const [params, setParams] = useState({
		page:    1,
		limit:   4,
		newness: !!newness,
		sale:    !!sale,
	});

	const items = useSelector((state) => selectProductsByParams(state, params));
	const loading = useSelector((state) => selectLoadingByParams(state, params));

	useEffect(() => {
		dispatch(fetchProducts(params));
	}, [dispatch, params]);

	return (
		<Wrapper>
			<Title>{title}</Title>

			{loading ? (
				<p>Завантаження...</p>
			) : (
				<SliderRow>
					{items.map((item) => (
						<ProductCard key={item.id} {...item} />
					))}
				</SliderRow>
			)}

			<AllProductsButton href="/products">Усі товари</AllProductsButton>
		</Wrapper>
	);
};

export default ProductSlider;
