import TableRow from "./_elements/Desktop/TableRow";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Paginator from "../../../../components/Paginator";
import TableCell from "./_elements/Desktop/TableCell";
import {usePopup} from "../../../../hooks/usePopup";
import {Side} from "../../../../popups/Abstracts/Side";
import OrderDetails from "../../../../popups/Side/OrderDetails/OrderDetails";
import Filters from "./_elements/Filters";
import OrderCard from "./_elements/Mobile/OrderCard";

const API_URL = process.env.REACT_APP_API_URL;

const Orders = () => {
	const {isOpen, content, openPopup, closePopup} = usePopup();
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
				<div className="flex flex-col gap-8 px-5">
					<Filters
						isStatusFilterOpen={isStatusFilterOpen}
						statusFilter={statusFilter}
						setStatusFilter={setStatusFilter}
						dateFromFilter={dateFromFilter}
						setDateFromFilter={setDateFromFilter}
						dateToFilter={dateToFilter}
						setDateToFilter={setDateToFilter}
						searchText={searchText}
						setSearchText={setSearchText}
						setStatusFilterOpen={setStatusFilterOpen}
					/>
					<div className="flex flex-col gap-10 items-center">
						<div className="hidden md:flex flex-col gap-[1px] max-w-full overflow-x-auto">
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
										onEditClick={() => openPopup(<OrderDetails orderId={order._id}/>)}
									/>
								))
							) : (
								<div className="col-span-full py-5 text-center text-gray-500 font-medium">
									Не знайдено замовлень по фільтру.
								</div>
							)}
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							{currentPageOrders.length > 0 ? (
								currentPageOrders.map((order) => (
									<OrderCard
										key={order.orderNumber}
										order={order}
										onEditClick={() => openPopup(<OrderDetails orderId={order._id}/>)}
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
					<Side isOpen={isOpen} headerText={"ДАНІ ЗАМОВЛЕННЯ"} content={content} onClose={closePopup}/>
				</div>
			}
		</>
	);
};
export default Orders;