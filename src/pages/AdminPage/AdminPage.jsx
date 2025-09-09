import React, {useEffect, useState} from "react";
import axios from "axios";
import AdminDetail from "./AdminDetail/AdminDetail"

import {
	AdminBlock,
	Button,
	FilterInput,
	NavigateBlock,
	StyledTr,
	Table,
	Td,
	TdStatus,
	Th,
	Container
} from "./AdminPageStyled";
import AdminFeedbackPage from "./AdminFeedbackPage/AdminFeedbackPage";
import {AdminEmailSenderPage} from "./AdminEmailSenderPage/AdminEmailSenderPage";
import ProductsEditPage from "./ProductsEditPage/ProductsEditPage";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const AdminPage = () => {
	const [orders, setOrders] = useState([]);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [orderNumberFilter, setOrderNumberFilter] = useState("");
	const [dateFilter, setDateFilter] = useState("");
	const [nameFilter, setNameFilter] = useState("");
	const [emailFilter, setEmailFilter] = useState("");
	const [amountFilter, setAmountFilter] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
	const [showFilters, setShowFilters] = useState(false);
	const [subPage, setsubPage] = useState("orders");
	const [currentPage, setCurrentPage] = useState(1);

	const ordersPerPage = 24;

	const filteredOrders = orders.filter((order) => {
		return (
			order.orderNumber.includes(orderNumberFilter) &&
			order.createdAt.substr(0, 10).includes(dateFilter) &&
			(order.firstName + " " + order.lastName).includes(nameFilter) &&
			order.email.includes(emailFilter) &&
			order.amount.toString().includes(amountFilter) &&
			order.status.includes(statusFilter) &&
			order.paymentMethod.includes(paymentMethodFilter)
		);
	});

	const indexOfLastOrder = currentPage * ordersPerPage;
	const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
	// eslint-disable-next-line
	const currentOrders = filteredOrders.slice(
		indexOfFirstOrder,
		indexOfLastOrder
	);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		axios
			.get(`${REACT_APP_API_URL}/orders`)
			.then((response) => {
				const receivedOrders = response.data;

				setOrders(receivedOrders);
			})
			.catch((error) => {
				console.error("Помилка отримання даних про замовлення", error);
			});
	}, [selectedOrder]);

	const handleOrderClick = (order) => {
		if (selectedOrder && selectedOrder._id === order._id) {
			setSelectedOrder(null);
		} else {
			setSelectedOrder(order);
		}
	};

	return (
		<Container>
			<AdminBlock>
				<h1>Панель адміністратора</h1>
				<NavigateBlock>
					<Button
						onClick={() => setsubPage("orders")}
						className={subPage === "orders" ? "selected-button" : ""}
					>
						Замовлення
					</Button>
					<Button
						onClick={() => setsubPage("reviews")}
						className={subPage === "reviews" ? "selected-button" : ""}
					>
						Відгуки
					</Button>
					<Button
						onClick={() => setsubPage("emailSender")}
						className={subPage === "emailSender" ? "selected-button" : ""}
					>
						Поштові розсилки
					</Button>

					<Button
						onClick={() => setsubPage("productsEdit")}
						className={subPage === "productsEdit" ? "selected-button" : ""}
					>
						Додавання/Редагування товарів
					</Button>

				</NavigateBlock>

				{subPage === "orders" && (
					<>
						<NavigateBlock>
							<Button onClick={() => setShowFilters(!showFilters)}>
								{showFilters
									? "Закрити панель навігації"
									: "Відкрити панель навігації"}
							</Button>
						</NavigateBlock>
						{showFilters && (
							<>
								<FilterInput
									type="text"
									placeholder="Фільтр по номеру замовлення"
									value={orderNumberFilter}
									onChange={(e) => setOrderNumberFilter(e.target.value)}
								/>
								<FilterInput
									type="text"
									placeholder="Фільтр по даті"
									value={dateFilter}
									onChange={(e) => setDateFilter(e.target.value)}
								/>
								<FilterInput
									type="text"
									placeholder="Фільтр по імені та прізвищу"
									value={nameFilter}
									onChange={(e) => setNameFilter(e.target.value)}
								/>
								<FilterInput
									type="text"
									placeholder="Фільтр по email"
									value={emailFilter}
									onChange={(e) => setEmailFilter(e.target.value)}
								/>
								<FilterInput
									type="text"
									placeholder="Фільтр по сумі"
									value={amountFilter}
									onChange={(e) => setAmountFilter(e.target.value)}
								/>
								<select
									value={statusFilter}
									onChange={(e) => setStatusFilter(e.target.value)}
								>
									<option value="">Всі</option>
									<option value="Новий"> Новий</option>
									<option value="Прийняте в роботу">Прийняте в роботу</option>
									<option value="Збирається">Збирається</option>
									<option value="Зібрано">Зібрано</option>
									<option value="Відправлено">Відправлено</option>
									<option value="Відміна"> Відміна</option>
								</select>
								<FilterInput
									type="text"
									placeholder="Фільтр по методу оплати"
									value={paymentMethodFilter}
									onChange={(e) => setPaymentMethodFilter(e.target.value)}
								/>

								<div>
									{Array.from(
										{
											length: Math.ceil(filteredOrders.length / ordersPerPage),
										},
										(_, index) => (
											<Button
												key={index}
												onClick={() => paginate(index + 1)}
												className={
													currentPage === index + 1 ? "selected-button" : ""
												}
											>
												{index + 1}
											</Button>
										)
									)}
								</div>
							</>
						)}
						<Table>
							<thead>
							<tr style={{textAlign: "center"}}>
								<Th>Номер замовлення</Th>
								<Th>Дата</Th>
								<Th>Покупець</Th>
								{/* <Th>Контакти</Th> */}
								<Th>Загальна сума/грн</Th>
								<Th>Статус</Th>
								<Th>Фін Статус</Th>
							</tr>
							</thead>
							<tbody>
							{filteredOrders
								.slice()
								.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Сортуємо за датою
								.slice(indexOfFirstOrder, indexOfLastOrder) // Пагінація
								.map((order) => (
									<StyledTr
										key={order._id}
										onClick={() => handleOrderClick(order)}
										className={`order-row ${
											selectedOrder && selectedOrder._id === order._id
												? "selected-order"
												: ""
										} ${order.isOptUser ? "yellow-row" : ""}`}
									>
										<Td>{order.orderNumber}</Td>
										<Td>{order.createdAt.substr(0, 10)}</Td>
										<Td>{`${order.firstName} ${order.lastName}`}</Td>
										{/* <Td>
          {!String(order.number).includes("+380")
            ? `380${order.number}`
            : `${order.number}`}{" "}
          {order.email}
        </Td> */}
										<Td>{order.amount}</Td>
										<TdStatus status={order.status}>{order.status}</TdStatus>
										<Td>{order.paymentMethod}</Td>
									</StyledTr>
								))}
							</tbody>
						</Table>

						{selectedOrder && <AdminDetail selectedOrder={selectedOrder}/>}
					</>
				)}
				{subPage === "reviews" && <AdminFeedbackPage/>}

				{subPage === "emailSender" && <AdminEmailSenderPage/>}
				{subPage === "productsEdit" && <ProductsEditPage/>}

			</AdminBlock>
		</Container>
	);
};

export default AdminPage;
