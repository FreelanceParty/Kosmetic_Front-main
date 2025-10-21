import React, {useEffect, useState} from "react";
import RateHearts from "../components/RateHearts/RateHearts";
import Button from "../components/ButtonNew/Button";
import Input from "../components/Input/Input";
import TextArea from "../components/TextArea/TextArea";
import axios from "axios";
import {toast} from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

const CreateProductFeedback = ({product, closePopup}) => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [formValues, setFormValues] = useState({
		productId: product.id,
		firstName: "",
		email:     "",
		message:   "",
		rate:      0,
	});

	const handleChange = (field, value) => {
		setFormValues((prev) => ({...prev, [field]: value}));
	};

	useEffect(() => {
		if (formValues.firstName.length < 1) {
			setErrorMessage("Заповніть ім'я!");
		} else if (formValues.email.length < 1) {
			setErrorMessage("Заповніть E-mail!");
		} else if (!validateEmail(formValues.email)) {
			setErrorMessage("Невірний формат E-mail!");
		} else if (formValues.rate < 1) {
			setErrorMessage("Оцініть товар!");
		} else {
			setErrorMessage(null);
		}
	}, [formValues.firstName, formValues.email, formValues.rate])

	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
		return re.test(email);
	};

	const saveFeedback = async () => {
		try {
			if (errorMessage) {
				toast.error(errorMessage);
				return;
			}

			const response = await axios.post(`${API_URL}/productReviews`, formValues);

			if (response.status !== 201) {
				throw new Error(
					response.data.message || "Помилка створення відгуку"
				);
			}
			closePopup();
			toast.success('Відгук доданий!');
		} catch (e) {
			console.log(e)
		}
	};

	return (
		<div className="flex flex-col p-5 md:p-[100px] pt-8 max-w-[824px]">
			<div className="flex flex-col gap-8 md:gap-[49px]">
				<div className="font-bold text-md md:text-lg uppercase text-center md:text-left line-clamp-2">
					ЗАЛИШИТИ ВІДГУК ПРО {product.name}
				</div>

				<div className="flex flex-col gap-6 items-center">
					<div className="font-semibold text-lg leading-[13px]">Ваша оцінка товару</div>
					<RateHearts
						heartSize={28}
						count={formValues.rate}
						onRate={(value) => handleChange("rate", value)}
						isReadonly={false}
					/>
				</div>

				<div className="flex flex-col gap-6 md:gap-10">
					<div className="flex flex-col md:flex-row gap-6">
						<Input
							type="text"
							placeholder="Ваше ім'я*"
							value={formValues.firstName}
							onChange={(e) => handleChange("firstName", e.target.value)}
						/>
						<Input
							type="email"
							placeholder="E-mail*"
							value={formValues.email}
							onChange={(e) => handleChange("email", e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-4 md:gap-6">
						<div className="text-lg text-center md:text-left">
							Тут ви можете залишити відгук або поставити запитання
						</div>
						<TextArea
							placeholder="Текст повідомлення"
							value={formValues.message}
							onChange={(e) => handleChange("message", e.target.value)}
							inputClasses="h-[155px] resize-none"
						/>
					</div>
				</div>

				<div className="flex flex-col md:flex-row items-center justify-between gap-4 cursor-pointer">
					<div className="flex gap-3 items-center">
						<img
							src={require("../assets/icons/download.svg").default}
							alt="download"
							width={16}
							height={16}
						/>
						<div>Додати зображення</div>
					</div>
					<Button
						type="primary"
						text="ЗАЛИШИТИ ВІДГУК"
						onClick={saveFeedback}
						classes={'w-full max-w-[249px]'}
					/>
				</div>
			</div>
		</div>
	);
};

export default CreateProductFeedback;
