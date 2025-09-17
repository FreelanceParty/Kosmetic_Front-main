import React, {useState} from "react";
import RateHearts from "../components/RateHearts/RateHearts";
import Button from "../components/ButtonNew/Button";
import Input from "../components/Input/Input";
import TextArea from "../components/TextArea/TextArea";
import axios from "axios";

const CreateProductFeedback = ({product}) => {
	const [formValues, setFormValues] = useState({
		productId: product._id,
		firstName: "",
		email:     "",
		message:   "",
		rate:      0,
	});

	const handleChange = (field, value) => {
		// todo: add validation
		console.log(field)
		console.log(value)
		setFormValues((prev) => ({...prev, [field]: value}));
	};

	const saveFeedback = async () => {
		const API_URL = process.env.REACT_APP_API_URL;
		try {
			console.log(formValues)
			const response = await axios.post(`${API_URL}/productReviews`, formValues);

			if (response.status !== 201) {
				throw new Error(
					response.data.message || "Помилка створення замовлення"
				);
			}
			// Якщо все пройшло успішно, обробляємо відповідь
			//try {
			//	const userDataSelectors = {em: userEmail, ph: userNumber, fn: userFirstName, ln: userLastName};
			//	await trackPurchase(totalCost, orderedItemsSecond.map(p => p._id), userDataSelectors);
			//} catch (error) {
			//	console.error("Помилка розміщення замовлення:", error);
			//}
			//if (isLogin) {
			//	removeCartItem();
			//}
			//dispatch(deleteAll());
			//showOrderPlacedModal();
			//setFormData({
			//	email:          userEmail || "",
			//	firstName:      userFirstName || "",
			//	lastName:       userLastName || "",
			//	number:         userNumber || null,
			//	city:           "",
			//	orderNumber:    orderNumber,
			//	paymentMethod:  "",
			//	deliveryMethod: "",
			//	comments:       "",
			//	address:        "",
			//	building:       "",
			//	apartment:      "",
			//	isOptUser:      isOptUser,
			//});
		} catch (e) {
			console.log(e)
		}
	};

	return (
		<div className="flex flex-col p-4 md:p-[100px] pt-2 md:pt-9 max-w-[824px]">
			<div className="flex flex-col gap-8 md:gap-[49px]">
				<div className="font-bold text-md md:text-lg uppercase text-center md:text-left">
					ЗАЛИШИТИ ВІДГУК ПРО {product.name}
				</div>

				<div className="flex flex-col gap-6 items-center">
					<div>Ваша оцінка товару</div>
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
							inputClasses={`w-full md:w-1/2 h-[42px]`}
							value={formValues.firstName}
							onChange={(e) => handleChange("firstName", e.target.value)}
						/>
						<Input
							type="email"
							placeholder="E-mail*"
							inputClasses={`w-full md:w-1/2 h-[42px]`}
							value={formValues.email}
							onChange={(e) => handleChange("email", e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-4 md:gap-6">
						<div className="font-normal text-lg text-center md:text-left">
							Тут Ви можете залишити відгук або поставити запитання
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
					/>
				</div>
			</div>
		</div>
	);
};

export default CreateProductFeedback;
