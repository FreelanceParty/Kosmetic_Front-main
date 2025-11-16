import React, {useEffect, useState} from "react";
import ProductsTable from "./_elements/ProductsTable";
import EditableField from "./_elements/EditableField";
import axios from "axios";
import {toast} from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

const OrderDetails = ({order, isEdit, setOnAccept, setOnDecline}) => {
	const [initialData, setInitialData] = useState({
		orderNumber:    order.orderNumber,
		createdAt:      order.createdAt,
		status:         order.status,
		comments:       order.comments,
		firstName:      order.firstName,
		lastName:       order.lastName,
		number:         order.number,
		email:          order.email,
		deliveryMethod: order.deliveryMethod,
		city:           order.city,
		address:        order.address,
		building:       order.building,
		apartment:      order.apartment,
		warehouse:      order.warehouse,
		// -----------------------------
		paymentMethod: order.paymentMethod,
		amount:        order.amount,
		isOptUser:     order.isOptUser,
		orderedItems:  order.orderedItems,
	});

	const [editableData, setEditableData] = useState({...initialData});

	const handleSave = async () => {
		try {
			const response = await axios.put(`${API_URL}/orders/${order._id}`, editableData);
			if (response.status === 200) {
				setInitialData(response.data);
				toast.success("Замовлення оновлено");
			} else {
				toast.error("Сталась помилка");
			}
		} catch (error) {
			console.log(error);
		}
	};

	// todo: перший натиск після оновлення невірно встановлює
	const handleReset = () => {
		setEditableData(initialData);
	};

	const handleFieldChange = (key, value) => {
		setEditableData(prevData => ({
			...prevData,
			[key]: value,
		}));
	};

	useEffect(() => {
		if (setOnAccept) {
			setOnAccept(() => handleSave);
		}
		if (setOnDecline) {
			setOnDecline(() => handleReset);
		}
	}, [setOnAccept, setOnDecline, editableData]);

	return (
		<div className="flex flex-col gap-5">
			<div className="flex gap-8">
				<div className="flex flex-col gap-3 w-[300px]">
					<EditableField isEdit={isEdit} title="Номер замовлення" value={editableData.orderNumber} setValue={(e) => handleFieldChange('orderNumber', e.target.value)}/>
					<EditableField isEdit={isEdit} title="Створено" value={editableData.createdAt.split('T')[0]} setValue={(e) => handleFieldChange('createdAt', e.target.value)}/>
					<EditableField isEdit={isEdit} name="status" type="select" title="Статус" value={editableData.status} setValue={(status) => handleFieldChange('status', status)}/>
					<EditableField isEdit={isEdit} type="textarea" title="Коментар" value={editableData.comments} setValue={(e) => handleFieldChange('comments', e.target.value ?? '')}/>
				</div>

				<div className="flex flex-col gap-3 w-[380px]">
					<div className="grid grid-cols-2 gap-2">
						<EditableField isEdit={isEdit} title="Ім'я покупця" value={editableData.firstName} setValue={(e) => handleFieldChange('firstName', e.target.value)}/>
						<EditableField isEdit={isEdit} title="Прізвище покупця" value={editableData.lastName} setValue={(e) => handleFieldChange('lastName', e.target.value)}/>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<EditableField isEdit={isEdit} title="Телефон" value={editableData.number} setValue={(e) => handleFieldChange('number', e.target.value)}/>
						<EditableField isEdit={isEdit} title="Email" type={"email"} value={editableData.email} setValue={(e) => handleFieldChange('email', e.target.value)}/>
					</div>
					<EditableField isEdit={isEdit} name="deliveryMethod" options={["Доставка кур'єром", "Доставка на відділення"]} type="select" title="Спосіб доставки"
						value={editableData.deliveryMethod} setValue={(method) => handleFieldChange('deliveryMethod', method)}/>
					<div className="grid grid-cols-2 gap-2">
						<EditableField isEdit={isEdit} title="Місто" value={editableData.city} setValue={(e) => handleFieldChange('city', e.target.value)}/>
						{editableData.deliveryMethod === "Доставка кур'єром"
							?
							<>
								<EditableField isEdit={isEdit} title="Вулиця" value={editableData.address} setValue={(e) => handleFieldChange('address', e.target.value)}/>
								<EditableField isEdit={isEdit} title="Будинок" value={editableData.building} setValue={(e) => handleFieldChange('building', e.target.value)}/>
								<EditableField isEdit={isEdit} title="Квартира" value={editableData.apartment} setValue={(e) => handleFieldChange('apartment', e.target.value)}/>
							</>
							:
							<EditableField isEdit={isEdit} title="Відділення/Поштомат" value={editableData.warehouse} setValue={(e) => handleFieldChange('warehouse', e.target.value)}/>
						}
					</div>
				</div>
			</div>
			<ProductsTable products={order.orderedItems}/>
		</div>
	)
}

export default OrderDetails;
