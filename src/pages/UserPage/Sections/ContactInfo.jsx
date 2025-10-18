import Button from "../../../components/ButtonNew/Button";
import Input from "../../../components/Input/Input";
import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {getUserEmail, getUserFirstName, getUserId, getUserLastName, getUserNumber} from "../../../redux/auth/selectors";
import axios from "axios";
import {toast} from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

const ContactInfo = () => {
	const id = useSelector(getUserId);

	const [isFormValid, setIsFormValid] = useState(false);

	const [errors, setErrors] = useState({
		email:     null,
		firstName: null,
		lastName:  null,
		number:    null,
	});
	const [formData, setFormData] = useState({
		email:     useSelector(getUserEmail),
		firstName: useSelector(getUserFirstName),
		lastName:  useSelector(getUserLastName),
		number:    useSelector(getUserNumber),
	});

	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setFormData({...formData, [name]: value});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (!isFormValid) {
				toast.error("Невірні дані");
				return;
			}
			await axios.post(`${API_URL}/auth/updateUserData/${id}`, formData);
			toast.info("Дані оновлено.");
		} catch (error) {
			if (error.response && error.response.status === 401) {
				toast.error("Ви ввели невірний діючий пароль.");
			} else {
				console.error("Помилка при відправці запиту:", error);
			}
		}
	};

	useEffect(() => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
		const isValidEmail = re.test(formData.email);
		if (isValidEmail) {
			setErrors({...errors, ['email']: null});
		} else {
			setErrors({...errors, ['email']: "Невірний формат E-mail"});
		}
	}, [formData.email])

	useEffect(() => {
		if (formData.firstName.length < 2) {
			setErrors({...errors, ['firstName']: "Занадто коротке значення"});
		} else {
			setErrors({...errors, ['firstName']: null});
		}
	}, [formData.firstName])
	useEffect(() => {
		if (formData.lastName.length < 2) {
			setErrors({...errors, ['lastName']: "Занадто коротке значення"});
		} else {
			setErrors({...errors, ['lastName']: null});
		}
	}, [formData.lastName])

	useEffect(() => {
		const phonePattern = /^\+380\d{9}$/;
		const isPhoneValid = phonePattern.test(formData.number);
		if (isPhoneValid) {
			setErrors({...errors, ['number']: null});
		} else {
			setErrors({...errors, ['number']: "Невірний формат номеру"});
		}
	}, [formData.number])

	useEffect(() => {
		setIsFormValid(Object.values(errors).every(value => value === null))
	}, [errors])

	return (
		<div className="flex flex-col">
			<div className="hidden md:flex flex-col gap-4 mb-6">
				<div className="font-semibold text-lg leading-[13px]">КОНТАКТНА ІНФОРМАЦІЯ</div>
				<div className="border-t border-[#E8E8E8]"/>
			</div>
			<div className="flex flex-col gap-4 md:gap-[30px] mb-6 md:mb-10 max-w-[545px]">
				<div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0">
					<div className="text-sm md:text-lg">EMAIL<span className="text-[#E667A4]">*</span></div>
					<Input
						type="email"
						name="email"
						value={formData.email}
						containerClasses={`max-w-[409px]`}
						inputClasses="h-[53px] !bg-[#f6f6f6]"
						onChange={handleInputChange}
						errorMessage={errors.email}
					/>
				</div>
				<div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0">
					<div className="text-sm md:text-lg">ІМ'Я<span className="text-[#E667A4]">*</span></div>
					<Input
						type="text"
						name="firstName"
						value={formData.firstName}
						containerClasses={`max-w-[409px]`}
						inputClasses="h-[53px] !bg-[#f6f6f6]"
						onChange={handleInputChange}
						errorMessage={errors.firstName}
					/>
				</div>
				<div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0">
					<div className="text-sm md:text-lg">ПРІЗВИЩЕ<span className="text-[#E667A4]">*</span></div>
					<Input
						type="text"
						name="lastName"
						value={formData.lastName}
						containerClasses={`max-w-[409px]`}
						inputClasses="h-[53px] !bg-[#f6f6f6]"
						onChange={handleInputChange}
						errorMessage={errors.lastName}
					/>
				</div>
				<div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0">
					<div className="text-sm md:text-lg">ТЕЛЕФОН<span className="text-[#E667A4]">*</span></div>
					<Input
						type="text"
						name="number"
						value={formData.number}
						containerClasses={`max-w-[409px]`}
						inputClasses="h-[53px] !bg-[#f6f6f6]"
						onChange={handleInputChange}
						errorMessage={errors.number}
					/>
				</div>
			</div>
			<Button
				type="primary"
				text="ЗБЕРЕГТИ ЗМІНИ"
				classes="h-[53px] w-full max-w-[409px] md:max-w-[227px]"
				onClick={handleSubmit}
				isDisabled={!isFormValid}
			/>
		</div>
	);
};
export default ContactInfo;