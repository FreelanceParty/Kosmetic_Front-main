import {useState} from "react";
import {Row, Input, Button, CheckboxGroup, Checkbox, Label} from "./RegisterForm.styled";

const RegisterForm = ({onSubmit, opt = false}) => {
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
		optUser:     opt,
	});

	const [isRegistered, setIsRegistered] = useState(false);

	const handleChange = (e) => {
		const {name, value, type, checked} = e.target;
		const fieldValue = type === "checkbox" ? checked : value;
		setFormData((prev) => ({...prev, [name]: fieldValue}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (onSubmit) {
				await onSubmit(formData);
			}
			setIsRegistered(true);
		} catch (error) {
			console.error("Помилка при реєстрації:", error);
			setIsRegistered(false);
		}
	};

	if (isRegistered) {
		return (
			<p style={{textAlign: "center", margin: "15px"}}>
				Ви успішно зареєструвалися{opt ? " як оптовий клієнт" : ""}, авторизуйтеся
			</p>
		);
	}

	return (
		<form onSubmit={handleSubmit}>
			<Row>
				<Input
					type="email"
					name="email"
					placeholder="Ваш Email"
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<Input
					type="password"
					name="password"
					placeholder="Пароль"
					value={formData.password}
					onChange={handleChange}
					required
				/>
			</Row>

			<Row>
				<Input
					type="text"
					name="firstName"
					placeholder="Ім'я"
					value={formData.firstName}
					onChange={handleChange}
					required
				/>
				<Input
					type="text"
					name="lastName"
					placeholder="Прізвище"
					value={formData.lastName}
					onChange={handleChange}
					required
				/>
			</Row>

			<Input
				type="tel"
				name="number"
				placeholder="Телефон"
				value={formData.number}
				onChange={handleChange}
				required
			/>

			{opt && (
				<>
					<Row>
						<Input
							type="text"
							name="city"
							placeholder="Місто"
							value={formData.city}
							onChange={handleChange}
						/>
					</Row>

					<CheckboxGroup>
						<Label>
							<Checkbox
								type="checkbox"
								name="onlineShop"
								checked={formData.onlineShop}
								onChange={handleChange}
							/>
							Онлайн магазин
						</Label>
						<Label>
							<Checkbox
								type="checkbox"
								name="offlineShop"
								checked={formData.offlineShop}
								onChange={handleChange}
							/>
							Офлайн магазин
						</Label>
						<Label>
							<Checkbox
								type="checkbox"
								name="socialMedia"
								checked={formData.socialMedia}
								onChange={handleChange}
							/>
							Сторінка у соцмережах
						</Label>
					</CheckboxGroup>

					<Input
						type="text"
						name="link"
						placeholder="Посилання на сайт (myshop.com)"
						value={formData.link}
						onChange={handleChange}
					/>
				</>
			)}

			<Button type="submit">Зареєструватись</Button>
		</form>
	);
};

export default RegisterForm;
