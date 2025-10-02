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

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

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

	useEffect(() => {
		const fetchProduct = async () => {
			setLoading(true);
			try {
				const response = await axios.get(`${REACT_APP_API_URL}/goods/${id}`);
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
					<Desktop isInCart={isInCart} product={product}/>
					<Mobile product={product}/>
				</>
			)}
		</>
	);
};

export default ProductPage;
