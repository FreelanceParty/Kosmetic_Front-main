import Button from "../../../components/ButtonNew/Button";
import {Slider, SliderElement} from "../../CooperationPage/CooperationPage.styled";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {getUserToken, getIsLoggedIn} from "../../../redux/auth/selectors";
import OrderBlock from "./_elements/OrderBlock";
import Paginator from "../../../components/Paginator";
import {useNavigate} from "react-router-dom";
import {Loader} from "../../../components/Loader/Loader";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const tabs = [
	{id: "all", label: "Усі"},
	{id: "current_month", label: "Поточний місяць"},
	{id: "current_year", label: "Поточний рік"},
	{id: "prev_year", label: "Минулий рік"},
];

const OrderHistory = () => {
	const navigate = useNavigate();
	const isLoggedIn = useSelector(getIsLoggedIn);
	const token = useSelector(getUserToken);
	const [activeTab, setActiveTab] = useState("all");
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const pageSize = 7;

	const buildDateRangeParams = (period) => {
		const now = new Date();
		const toYMD = (d) => {
			const yyyy = d.getFullYear();
			const mm = String(d.getMonth() + 1).padStart(2, "0");
			const dd = String(d.getDate()).padStart(2, "0");
			return `${yyyy}-${mm}-${dd}`;
		};

		switch (period) {
			case "current_month": {
				const start = new Date(now.getFullYear(), now.getMonth(), 1);
				const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
				return {dateFrom: toYMD(start), dateTo: toYMD(end)};
			}
			case "current_year": {
				const start = new Date(now.getFullYear(), 0, 1);
				const end = new Date(now.getFullYear(), 11, 31);
				return {dateFrom: toYMD(start), dateTo: toYMD(end)};
			}
			case "prev_year": {
				const year = now.getFullYear() - 1;
				const start = new Date(year, 0, 1);
				const end = new Date(year, 11, 31);
				return {dateFrom: toYMD(start), dateTo: toYMD(end)};
			}
			case "all":
			default:
				return {};
		}
	};

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				setLoading(true);
				const dateParams = buildDateRangeParams(activeTab);
				const params = {
					withMeta: true,
					page,
					limit:    pageSize,
					...dateParams,
				};

				const response = await axios.get(`${REACT_APP_API_URL}/orders/byUser`, {
					params,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				const payload = response.data;
				const items = Array.isArray(payload) ? payload : (payload?.items ?? []);
				setOrders(items);

				const metaPages = Number(payload?.meta?.pages);
				const headerTotalPages = Number(response.headers?.["x-total-pages"]);
				let nextTotalPages = Number.isFinite(metaPages) && metaPages > 0
					? metaPages
					: (Number.isFinite(headerTotalPages) && headerTotalPages > 0 ? headerTotalPages : 0);
				setTotalPages(nextTotalPages);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};

		if (isLoggedIn) {
			fetchOrders();
		}
	}, [isLoggedIn, token, page, activeTab]);

	function goToPage(pageNumber) {
		setPage(pageNumber);
	}

	function loadByPeriod(period) {
		setActiveTab(period);
		setPage(1);
	}

	return (
		<>
			{loading ? (
				<div className="flex justify-center w-full py-10">
					<Loader/>
				</div>
			) : orders.length === 0
				? <div className="flex flex-col gap-[50px]">
					<div className="hidden md:flex flex-col gap-4">
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
						classes="h-[53px] w-full max-w-[409px]"
						onClick={() => navigate('/search?page=1&query=')}
					/>
				</div>

				: <div className="flex flex-col max-h-[70vh]">
					<div className="hidden md:flex flex-col gap-4 mb-6 h-full">
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
					<div className="flex flex-col gap-4 md:gap-[10px] overflow-y-auto mb-[60px] max-w-[731px]">
						{orders.length === 0
							?
							<div>Немає замовлень</div>
							:
							orders.map((order, index) => (
								<OrderBlock
									key={index}
									order={order}
								/>
							))
						}
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