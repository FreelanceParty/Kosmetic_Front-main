import TableRow from "./_elements/TableRow";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Paginator from "../../../../components/Paginator";
import TableCell from "./_elements/TableCell";
import ChevronIcon from "../../../../components/Icons/ChevronIcon";
import StatusOptions from "./_elements/StatusOptions";
import SearchIcon from "../../../../components/Icons/SearchIcon";
import RightArrowAltIcon from "../../../../components/Icons/RightArrowAltIcon";

const API_URL = process.env.REACT_APP_API_URL;

const Orders = () => {
	const [initialOrders, setInitialOrders] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	const [currentPageOrders, setCurrentPageOrders] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const pageSize = 16;

	const [isStatusFilterOpen, setStatusFilterOpen] = useState(false);
	const [statusFilter, setStatusFilter] = useState(null);
	const [dateFromFilter, setDateFromFilter] = useState(null);
	const [dateToFilter, setDateToFilter] = useState(null);
	const [searchText, setSearchText] = useState('');

	const [selectedOrderId, setSelectedOrderId] = useState(null);

	const handleRowClick = (orderId) => {
		if (selectedOrderId === orderId) {
			setSelectedOrderId(null);
		} else {
			setSelectedOrderId(orderId);
		}
	};

	function goToPage(pageNumber) {
		const start = (pageNumber - 1) * pageSize;
		const end = start + pageSize;
		setCurrentPageOrders(filteredItems.slice(start, end));
		setPage(pageNumber);
	}

	useEffect(() => {
		const fetchOrders = async () => {
			//setLoading(true);
			try {
				const response = await axios.get(`${API_URL}/orders`);
				const orders = response.data;
				const sortedOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
				setInitialOrders(sortedOrders);
				setFilteredItems(sortedOrders);
				setCurrentPageOrders(sortedOrders.slice(0, pageSize))
				setTotalPages(Math.ceil(sortedOrders.length / pageSize));
			} catch (error) {
				console.log(error);
			}
		};
		if (initialOrders.length === 0) {
			fetchOrders();
		}
	}, []);

	useEffect(() => {
		const applyFilters = () => {
			try {
				let filtered = initialOrders;
				if (statusFilter) {
					filtered = initialOrders.filter(order => order.status === statusFilter)
				}
				if (dateFromFilter) {
					filtered = filtered.filter(order => new Date(order.createdAt) >= new Date(dateFromFilter));
				}
				if (dateToFilter) {
					filtered = filtered.filter(order => new Date(order.createdAt) <= new Date(dateToFilter));
				}
				const fullName = order => `${order.firstName} ${order.lastName}`.toLowerCase();
				const trimmedSearchText = searchText.toLowerCase().trim();
				filtered = filtered.filter(order => fullName(order).includes(trimmedSearchText) || order.orderNumber.includes(trimmedSearchText));
				setFilteredItems(filtered);
				setTotalPages(Math.ceil(filtered.length / pageSize));
				setCurrentPageOrders(filtered.slice(0, pageSize));
				setPage(1);
			} catch (e) {
				console.log(e)
			}
		}
		applyFilters();
	}, [statusFilter, dateFromFilter, dateToFilter, searchText])

	return (
		<>
			{initialOrders.length === 0 ?
				<div>Loading...</div>
				:
				<div className="flex flex-col gap-8">
					<div className="flex gap-5 mx-auto">
						<div className="relative flex justify-between items-center h-9 w-[180px] px-[10px] border rounded-xl cursor-pointer"
							onClick={() => setStatusFilterOpen(!isStatusFilterOpen)}
						>
							<div className={`font-medium text-[13px] leading-[16px] ${!statusFilter && 'opacity-50'}`}>
								{statusFilter ?? 'Статус'}
							</div>
							<ChevronIcon/>
							{isStatusFilterOpen && (
								<StatusOptions setStatus={setStatusFilter} selected={statusFilter} classes="top-[105%]"/>
							)}
						</div>
						<div className="flex gap-3 items-center">
							<input
								id="date-from-input"
								type="date"
								onChange={(e) => setDateFromFilter(e.target.value)}
								value={dateFromFilter}
								className="p-2 border border-gray-300 rounded h-9 w-[118px]"
							/>
							<RightArrowAltIcon/>
							<input
								id="date-to-input"
								type="date"
								onChange={(e) => setDateToFilter(e.target.value)}
								value={dateToFilter}
								className="p-2 border border-gray-300 rounded h-9 w-[118px]"
							/>
						</div>
						<div className="relative w-[221px]">
							<input
								type="text"
								placeholder="Ім'я чи номер замовлення"
								onChange={(e) => setSearchText(e.target.value)}
								onBlur={(e) => setSearchText(e.target.value)}
								className="!h-9 !w-[221px] bg-white rounded-xl font-medium text-[13px] leading-[16px] border pl-8"
							/>
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<SearchIcon classes="w-3 h-3"/>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-10 items-center">
						<div className="flex flex-col gap-[1px] max-w-full overflow-x-auto">
							<div className="grid grid-cols-[165px_230px_182px_148px_140px_208px_110px] font-bold">
								<TableCell title="Номер замовлення"/>
								<TableCell title="Покупець"/>
								<TableCell title="Статус"/>
								<TableCell title="Дата"/>
								<TableCell title="Загальна сума"/>
								<TableCell title="Фін статус"/>
								<TableCell title="Редагувати" classes="px-auto"/>
							</div>
							{currentPageOrders.length > 0 ? (
								currentPageOrders.map((order) => (
									<TableRow
										key={order.orderNumber}
										order={order}
										isSelected={order.orderNumber === selectedOrderId}
										onRowClick={handleRowClick}
									/>
								))
							) : (
								<div className="col-span-full py-5 text-center text-gray-500 font-medium">
									Не знайдено замовлень по фільтру.
								</div>
							)}
						</div>
						{totalPages > 1 &&
							<Paginator
								totalPages={totalPages}
								currentPage={page}
								onChange={(newPage) => goToPage(newPage)}
							/>}
					</div>
				</div>
			}
		</>
	);
};
export default Orders;