import React, {useEffect, useState} from "react";
import Button from "../components/ButtonNew/Button";
import NumberInput from "../components/NumberInput/NumberInput";
import {useDispatch, useSelector} from "react-redux";
import {selectCart} from "../redux/cart/selectors";
import CloseCrossIcon from "../components/Icons/CloseCrossIcon";
import EmptyBasketIcon from "../components/Icons/EmptyBasketIcon";
import {getIsLoggedIn, getOptUser} from "../redux/auth/selectors";
import {addToCart} from "../redux/cart/slice";
import {handleRemoveFromCart} from "../utils/helpers/basket";
import DeleteIcon from "../components/Icons/DeleteIcon";
import {useNavigate} from "react-router-dom";

const Basket = ({onClose}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoggedIn = useSelector(getIsLoggedIn);
	const isOptUser = useSelector(getOptUser);
	const cartItems = useSelector(selectCart);
	const [notAvailableProductsAmount, setNotAvailableProductsAmount] = useState([])

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
		if (value >= 1) {
			dispatch(addToCart({...product, quantity: value}));
		}
		if (value > product.amount) {
			setNotAvailableProductsAmount([...notAvailableProductsAmount, product.id])
		} else {
			setNotAvailableProductsAmount(notAvailableProductsAmount.filter(id => id !== product.id))
		}
	}

	function removeFromCart(product) {
		handleRemoveFromCart({product, dispatch, isLoggedIn});
	}

	useEffect(() => {
		if (notAvailableProductsAmount.length === 0) {
			setNotAvailableProductsAmount(cartItems.filter(item => item.amount < item.quantity).map(item => item.id))
		}
	}, [cartItems])

	return (
		<div className="flex flex-col p-4 md:p-[80px] max-w-[826px]">
			<div className="flex justify-between mb-[50px] w-[626px] max-w-[626px] mx-[22px]">
				<div className="font-semibold text-lg">ВАШ КОШИК</div>
				<CloseCrossIcon onClick={onClose} classes="w-[13px] h-[13px] cursor-pointer"/>
			</div>
			{cartItems.length === 0 ? (
				<div className="flex flex-col items-center ">
					<EmptyBasketIcon classes={"w-[350px] h-[350px] py-[30px]"}/>
					<div className="font-semibold text-lg mb-6 leading-[13px]">КОШИК ПОРОЖНІЙ</div>
					<div className="font-semibold text-lg text-[#64759B] leading-[13px] mb-10">Але це ніколи не пізно виправити</div>
					<Button type="primary" text="ВПЕРЕД ЗА ПОКУПКАМИ"/>
				</div>
			) : (
				<>
					<div className="flex flex-col gap-5 mb-10 max-h-[433px] overflow-y-auto">
						{cartItems.map((product, index) => (
							<div key={index} className="relative flex h-[150px]">
								{notAvailableProductsAmount.includes(product.id) &&
									<div className="absolute font-extrabold text-2xl text-[#DA469A] top-[45%]">**</div>
								}
								<div className="flex items-center justify-center h-full aspect-square ml-[22px]">
									<img src={product.images} alt="product"/>
								</div>
								<div className="flex flex-col gap-[30px] px-4 py-5">
									<div className="flex gap-[30px]">
										<div className="text-md line-clamp-2">{product.name}</div>
										<div className="font-semibold text-xl whitespace-nowrap">{isOptUser ? product.priceOPT : product.price} ГРН</div>
									</div>
									<div className="flex justify-between items-center">
										<NumberInput number={product.quantity} setNumber={value => updateQuantity(product, value)}/>
										<DeleteIcon onClick={() => removeFromCart(product)} classes="cursor-pointer"/>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="flex justify-between mb-[24px] pt-[30px] border-t font-semibold leading-[14px] mx-[22px]">
						<div className="text-lg">ВСЬОГО:</div>
						<div className="text-xl">{totalAmount} ГРН</div>
					</div>
					<div className={`font-semibold text-md text-[#DA469A] mb-[24px] mx-[22px]`}>{notAvailableProductsAmount.length > 0 && '*Дана кількість не доступна на складі'}</div>
					<div className="flex justify-between items-center gap-[51px] mx-[22px]">
						<div className="text-[15px] leading-[16px]"><span className="text-[#E667A4]">Увага!</span> Ваша корзина автоматично анулюється через 10 днів.</div>
						<Button
							type="primary"
							text="ОФОРМИТИ ЗАМОВЛЕННЯ"
							classes="w-full max-w-[294px] bg-[#E667A4]"
							onClick={() => {
								onClose();
								navigate("/order");
							}}
							isDisabled={notAvailableProductsAmount.length > 0}
						/>
					</div>
				</>
			)}
		</div>
	)
}

export default Basket;
