import React, {useEffect, useState} from "react";
import CategoryList from "../../components/CategoryList/CategoryList.jsx";
import ProductSlider from "../../components/ProductSlider/ProductSlider.jsx";
import Cooperation from "../../components/Cooperation/Cooperation.jsx";
import Reviews from "../../components/Reviews/Reviews.jsx";
import axios from "axios";
import ReviewsMobile from "../../components/Reviews/ReviewsMobile";
import CelimaxBanner from "../../components/Banners/CelimaxBanner";

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
				const [saleResponse, newResponse] = await Promise.all([
					axios.get(`${API_URL}/goods/fetchPage`, {
						params: {page: 1, limit: 8, sale: true, onlyAvailable: true, sort: 'newest'}
					}),
					axios.get(`${API_URL}/goods/fetchPage`, {
						params: {page: 1, limit: 8, new: true, onlyAvailable: true, sort: 'newest'}
					}),
				]);

				const saleGoods = saleResponse?.data?.goods ?? saleResponse?.data ?? [];
				const newGoods = newResponse?.data?.goods ?? newResponse?.data ?? [];

				setDiscountProducts(Array.isArray(saleGoods) ? saleGoods : []);
				setNewProducts(Array.isArray(newGoods) ? newGoods : []);
			} catch (error) {
				console.log(error);
			}
		};
		fetchProduct();
	}, []);
	return (
		<div>
			<CelimaxBanner/>
			<div className="flex flex-col gap-[60px] items-center py-10 px-2 xl:px-10">
				<ProductSlider title="BEAUTY ЗНИЖКИ %" products={discountProducts} buttonRoute={'marker=sale&'}/>
				<ProductSlider title="НОВИНКИ" products={newProducts} buttonRoute={'marker=new&'}/>
				<CategoryList/>
				<Cooperation/>
				<Reviews reviews={productReviews}/>
				<ReviewsMobile reviews={productReviews}/>
			</div>
		</div>
	);
};

export default HomePage;
