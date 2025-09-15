import RateHearts from "../../RateHearts/RateHearts";
import {useNavigate} from "react-router-dom";

const ProductCard = ({product}) => {
	const navigate = useNavigate();
	// todo: що робити якщо відгуків немає або число не ціле (3.4)?
	return (
		<>
			<div className="flex sm:hidden flex-col w-[159px] cursor-pointer" onClick={() => navigate('/products/' + product.id)}>
				<div className="flex items-center justify-center w-full aspect-square">
					<img src={product.images} alt="product image"/>
				</div>
				<div className="flex flex-col gap-4 py-3 px-[10px]">
					<div className="flex flex-col gap-3">
						<div className="flex gap-[6px] leading-[12px]">
							<RateHearts count={3} heartSize={12}/>
							<div className="font-normal text-[10px]">1 відгук</div>
						</div>
						<div className="font-semibold text-xs leading-[8px] uppercase">{product.brand}</div>
						<div className="font-normal text-xs line-clamp-3 leading-[15px]">{product.name}</div>
					</div>
					<div className="flex justify-between">
						<div className="flex flex-col justify-between">
							{product.amount > 0 ? (
								<div className="text-[#007504] text-[10px] leading-[7px]">В наявності</div>
							) : (
								<div className="text-[#B90003] text-[10px] leading-[7px] truncate">Немає в наявності</div>
							)}
							<div className={`flex flex-col h-[27px] ${product.priceOld !== undefined ? 'justify-between' : 'justify-end'}`}>
								{product.priceOld !== undefined && (
									<div className="font-normal text-[10px] line-through leading-[7px]">{product.priceOld} ГРН</div>
								)}
								<div className={`font-bold text-sm leading-[10px] ${product.priceOld === undefined ? '' : 'text-[#B90003]'}`}>{product.price} ГРН</div>
							</div>
						</div>
						<img
							src={require("../../../assets/icons/buy_mobile.svg").default}
							alt="to cart"
							width={44}
							height={44}
						/>
					</div>
				</div>
			</div>

			<div className="hidden sm:flex flex-col w-[283px] cursor-pointer" onClick={() => navigate('/product/' + product.id)}>
				<div className="flex items-center justify-center w-full aspect-square">
					<img src={product.images} alt="product image"/>
				</div>
				<div className="flex flex-col gap-5 py-5 px-3">
					<div className="flex flex-col gap-4">
						<div className="flex gap-3">
							<RateHearts count={3}/>
							<div className="font-normal text-xs">1 відгук</div>
						</div>
						<div className="font-semibold text-sm leading-[11px] uppercase">{product.brand}</div>
					</div>
					<div className="font-normal text-sm line-clamp-2 leading-[15px]">{product.name}</div>
					<div className="flex justify-between">
						<div className="flex flex-col justify-between text-xs justify-center gap-2 h-[31px] leading-[8px]">
							{product.amount > 0 ? (
								<div className="text-[#007504]">В наявності</div>
							) : (
								<div className="text-[#B90003]">Немає в наявності</div>
							)}
							<div>Роздрібна ціна</div>
						</div>
						<div className={`flex flex-col ${product.priceOld !== undefined ? 'justify-between' : 'justify-end'}`}>
							{product.priceOld !== undefined && (
								<div className="font-normal text-sm line-through leading-[10px]">{product.priceOld} ГРН</div>
							)}
							<div className={`font-bold text-md leading-[11px] ${product.priceOld === undefined ? '' : 'text-[#B90003]'}`}>{product.price} ГРН</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProductCard;
