import Button from "../../../../../../components/ButtonNew/Button";
import MiniChevronIcon from "../../../../../../components/Icons/MiniChevronIcon";
import StatusOptions from "../StatusOptions";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

const getStatusClass = (status) => {
	switch (status) {
		case "Новий":
			return "bg-[#B4FFCF]";
		case "Відміна":
			return "bg-[#FFD5D5]";
		case "Зібрано":
			return "bg-[#FAFFD7]";
		case "Прийняте в роботу":
			return "bg-[#E7DDFF]";
		case "Відправлено":
			return "bg-[#CBEBFF]";
		case "Збирається":
			return "bg-[#FFE4D0]";
		default:
			return "bg-white";
	}
}

const OrderCard = ({order, onEditClick}) => {
	const [isStatusOpen, setIsStatusOpen] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState(order.status);
	const [statusClass, setStatusClass] = useState(getStatusClass(order.status));

	const statusRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (statusRef.current && !statusRef.current.contains(event.target)) {
				setIsStatusOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [statusRef]);

	useEffect(() => {
		const updateOrderStatus = async () => {
			try {
				await axios.patch(`${API_URL}/orders/${order._id}/status`, {status: selectedStatus});
			} catch (e) {
				toast.error(e);
			}
		}
		if (isStatusOpen) {
			updateOrderStatus();
			setIsStatusOpen(false);
		}
		setStatusClass(getStatusClass(selectedStatus));
	}, [selectedStatus]);

	return (
		<div className="flex flex-col gap-5 px-4 py-5 shadow-md">
			<div className="flex justify-between items-center gap-4">
				<div className="font-medium text-md leading-[22px]">№{order.orderNumber}</div>
				<div ref={statusRef} className={`flex items-center h-[42px] relative ${statusClass}`} onClick={(e) => e.stopPropagation()}>
					<div className="flex justify-between items-center cursor-pointer h-full px-[14px] gap-3 min-w-[130px]" onClick={() => setIsStatusOpen(!isStatusOpen)}>
						<div className="text-[13px] leading-[12px]">{selectedStatus}</div>
						<MiniChevronIcon classes={`transition-all ${isStatusOpen ? 'rotate-180' : ''}`}/>
					</div>
					{isStatusOpen && (
						<StatusOptions selected={selectedStatus} setStatus={setSelectedStatus} withNoSelected={false}/>
					)}
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex justify-between gap-4 text-sm">
					<div className="leading-[22px] text-nowrap">Ім'я</div>
					<div className="font-medium leading-[22px] line-clamp-1">{order.firstName} {order.lastName}</div>
				</div>
				<div className="flex justify-between gap-4 text-sm">
					<div className="leading-[22px] text-nowrap">Дата</div>
					<div className="font-medium leading-[22px] line-clamp-1">{order.createdAt.split('T')[0]}</div>
				</div>
				<div className="flex justify-between gap-4 text-sm">
					<div className="leading-[22px] text-nowrap">Сума</div>
					<div className="font-medium leading-[22px] line-clamp-1">{order.amount.toFixed(2)}</div>
				</div>
				<div className="flex justify-between gap-4 text-sm">
					<div className="leading-[22px] text-nowrap">Фін. статус</div>
					<div className="font-medium leading-[22px] line-clamp-1">{order.paymentMethod}</div>
				</div>
			</div>
			<Button
				type="primary"
				text="Детальніше"
				classes="!h-[33px] w-full rounded-[3px]"
				onClick={onEditClick}
			/>
		</div>
	)
}

export default OrderCard;