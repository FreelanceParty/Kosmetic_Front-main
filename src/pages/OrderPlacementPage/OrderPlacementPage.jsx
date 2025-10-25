import React, {useEffect, useState} from "react";
import DangerIcon from "../../components/Icons/DangerIcon";
import Button from "../../components/ButtonNew/Button";
import {useDispatch, useSelector} from "react-redux";
import {getIsLoggedIn, getOptUser, getUserEmail, getUserFirstName, getUserLastName, getUserNumber} from "../../redux/auth/selectors";
import {selectCart} from "../../redux/cart/selectors";
import PersonalInfoSection from "./PersonalInfoSection";
import axios from "axios";
import {toast} from "react-toastify";
import {deleteAll} from "../../redux/cart/slice";
import CompletedOrder from "./CompletedOrder";
import {trackPurchase} from "../../ads/AdEvents";

const COURIER_DELIVERY_TYPE = 1;
const POST_OFFICE_DELIVERY_TYPE = 2;

const POST_PAYMENT = 1;
const PAYMENT_BY_BANK_TRANSFER = 2;

const API_URL = process.env.REACT_APP_API_URL;

const OrderPlacementPage = () => {
	const dispatch = useDispatch();

	const [isOrderCompleted, setIsOrderCompleted] = useState(false);
	const [isValidForm, setIsValidForm] = useState(false);

	const userEmail = useSelector(getUserEmail);
	const userFirstName = useSelector(getUserFirstName);
	const userLastName = useSelector(getUserLastName);
	const userNumber = useSelector(getUserNumber);
	const isOptUser = useSelector(getOptUser);
	const isLoggedIn = useSelector(getIsLoggedIn);

	const orderNumber = (() => {
		const currentTime = new Date();
		const hours = currentTime.getHours();
		const minutes = String(currentTime.getMinutes()).padStart(2, "0");
		const seconds = String(currentTime.getSeconds()).padStart(2, "0");
		const ms = String(currentTime.getMilliseconds()).padStart(3, "0");
		return `${hours}${minutes}${seconds}${ms}`;
	})();

	const cartItems = useSelector(selectCart);
	const updateItems = cartItems.filter((card) =>
		cartItems.some((item) => {
			if (item.code === card.code && item.amount === 0) {
				return false;
			}
			return item.code === card.code;
		})
	);
	const totalAmount = isOptUser
		? updateItems.reduce(
			(total, item) => total + item.priceOPT * item.quantity,
			0
		)
		: updateItems.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
	const orderedItems = updateItems.map((item) => ({
		productId: item.id || item.productId,
		images:    item.images,
		name:      item.name,
		sale:      item.sale,
		code:      item.code.toString(),
		quantity:  item.quantity,
		amount:    (isOptUser ? item.priceOPT : item.price) * item.quantity,
	}));

	const [formData, setFormData] = useState({
		email:          userEmail,
		firstName:      userFirstName,
		lastName:       userLastName,
		number:         userNumber || "+380",
		city:           null,
		paymentMethod:  "Оплата за реквізитами",
		deliveryMethod: null,
		orderNumber:    orderNumber,
		isOptUser:      isOptUser,
		comments:       null,
		status:         "Новий",
		amount:         totalAmount,
		orderedItems:   orderedItems,
	});

	const dataToSendCourier = {
		...formData,
		address:   formData.address,
		building:  formData.building,
		apartment: formData.apartment,
	};

	const dataToSendWarehouse = {
		...formData,
		warehouse: formData.warehouse,
	};

	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setFormData({...formData, [name]: value});
	};
	useEffect(() => {
		validateForm(false);
	}, [formData]);

	const validateForm = (withErrorMessage) => {
		if (totalAmount === 0) {
			showErrorMessage("Для замовлення потрібно щось обрати!", withErrorMessage);
			setIsValidForm(false);
			return;
		}
		if (isOptUser && totalAmount < 3000) {
			showErrorMessage("Мінімальна сума замовлення 3000 грн!", withErrorMessage);
			setIsValidForm(false);
			return;
		}

		if (!formData.city) {
			showErrorMessage("Будь ласка, виберіть місто", withErrorMessage);
			setIsValidForm(false);
			return;
		}
		if (!formData.deliveryMethod) {
			showErrorMessage("Будь ласка, виберіть спосіб доставки", withErrorMessage);
			setIsValidForm(false);
			return;
		} else if (formData.deliveryMethod === "Доставка кур'єром") {
			if (!formData.address) {
				showErrorMessage("Будь ласка, виберіть місто", withErrorMessage);
				setIsValidForm(false);
				return;
			}
			if (!formData.building) {
				showErrorMessage("Будь ласка, виберіть будинок", withErrorMessage);
				setIsValidForm(false);
				return;
			}
		} else if (formData.deliveryMethod === "Доставка на відділення Нової Пошти") {
			if (!formData.warehouse) {
				showErrorMessage("Будь ласка, виберіть відділення НП", withErrorMessage);
				setIsValidForm(false);
				return;
			}
		}
		if (orderNumber === "") {
			showErrorMessage("Щось пішло не так, спробуйте ще раз, або зверніться до адміністратора", withErrorMessage);
			setIsValidForm(false);
			return;
		}
		if (!formData.firstName) {
			showErrorMessage("Введіть ім'я отримувача.", withErrorMessage);
			setIsValidForm(false);
			return;
		}
		if (!formData.lastName) {
			showErrorMessage("Введіть прізвище отримувача.", withErrorMessage);
			setIsValidForm(false);
			return;
		}

		if (!formData.number) {
			showErrorMessage("Введіть номер телефону отримувача.", withErrorMessage);
			setIsValidForm(false);
			return;
		}
		const phonePattern = /^\+380\d{9}$/;
		const trimmedValue = formData.number;

		const isPhoneValid = phonePattern.test(trimmedValue);

		if (!isPhoneValid) {
			showErrorMessage("Введіть коректний номер телефону з 12 цифр, включаючи +380", withErrorMessage);
			setIsValidForm(false);
			return;
		}
		if (!formData.email) {
			showErrorMessage("Введіть адресу вашої пошти.", withErrorMessage, {
				className: "custom-toast",
			});
			setIsValidForm(false);
		}
		setIsValidForm(true);

		function showErrorMessage(errorMessage, isShow, options) {
			if (!isShow) {
				return;
			}
			toast.error(errorMessage, options);
		}
	}

	const submitOrder = async () => {

		try {
			validateForm(true);
			if (!isValidForm) {
				return;
			}

			const dataToSend = formData.deliveryMethod === "Доставка кур'єром" ? dataToSendCourier : dataToSendWarehouse;

			if (dataToSend.comments === null) {
				delete dataToSend.comments;
			}
			const response = await axios.post(`${API_URL}/orders`, dataToSend);

			if (!response.status === 201) {
				throw new Error(
					response.data.message || "Помилка створення замовлення"
				);
			}
			try {
				const userDataSelectors = {em: userEmail, ph: userNumber, fn: userFirstName, ln: userLastName};
				await trackPurchase(totalAmount, orderedItems, userDataSelectors)
			} catch (error) {
				console.error("Помилка розміщення замовлення:", error);
			}
			if (isLoggedIn) {
				removeCartItem();
			}
			dispatch(deleteAll());
			setFormData({
				email:          userEmail || "",
				firstName:      userFirstName || "",
				lastName:       userLastName || "",
				number:         userNumber || null,
				city:           "",
				orderNumber:    "",
				paymentMethod:  "",
				deliveryMethod: "",
				comments:       "",
				address:        "",
				building:       "",
				apartment:      "",
				isOptUser:      isOptUser,
			});
			setIsOrderCompleted(true);
		} catch (error) {
			console.error("Помилка створення замовлення:", error);
			toast.error(`Помилка створення замовлення: ${error.message}`);
		} finally {
			setIsValidForm(false);
		}
	};
	const removeCartItem = async () => {
		try {
			await axios.delete(`${API_URL}/basket`);
		} catch (error) {
			console.error("Помилка видалення товарів з кошика:", error);
		}
	};

	return (
		<>
			{isOrderCompleted
				?
				<CompletedOrder orderNumber={orderNumber}/>
				:
				<div
					className="flex flex-col sm:flex-row gap-8 sm:gap-[clamp(10px,2vw,80px)] pt-10 px-5 justify-start sm:justify-center items-center sm:items-start">
					<div className="flex flex-col sm:hidden gap-5">
						<div className="font-semibold text-lg text-center leading-[13px] p-[10px] border-b border-[#F6F6F6]">ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</div>
						<div className="flex flex-col">
							<div className="flex flex-col gap-1 pr-5 max-h-[350px] overflow-y-auto">
								{cartItems.map((product, index) => (
									<div key={index} className="flex border-b border-[#E8E8E8]">
										<div className="flex items-center justify-center my-auto h-[52px] aspect-square">
											<img src={product.images} alt="product"/>
										</div>
										<div className="flex flex-col gap-5 py-[10px] px-3">
											<div className="text-[13px] line-clamp-4 w-full leading-[15px]">{product.name}</div>
											<div className="flex justify-between">
												<div className="text-md">{product.quantity} шт.</div>
												<div className="font-semibold text-md">{isOptUser ? product.priceOPT : product.price} грн</div>
											</div>
										</div>
									</div>
								))}
							</div>
							<div className="flex justify-between py-4 border-b border-[#E8E8E8]">
								<div className="font-semibold leading-[10px]">ВСЬОГО:</div>
								<div className="font-bold leading-[10px]">{totalAmount} ГРН</div>
							</div>

							<div className="px-[30px] py-5 bg-[#EBFCEC] font-semibold text-[#007504] rounded-[3px] w-full uppercase mt-4">
								замовлення здійснені на вихідних обробляються у понеділок.
								дякуємо за розуміння!
							</div>
						</div>
					</div>
					<PersonalInfoSection
						handleInputChange={handleInputChange}
						formData={formData}
						setFormData={setFormData}
					/>
					<div className="flex flex-col sm:hidden gap-[30px] items-center mb-10 max-w-[400px]">
						<Button
							type="primary-pink"
							text="ОФОРМИТИ ЗАМОВЛЕННЯ"
							classes="h-[51px] w-full"
							onClick={submitOrder}
							//isDisabled={!isValidForm}
						/>
						<div className="flex gap-[10px]">
							<DangerIcon classes="mt-1 min-h-[14px] min-w-[14px]"/>
							<div className="text-md">
								Відправка протягом 1-3 днів з моменту оформлення замовлення!
							</div>
						</div>
					</div>
					<div className="hidden sm:flex flex-col gap-[30px] max-w-[760px]">
						<div className="font-semibold text-lg leading-[13px]">ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</div>
						<div className="flex flex-col gap-[10px] pr-5">
							{cartItems.map((product, index) => (
								<div key={index} className="flex border-b items-center">
									<div className="flex h-[36px] aspect-square">
										<img src={product.images} alt="product"/>
									</div>
									<div className="flex gap-5 py-[10px] px-3 items-center">
										<div className="text-[13px] line-clamp-3 w-3/5 leading-[15px]">{product.name}</div>
										<div className="text-md w-1/5 text-center">{product.quantity} шт.</div>
										<div className="font-semibold text-md w-1/5 text-end">{isOptUser ? product.priceOPT : product.price} грн</div>
									</div>
								</div>
							))}
						</div>
						<div className="flex gap-[58px] justify-end">
							<div className="font-semibold text-lg leading-[13px]">ВСЬОГО:</div>
							<div className="font-bold text-xl leading-[14px]">{totalAmount} ГРН</div>
						</div>
						<div className="flex flex-col lg:flex-row gap-[clamp(10px,2vw,30px)] items-center">
							<Button
								type="primary-pink"
								text="ОФОРМИТИ ЗАМОВЛЕННЯ"
								classes="h-[51px] w-full max-w-full lg:max-w-[293px]"
								onClick={submitOrder}
								//isDisabled={!isValidForm}
							/>
							<div className="flex gap-[10px]">
								<DangerIcon classes="mt-1 min-h-[14px] min-w-[14px]"/>
								<div className="text-md">
									Відправка протягом 1-3 днів з моменту оформлення замовлення!
								</div>
							</div>
						</div>
						<div className="px-[30px] py-5 bg-[#EBFCEC] font-semibold text-[#007504] rounded-[3px] w-full uppercase">
							замовлення здійснені на вихідних обробляються у понеділок.
							дякуємо за розуміння!
						</div>
					</div>
				</div>
			}
		</>
	);
}
export default OrderPlacementPage