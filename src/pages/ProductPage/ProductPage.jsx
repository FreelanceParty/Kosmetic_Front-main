import axios from "axios";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Loader} from "../../components/Loader/Loader";
import Desktop from "./Contents/Desktop";
import Mobile from "./Contents/Mobile";
import {useDispatch, useSelector} from "react-redux";
import {selectCart} from "../../redux/cart/selectors";
import {trackAddToCart} from "../../ads/AdEvents";
import {getIsLoggedIn, getUserEmail, getUserFirstName, getUserLastName, getUserNumber} from "../../redux/auth/selectors";
import {handleAddToCart,} from "../../utils/helpers/basket";
import {toast} from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

const ProductPage = () => {
	// todo: додати анімації
	const {id} = useParams();
	const [loading, setLoading] = useState(true);
	const [product, setProduct] = useState(null);
	const [isInCart, setIsInCart] = useState(false);
	const productCart = useSelector(selectCart);
	const [quantity, setQuantity] = useState(1);
	const [productCount, setProductCount] = useState(0);

	const [reviewsLength, setReviewsLength] = useState(0);
	const [averageRating, setAverageRating] = useState(0);
	const [reviewsCount, setReviewsCount] = useState('');

	const isLoggedIn = useSelector(getIsLoggedIn);

	const userEmail = useSelector(getUserEmail);
	const userFirstName = useSelector(getUserFirstName);
	const userLastName = useSelector(getUserLastName);
	const userNumber = useSelector(getUserNumber);

	const dispatch = useDispatch();

	async function addToCart() {
		setIsInCart(true);
		await handleAddToCart({product, quantity, dispatch, isLoggedIn});
		try {
			await trackAddToCart(product, {em: userEmail, fn: userFirstName, ln: userLastName, ph: userNumber})
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		const fetchReviews = async () => {
			function getReviewWord(count) {
				if (count % 100 >= 11 && count % 100 <= 19) {
					return 'відгуків';
				}
				switch (count % 10) {
					case 1:
						return 'відгук';
					case 2:
					case 3:
					case 4:
						return 'відгуки';
					default:
						return 'відгуків';
				}
			}

			try {
				const response = await axios.get(`${API_URL}/productReviews/forProduct/${product.id}`);
				const reviews = response.data;
				const count = reviews.length;
				const totalRating = reviews.reduce((acc, review) => acc + review.rate, 0);
				const average = totalRating / count;
				setReviewsLength(count);
				setAverageRating(Math.ceil(average));
				setReviewsCount(`${count} ${getReviewWord(count)}`);
			} catch (error) {
				console.error('Failed to fetch reviews:', error);
			}
		};

		fetchReviews();
	}, [product]);

	useEffect(() => {
		const fetchProduct = async () => {
			setLoading(true);
			try {
				const response = await axios.get(`${API_URL}/goods/${id}`);
				setIsInCart(productCart.some(item => item.id === response.data.id));
				setProductCount(response.data.amount);
				setLoading(false);
				setProduct(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		if (product === null) {
			fetchProduct();
		}
	}, [id]);

	const updateProductCountHandler = async () => {
		try {
			await axios.patch(`${API_URL}/goods/${product._id}/amount`, {
				amount: productCount
			});
			toast.success("Кількість товару успішно оновлено");
		} catch (error) {
			toast.error("Помилка зміни кількості товару", error);
		}
	};

	return (
		<>
			{loading ? (
				<Loader/>
			) : (
				<>
					<Desktop
						isInCart={isInCart}
						product={product}
						reviewsCount={reviewsCount}
						averageRating={averageRating}
						reviewsLength={reviewsLength}
						quantity={quantity}
						setQuantity={setQuantity}
						addToCartHandler={addToCart}
						productCount={productCount}
						setProductCount={setProductCount}
						updateProductCountHandler={updateProductCountHandler}
					/>
					<Mobile
						isInCart={isInCart}
						product={product}
						reviewsCount={reviewsCount}
						averageRating={averageRating}
						reviewsLength={reviewsLength}
						quantity={quantity}
						setQuantity={setQuantity}
						addToCartHandler={addToCart}
						productCount={productCount}
						setProductCount={setProductCount}
						updateProductCountHandler={updateProductCountHandler}
					/>
				</>
			)}
		</>
	);
};

export default ProductPage;
