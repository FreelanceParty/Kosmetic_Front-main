import Button from "../../../../components/ButtonNew/Button";
import ProductFeedback from "./_elements/ProductFeedback";
import {usePopup} from "../../../../hooks/usePopup";
import {Popup} from "../../../../popups/Abstracts/Popup";
import CreateProductFeedback from "../../../../popups/CreateProductFeedback";
import {useEffect, useState} from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const ProductFeedbacks = ({product}) => {
	const {isOpen, content, openPopup, closePopup} = usePopup();
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await axios.get(`${API_URL}/productReviews/forProduct/${product.id}`);
				setReviews(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchProduct();
	}, []);

	return (
		<div className="flex flex-col gap-10 w-fit">
			<Button
				type="secondary"
				text="ЗАЛИШИТИ ВІДГУК"
				onClick={() => openPopup(<CreateProductFeedback product={product} closePopup={closePopup}/>)}
			/>
			{reviews.length > 0 ? (
				<div className="flex flex-col gap-10">
					{reviews.map((feedback, index) => (
						<ProductFeedback
							key={index}
							feedback={feedback}
						/>
					))}
				</div>
			) : (
				<div className="font-normal text-md">Станьте першим, хто залишить відгук на цей товар.</div>
			)}
			<Popup isOpen={isOpen} content={content} onClose={closePopup}/>
		</div>
	);
}

export default ProductFeedbacks;
