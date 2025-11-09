import ChevronIcon from "../../../../components/Icons/ChevronIcon";
import {useState} from "react";

const OrderBlock = ({order}) => {

	const [isOpen, setIsOpen] = useState(false);

	function formatDate(dateString) {
		return new Date(dateString)
				.toLocaleDateString("uk-UA", {day: "numeric", month: "long"})
			+ " " + new Date(dateString).getFullYear();
	}

	function getOrderStatusColor(status) {
		switch (status) {
			case "Відправлено":
				return '#000E55';
			case "Відмінено":
				return '#B90003';
			case "Доставлено":
				return '#007504';
			default:
				return '#000E55';
		}
	}

	function toggleOrder() {
		setIsOpen((prev) => !prev);
	}

	return (
		<div className="flex flex-col border-b md:border border-[#E8E8E8] gap-3 md:gap-0 pr-2">
			<div className="hidden md:flex p-5 justify-between items-center w-full cursor-pointer" onClick={() => toggleOrder()}>
				<div className="flex flex-col gap-5">
					<div className="text-md leading-[14px]">Замовлення №{order.orderNumber}, {formatDate(order.createdAt)}</div>
					<div className={`font-semibold text-md leading-[11px] text-[${getOrderStatusColor(order.status)}]`}>{order.status}</div>
				</div>
				<div className="flex gap-[100px] items-center">
					<div className="flex flex-col gap-5">
						<div className="text-md leading-[11px]">Сума</div>
						<div className="font-semibold text-md leading-[11px]">{order.amount} грн</div>
					</div>
					<div className={`transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`}>
						<ChevronIcon/>
					</div>
				</div>
			</div>
			<div className="flex flex-col md:hidden pl-3 w-full border-l-2 border-[#000E55] cursor-pointer gap-5" onClick={() => toggleOrder()}>
				<div className="flex justify-between gap-5">
					<div className="text-md leading-[16px]">Замовлення №{order.orderNumber},<br/>{formatDate(order.createdAt)}</div>
					<div className={`transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`}>
						<ChevronIcon/>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<div className={`font-semibold text-md leading-[11px] text-[${getOrderStatusColor(order.status)}]`}>{order.status}</div>
					<div className="font-semibold text-md leading-[11px]">{order.amount} грн</div>
				</div>
			</div>
			{isOpen && order.orderedItems.map((item, index) => (
				<div key={index} className="px-0 md:p-[10px] h-[114px] md:h-[92px] w-full">
					<div className="flex gap-3 h-full w-full">
						<div className="flex items-center justify-center h-[52px] md:h-full aspect-square my-auto">
							<img src={item.images} alt="product"/>
						</div>
						<div className="flex flex-col md:flex-row gap-4 border-b border-[#E8E8E8] justify-between w-full py-[10px]">
							<div className="line-clamp-4 md:line-clamp-3 text-[13px] md:text-md w-full min-w-[259px] md:min-w-[373px] leading-[16px]">{item.name}</div>
							<div className="flex justify-between w-full">
								<div className="text-md leading-[11px] my-auto whitespace-nowrap">{item.quantity} шт.</div>
								<div className="font-semibold text-md leading-[11px] my-auto whitespace-nowrap">{item.amount} грн</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default OrderBlock;