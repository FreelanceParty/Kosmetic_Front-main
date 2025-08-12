import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
	ReviewsSection,
	ReviewsTitle,
	ReviewCard,
	ProductImage,
	ProductInfo,
	BrandName,
	ProductName,
	ReviewInfo,
	ReviewerName,
	ReviewDate,
	ReviewText,
	ReviewRating,
	HeartIcon,
	ReviewWrap,
	ProductCart,
	ReviewContainer,
} from "./Reviews.styled";

const reviews = [
	{
		id:      1,
		name:    "Олена",
		date:    "15.03.2024",
		text:    "Дуже задоволена якістю косметики! Замовляю вже не перший раз і завжди отримую чудовий сервіс. Особливо подобається швидка доставка та приємні бонуси до замовлення.",
		rating:  3,
		product: {
			image: require("../../assets/200x200.png"),
			brand: "COSRX",
			name:  "Advanced Snail 96 Mucin Power Essence",
		},
	},
	{
		id:      2,
		name:    "Марія",
		date:    "12.03.2024",
		text:    "Користуюся продукцією вже більше року. Якість на висоті, ціни приємні. Дуже подобається асортимент корейської косметики.",
		rating:  4,
		product: {
			image: require("../../assets/200x200.png"),
			brand: "SOME BY MI",
			name:  "AHA-BHA-PHA 30 Days Miracle Serum",
		},
	},
	{
		id:      3,
		name:    "Ірина",
		date:    "10.03.2024",
		text:    "Чудовий магазин! Завжди можна знайти щось цікаве. Консультанти допомагають з вибором, що дуже зручно. Рекомендую всім, хто цікавиться корейською косметикою.",
		rating:  5,
		product: {
			image: require("../../assets/200x200.png"),
			brand: "BEAUTY OF JOSEON",
			name:  "Glow Deep Serum",
		},
	},
	{
		id:      4,
		name:    "Наталія",
		date:    "08.03.2024",
		text:    "Дякую за швидку доставку та якісний товар! Особливо сподобався індивідуальний підхід та допомога у виборі засобів для мого типу шкіри.",
		rating:  5,
		product: {
			image: require("../../assets/200x200.png"),
			brand: "PURITO",
			name:  "Centella Green Level Unscented Serum",
		},
	},
];

const Reviews = () => {
	return (
		<ReviewsSection>
			<ReviewsTitle>Відгуки</ReviewsTitle>
			<Swiper
				modules={[Pagination, Autoplay]}
				spaceBetween={20}
				slidesPerView={1.02}
				loop={true}
				autoplay={{
					delay:                3000,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable:      true,
					dynamicBullets: true,
				}}
				breakpoints={{
					640:  {
						slidesPerView: 2,
					},
					1024: {
						slidesPerView: 3,
					},
				}}
			>
				{reviews.map((review) => (
					<SwiperSlide key={review.id}>
						<ReviewCard>
							<ProductCart>
								<ProductImage
									src={review.product.image}
									alt={review.product.name}
								/>
								<ProductInfo>
									<BrandName>{review.product.brand}</BrandName>
									<ProductName>{review.product.name}</ProductName>
								</ProductInfo>
							</ProductCart>

							<ReviewContainer>
								<ReviewInfo>
									<ReviewWrap>
										<ReviewRating>
											{[...Array(5)].map((_, index) => (
												<HeartIcon
													key={index}
													src={
														require("../../assets/icons/heart-filled.svg")
															.default
													}
													alt="heart"
													filled={index < review.rating}
												/>
											))}
										</ReviewRating>{" "}
										<ReviewDate>{review.date}</ReviewDate>
									</ReviewWrap>
									<ReviewerName>{review.name}</ReviewerName>
								</ReviewInfo>
								<ReviewText>{review.text}</ReviewText>
							</ReviewContainer>
						</ReviewCard>
					</SwiperSlide>
				))}
			</Swiper>
		</ReviewsSection>
	);
};

export default Reviews;
