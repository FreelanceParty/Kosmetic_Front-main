import {selectCart} from "../../redux/cart/selectors";
import {useDispatch, useSelector} from "react-redux";
import EmptyBasketIcon from "../../components/Icons/EmptyBasketIcon";
import React, {useEffect, useState} from "react";
import Button from "../../components/ButtonNew/Button";
import NumberInput from "../../components/NumberInput/NumberInput";
import DeleteIcon from "../../components/Icons/DeleteIcon";
import {handleRemoveFromCart, refreshCartAvailability} from "../../utils/helpers/basket";
import {getIsLoggedIn, getOptUser, getUserEmail, getUserFirstName, getUserLastName, getUserNumber} from "../../redux/auth/selectors";
import {addToCart} from "../../redux/cart/slice";
import {useNavigate} from "react-router-dom";
import {trackInitiateCheckout} from "../../ads/AdEvents";

const CartPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isOptUser = useSelector(getOptUser);

	const isLoggedIn = useSelector(getIsLoggedIn);
	const userEmail = useSelector(getUserEmail);
	const userFirstName = useSelector(getUserFirstName);
	const userLastName = useSelector(getUserLastName);
	const userNumber = useSelector(getUserNumber);
	const cartItems = useSelector(selectCart);
	const [notAvailableProductsAmount, setNotAvailableProductsAmount] = useState([])
	const getItemKey = (item) => item?.id ?? item?.productId;

	const totalAmount = isOptUser
		? cartItems.reduce(
			(total, item) => total + item.priceOPT * item.quantity,
			0
		)
		: cartItems.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);

	function updateQuantity(product, value) {
		const nextQuantityRaw = Number(value);
		const availableAmount = Number(product?.amount ?? 0);
		const productKey = getItemKey(product);
		if (!Number.isFinite(nextQuantityRaw)) {
			return;
		}
		if (!Number.isFinite(availableAmount) || availableAmount <= 0) {
			if (productKey) {
				setNotAvailableProductsAmount((prev) => (prev.includes(productKey) ? prev : [...prev, productKey]));
			}
			return;
		}
		const nextQuantity = Math.max(1, Math.min(Math.trunc(nextQuantityRaw), availableAmount));
		dispatch(addToCart({...product, quantity: nextQuantity}));

		if (nextQuantityRaw > availableAmount) {
			if (!productKey) {
				return;
			}
			setNotAvailableProductsAmount((prev) => (prev.includes(productKey) ? prev : [...prev, productKey]));
		} else {
			if (!productKey) {
				return;
			}
			setNotAvailableProductsAmount((prev) => prev.filter(id => id !== productKey));
		}
	}

	function removeFromCart(product) {
		handleRemoveFromCart({product, dispatch, isLoggedIn});
	}

	async function checkout() {
		const refreshed = await refreshCartAvailability({cartItems, dispatch});
		const hasUnavailable = refreshed.some((item) => {
			const q = Number(item?.quantity ?? 0);
			const available = Number(item?.amount ?? 0);
			return !Number.isFinite(q) || q <= 0 || !Number.isFinite(available) || available <= 0 || q > available;
		});
		if (hasUnavailable) {
			return;
		}
		trackInitiateCheckout(totalAmount, refreshed, {em: userEmail, fn: userFirstName, ln: userLastName, ph: userNumber});
		navigate("/order");
	}

	useEffect(() => {
		setNotAvailableProductsAmount(
			cartItems
				.filter((item) => {
					const q = Number(item?.quantity ?? 0);
					const available = Number(item?.amount ?? 0);
					return !Number.isFinite(q) || !Number.isFinite(available) || available <= 0 || q > available;
				})
				.map(getItemKey)
				.filter(Boolean)
		)
	}, [cartItems])

	return (
		<div className="flex flex-col pt-5">
			<div className="font-semibold text-lg leading-[13px] text-center py-[10px] border-b border-[#f6f6f6]">
				КОШИК
			</div>
			{cartItems.length === 0 ? (
				<div className="flex flex-col gap-[60px] items-center mt-[60px]">
					<EmptyBasketIcon classes={"w-[350px] h-[350px] py-[30px]"}/>
					<div className="flex flex-col gap-8 items-center">
						<div className="flex flex-col gap-4 text-center">
							<div className="font-semibold text-md leading-[11px]">КОШИК ПОРОЖНІЙ</div>
							<div className="font-semibold leading-[10px] text-[#64759B]">
								Але це ніколи не пізно виправити :)
							</div>
						</div>
						<Button
							type="primary"
							text="ВПЕРЕД ЗА ПОКУПКАМИ"
							classes={"w-[275px]"}
							to="/search?page=1&query="
						/>
					</div>
				</div>
			) : (
				<div className="flex flex-col h-[calc(100vh-185px)] mt-5">
					<div className="flex flex-col gap-5 px-5 overflow-y-auto flex-1 pb-8">
						<div className="text-xs">
							<span className="text-[#E667A4]">Увага! </span>
							Ваша корзина автоматично анулюється через 10 днів.
						</div>
						<div className="flex flex-col gap-6">

							{cartItems.map((product, index) => (
								<div key={getItemKey(product) ?? index} className="flex gap-4 py-4">
									{notAvailableProductsAmount.includes(getItemKey(product)) &&
										<div className="my-auto font-extrabold text-md text-[#DA469A]">**</div>
									}
									<div className="w-[58px] h-[58px] aspect-square my-auto">
										<img src={product.images} alt="product"/>
									</div>
									<div className="flex flex-col gap-4">
										<div className="line-clamp-2">
											{product.name}
										</div>
										{Number(product?.amount ?? 0) <= 0 && (
											<div className="font-semibold text-xs text-[#DA469A]">Товар відсутній на складі</div>
										)}
										<div className="flex justify-between items-center">
											<NumberInput number={product.quantity} setNumber={value => updateQuantity(product, value)} limit={product.amount}/>
											<DeleteIcon onClick={() => removeFromCart(product)} classes="cursor-pointer"/>
										</div>
										<div className="text-md font-semibold leading-[11px]">
											{isOptUser ? product.priceOPT : product.price} ГРН
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="flex flex-col gap-3 py-4 px-5 mt-auto sticky bottom-0 bg-white border-t border-[#f6f6f6] pb-[calc(16px+env(safe-area-inset-bottom))]">
						<div className="flex justify-between font-semibold">
							<div className="text-lg leading-[14px]">ВСЬОГО:</div>
							<div className="text-xl leading-[14px]">{totalAmount} ГРН</div>
						</div>
						<div className={`font-semibold text-xs text-[#DA469A]`}>{notAvailableProductsAmount.length > 0 && '*Даний товар/кількість не доступні на складі'}</div>
						<Button
							type={"primary"}
							text={"ОФОРМИТИ ЗАМОВЛЕННЯ"}
							classes={"w-full max-w-[335px] mx-auto bg-[#E667A4]"}
							onClick={checkout}
							isDisabled={notAvailableProductsAmount.length > 0}
						/>
					</div>
				</div>
			)}
		</div>
	)
}
export default CartPage