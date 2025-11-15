import React from "react";
import ProductsTable from "./_elements/ProductsTable";
import EditableField from "./_elements/EditableField";

const OrderDetails = ({order}) => {
	const deliveryAddress = order.deliveryMethod === "Доставка кур'єром"
		? `${order.city} ${order.address} ${order.building} ${order.apartment ?? ''}`
		: `${order.city} ${order.warehouse}`;

	return (
		<div className="flex flex-col gap-5">
			<div className="flex gap-12">
				<div className="flex flex-col gap-3 w-[334px]">
					<EditableField title="Номер замовлення" value={order.orderNumber}/>
					<EditableField title="Створено" value={order.createdAt.split('T')[0]}/>
					<EditableField title="Статус" value={order.status}/>
					<EditableField title="Коментар" value={order.comments}/>
				</div>
				<div className="flex flex-col gap-3 w-[334px]">
					<EditableField title="Покупець" value={`${order.firstName} ${order.lastName}`}/>
					<EditableField title="Телефон" value={order.number}/>
					<EditableField title="Email" value={order.email}/>
					<EditableField title="Спосіб доставки" value={order.deliveryMethod}/>
					<EditableField title="Адреса доставки" value={`${deliveryAddress.trim()}`}/>
				</div>
			</div>
			<ProductsTable products={order.orderedItems}/>
		</div>
	)
}

export default OrderDetails;
