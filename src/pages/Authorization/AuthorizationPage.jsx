import Input from "../../components/Input/Input";
import Button from "../../components/ButtonNew/Button";
import InfoIcon from "../../components/Icons/InfoIcon";
import {useNavigate} from "react-router-dom";
import {logIn} from "../../redux/auth/operation";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {useState} from "react";
const AuthorizationPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		email:    "",
		password: "",
	});

	function loginDispatch() {
		dispatch(logIn(formData))
			.then((response) => {
				if (response.payload === "Email or password invalid") {
					toast.error("Логін або пароль ваказано не вірно!");
				}

				if (response.type === "auth/login/fulfilled") {
					navigate('/');
				}
			})
			.catch((error) => {
				console.error("Сталася помилка:", error);
			});
	}

	return (
		<div className="flex flex-col lg:flex-row gap-10 lg:gap-0 justify-center px-[100px]">
			<div className="flex flex-col px-[40px] xl:px-[70px] pt-[130px] w-full">
				<div className="flex flex-col gap-10 mb-[34px]">
					<div className="font-semibold text-lg leading-[19px] uppercase">
						Зареєстровані?<br/>
						Увійдіть у особистий кабінет
					</div>
					<div className="flex flex-col gap-[30px]">
						<Input
							value={formData.email}
							type="email"
							name="email"
							placeholder="E-mail*"
							onChange={(e) => setFormData(prev => ({...prev, [e.target.name]: e.target.value}))}
						/>
						<Input
							value={formData.password}
							type="password"
							name="password"
							placeholder="Пароль*"
							onChange={(e) => setFormData(prev => ({...prev, [e.target.name]: e.target.value}))}
						/>
					</div>
				</div>
				<a onClick={() => navigate('/forgot-password')} className="underline cursor-pointer mb-[50px]">Я забула(-в) свій пароль</a>
				<Button
					type="primary"
					text="УВІЙТИ"
					classes="h-[53px] w-[409px]"
					textClasses="font-medium text-lg"
					onClick={() => loginDispatch()}
				/>
			</div>
			<div className="flex flex-col gap-[38px] px-[40px] xl:px-[70px] py-[130px] w-full bg-[#F6F6F6]">
				<div className="font-semibold text-lg leading-[19px] uppercase">
					Це ваш перший візит?<br/>
					Зареєструйся
				</div>
				<div className="flex flex-col gap-3">
					<Button
						type="secondary"
						text="СТВОРИТИ ОПТОВИЙ КАБІНЕТ"
						classes="h-[53px] w-[425px]"
						textClasses="font-medium text-lg"
						onClick={() => navigate("/reg-opt-cabinet")}
					/>
					<div className="flex gap-2 items-center">
						<InfoIcon/>
						<div>Доступ до оптових цін</div>
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<Button
						type="secondary"
						text="СТВОРИТИ РОЗДРІБНИЙ КАБІНЕТ"
						classes="h-[53px] w-[425px]"
						textClasses="font-medium text-lg"
						onClick={() => navigate("/reg-personal-cabinet")}
					/>
					<div className="flex gap-2 items-center">
						<InfoIcon/>
						<div>Історія замовлень — завжди під рукою</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default AuthorizationPage;