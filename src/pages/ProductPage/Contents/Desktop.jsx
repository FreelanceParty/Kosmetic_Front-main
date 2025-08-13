import RateHearts from "../../../components/RateHearts/RateHearts";
import {routeHelper} from "../../../utils/helpers/routeHelper";
import NumberInput from "../../../components/NumberInput/NumberInput";
import Button from "../../../components/ButtonNew/Button";
import Details from "../Sections/Details";
import {useState} from "react";
import {useMedia} from "../../../utils/hooks/useMedia";

const Desktop = ({product}) => {
	const {getCategoryRoute} = routeHelper();
	const [isAdmin, setIsAdmin] = useState(false);
	const [isOptUser, setIsOptUser] = useState(false);
	const [isAuthorized, setIsAuthorized] = useState(false);

	return (
		<div className="hidden md:flex w-full justify-center relative">
			<div className="flex flex-col max-w-[1240px] mx-20 text-[#000E55]">
				<div className="flex gap-[10px] my-10 font-normal text-sm">
					<a className="cursor-pointer" href="/">Головна</a>
					<div className="border-[#000E55] border-l"></div>
					<a className="cursor-pointer" href={getCategoryRoute(product.category)}>{product.category}</a>
					<div className="border-[#000E55] border-l"></div>
					<div className="">{product.name}</div>
				</div>
				<div className="flex flex-col gap-[50px]">
					<div className="flex gap-10">
						<div className="flex items-center justify-center w-1/2 aspect-square">
							<img src={product.images} alt="product image"/>
						</div>
						<div className="flex flex-col gap-10 w-1/2">
							<div className="flex flex-col gap-[30px]">
								<div className="font-semibold text-[36px]">{product.name}</div>
								<a className="underline cursor-pointer font-medium text-lg max-w-fit" href={`/brands/${product.brand}`}>{product.brand}</a>
								<div className="flex gap-3">
									<RateHearts heartSize={14} count={3}/>
									<div className="font-normal text-xs">1 відгук</div>
								</div>
								<div className="flex gap-4 items-end">
									<div className="flex flex-col gap-4">
										{product.priceOld !== null && (
											<div className="font-normal text-md line-through">{product.priceOld} ГРН</div>
										)}
										<div className={`font-bold text-2xl ${product.priceOld === null ? '' : 'text-[#B90003]'}`}>{product.price} ГРН</div>
									</div>
									<div className="font-normal text-lg">Роздрібна ціна</div>
								</div>
								<div className="border-b"></div>
								<div className="flex gap-4 font-normal text-sm">
									{product.amount > 0 ? (
										<div className="text-[#007504]">В наявності</div>
									) : (
										<div className="text-[#B90003]">Немає в наявності</div>
									)}
									<div className="border-[#000E55] border-l"></div>
									<div>Код: {product.code}</div>
									<div className="border-[#000E55] border-l"></div>
									<div>Артикул: {product.article}</div>
								</div>
							</div>
							<div className="flex gap-[30px]">
								<NumberInput/>
								<Button
									text="ДОДАТИ У КОШИК"
									type="primary"
									classes="bg-[#E667A4]"
									isDisabled={product.amount === 0}
								/>
							</div>
							{isAuthorized ? (
								<div/>
							) : (
								<div className="flex gap-3 items-center">
									<img
										src={require("../../../assets/icons/star_percentage.svg").default}
										alt="tg"
										width={28}
										height={28}
									/>
									<div>Зареєструйтесь або увійдіть для відображення оптових цін</div>
								</div>
							)}
						</div>
					</div>
					<Details
						product={product}
					/>
				</div>
				<div className="flex flex-col gap-10 py-10 border-t">
					<div>РЕКОМЕНДОВАНІ ТОВАРИ</div>
					{/*<ProductSlider*/}
					// todo: slider
					{/*/>*/}
				</div>
			</div>
		</div>
	)
}

export default Desktop;