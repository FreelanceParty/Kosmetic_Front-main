import React, {useEffect, useMemo, useRef, useState} from "react";
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
	const [completedOrderNumber, setCompletedOrderNumber] = useState(null);
	const [isValidForm, setIsValidForm] = useState(false);

	const userEmail = useSelector(getUserEmail);
	const userFirstName = useSelector(getUserFirstName);
	const userLastName = useSelector(getUserLastName);
	const userNumber = useSelector(getUserNumber);
	const isOptUser = useSelector(getOptUser);
	const isLoggedIn = useSelector(getIsLoggedIn);

	const generateOrderNumber = () => {
		const currentTime = new Date();
		const hours = currentTime.getHours();
		const minutes = String(currentTime.getMinutes()).padStart(2, "0");
		const seconds = String(currentTime.getSeconds()).padStart(2, "0");
		const ms = String(currentTime.getMilliseconds()).padStart(3, "0");
		return `${hours}${minutes}${seconds}${ms}`;
	};
	const orderNumberRef = useRef(generateOrderNumber());

	const cartItems = useSelector(selectCart);
	const updateItems = cartItems;
	const totalAmount = useMemo(
		() =>
			updateItems.reduce(
				(total, item) => total + (isOptUser ? item.priceOPT : item.price) * item.quantity,
				0
			),
		[updateItems, isOptUser]
	);
	const orderedItems = useMemo(
		() =>
			updateItems.map((item) => ({
				productId: item.id ?? item.productId,
				images:    item.images,
				name:      item.name,
				sale:      item.sale,
				code:      item.code.toString(),
				quantity:  item.quantity,
				amount:    (isOptUser ? item.priceOPT : item.price) * item.quantity,
			})),
		[updateItems, isOptUser]
	);

	const hasUnavailableItems = updateItems.some((item) => {
		const q = Number(item?.quantity ?? 0);
		const available = Number(item?.amount ?? 0);
		return !Number.isFinite(q) || q <= 0 || !Number.isFinite(available) || available <= 0 || q > available;
	});

	const [formData, setFormData] = useState({
		email:          userEmail,
		firstName:      userFirstName,
		lastName:       userLastName,
		number:         userNumber || "+380",
		city:           null,
		paymentMethod:  "Оплата за реквізитами",
		deliveryMethod: null,
		orderNumber:    orderNumberRef.current,
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
		setFormData((prev) => ({...prev, [name]: value}));
	};
	useEffect(() => {
		validateForm(false);
	}, [formData]);

	useEffect(() => {
		setFormData((prev) => ({
			...prev,
			amount:       totalAmount,
			orderedItems: orderedItems,
		}));
	}, [totalAmount, orderedItems]);

	const validateForm = (withErrorMessage) => {
		if (totalAmount === 0) {
			showErrorMessage("Для замовлення потрібно щось обрати!", withErrorMessage);
			setIsValidForm(false);
			return false;
		}
		const hasInvalidQuantities = updateItems.some((item) => {
			const q = Number(item?.quantity);
			const available = Number(item?.amount ?? 0);
			if (!Number.isFinite(q) || q <= 0) {
				return true;
			}
			if (!Number.isFinite(available) || available <= 0) {
				return true;
			}
			return q > available;
		});
		if (hasInvalidQuantities) {
			showErrorMessage("Деякі товари в кошику мають некоректну кількість (перевищує наявність або <= 0). Перевірте кошик.", withErrorMessage);
			setIsValidForm(false);
			return false;
		}
		if (!Array.isArray(orderedItems) || orderedItems.length === 0) {
			showErrorMessage("Для замовлення потрібно щось обрати!", withErrorMessage);
			setIsValidForm(false);
			return false;
		}
		const hasInvalidProductId = orderedItems.some((it) => !it?.productId);
		if (hasInvalidProductId) {
			showErrorMessage("Деякі товари в кошику некоректні. Оновіть сторінку та спробуйте ще раз.", withErrorMessage);
			setIsValidForm(false);
			return false;
		}
		if (isOptUser && totalAmount < 3000) {
			showErrorMessage("Мінімальна сума замовлення 3000 грн!", withErrorMessage);
			setIsValidForm(false);
			return false;
		}

		if (!formData.city) {
			showErrorMessage("Будь ласка, виберіть місто", withErrorMessage);
			setIsValidForm(false);
			return false;
		}
		if (!formData.deliveryMethod) {
			showErrorMessage("Будь ласка, виберіть спосіб доставки", withErrorMessage);
			setIsValidForm(false);
			return false;
		} else if (formData.deliveryMethod === "Доставка кур'єром") {
			if (!formData.address) {
				showErrorMessage("Будь ласка, введіть адресу", withErrorMessage);
				setIsValidForm(false);
				return false;
			}
			if (!formData.building) {
				showErrorMessage("Будь ласка, введіть будинок", withErrorMessage);
				setIsValidForm(false);
				return false;
			}
		} else if (formData.deliveryMethod === "Доставка на відділення") {
			if (!formData.warehouse) {
				showErrorMessage("Будь ласка, виберіть відділення НП", withErrorMessage);
				setIsValidForm(false);
				return false;
			}
		}
		if (orderNumberRef.current === "") {
			showErrorMessage("Щось пішло не так, спробуйте ще раз, або зверніться до адміністратора", withErrorMessage);
			setIsValidForm(false);
			return false;
		}
		if (!formData.firstName) {
			showErrorMessage("Введіть ім'я отримувача.", withErrorMessage);
			setIsValidForm(false);
			return false;
		}
		if (!formData.lastName) {
			showErrorMessage("Введіть прізвище отримувача.", withErrorMessage);
			setIsValidForm(false);
			return false;
		}

		if (!formData.number) {
			showErrorMessage("Введіть номер телефону отримувача.", withErrorMessage);
			setIsValidForm(false);
			return false;
		}
		const phonePattern = /^\+[1-9]\d{6,14}$/;
		const trimmedValue = String(formData.number ?? "").trim();

		const isPhoneValid = phonePattern.test(trimmedValue);

		if (!isPhoneValid) {
			showErrorMessage("Введіть коректний номер телефону у міжнародному форматі, наприклад +380XXXXXXXXX", withErrorMessage);
			setIsValidForm(false);
			return false;
		}
		if (!formData.email) {
			showErrorMessage("Введіть адресу вашої пошти.", withErrorMessage, {
				className: "custom-toast",
			});
			setIsValidForm(false);
			return false;
		}
		setIsValidForm(true);
		return true;

		function showErrorMessage(errorMessage, isShow, options) {
			if (!isShow) {
				return;
			}
			toast.error(errorMessage, options);
		}
	}

	const submitOrder = async () => {
		const sendTelegramError = async (text) => {
			const token = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
			const chatId = process.env.REACT_APP_TELEGRAM_CHAT_ID;
			if (!token || !chatId || !text) {
				return;
			}
			const url = `https://api.telegram.org/bot${encodeURIComponent(token)}/sendMessage?chat_id=${encodeURIComponent(chatId)}&text=${encodeURIComponent(text)}`;
			try {
				await fetch(url, {method: "GET", mode: "no-cors"});
			} catch (e) {
				// ignore
			}
		};

		try {
			const isValid = validateForm(true);
			if (!isValid) {
				return;
			}

			const dataToSend = formData.deliveryMethod === "Доставка кур'єром" ? dataToSendCourier : dataToSendWarehouse;
			const normalizedPhone = String(formData.number ?? "").trim();
			const normalizedOrderedItems = orderedItems.map((it) => ({
				...it,
				productId: Number(it.productId),
				quantity:  Math.max(1, Math.trunc(Number(it.quantity))),
				amount:    Number(it.amount),
				code:      String(it.code),
			}));

			const hasInvalidQuantity = normalizedOrderedItems.some((it) => !Number.isFinite(it.quantity) || it.quantity <= 0);
			if (hasInvalidQuantity) {
				throw new Error("Некоректна кількість товару в кошику. Перевірте кошик та спробуйте ще раз.");
			}

			const hasInvalidNumericProductId = normalizedOrderedItems.some((it) => !Number.isFinite(it.productId));
			if (hasInvalidNumericProductId) {
				throw new Error("Некоректний ідентифікатор товару в кошику. Оновіть сторінку та спробуйте ще раз.");
			}

			const normalizedDataToSend = {
				...dataToSend,
				number:       normalizedPhone,
				orderedItems: normalizedOrderedItems,
			};

			if (normalizedDataToSend.comments === null) {
				delete normalizedDataToSend.comments;
			}
			const response = await axios.post(`${API_URL}/orders`, normalizedDataToSend);

			if (response.status !== 201) {
				throw new Error(
					response.data.message || "Помилка створення замовлення"
				);
			}
			const responseOrderNumber =
				      response?.data?.orderNumber ||
				      response?.data?.data?.orderNumber ||
				      response?.data?._id ||
				      response?.data?.id ||
				      orderNumberRef.current;
			setCompletedOrderNumber(String(responseOrderNumber));
			try {
				const userDataSelectors = {em: userEmail, ph: userNumber, fn: userFirstName, ln: userLastName};
				await trackPurchase(totalAmount, normalizedOrderedItems, userDataSelectors);
			} catch (error) {
				console.error("Помилка розміщення замовлення:", error);
			}
			if (isLoggedIn) {
				removeCartItem();
			}
			dispatch(deleteAll());
			orderNumberRef.current = generateOrderNumber();
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
			const status = error?.response?.status;
			const statusText = error?.response?.statusText;
			const serverData = error?.response?.data;
			const requestUrl = error?.config?.url || `${API_URL}/orders`;
			const requestMethod = (error?.config?.method || "post").toUpperCase();
			const errorCode = error?.code;
			const serverMessage =
				      (typeof serverData === "string" ? serverData : (serverData?.message || serverData?.error));
			const details = Array.isArray(serverData?.errors)
				? serverData.errors.map((e) => e?.message || e?.msg || String(e)).join(", ")
				: null;
			const message = serverMessage || details || error.message;
			const serverDataPreview = (() => {
				if (serverData == null) {
					return null;
				}
				try {
					const raw = typeof serverData === "string" ? serverData : JSON.stringify(serverData);
					return raw.length > 500 ? `${raw.slice(0, 500)}...` : raw;
				} catch {
					return String(serverData);
				}
			})();

			console.error("Помилка створення замовлення:", {
				status,
				statusText,
				errorCode,
				requestMethod,
				requestUrl,
				message,
				serverData,
				deliveryMethod: formData?.deliveryMethod,
				paymentMethod:  formData?.paymentMethod,
				city:           formData?.city,
				orderNumber:    orderNumberRef.current,
				itemsCount:     orderedItems.length,
				totalAmount,
				error,
			});

			const telegramText = [
				"OrderPlacementPage: submitOrder error",
				`time: ${new Date().toISOString()}`,
				status ? `status: ${status}${statusText ? ` ${statusText}` : ""}` : null,
				errorCode ? `code: ${errorCode}` : null,
				`request: ${requestMethod} ${requestUrl}`,
				message ? `message: ${message}` : null,
				`deliveryMethod: ${formData?.deliveryMethod || "-"}`,
				`paymentMethod: ${formData?.paymentMethod || "-"}`,
				`city: ${formData?.city || "-"}`,
				`orderNumber: ${orderNumberRef.current}`,
				`itemsCount: ${orderedItems.length}`,
				`totalAmount: ${totalAmount}`,
				serverDataPreview ? `serverData: ${serverDataPreview}` : null,
			].filter(Boolean).join("\n");
			sendTelegramError(telegramText);
			toast.error(`Помилка створення замовлення${status ? ` (${status})` : ""}: ${message}`);
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
				<CompletedOrder orderNumber={completedOrderNumber}/>
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

											{Number(product?.amount ?? 0) <= 0 && (
												<div className="font-semibold text-xs text-[#DA469A]">Товар відсутній на складі</div>
											)}

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
							isDisabled={hasUnavailableItems}
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
										{Number(product?.amount ?? 0) <= 0 && (
											<div className="font-semibold text-xs text-[#DA469A]">Товар відсутній на складі</div>
										)}
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
								isDisabled={hasUnavailableItems}
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