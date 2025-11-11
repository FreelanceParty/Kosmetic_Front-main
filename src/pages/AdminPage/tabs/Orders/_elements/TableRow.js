import React, {useEffect, useRef, useState} from "react";
import StatusOptions from "./StatusOptions";
import TableCell from "./TableCell";
import EditIcon from "../../../../../components/Icons/EditIcon";
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

const TableRow = ({order}) => {
	const [isStatusOpen, setIsStatusOpen] = useState(false);
	const statusClass = getStatusClass(order.status);
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

	return (
		<>
			<TableCell title={order.orderNumber}/>
			<TableCell title={`${order.firstName} ${order.lastName}`}/>
			<div ref={statusRef} className={`flex items-center h-[42px] relative px-[14px] ${statusClass}`}>
				<div className="flex justify-between items-center cursor-pointer h-full w-full" onClick={() => setIsStatusOpen(!isStatusOpen)}>
					<div>{order.status}</div>
					<div>+</div>
				</div>
				{isStatusOpen && (
					<StatusOptions selected={order.status}/>
				)}
			</div>
			<TableCell title={order.createdAt.substr(0, 10)}/>
			<TableCell title={order.amount.toFixed(2)}/>
			<TableCell title={order.paymentMethod}/>
			<div className={`flex items-center justify-center h-[42px]`}>
				<div className="flex items-center justify-center h-[30px] w-[30px] rounded-full bg-gray-200 cursor-pointer">
					<EditIcon classes="h-2 w-2"/>
				</div>
			</div>
		</>
	)
}
export default TableRow;