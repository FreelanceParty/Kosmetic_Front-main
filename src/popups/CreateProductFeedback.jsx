import React, {useEffect, useRef, useState} from "react";
import RateHearts from "../components/RateHearts/RateHearts";
import Button from "../components/ButtonNew/Button";
import Input from "../components/Input/Input";
import TextArea from "../components/TextArea/TextArea";
import axios from "axios";
import {toast} from "react-toastify";
import DownloadIcon from "../components/Icons/DownloadIcon";

const API_URL = process.env.REACT_APP_API_URL;
const MAX_IMAGE_SIZE_BYTES = 2048 * 1024; // 2 MB

const CreateProductFeedback = ({product, closePopup}) => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [imageFile, setImageFile] = useState(null);
	const fileInputRef = useRef(null);

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

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			if (file.size > MAX_IMAGE_SIZE_BYTES) {
				toast.error(`Розмір завантаження має бути менше ${MAX_IMAGE_SIZE_BYTES / 1024 / 1024} МБ.`);
				setImageFile(null);
				event.target.value = null;
			} else {
				setImageFile(file);
				toast.success(`Зображення "${file.name}" завантажено.`);
			}
		}
	};

	const handleDownloadClick = () => {
		fileInputRef.current.click();
	};

	const saveFeedback = async () => {
		try {
			if (errorMessage) {
				toast.error(errorMessage);
				return;
			}

			const formData = new FormData();
			Object.keys(formValues).forEach((key) => formData.append(key, formValues[key]));
			if (imageFile) {
				formData.append("image", imageFile);
			}
			const response = await axios.post(`${API_URL}/productReviews`, formData);

			if (response.status !== 201) {
				throw new Error(
					response.data.message || "Помилка створення відгуку"
				);
			}
			closePopup();
			toast.success('Відгук доданий!');
		} catch (e) {
			console.log(e);
			toast.error("Не вдалося зберегти відгук. Спробуйте пізніше.");
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

				<input
					type="file"
					ref={fileInputRef}
					onChange={handleImageChange}
					accept="image/*"
					style={{display: 'none'}}
				/>

				<div className="flex flex-col md:flex-row items-center justify-between gap-4">
					<div className="flex gap-3 items-center cursor-pointer" onClick={handleDownloadClick}>
						<DownloadIcon/>
						<div>
							{imageFile ?
								<span className="text-green-600 font-medium">{imageFile.name}</span>
								: "Додати зображення"
							}
						</div>
						{imageFile && (
							<button
								onClick={(e) => {
									e.stopPropagation();
									setImageFile(null);
									fileInputRef.current.value = null;
									toast.info("Зображення видалено.");
								}}
								className="ml-2 text-red-500 hover:text-red-700 font-bold"
							>
								&#x2715;
							</button>
						)}
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
