import Button from "../../../components/ButtonNew/Button";
import Input from "../../../components/Input/Input";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {register} from "../../../redux/auth/operation";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

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

	const dispatch = useDispatch();

	function registerDispatch() {
		dispatch(register(formData))
			.then((response) => {
				if (response.type === "auth/register/fulfilled") {
					navigate('/');
				} else {
					toast.error("Сталась помилка, спробуйте ще раз");
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
		<div className="flex flex-col mx-auto max-w-[409px] pt-10">
			<div className="font-semibold text-lg uppercase mb-[50px]">Реєстрація Особистого кабінету</div>
			<div className="flex flex-col gap-[30px] mb-10 w-full">
				{inputs.map((input, index) => (
					<Input
						key={index}
						value={formData[input.key] || ""}
						type={input.key === "email" ? "email" : input.key === "password" ? "password" : "text"}
						name={input.key}
						placeholder={input.label}
						onChange={(e) => setFormData(prev => ({...prev, [e.target.name]: e.target.value}))}
					/>
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