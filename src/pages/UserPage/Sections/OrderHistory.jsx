import Button from "../../../components/ButtonNew/Button";
import {Slider, SliderElement} from "../../CooperationPage/CooperationPage.styled";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {getUserToken, getIsLoggedIn} from "../../../redux/auth/selectors";
import OrderBlock from "./_elements/OrderBlock";
import Paginator from "../../../components/Paginator";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const tabs = [
	{id: "all", label: "Усі"},
	{id: "current_month", label: "Поточний місяць"},
	{id: "current_year", label: "Поточний рік"},
	{id: "prev_year", label: "Минулий рік"},
];

const OrderHistory = () => {

	const isLoggedIn = useSelector(getIsLoggedIn);
	const token = useSelector(getUserToken);
	const [activeTab, setActiveTab] = useState("all");
	const [orders, setOrders] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const pageSize = 7;
	const [currentPageItems, setCurrentPageItems] = useState(orders.slice(0, pageSize));

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await axios.get(
					`${REACT_APP_API_URL}/orders/byUser`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const ordersResponse = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
				setOrders(ordersResponse);
				setCurrentPageItems(ordersResponse.slice(0, pageSize));
				setTotalPages(Math.ceil(ordersResponse.length / pageSize));
			} catch (error) {
				console.log(error);
			}
		};
		if (isLoggedIn) {
			fetchOrders();
		}
	}, []);

	function goToPage(pageNumber) {
		const start = (pageNumber - 1) * pageSize;
		const end = start + pageSize;
		setCurrentPageItems(orders.slice(start, end));
		setPage(pageNumber);
	}

	function loadByPeriod(period) {
		setActiveTab(period);
		const filteredOrders = orders.filter(order => {
			const orderDate = new Date(order.createdAt);
			const currentDate = new Date();
			switch (period) {
				case "all":
					return orderDate;
				case "current_month":
					return orderDate.getMonth() === currentDate.getMonth() && orderDate.getFullYear() === currentDate.getFullYear();
				case "current_year":
					return orderDate.getFullYear() === currentDate.getFullYear();
				case "prev_year":
					return orderDate.getFullYear() === currentDate.getFullYear() - 1;
			}
		})
		setPage(1);
		setTotalPages(Math.ceil(filteredOrders.length / pageSize));
		setCurrentPageItems(filteredOrders.slice(0, pageSize));
	}

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

				: <div className="flex flex-col max-h-[70vh]">
					<div className="flex flex-col gap-4 mb-6 h-full">
						<div className="font-semibold text-lg leading-[13px]">ІСТОРІЯ ЗАМОВЛЕНЬ</div>
						<div className="border-t border-[#E8E8E8]"/>
					</div>
					<Slider className="lg:flex mb-8 min-h-fit">
						{tabs.map((tab, index) => (
							<SliderElement
								key={tab.id}
								onClick={() => loadByPeriod(tab.id)}
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
					<div className="flex flex-col gap-[10px] overflow-y-auto mb-[60px]">
						{currentPageItems.map((order, index) => (
							<OrderBlock
								key={index}
								order={order}
							/>
						))}
					</div>
					{totalPages > 1 &&
						<Paginator
							totalPages={totalPages}
							currentPage={page}
							onChange={(newPage) => goToPage(newPage)}
						/>}
				</div>
			}
		</>
	);
};
export default OrderHistory;