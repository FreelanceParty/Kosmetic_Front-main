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

	const wrongCredsMessage  = 'Невірні дані',
	      wrongFormatMessage = 'Невірний формат E-mail';

	const [isValidEmail, setIsValidEmail]         = useState(false),
	      [errorMessage, setErrorMessage]         = useState(wrongFormatMessage),
	      [isShowEmailError, setIsShowEmailError] = useState(false);

	const [formData, setFormData] = useState({
		email:    "",
		password: "",
	});

	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
		return re.test(email);
	};

	function handleEmailChange(e) {
		setIsShowEmailError(false);
		const {name, value} = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		const isValidEmail = validateEmail(formData.email);
		setIsValidEmail(isValidEmail);
		if (!isValidEmail) {
			setErrorMessage(wrongFormatMessage);
		}
	}

	function handleInputBlur() {
		if (!isValidEmail) {
			setIsShowEmailError(true);
		}
	}

	function loginDispatch() {
		dispatch(logIn(formData))
			.then((response) => {
				if (response.payload === "Email or password invalid") {
					toast.error("Логін або пароль ваказано не вірно!");
				}

				if (response.type === "auth/login/fulfilled") {
					navigate('/');
				} else if (response.type === "auth/login/rejected") {
					setIsShowEmailError(true);
					setIsValidEmail(false);
					setErrorMessage(wrongCredsMessage);
				}
			})
			.catch((error) => {
				console.error("Сталася помилка:", error);
			});
	}

	return (
		<div className="flex flex-col lg:flex-row gap-10 lg:gap-0 justify-center items-center px-5 md:px-[100px]">
			<div className="flex flex-col px-[40px] xl:px-[70px] pt-20 md:pt-[130px] items-center">
				<div className="flex flex-col gap-10 mb-[34px] w-[350px] md:w-[409px]">
					<div className="font-semibold text-lg leading-[19px] uppercase">
						Зареєстровані?<br/>
						Увійдіть у особистий кабінет
					</div>
					<div className="flex flex-col gap-[30px]">
						<div className="flex flex-col gap-2">
							<Input
								value={formData.email}
								type="email"
								name="email"
								placeholder="E-mail*"
								onChange={(e) => handleEmailChange(e)}
								onBlur={(e) => handleInputBlur(e)}
							/>
							<div className={`text-xs text-[#B90003] ${isShowEmailError ? '' : 'hidden'}`}>{errorMessage}</div>
						</div>
						<Input
							value={formData.password}
							type="password"
							name="password"
							placeholder="Пароль*"
							onChange={(e) => setFormData(prev => ({...prev, [e.target.name]: e.target.value}))}
							onBlur={(e) => handleInputBlur(e)}
						/>
					</div>
				</div>
				<a onClick={() => navigate('/forgot-password')} className="underline cursor-pointer mb-[50px]">Я забула(-в) свій пароль</a>
				<Button
					type="primary"
					text="УВІЙТИ"
					classes="h-[53px] w-[350px] md:w-[409px]"
					textClasses="font-medium text-lg"
					onClick={() => loginDispatch()}
					isDisabled={!isValidEmail}
				/>
			</div>
			<div className="flex flex-col gap-[38px] px-[40px] xl:px-[70px] py-20 md:py-[130px] w-fit bg-[#F6F6F6]">
				<div className="font-semibold text-lg leading-[19px] uppercase">
					Це ваш перший візит?<br/>
					Зареєструйся
				</div>
				<div className="flex flex-col gap-3">
					<Button
						type="secondary"
						text="СТВОРИТИ ОПТОВИЙ КАБІНЕТ"
						classes="h-[53px] w-full max-w-[425px] px-2"
						textClasses="font-medium text-sm md:text-lg"
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
						classes="h-[53px] w-full max-w-[425px] px-2"
						textClasses="font-medium text-sm md:text-lg"
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