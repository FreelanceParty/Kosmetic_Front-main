import React, {useEffect, useState} from "react";
import ProductsTable from "./_elements/ProductsTable";
import EditableField from "./_elements/EditableField";
import axios from "axios";
import {toast} from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

const OrderDetails = ({orderId, isEdit, setOnAccept, setOnDecline}) => {
	const [order, setOrder] = useState(null);
	const [editableData, setEditableData] = useState(null);

	useEffect(() => {
		function fetchOrder() {
			try {
				axios.get(`${API_URL}/orders/${orderId}`).then(response => {
					setOrder(response.data);
					setEditableData(response.data);
				});
			} catch (error) {
				console.log(error);
			}
		}

		if (order === null) {
			fetchOrder();
		}
	}, [orderId])

	const handleSave = async () => {
		try {
			const response = await axios.put(`${API_URL}/orders/${orderId}`, editableData);
			if (response.status === 200) {
				setOrder(response.data);
				setEditableData(response.data);
				toast.success("Замовлення оновлено");
			} else {
				toast.error("Сталась помилка");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleReset = () => {
		setEditableData(order);
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
		order &&
		<div className="flex flex-col gap-5">
			<div className="flex flex-col sm:flex-row gap-3 sm:gap-8">
				<div className="flex flex-col gap-3 w-full sm:w-[300px]">
					<EditableField isEdit={isEdit} title="Номер замовлення" value={editableData.orderNumber} setValue={(e) => handleFieldChange('orderNumber', e.target.value)}/>
					<EditableField isEdit={isEdit} title="Створено" value={editableData.createdAt.split('T')[0]} setValue={(e) => handleFieldChange('createdAt', e.target.value)}/>
					<EditableField isEdit={isEdit} name="status" type="select" title="Статус" value={editableData.status} setValue={(status) => handleFieldChange('status', status)}/>
					<EditableField containerClasses="hidden sm:flex" isEdit={isEdit} type="textarea" title="Коментар" value={editableData.comments} setValue={(e) => handleFieldChange('comments', e.target.value ?? '')}/>
				</div>

				<div className="flex flex-col gap-3 w-full sm:w-[380px]">
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
					<EditableField containerClasses="sm:hidden flex" isEdit={isEdit} type="textarea" title="Коментар" value={editableData.comments} setValue={(e) => handleFieldChange('comments', e.target.value ?? '')}/>
				</div>
			</div>
			<ProductsTable orderId={orderId} products={order.orderedItems}/>
		</div>

	)
}

export default OrderDetails;
