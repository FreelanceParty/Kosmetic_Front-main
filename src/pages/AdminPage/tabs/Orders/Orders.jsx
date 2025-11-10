import TableRow from "./_elements/TableRow";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Paginator from "../../../../components/Paginator";

const API_URL = process.env.REACT_APP_API_URL;

const Orders = () => {
	const [initialOrders, setInitialOrders] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	const [currentPageOrders, setCurrentPageOrders] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const pageSize = 16;

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

	return (
		<>
			{initialOrders.length === 0 ?
				<div>Loading...</div>
				:
				<div className="flex flex-col gap-8">
					<div>filters</div>
					<div className="flex flex-col gap-10 items-center">
						<table className="text-[13px] leading-[9px] text-left border-separate border-spacing-y-[1px]">
							<thead className="font-bold">
							<tr className="h-[42px] border-b border-[#64759B]">
								<th className="w-[165px] pl-[14px]">Номер замовлення</th>
								<th className="w-[230px] pl-[14px]">Покупець</th>
								<th className="w-[182px] pl-[14px]">Статус</th>
								<th className="w-[148px] pl-[14px]">Дата</th>
								<th className="w-[140px] pl-[14px]">Загальна сума</th>
								<th className="w-[208px] pl-[14px]">Фін статус</th>
								<th className="w-[110px] pl-[14px]">Редагувати</th>
							</tr>
							</thead>
							<tbody className="gap-[1px]">
							{currentPageOrders.map((order, index) => (
								<TableRow key={index} order={order}/>
							))}
							</tbody>
						</table>
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