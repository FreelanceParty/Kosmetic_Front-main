import RateHearts from "../../../components/RateHearts/RateHearts";
import NumberInput from "../../../components/NumberInput/NumberInput";
import Button from "../../../components/ButtonNew/Button";
import Details from "../Sections/Details";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getIsAdmin, getOptUser} from "../../../redux/auth/selectors";
import Tag from "../../../components/ProductSlider/ProductCard/_elements/Tag";
import Input from "../../../components/Input/Input";

const Mobile = ({isInCart, product, reviewsLength, reviewsCount, averageRating, quantity, setQuantity, addToCartHandler, productCount, setProductCount, updateProductCountHandler}) => {
	const isOptUser = useSelector(getOptUser);
	const isAdmin = useSelector(getIsAdmin);
	const [isAuthorized] = useState(false);
	const [price, setPrice] = useState(0);
	const [priceOld, setPriceOld] = useState(0);

	useEffect(() => {
		if (isOptUser) {
			setPrice(product.priceOPT);
			setPriceOld(product.priceOldOPT);
		} else {
			setPrice(product.price);
			setPriceOld(product.priceOld);
		}
	}, [isOptUser])

	return (
		<div className="flex md:hidden w-full flex-col p-5 pb-[60px] text-[#000E55]">
			<div className="flex flex-col items-center">
				<div className="relative w-full flex items-center justify-center mb-6">
					<img src={product.images} alt="product"/>
					{(product.sale || product.new) &&
						<div className="absolute top-4 right-0 flex flex-col gap-4 z-10">
							{product.sale && <Tag isSale={true}/>}
							{product.new && <Tag isSale={false}/>}
						</div>
					}
				</div>
				<div className="flex flex-col gap-8 w-full">
					<div className="flex flex-col gap-6">
						<div className="flex justify-between items-center">
							<a className="underline cursor-pointer font-medium text-lg max-w-fit leading-[20px]" href={`/brands/${product.brand}`}>{product.brand}</a>
							<div className="flex gap-3">
								<RateHearts heartSize={14} count={averageRating}/>
								<div className="font-normal text-xs text-nowrap">{reviewsCount}</div>
							</div>
						</div>
						<div className="font-semibold text-[20px]">{product.name}</div>
					</div>
					<div className="flex flex-col gap-6">
						<div className="flex justify-between items-center">
							<div className="flex flex-col gap-4">
								{priceOld && (
									<div className="font-normal text-md line-through leading-[11px]">{priceOld} ГРН</div>
								)}
								<div className={`font-bold text-2xl leading-[17px] ${priceOld ? 'text-[#B90003]' : ''}`}>{price} ГРН</div>
								<div className="font-normal text-lg leading-[8px]">Роздрібна ціна</div>
							</div>
							{isInCart ||
								<NumberInput number={quantity} setNumber={setQuantity}/>
							}
						</div>
						<div className="flex flex-col gap-4">
							<div className={`font semibold text-md text-[#DA469A] ${quantity > product.amount || 'hidden'}`}>*Дана кількість не доступна на складі</div>
							<Button
								text={isInCart ? `У КОШИКУ` : `ДОДАТИ У КОШИК`}
								type="primary"
								classes={`${isInCart ? 'bg-gray-400' : 'bg-[#E667A4]'} w-full !h-[51px]`}
								onClick={isInCart ? null : addToCartHandler}
								isDisabled={isInCart || product.amount === 0 || quantity > product.amount}
							/>
							{isAdmin && (
								<div className="flex gap-[30px]">
									<Input
										type="number"
										value={productCount}
										placeholder="К-сть товару"
										onChange={(e) => setProductCount(e.target.value)}
										inputClasses="pr-2 !h-[51px]"
									/>
									<Button
										text="Оновити"
										type="primary"
										classes="bg-[#E667A4] !h-[51px]"
										onClick={updateProductCountHandler}
									/>
								</div>
							)}
							<div className="flex justify-between font-normal text-sm">
								{product.amount > 0 ? (
									<div className="text-[#007504] leading-[10px]">В наявності</div>
								) : (
									<div className="text-[#B90003] leading-[10px]">Немає в наявності</div>
								)}
								<div className="flex flex-col gap-3">
									<div className="leading-[10px]">Код: {product.code}</div>
									<div className="leading-[10px]">Артикул: {product.article}</div>
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
								<div className="leading-[20px]">Зареєструйтесь або увійдіть для відображення оптових цін</div>
							</div>
						)}
					</div>
				</div>
				<Details
					product={product}
					reviewsCount={reviewsLength}
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