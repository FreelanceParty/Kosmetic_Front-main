import axios from "axios";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Loader} from "../../components/Loader/Loader";
import {useMedia} from "../../utils/hooks/useMedia";
import {routeHelper} from "../../utils/helpers/routeHelper";
import Desktop from "./Contents/Desktop";
import Mobile from "./Contents/Mobile";
import {useSelector} from "react-redux";
import {selectCart} from "../../redux/cart/selectors";

const API_URL = process.env.REACT_APP_API_URL;

const ProductPage = () => {
	// todo: додати анімації
	// todo: залогінений/ ні
	// todo: оптові ціни
	const {id} = useParams();
	const [loading, setLoading] = useState(true);
	const [product, setProduct] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isOptUser, setIsOptUser] = useState(false);
	const [isAuthorized, setIsAuthorized] = useState(false);
	const [isInCart, setIsInCart] = useState(false);
	const productCart = useSelector(selectCart);

	const [reviewsLength, setReviewsLength] = useState(0);
	const [averageRating, setAverageRating] = useState(0);
	const [reviewsCount, setReviewsCount] = useState('');

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
				setLoading(false);
				setProduct(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchProduct();
	}, [id]);

	useEffect(() => {
		if (product !== null) {
			console.log(product);
		}
	}, [product]);

	return (
		<>
			{loading ? (
				<Loader/>
			) : (
				<>
					<Desktop isInCart={isInCart} product={product} reviewsCount={reviewsCount} averageRating={averageRating} reviewsLength={reviewsLength}/>
					<Mobile product={product} reviewsCount={reviewsCount} averageRating={averageRating} reviewsLength={reviewsLength}/>
				</>
			)}
		</>
	);
};

export default ProductPage;
