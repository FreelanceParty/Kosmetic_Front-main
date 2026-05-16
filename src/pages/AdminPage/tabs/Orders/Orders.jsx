import TableRow from "./_elements/Desktop/TableRow";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import Paginator from "../../../../components/Paginator";
import TableCell from "./_elements/Desktop/TableCell";
import {usePopup} from "../../../../hooks/usePopup";
import {Side} from "../../../../popups/Abstracts/Side";
import OrderDetails from "../../../../popups/Side/OrderDetails/OrderDetails";
import Filters from "./_elements/Filters";
import OrderCard from "./_elements/Mobile/OrderCard";
import {Loader} from "../../../../components/Loader/Loader";

const API_URL = process.env.REACT_APP_API_URL;

const Orders = () => {
	const {isOpen, content, openPopup, closePopup} = usePopup();
	const [initialOrders, setInitialOrders] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	const [loading, setLoading] = useState(false);
	const loadingTimerRef = useRef(null);
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

	useEffect(() => {
		const fetchOrders = async () => {
			const startedAt = Date.now();
			try {
				setLoading(true);
				if (loadingTimerRef.current) {
					clearTimeout(loadingTimerRef.current);
					loadingTimerRef.current = null;
				}
				const response = await axios.get(`${API_URL}/orders`, {
					params: {
						page,
						limit: pageSize,
						withMeta: true,
					},
				});
				const payload = response.data;
				const orders = Array.isArray(payload) ? payload : (payload?.items ?? []);

				const metaPages = Number(payload?.meta?.pages);
				const headerTotalPages = Number(response.headers?.['x-total-pages']);
				const headerTotalCount = Number(response.headers?.['x-total-count']);
				let nextTotalPages = Number.isFinite(metaPages) && metaPages > 0
					? metaPages
					: (Number.isFinite(headerTotalPages) && headerTotalPages > 0
						? headerTotalPages
						: (Number.isFinite(headerTotalCount) && headerTotalCount > 0
							? Math.ceil(headerTotalCount / pageSize)
							: 0));

				// Fallback: if backend headers are not accessible in browser due to CORS
				// (missing Access-Control-Expose-Headers), infer pagination so paginator doesn't disappear.
				if (!nextTotalPages || nextTotalPages < 1) {
					nextTotalPages = Math.max(1, page + (Array.isArray(orders) && orders.length === pageSize ? 1 : 0));
				}

				setInitialOrders(orders);
				setFilteredItems(orders);
				setTotalPages(nextTotalPages);
			} catch (error) {
				console.log(error);
			} finally {
				const elapsed = Date.now() - startedAt;
				const minMs = 200;
				const delay = elapsed < minMs ? (minMs - elapsed) : 0;
				if (delay > 0) {
					loadingTimerRef.current = setTimeout(() => {
						setLoading(false);
						loadingTimerRef.current = null;
					}, delay);
				} else {
					setLoading(false);
				}
			}
		};
		fetchOrders();
	}, [page]);

	useEffect(() => {
		return () => {
			if (loadingTimerRef.current) {
				clearTimeout(loadingTimerRef.current);
				loadingTimerRef.current = null;
			}
		};
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
				setPage(1);
			} catch (e) {
				console.log(e)
			}
		}
		applyFilters();
	}, [statusFilter, dateFromFilter, dateToFilter, searchText])

	return (
		<>
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
						<div className="hidden md:flex flex-col gap-[1px] max-w-full overflow-x-auto relative">
							<div className="grid grid-cols-[165px_230px_182px_148px_140px_208px_110px] font-bold">
								<TableCell title="Номер замовлення"/>
								<TableCell title="Покупець"/>
								<TableCell title="Статус"/>
								<TableCell title="Дата"/>
								<TableCell title="Загальна сума"/>
								<TableCell title="Фін статус"/>
								<TableCell title="Редагувати" classes="px-auto"/>
							</div>
							{loading && (
								<div className="absolute inset-0 bg-white/60 flex items-center justify-center pointer-events-none z-50">
									<Loader/>
								</div>
							)}
							{filteredItems.length > 0 ? (
								filteredItems.map((order) => (
									<TableRow
										key={order.orderNumber}
										order={order}
										isSelected={order.orderNumber === selectedOrderId}
										onRowClick={handleRowClick}
										onEditClick={() => openPopup(<OrderDetails orderId={order._id}/>)}
									/>
								))
							) : (!loading ? (
								<div className="col-span-full py-5 text-center text-gray-500 font-medium">
									Не знайдено замовлень по фільтру.
								</div>
							) : null)}
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden relative">
							{loading && (
								<div className="absolute inset-0 bg-white/60 flex items-center justify-center pointer-events-none z-50">
									<Loader/>
								</div>
							)}
							{filteredItems.length > 0 ? (
								filteredItems.map((order) => (
									<OrderCard
										key={order.orderNumber}
										order={order}
										onEditClick={() => openPopup(<OrderDetails orderId={order._id}/>)}
									/>
								))
							) : (!loading ? (
								<div className="col-span-full py-5 text-center text-gray-500 font-medium">
									Не знайдено замовлень по фільтру.
								</div>
							) : null)}
						</div>
						{totalPages > 1 &&
							<Paginator
								totalPages={totalPages}
								currentPage={page}
								scrollToTopOnChange={false}
								onChange={(newPage) => setPage(newPage)}
							/>}
					</div>
					<Side isOpen={isOpen} headerText={"ДАНІ ЗАМОВЛЕННЯ"} content={content} onClose={closePopup}/>
				</div>
			</>
		);
};
export default Orders;