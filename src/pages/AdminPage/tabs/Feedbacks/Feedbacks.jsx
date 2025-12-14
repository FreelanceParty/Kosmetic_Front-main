import {FeedBackBlock} from "../../AdminPageStyled";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const Feedbacks = () => {
	const [feedbacks, setFeedbacks] = useState([]);

	useEffect(() => {
		axios.get(`${REACT_APP_API_URL}/feedback`)
			.then(response => {
				const receivedFeedbacks = response.data;
				setFeedbacks(receivedFeedbacks);
			})
			.catch(error => {
				toast.error('Помилка отримання даних про відгуки', error);
			});
	}, []);

	return (
		<div>
			<h3>Сторінка відгуків адміністратора</h3>
			{feedbacks.map(feedback => (
				<FeedBackBlock key={feedback._id}>
					<p>{feedback.feedbacks}</p>
				</FeedBackBlock>
			))}
		</div>
	);
};
export default Feedbacks;