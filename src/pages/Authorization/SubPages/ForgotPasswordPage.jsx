import Button from "../../../components/ButtonNew/Button";
import Input from "../../../components/Input/Input";
import {useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import InfoIcon from "../../../components/Icons/InfoIcon";

const API_URL = process.env.REACT_APP_API_URL;

const ForgotPasswordPage = () => {
	const navigate = useNavigate();

	const emailNotFoundMessage = 'E-mail не знайдено',
	      wrongFormatMessage   = 'Невірний формат E-mail';

	const [email, setEmail]               = useState(''),
	      [isValidEmail, setIsValidEmail] = useState(false),
	      [errorMessage, setErrorMessage] = useState(wrongFormatMessage),
	      [isShowError, setIsShowError]   = useState(false);

	function handleInputChange(e) {
		setIsShowError(false);
		setEmail(e.target.value);
		const isValidEmail = validateEmail(e.target.value);
		setIsValidEmail(isValidEmail);
		if (!isValidEmail) {
			setErrorMessage(wrongFormatMessage);
		}
	}

	function handleInputBlur(e) {
		if (!isValidEmail) {
			setIsShowError(true);
		}
	}

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const valid = validateEmail(email);
			setIsValidEmail(valid);
			if (!valid) {
				toast.error("Невірний формат електронної пошти");
				return;
			}

			const response = await axios.post(`${API_URL}/auth/restorePassword`, {email});
			if (response.status === 200) {
				toast.info("Вам надіслана інструкція на електронну пошту");
				navigate(`/`);
			}
		} catch (error) {
			if (error.status && error.status === 404) {
				setIsShowError(true);
				setIsValidEmail(false);
				setErrorMessage(emailNotFoundMessage);
			} else {
				// todo: add tg message
				toast.error(`Сталась помилка!`);
			}
		}
	};

	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
		return re.test(email);
	};

	return (
		<div className="flex flex-col mx-auto w-full items-center pt-10 gap-10 max-w-[409px]">
			<div className="font-semibold text-lg uppercase text-center">ЗАБУЛИ ПАРОЛЬ?<br/>ВВЕДІТЬ ВАШ E-MAIL.</div>
			<div className="flex flex-col gap-6 w-full">
				<div className="flex flex-col gap-2">
					<Input
						value={email}
						type="email"
						name="email"
						placeholder="E-mail*"
						onChange={(e) => handleInputChange(e)}
						onBlur={(e) => handleInputBlur(e)}
						inputClasses={`${isShowError ? 'border-[#E667A4]' : ''}`}
					>
					</Input>
					<div className={`text-xs text-[#B90003] ${isShowError ? '' : 'hidden'}`}>{errorMessage}</div>
				</div>
				<div className="flex gap-2 items-center">
					<InfoIcon classes="min-w-[18px] min-h-[18px]"/>
					<div className=" leading-[16px]">Ми надішлемо лист з інструкцією на вказаний e-mail.</div>
				</div>
			</div>
			<Button
				type="primary"
				classes={`w-full h-[53px] mb-[50px] md:mb-0`}
				text="НАДІСЛАТИ ІНСТРУКЦІЮ"
				onClick={(e) => handleFormSubmit(e)}
				isDisabled={!isValidEmail}
			/>
		</div>
	);
};
export default ForgotPasswordPage;