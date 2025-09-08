const OrderBlock = ({order}) => {
	return (
		<div className="flex flex-col">
			<div></div>
			{order.orderedItems.map((item, index) => (
				<div key={index} className="w-full px-10 py-[10px] h-[72px]">
					<div className="flex gap-3 h-full">
						<div className="flex items-center justify-center h-full aspect-square">
							<img src={item.images} alt="product image"/>
						</div>
						<div className="flex gap-5">
							<div className="line-clamp-3 text-md max-w-[373px]">{item.name}</div>
							<div className="text-md leading-[11px]">{item.quantity} шт.</div>
							<div className="font-semibold text-md leading-[11px]">{item.amount} грн</div>
						</div>
					</div>
				</div>
			))

			}
		</div>
	)
}

export default OrderBlock;