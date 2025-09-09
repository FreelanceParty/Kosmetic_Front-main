import React, {useState} from "react";
import {Button, ButtonCancel, LilistItem, ProductBlock, ProductImage, TableItems, TableTrBlock} from "./AdminDetailStyled";
import {Table} from "react-bootstrap";
import axios from "axios";
import {useEffect} from "react";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const AdminDetail = ({selectedOrder}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedOrder, setEditedOrder] = useState({...selectedOrder});
	const [showDetails, setShowDetails] = useState(false);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleCancelClick = () => {
		setIsEditing(false);
	};

	const handleSaveClick = async () => {
		try {
			// Створюємо новий масив orderedItems без поля _id
			const updatedOrderedItems = editedOrder.orderedItems.map((item) => {
				// Копіюємо об'єкт item без поля _id
				const {_id, ...updatedItem} = item;
				return updatedItem;
			});

			// Створюємо окремий об'єкт dataToUpdate без поля orderedItems
			const dataToUpdate = {
				status:         editedOrder.status,
				orderedItems:   updatedOrderedItems,
				firstName:      editedOrder.firstName,
				lastName:       editedOrder.lastName,
				number:         editedOrder.number,
				email:          editedOrder.email,
				city:           editedOrder.city,
				warehouse:      editedOrder.warehouse,
				address:        editedOrder.address,
				building:       editedOrder.building,
				deliveryMethod: editedOrder.deliveryMethod,
				paymentMethod:  editedOrder.paymentMethod,
				amount:         editedOrder.amount,
			};

			const response = await axios.put(
				`${REACT_APP_API_URL}/orders/${editedOrder._id}`,
				dataToUpdate
			);

			if (response.status === 200) {
				setIsEditing(false);
			} else {
				console.error("Помилка оновлення даних на сервері");
			}
		} catch (error) {
			console.error("Помилка відправки запиту на сервер:", error);
		}
	};

	useEffect(() => {
		setEditedOrder({...selectedOrder});
	}, [selectedOrder]);

	const handleInputChange = (e, fieldName) => {
		const {value} = e.target;
		setEditedOrder((prevOrder) => ({
			...prevOrder,
			[fieldName]: value,
		}));
	};

	return (
		<div>
			{/* <h2>Детальна інформація про замовлення</h2> */}
			<Button onClick={() => setShowDetails(!showDetails)}>
				{showDetails
					? "Сховати детальну інформацію про замовлення"
					: "Показати детальну інформацію про замовлення"}
			</Button>
			<ProductBlock>
				{showDetails && (
					<Table>
						<tbody>
						<TableTrBlock>
							<TableItems>Продукт</TableItems>
							<TableItems>Ціна</TableItems>
							<TableItems>Кількість</TableItems>
							<TableItems>Сумма</TableItems>
						</TableTrBlock>
						{editedOrder.orderedItems.map((item, index) => {
							console.log("Item:", item); // Логування кожного item

							return (
								<TableTrBlock key={index}>
									<td style={{display: "flex", border: "none"}}>
										<ProductImage src={item.images} alt="product"/>
										<p>
											{item.name}
										</p>
									</td>
									<TableItems style={{
										backgroundColor: item.sale ? "pink" : "transparent", // Умова для кольору
									}}>{item.amount / item.quantity} грн</TableItems>
									<TableItems>{item.quantity}</TableItems>
									<TableItems>{item.amount}</TableItems>
								</TableTrBlock>
							);
						})}
						</tbody>
					</Table>
				)}
			</ProductBlock>

			<Table>
				<tbody>
				<TableTrBlock>
					<TableItems>Дані замовлення</TableItems>
				</TableTrBlock>
				<tr>
					<TableItems colSpan="3">
						<ul>
							<LilistItem>
								Створено: {selectedOrder.createdAt.substr(0, 10)}
							</LilistItem>
							<LilistItem>
								Покупець:
								{isEditing ? (
									<input
										type="text"
										value={editedOrder.firstName}
										onChange={(e) => handleInputChange(e, "firstName")}
									/>
								) : (
									editedOrder.firstName
								)}{" "}
								{isEditing ? (
									<input
										type="text"
										value={editedOrder.lastName}
										onChange={(e) => handleInputChange(e, "lastName")}
									/>
								) : (
									editedOrder.lastName
								)}
							</LilistItem>
							<LilistItem>
								Телефон:{" "}
								{isEditing ? (
									<input
										type="text"
										value={editedOrder.number}
										onChange={(e) => handleInputChange(e, "number")}
									/>
								) : editedOrder.number.toString().indexOf("380") === 0 ? (
									editedOrder.number
								) : (
									"380" + editedOrder.number
								)}
							</LilistItem>
							<LilistItem>
								Email:{" "}
								{isEditing ? (
									<input
										type="text"
										value={editedOrder.email}
										onChange={(e) => handleInputChange(e, "email")}
									/>
								) : (
									editedOrder.email
								)}
							</LilistItem>
							<LilistItem>
								Спосіб доставки:{" "}
								{isEditing ? (
									<input
										type="text"
										value={editedOrder.deliveryMethod}
										onChange={(e) => handleInputChange(e, "deliveryMethod")}
									/>
								) : (
									editedOrder.deliveryMethod
								)}
							</LilistItem>

							<LilistItem>
								Адреса доставки:
								{isEditing ? (
									<tr>
										<input
											type="text"
											value={editedOrder.city}
											onChange={(e) => handleInputChange(e, "city")}
										/>
										<input
											type="text"
											value={editedOrder.warehouse}
											onChange={(e) => handleInputChange(e, "warehouse")}
										/>
										<input
											type="text"
											value={editedOrder.address}
											onChange={(e) => handleInputChange(e, "address")}
										/>
										<input
											type="text"
											value={editedOrder.building}
											onChange={(e) => handleInputChange(e, "building")}
										/>
									</tr>
								) : (
									<span>
                      {editedOrder.city}, {editedOrder.warehouse},
										{editedOrder.address}, {editedOrder.building}
                    </span>
								)}
							</LilistItem>
							<LilistItem>
								Статус товару:{" "}
								{isEditing ? (
									<select
										name="status"
										value={editedOrder.status}
										onChange={(e) => handleInputChange(e, "status")}
									>
										<option value="Новий">Новий</option>
										<option value="Прийняте в роботу">
											Прийняте в роботу
										</option>
										<option value="Збирається">Збирається</option>
										<option value="Зібрано">Зібрано</option>
										<option value="Відправлено">Відправлено</option>
										<option value="Відміна">Відміна</option>
									</select>
								) : (
									editedOrder.status
								)}
							</LilistItem>
							<LilistItem>
								Коментар:{" "}
								{editedOrder.comments !== undefined
									? editedOrder.comments
									: "кроментар відсутній"}
							</LilistItem>
						</ul>
					</TableItems>
				</tr>
				</tbody>
			</Table>

			{isEditing ? (
				<div>
					<Button onClick={handleSaveClick}>Зберегти</Button>
					<Button onClick={handleCancelClick}>Відмінити</Button>
				</div>
			) : (
				<div>
					<ButtonCancel onClick={handleEditClick}>Редагувати</ButtonCancel>
				</div>
			)}
		</div>
	);
};

export default AdminDetail;
