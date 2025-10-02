import React, {useEffect, useState} from "react";
import RateHearts from "../components/RateHearts/RateHearts";
import Button from "../components/ButtonNew/Button";
import Input from "../components/Input/Input";
import TextArea from "../components/TextArea/TextArea";
import axios from "axios";
import NumberInput from "../components/NumberInput/NumberInput";
import {useSelector} from "react-redux";
import {selectCart} from "../redux/cart/selectors";
import CloseCrossIcon from "../components/Icons/CloseCrossIcon";
import EmptyBasketIcon from "../components/Icons/EmptyBasketIcon";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const Basket = ({onClose}) => {
	const [products, setProducts] = useState(null);
	const [totalAmount, setTotalAmount] = useState(null);
	const cartItems = useSelector(selectCart);

	console.log(cartItems)

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				console.log(cartItems)
				setProducts(cartItems);
				const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
				setTotalAmount(cartItems.reduce((sum, item) => sum + item.price, 0))
				console.log(totalPrice)
			} catch (error) {
				console.log(error);
			}
		};
		fetchProduct();
	}, []);

	return (
		products === null ? (<div>Loading...</div>) : (
			<div className="flex flex-col p-4 md:p-[100px] max-w-[826px]">
				<div className="flex justify-between mb-[50px] w-[626px] max-w-[626px]">
					<div className="font-semibold text-lg">ВАШ КОШИК</div>
					<CloseCrossIcon onClick={onClose} classes="w-[13px] h-[13px] cursor-pointer"/>
				</div>
				{products.length === 0 ? (
					<div className="flex flex-col items-center ">
						<EmptyBasketIcon classes={"w-[350px] h-[350px] py-[30px]"}/>
						<div className="font-semibold text-lg mb-6 leading-[13px]">КОШИК ПОРОЖНІЙ</div>
						<div className="font-semibold text-lg text-[#64759B] leading-[13px] mb-10">Але це ніколи не пізно виправити</div>
						<Button type="primary" text="ВПЕРЕД ЗА ПОКУПКАМИ"/>
					</div>
				) : (
					<>
						<div className="flex flex-col gap-5 mb-10 max-h-[433px] overflow-y-auto">
							{products.map((product, index) => (
								<div key={index} className="flex h-[150px]">
									<div className="flex items-center justify-center h-full aspect-square">
										<img src={product.images} alt="product"/>
									</div>
									<div className="flex flex-col gap-[30px] px-4 py-5">
										<div className="flex gap-[30px]">
											<div className="text-md line-clamp-2">{product.name}</div>
											<div className="font-semibold text-xl whitespace-nowrap">{product.price} ГРН</div>
										</div>
										<div className="flex justify-between items-center">
											<NumberInput limit={product.amount}/>
											<img
												className="cursor-pointer"
												src={require("../assets/icons/delete.svg").default}
												alt="close"
												width={18}
												height={21.6}
											/>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className="flex justify-between mb-[60px] pt-[30px] border-t font-semibold leading-[14px]">
							<div className="text-lg">ВСЬОГО:</div>
							<div className="text-xl">{totalAmount} ГРН</div>
						</div>
						<div className="flex justify-between items-center gap-[51px]">
							<div className="text-[15px] leading-[16px]"><span className="text-[#E667A4]">Увага!</span> Ваша корзина автоматично анулюється через 10 днів.</div>
							<Button type="primary" text="ОФОРМИТИ ЗАМОВЛЕННЯ" classes="w-full max-w-[294px] bg-[#E667A4]"/>
						</div>
					</>
				)}
			</div>
		)
	);
}

export default Basket;
