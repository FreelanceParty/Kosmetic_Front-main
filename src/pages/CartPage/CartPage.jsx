import {selectCart} from "../../redux/cart/selectors";
import {useSelector} from "react-redux";
import EmptyBasketIcon from "../../components/Icons/EmptyBasketIcon";
import React, {useState} from "react";
import Button from "../../components/ButtonNew/Button";
import NumberInput from "../../components/NumberInput/NumberInput";
import DeleteIcon from "../../components/Icons/DeleteIcon";

const CartPage = () => {
	const cartItems = useSelector(selectCart);

	console.log(cartItems)
	const [quantities, setQuantities] = useState(
		() => cartItems.map((product) => product.quantity)
	);
	const [totalAmount, setTotalAmount] = useState(cartItems.reduce((sum, item) => sum + item.price, 0));

	const updateQuantity = (index, value) => {
		setQuantities(prev =>
			prev.map((q, i) => (i === index ? value : q))
		);
	};

	return (
		<div className="flex flex-col px-5">
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
						/>
					</div>
				</div>
			) : (
				<div className="flex flex-col justify-between">
					<div className="flex flex-col gap-5 overflow-y-auto">
						<div className="text-xs">
							<span className="text-[#E667A4]">Увага! </span>
							Ваша корзина автоматично анулюється через 10 днів.
						</div>
						<div className="flex flex-col gap-6">

							{cartItems.map((product, index) => (
								<div key={index} className="flex gap-4 py-4">
									<div className="w-[58px] h-[58px] aspect-square">
										<img src={product.images} alt="product"/>
									</div>
									<div className="flex flex-col gap-4">
										<div className="line-clamp-2">
											{product.name}
										</div>
										<div className="flex justify-between items-center">
											<NumberInput number={quantities[index]} setNumber={value => updateQuantity(index, value)} limit={product.amount}/>
											<DeleteIcon/>
										</div>
										<div className="text-md font-semibold leading-[11px]">
											{product.price} ГРН
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="flex flex-col gap-6 py-6 px-5">
						<div className="flex justify-between font-semibold">
							<div className="text-lg">ВСЬОГО:</div>
							<div className="text-xl">{totalAmount} ГРН</div>
						</div>
						<Button
							type={"primary"}
							text={"ОФОРМИТИ ЗАМОВЛЕННЯ"}
							classes={"w-full max-w-[335px] mx-auto bg-[#E667A4]"}
						/>
					</div>
				</div>
			)}
		</div>
	)
}
export default CartPage