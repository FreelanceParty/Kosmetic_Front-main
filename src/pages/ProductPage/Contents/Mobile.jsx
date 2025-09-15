import RateHearts from "../../../components/RateHearts/RateHearts";
import {routeHelper} from "../../../utils/helpers/routeHelper";
import NumberInput from "../../../components/NumberInput/NumberInput";
import Button from "../../../components/ButtonNew/Button";
import Details from "../Sections/Details";
import {useState} from "react";
import {useMedia} from "../../../utils/hooks/useMedia";

const Mobile = ({product}) => {
	const {getCategoryRoute} = routeHelper();
	const [isAdmin, setIsAdmin] = useState(false);
	const [isOptUser, setIsOptUser] = useState(false);
	const [isAuthorized, setIsAuthorized] = useState(false);

	return (
		<div className="flex md:hidden w-full flex-col p-5 pb-[60px] text-[#000E55]">
			<div className="flex flex-col items-center">
				<div className="w-full flex items-center justify-center mb-6">
					<img src={product.images} alt="product"/>
				</div>
				<div className="flex flex-col gap-8 w-full">
					<div className="flex flex-col gap-6">
						<div className="flex justify-between items-center">
							<a className="underline cursor-pointer font-medium text-lg max-w-fit" href={`/brands/${product.brand}`}>{product.brand}</a>
							<div className="flex gap-3">
								<RateHearts heartSize={14} count={3}/>
								<div className="font-normal text-xs">1 відгук</div>
							</div>
						</div>
						<div className="font-semibold text-[20px]">{product.name}</div>
					</div>
					<div className="flex flex-col gap-6">
						<div className="flex justify-between items-center">
							<div className="flex flex-col gap-4">
								{product.priceOld !== null && (
									<div className="font-normal text-md line-through">{product.priceOld} ГРН</div>
								)}
								<div className={`font-bold text-2xl ${product.priceOld === null ? '' : 'text-[#B90003]'}`}>{product.price} ГРН</div>
								<div className="font-normal text-lg">Роздрібна ціна</div>
							</div>
							<NumberInput/>
						</div>
						<div className="flex flex-col gap-4">
							<Button
								text="ДОДАТИ У КОШИК"
								type="primary"
								classes="bg-[#E667A4] w-full"
								isDisabled={product.amount === 0}
							/>
							<div className="flex justify-between">
								{product.amount > 0 ? (
									<div className="text-[#007504]">В наявності</div>
								) : (
									<div className="text-[#B90003]">Немає в наявності</div>
								)}
								<div className="flex flex-col gap-3 font-normal text-sm">
									<div>Код: {product.code}</div>
									<div>Артикул: {product.article}</div>
								</div>
							</div>
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
	)
}

export default Mobile;