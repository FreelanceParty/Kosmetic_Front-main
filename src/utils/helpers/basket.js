import {addToCart, removeFromCart, setCart} from "../../redux/cart/slice";
import axios from "axios";
import scrollToTop from "../../components/ScrollToTop/ScrollToTop";

const API_URL = process.env.REACT_APP_API_URL;

export const handleAddToCart = async ({product, quantity, dispatch, isLoggedIn}) => {
	const availableAmount = Number(product?.amount ?? 0);
	const requestedQuantity = Number(quantity ?? 0);

	if (!Number.isFinite(requestedQuantity) || requestedQuantity <= 0) {
		return;
	}
	if (!Number.isFinite(availableAmount) || availableAmount <= 0) {
		return;
	}
	if (requestedQuantity > availableAmount) {
		return;
	}

	dispatch(addToCart({...product, quantity: requestedQuantity}));

	// todo: Error: Invalid hook call. Hooks can only be called inside of the body of a function component.
	try {
		if (isLoggedIn) {
			await axios.post(`${API_URL}/basket`, {
				name:           product.name,
				article:        product.article,
				code:           product.code,
				amount:         product.amount,
				description:    product.description,
				priceOPT:       product.priceOPT,
				quantity:       requestedQuantity,
				price:          product.price,
				brand:          product.brand,
				images:         product.images,
				new:            product.new,
				sale:           product.sale,
				category:       product.category,
				subCategory:    product.subCategory || '-',
				subSubCategory: product.subSubCategory || '-',
				productId:      product.id,
			});
			scrollToTop();
		}
	} catch (e) {
		console.log(e);
	}
};

export const refreshCartAvailability = async ({cartItems, dispatch}) => {
	const items = Array.isArray(cartItems) ? cartItems : [];
	if (items.length === 0) {
		return [];
	}

	const results = await Promise.all(
		items.map(async (item) => {
			const productId = item?.productId || item?.id || item?._id;
			if (!productId) {
				return item;
			}
			try {
				const {data} = await axios.get(`${API_URL}/goods/${productId}`);
				const nextAmount = Number(data?.amount);
				return {
					...item,
					amount: Number.isFinite(nextAmount) ? nextAmount : item?.amount,
				};
			} catch (e) {
				return item;
			}
		})
	);

	dispatch(setCart(results));
	return results;
};

export const handleRemoveFromCart = async ({product, dispatch, isLoggedIn}) => {
	dispatch(removeFromCart({...product}));

	try {
		if (isLoggedIn) {
			const productId = product._id || product.id || product.productId || product.code;
			await axios.delete(`${API_URL}/basket/${productId}`);
			scrollToTop();
		}
	} catch (e) {
		console.log(e);
	}
};
