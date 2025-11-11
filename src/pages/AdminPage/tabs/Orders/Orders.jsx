import TableRow from "./_elements/TableRow";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Paginator from "../../../../components/Paginator";
import TableCell from "./_elements/TableCell";
import ChevronIcon from "../../../../components/Icons/ChevronIcon";
import StatusOptions from "./_elements/StatusOptions";

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
	const [dateFilter, setDateFilter] = useState(null);

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
				if (dateFilter) {
					//filtered = filtered.filter(order => new Date(order.createdAt) >= new Date(dateFilter));
				}
				setFilteredItems(filtered);
				setTotalPages(Math.ceil(filtered.length / pageSize));
				setCurrentPageOrders(filtered.slice(0, pageSize));
				setPage(1);
			} catch (e) {
				console.log(e)
			}
		}
		applyFilters();
	}, [statusFilter, dateFilter])

	return (
		<>
			{initialOrders.length === 0 ?
				<div>Loading...</div>
				:
				<div className="flex flex-col gap-8">
					<div className="flex gap-5 mx-auto">
						<div className="relative flex justify-between items-center h-[36px] w-[180px] px-[10px] border rounded-xl cursor-pointer"
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
						<div>date</div>
						<div>search</div>
					</div>
					<div className="flex flex-col gap-10 items-center">
						<div className="grid gap-y-[1px] grid-cols-[165px_230px_182px_148px_140px_208px_110px] max-w-full overflow-x-auto">
							<TableCell title="Номер замовлення" classes="font-bold"/>
							<TableCell title="Покупець" classes="font-bold"/>
							<TableCell title="Статус" classes="font-bold"/>
							<TableCell title="Дата" classes="font-bold"/>
							<TableCell title="Загальна сума" classes="font-bold"/>
							<TableCell title="Фін статус" classes="font-bold"/>
							<TableCell title="Редагувати" classes="font-bold px-auto"/>
							{currentPageOrders.length > 0 ? (
								currentPageOrders.map((order, index) => (
									<TableRow key={index} order={order}/>
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