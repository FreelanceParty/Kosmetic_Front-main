import {addToCart, removeFromCart} from "../../redux/cart/slice";
import axios from "axios";
import scrollToTop from "../../components/ScrollToTop/ScrollToTop";

const API_URL = process.env.REACT_APP_API_URL;

export const handleAddToCart = async ({product, quantity, dispatch, isLoggedIn}) => {
	dispatch(addToCart({...product, quantity}));

	try {
		if (isLoggedIn) {
			await axios.post(`${API_URL}/basket`, {
				name:           product.name,
				article:        product.article,
				code:           product.code,
				amount:         product.amount,
				description:    product.description,
				priceOPT:       product.priceOPT,
				quantity:       quantity,
				price:          product.price,
				brand:          product.brand,
				images:         product.images,
				new:            product.new,
				sale:           product.sale,
				category:       product.category,
				subCategory:    product.subCategory,
				subSubCategory: product.subSubCategory,
				productId:      product.id,
			});
			scrollToTop();
		}
	} catch (e) {
		console.log(e);
	}
};

export const handleRemoveFromCart = async ({product, dispatch, isLoggedIn}) => {
	dispatch(removeFromCart({...product}));

	try {
		if (isLoggedIn) {
			await axios.delete(`/basket/${product.id}`);
			scrollToTop();
		}
	} catch (e) {
		console.log(e);
	}
};
