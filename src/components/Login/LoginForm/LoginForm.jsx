import React, {useState} from "react";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {toast} from "react-toastify";
import {
	Input,
	Button,
	Message,
	LableInput,
	Wrap,
	WrapInput,
	ButtonWrapper,
	LoginWrapper,
	LinkStyle,
	ModalLoader,
} from "./LoginForm.styled";

const LoginForm = ({onSuccess, setShowModal, setIsLogin, setIsAdmin}) => {
	const [isLoading, setIsLoading] = useState(false);

	const initialValues = {
		email:    "",
		password: "",
	};

	const validationSchema = Yup.object().shape({
		email:    Yup.string()
			          .email("Не валідна адреса пошти")
			          .required("Введіть адресу електронної пошти"),
		password: Yup.string()
			          .min(6, "Пароль має містити не менше 6 символів")
			          .required("Введіть пароль"),
	});

	const handleSubmit = async (values) => {
		setIsLoading(true);
		try {
			const res = await axios.post(
				"https://kosmetic-back.onrender.com/api/auth/login",
				values
			);

			if (res.data?.token) {
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("isAdmin", res.data.isAdmin); // зберігаємо в localStorage
				localStorage.setItem("user", JSON.stringify(res.data));

				// оновлюємо локальний стан
				setIsLogin?.(true);
				setIsAdmin?.(res.data.isAdmin === true); // або res.data.isAdmin === "1" якщо тип строковий

				toast.success("Успішний вхід");
				setShowModal?.(false);
				onSuccess?.(res.data);
			} else {
				toast.error("Помилка при авторизації");
			}
		} catch (err) {
			toast.error(err.response?.data?.message || "Невірний логін або пароль");
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<ModalLoader>
				<p>Завантаження...</p>
			</ModalLoader>
		);
	}

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validationSchema={validationSchema}
		>
			<Form>
				<LoginWrapper>
					<Wrap>
						<WrapInput>
							<LableInput htmlFor="email">Ваш Email</LableInput>
							<Field as={Input} type="email" name="email" placeholder="Email"/>
							<Message component="div" name="email"/>
						</WrapInput>
						<WrapInput>
							<LableInput htmlFor="password">Пароль</LableInput>
							<Field
								as={Input}
								type="password"
								name="password"
								placeholder="Пароль"
							/>
							<Message component="div" name="password"/>
						</WrapInput>
					</Wrap>

					<LinkStyle to="/forgotten" onClick={() => setShowModal?.(false)}>
						Забули пароль?
					</LinkStyle>

					<ButtonWrapper>
						<Button type="submit">Авторизуватись</Button>
					</ButtonWrapper>
				</LoginWrapper>
			</Form>
		</Formik>
	);
};

export default LoginForm;
