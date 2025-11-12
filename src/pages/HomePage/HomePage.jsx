import React, {useEffect, useState} from "react";
import CategoryList from "../../components/CategoryList/CategoryList.jsx";
import ProductSlider from "../../components/ProductSlider/ProductSlider.jsx";
import Cooperation from "../../components/Cooperation/Cooperation.jsx";
import Reviews from "../../components/Reviews/Reviews.jsx";
import axios from "axios";
import ReviewsMobile from "../../components/Reviews/ReviewsMobile";
import BestKoreanProducts from "../../components/Banners/BestKoreanProducts";

const API_URL = process.env.REACT_APP_API_URL;

const HomePage = () => {
	const [discountProducts, setDiscountProducts] = useState([]);
	const [newProducts, setNewProducts] = useState([]);

	const [productReviews, setProductReviews] = useState([]);

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const response = await axios.get(`${API_URL}/productReviews`);
				const reviews = response.data;

				const shuffled = [...reviews].sort(() => 0.5 - Math.random());
				const randomReviews = shuffled.slice(0, 9);

				const reviewsWithProducts = await Promise.all(
					randomReviews.map(async (review) => {
						const productResponse = await axios.get(`${API_URL}/goods/${review.productId}`);
						return {...review, product: productResponse.data};
					})
				);

				setProductReviews(reviewsWithProducts);
			} catch (e) {
				console.error(e);
			}
		};

		fetchReviews();
	}, []);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await axios.get(`${API_URL}/goods`);
				const goods = response.data.goods;
				const availableProducts = goods.filter(product => product.amount > 0);
				const discountProducts = availableProducts.filter(product => product.sale === true);
				const newProducts = availableProducts.filter(product => product.new === true);
				setDiscountProducts(discountProducts.slice(0, 8));
				setNewProducts(newProducts.slice(8, 16));
			} catch (error) {
				console.log(error);
			}
		};
		fetchProduct();
	}, []);
	return (
		<div>
			<BestKoreanProducts/>
			<div className="flex flex-col gap-[60px] items-center p-10">
				<ProductSlider title="BEAUTY ЗНИЖКИ %" products={discountProducts}/>
				<ProductSlider title="НОВИНКИ" products={newProducts}/>
				<CategoryList/>
				<Cooperation/>
				<Reviews reviews={productReviews}/>
				<ReviewsMobile reviews={productReviews}/>
			</div>
		</div>
	);
};

export default HomePage;
