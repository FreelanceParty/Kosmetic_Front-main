import Input from "../../../components/Input/Input";
import Button from "../../../components/ButtonNew/Button";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const ChangePassword = () => {
	const [newPasswordError, setNewPasswordError] = useState(null);
	const [formData, setFormData] = useState({
		oldPassword: "",
		newPassword: "",
	});

	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setFormData({...formData, [name]: value});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.post(`${API_URL}/auth/changePassword`, formData);
			setFormData({
				oldPassword: "",
				newPassword: "",
			});
			toast.info(
				"Пароль змінено. Новий пароль набуде чинності через 2 хвилини."
			);
		} catch (error) {
			if (error.response && error.response.status === 401) {
				toast.error("Ви ввели невірний діючий пароль.");
			} else {
				console.error("Помилка при відправці запиту:", error);
			}
		}
	};

	function validatePassword() {
		if (formData.newPassword.length < 6) {
			setNewPasswordError("Занадто короткий пароль");
		} else {
			setNewPasswordError(null);
		}
	}

	useEffect(() => {
		validatePassword();
	}, [formData.newPassword]);

	return (
		<div className="flex flex-col">
			<div className="hidden md:flex flex-col gap-4 mb-6">
				<div className="font-semibold text-lg leading-[13px]">ЗМІНИТИ ПАРОЛЬ</div>
				<div className="border-t border-[#E8E8E8]"/>
			</div>
			<div className="flex flex-col gap-4 md:gap-[30px] mb-6 md:mb-10 max-w-[610px]">
				<div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0">
					<div className="text-sm md:text-lg whitespace-nowrap">СТАРИЙ ПАРОЛЬ<span className="text-[#E667A4]">*</span></div>
					<Input
						type="password"
						name="oldPassword"
						containerClasses={`max-w-[409px]`}
						inputClasses="h-[53px] !bg-[#f6f6f6]"
						onChange={handleInputChange}
					/>
				</div>
				<div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0">
					<div className="text-sm md:text-lg whitespace-nowrap">НОВИЙ ПАРОЛЬ<span className="text-[#E667A4]">*</span></div>
					<Input
						type="password"
						name="newPassword"
						containerClasses={`max-w-[409px]`}
						inputClasses={`h-[53px] !bg-[#f6f6f6]`}
						onChange={handleInputChange}
						errorMessage={newPasswordError}
					/>
				</div>
			</div>
			<Button
				type="primary"
				text="ЗБЕРЕГТИ ЗМІНИ"
				classes="h-[53px] w-full max-w-[409px] max-w-[227px]"
				isDisabled={newPasswordError !== null}
				onClick={handleSubmit}
			/>
		</div>
	);
};
export default ChangePassword;