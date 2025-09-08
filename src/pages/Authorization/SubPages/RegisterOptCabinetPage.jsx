import Button from "../../../components/ButtonNew/Button";
import Input from "../../../components/Input/Input";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {register} from "../../../redux/auth/operation";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import Checkbox from "../../../components/Inputs/Checkbox";

const RegisterOptCabinetPage = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email:       "",
		password:    "",
		firstName:   "",
		lastName:    "",
		number:      "",
		city:        "",
		link:        "",
		onlineShop:  false,
		offlineShop: false,
		socialMedia: false,
		optUser:     true,
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
		{key: "city", label: "Місто*"},
	]

	return (
		<div className="flex flex-col mx-auto w-full items-center pt-10 px-[100px]">
			<div className="font-semibold text-lg uppercase mb-[50px]">Реєстрація оптового кабінету</div>
			<div className="flex flex-col md:flex-row gap-[clamp(50px,7vw,99px)] justify-center w-full max-w-[909px]">
				<div className="flex flex-col gap-[30px] w-full">
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
				<div className="flex flex-col gap-[clamp(50px,7vw,99px)] md:gap-0 justify-between w-full">
					<div className="flex flex-col gap-10">
						<div className="flex flex-col gap-5">
							<div className="font-semibold text-md leading-[11px]">Тип вашого магазину</div>
							<Checkbox label="Онлайн магазин" onChange={(e) => setFormData(prev => ({...prev, ['onlineShop']: !formData.onlineShop}))}/>
							<Checkbox label="Офлайн магазин" onChange={(e) => setFormData(prev => ({...prev, ['offlineShop']: !formData.offlineShop}))}/>
							<Checkbox label="Сторінка у соц. мережах" onChange={(e) => setFormData(prev => ({...prev, ['socialMedia']: !formData.socialMedia}))}/>
						</div>
						<div className="flex flex-col gap-5">
							<div className="font-semibold text-md leading-[16px]">Введіть посилання на ваш сайт або сторінку</div>
							<Input
								value={formData.link}
								type="text"
								name="link"
								placeholder="MyShop.com"
								onChange={(e) => setFormData(prev => ({...prev, [e.target.name]: e.target.value}))}
							/>
						</div>
					</div>
					<Button
						type="primary"
						classes="w-full h-[53px] mb-[50px] md:mb-0"
						text="ЗАРЕЄСТРУВАТИСЬ"
						onClick={() => registerDispatch()}
					/>
				</div>
			</div>
		</div>
	);
};
export default RegisterOptCabinetPage;