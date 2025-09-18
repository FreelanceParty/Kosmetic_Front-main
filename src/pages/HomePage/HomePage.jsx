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

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await axios.get(`${API_URL}/goods`);
				setDiscountProducts(response.data.goods.slice(0, 8));
				setNewProducts(response.data.goods.slice(8, 16));
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
				<ProductSlider className="hidden sm:flex" title="BEAUTY ЗНИЖКИ %" products={discountProducts}/>
				<ProductSlider className="hidden sm:flex" title="НОВИНКИ" products={newProducts}/>
				<CategoryList/>
				<Cooperation/>
				<Reviews/>
				<ReviewsMobile/>
			</div>
		</div>
	);
};

export default HomePage;
