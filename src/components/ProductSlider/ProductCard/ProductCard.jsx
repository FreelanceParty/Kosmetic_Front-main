import React from "react";
import {
	CardWrapper,
	CardImage,
	CardTag,
	NewnessTag,
	CardRatingWrap,
	CardBrand,
	CardDesc,
	CardInfo,
	CardRating,
	CardPriceBlock,
	CardOldPrice,
	CardNewPrice,
	CardBuyButton,
	CardReviews,
	CardImageWrap,
	CardRatingImg,
	CardBuyWrap,
	BuyButtonImg,
	AmountGreen,
	AmountRed,
} from "./ProductCard.styled";

import HeartIcon from "../../../assets/icons/slider/heart.svg";
import HeartEmptyIcon from "../../../assets/icons/slider/heart-2.svg";
import BuyIcon from "../../../assets/icons/buy.svg";

const ProductCard = ({
	images,
	newness,
	sale,
	brand,
	desc,
	rating = 5,
	reviews = 0,
	priceOld,
	price,
	onBuy,
	amount,
}) => {
	const isAvailable = amount > 0;

	return (
		<CardWrapper>
			<CardImageWrap>
				<CardImage src={images} alt={brand}/>
			</CardImageWrap>

			{/* Теги SALE / NEW */}
			{sale && <CardTag>sale</CardTag>}
			{!sale && newness && <CardTag>new</CardTag>}

			<CardInfo>
				<CardRatingWrap>
					<CardRating>
						{[...Array(5)].map((_, i) => (
							<CardRatingImg
								key={i}
								src={i < rating ? HeartIcon : HeartEmptyIcon}
								alt="heart"
							/>
						))}
					</CardRating>
					<CardReviews>{reviews} відгуки</CardReviews>
				</CardRatingWrap>

				<CardBrand>{brand}</CardBrand>
				<CardDesc>{desc}</CardDesc>

				<CardBuyWrap>
					<CardPriceBlock>
						{isAvailable ? (
							<AmountGreen>В наявності</AmountGreen>
						) : (
							<AmountRed>Немає в наявності</AmountRed>
						)}

						{priceOld && (
							<CardOldPrice>
								<span>{priceOld}</span> грн
							</CardOldPrice>
						)}
						<CardNewPrice sale={sale}>{price} грн</CardNewPrice>
					</CardPriceBlock>

					<CardBuyButton
						onClick={isAvailable ? onBuy : undefined}
						disabled={!isAvailable}
					>
						<BuyButtonImg src={BuyIcon} alt="buy"/>
					</CardBuyButton>
				</CardBuyWrap>
			</CardInfo>
		</CardWrapper>
	);
};

export default ProductCard;
