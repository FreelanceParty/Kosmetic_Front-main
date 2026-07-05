import Button from "../../../components/ButtonNew/Button";
import Input from "../../../components/Input/Input";
import PhoneInputField from "../../../components/PhoneInputField/PhoneInputField";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {register} from "../../../redux/auth/operation";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {extractFieldErrors, resolveAuthMessage} from "../../../utils/helpers/authErrors";

const RegisterPersonalCabinetPage = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email:       "",
		password:    "",
		firstName:   "",
		lastName:    "",
		number:      "",
		city:        "misto",
		link:        "myshop.com",
		onlineShop:  false,
		offlineShop: false,
		socialMedia: false,
		optUser:     false,
	});
	const [phoneError, setPhoneError] = useState(null);
	const [fieldErrors, setFieldErrors] = useState({});

	const dispatch = useDispatch();

	const validatePhone = (raw) => {
		const phonePattern = /^\+[1-9]\d{6,14}$/;
		return phonePattern.test(String(raw ?? "").trim());
	};

	function registerDispatch() {
		const isPhoneValid = validatePhone(formData.number);
		setPhoneError(isPhoneValid ? null : "Невірний формат номеру");
		if (!isPhoneValid) {
			toast.error("Введіть коректний номер телефону у міжнародному форматі, наприклад +380XXXXXXXXX");
			return;
		}
		setFieldErrors({});
		dispatch(register(formData))
			.then((response) => {
				if (response.type === "auth/register/fulfilled") {
					navigate('/');
				} else {
					const payload = response.payload;
					setFieldErrors(extractFieldErrors(payload));
					toast.error(resolveAuthMessage(payload));
				}
			})
			.catch((error) => {
				console.error("Сталася помилка:", error);
			});
	}

	const inputs = [
		{key: "email", label: "E-mail*"},
		{key: "password", label: "Пароль*"},
		{key: "firstName", label: "Ім'я*"},
		{key: "lastName", label: "Прізвище*"},
		{key: "number", label: "Номер телефону*"},
	]
	return (
		<div className="flex flex-col mx-auto max-w-[409px] pt-10 px-5 md:px-0">
			<div className="font-semibold text-lg uppercase mb-[50px]">Реєстрація Особистого кабінету</div>
			<div className="flex flex-col gap-[30px] mb-10 w-full">
				{inputs.map((input, index) => (
					input.key === "number" ? (
						<PhoneInputField
							key={index}
							name={input.key}
							value={formData[input.key] || ""}
							onChange={(e) => setFormData(prev => ({...prev, [e.target.name]: e.target.value}))}
							onBlur={() => {
								const isPhoneValid = validatePhone(formData.number);
								setPhoneError(isPhoneValid ? null : "Невірний формат номеру");
							}}
							placeholder={input.label}
							inputClasses="h-[53px]"
							errorMessage={phoneError || fieldErrors[input.key]}
						/>
					) : (
						<Input
							key={index}
							value={formData[input.key] || ""}
							type={input.key === "email" ? "email" : input.key === "password" ? "password" : "text"}
							name={input.key}
							placeholder={input.label}
							onChange={(e) => setFormData(prev => ({...prev, [e.target.name]: e.target.value}))}
							errorMessage={fieldErrors[input.key]}
						/>
					)
				))}
			</div>
			<Button
				type="primary"
				classes="w-full h-[53px]"
				text="ЗАРЕЄСТРУВАТИСЬ"
				onClick={() => registerDispatch()}
			/>
		</div>
	);
};
export default RegisterPersonalCabinetPage;