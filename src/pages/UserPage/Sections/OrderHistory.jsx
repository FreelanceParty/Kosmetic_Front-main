import Button from "../../../components/ButtonNew/Button";
import {Slider, SliderElement} from "../../CooperationPage/CooperationPage.styled";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {getUserToken, getIsLoggedIn} from "../../../redux/auth/selectors";
import OrderBlock from "./_elements/OrderBlock";

const OrderHistory = () => {
	const tabs = [
		{id: "all", label: "Усі"},
		{id: "current_month", label: "Поточний місяць"},
		{id: "current_year", label: "Поточний рік"},
		{id: "prev_year", label: "Минулий рік"},
	];
	const isLoggedIn = useSelector(getIsLoggedIn);
	const token = useSelector(getUserToken);
	const [activeTab, setActiveTab] = useState("order_history");
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3002/api/orders/byUser`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setOrders(response.data);
				console.log(response)
			} catch (error) {
				console.log(error);
			}
		};
		if (isLoggedIn) {
			fetchOrders();
		}
	}, []);
	const isEmpty = false;
	return ( // todo: add loader
		<>
			{orders.length === 0
				? <div className="flex flex-col gap-[50px]">
					<div className="flex flex-col gap-4">
						<div className="font-semibold text-lg leading-[13px]">ІСТОРІЯ ЗАМОВЛЕНЬ</div>
						<div className="border-t border-[#E8E8E8]"/>
					</div>
					<div className="text-lg leading-[25px]">
						Поки що тут порожньо.<br/>
						Схоже, ваша косметична історія з нами тільки починається.<br/>
						Поверніться на головну і знайдіть свою першу beauty-знахідку.
					</div>
					<Button
						type="primary"
						text="ВПЕРЕД ЗА ПОКУПКАМИ"
						classes="h-[53px] w-[409px]"
					/>
				</div>
				: <div className="flex flex-col">
					<div className="flex flex-col gap-4 mb-6">
						<div className="font-semibold text-lg leading-[13px]">ІСТОРІЯ ЗАМОВЛЕНЬ</div>
						<div className="border-t border-[#E8E8E8]"/>
					</div>
					<Slider className="lg:flex mb-8">
						{tabs.map((tab, index) => (
							<SliderElement
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`lg:rounded-[30px] lg:py-[10px] lg:px-4 lg:text-sm lg:capitalize leading-[10px] ${
									activeTab === tab.id
										? "bg-[#ffe8f5] text-gray-600"
										: "bg-[#f6f6f6] text-gray-600 hover:bg-gray-200"
								} ${index === 0 ? "ml-[9px]" : ""} ${index === tabs.length - 1 ? "mr-[9px]" : ""}`}
							>
								{tab.label}
							</SliderElement>
						))}
					</Slider>
					{orders.map((order, index) => (
						<OrderBlock
							key={index}
							order={order}
						/>
					))}
				</div>
			}
		</>
	);
};
export default OrderHistory;