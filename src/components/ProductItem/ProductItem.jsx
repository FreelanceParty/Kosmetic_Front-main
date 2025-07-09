import React, {useState} from "react";
import {useDispatch} from "react-redux";

import Sticker from "../Sticker/Sticker";
import Button from "../Button/Button";

import {
	Available,
	BrandName,
	ButtonWrap,
	Content,
	Image,
	ImageWrap,
	ItemStyle,
	LinkStyle,
	Name,
	Price,
	PriceName,
	PriceSale,
	PriceWrap,
	ProductTags,
} from "./ProductItem.styled";

const ProductItem = ({product, slider}) => {
	const [isHovered, setIsHovered] = useState(false);
	const dispatch = useDispatch();
	const quantity = 1;
	const optUser = true;

	const isProductInCart = false;

	const handleAddToCart = (event) => {
		event.preventDefault();

		console.log("Product added to cart");
	};

	return (
		<ItemStyle
			className={product.amount <= 0 ? "unavailable" : ""}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			slider={slider}
		>
			<LinkStyle to={`/products/${product.id}`}>
				<ImageWrap slider={slider}>
					<Image src={product.images} alt={product.name}/>
				</ImageWrap>
				<ProductTags>
					{product.sale && <Sticker text="SALE" sale slider={slider}/>}
					{product.newness && <Sticker text="NEW" slider={slider}/>}
				</ProductTags>
				<Content>
					<BrandName slider={slider}>{product.brand}</BrandName>
					<Name slider={slider}>{product.name}</Name>
					{optUser ? (
						<PriceWrap>
							<div>
								<PriceName slider={slider}>оптова ціна</PriceName>
								{product.amount > 0 && (
									<Available slider={slider}>в наявності</Available>
								)}
							</div>
							<div>
								{product.priceOldOPT && product.sale === true && (
									<PriceSale slider={slider}>
										{product.priceOldOPT} грн
									</PriceSale>
								)}
								<Price slider={slider}>
									{product.priceOPT}
									<span>грн</span>
								</Price>
							</div>
						</PriceWrap>
					) : (
						<PriceWrap>
							<div>
								<PriceName slider={slider}>роздрібна ціна</PriceName>
								{product.amount > 0 && (
									<Available slider={slider}>в наявності</Available>
								)}
							</div>
							<div>
								{product.priceOld && product.sale === true && (
									<PriceSale slider={slider}>{product.priceOld} грн</PriceSale>
								)}
								<Price slider={slider}>
									{product.price} <span>грн</span>
								</Price>
							</div>
						</PriceWrap>
					)}
				</Content>
				<>
					<ButtonWrap>
						<Button
							list
							type="button"
							slider={slider}
							text={
								product.amount <= 0
									? "Немає в наявності"
									: isProductInCart // productInCart
										? "У кошику"
										: "Додати до кошика"
							}
							onClick={handleAddToCart}
							disabled={isProductInCart || product.amount <= 0}
						/>
					</ButtonWrap>
				</>
			</LinkStyle>
		</ItemStyle>
	);
};

export default ProductItem;
