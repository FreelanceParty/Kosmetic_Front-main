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
	const statusClass = getStatusClass(order.status);
	return (
		<tr className="h-[42px]">
			<td className=" pl-[14px]">{order.orderNumber}</td>
			<td className=" pl-[14px]">{`${order.firstName} ${order.lastName}`}</td>
			<td className={`${statusClass} pl-[14px]`}>{order.status}</td>
			<td className=" pl-[14px]">{order.createdAt.substr(0, 10)}</td>
			<td className=" pl-[14px]">{order.amount.toFixed(2)}</td>
			<td className=" pl-[14px]">{order.paymentMethod}</td>
			<td className=" pl-[14px]">edit</td>
		</tr>
	)
}
export default TableRow;