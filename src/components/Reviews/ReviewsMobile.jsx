import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import {useNavigate} from "react-router-dom";
import ProductReview from "./_elements/ProductReview";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";

const images = [
	//require("../../assets/images/reviews/1.png"),
	require("../../assets/images/reviews/2.png"),
	require("../../assets/images/reviews/3.png"),
	require("../../assets/images/reviews/4.png"),
	require("../../assets/images/reviews/5.png"),
	require("../../assets/images/reviews/2.png"),
	require("../../assets/images/reviews/3.png"),
	require("../../assets/images/reviews/4.png"),
	require("../../assets/images/reviews/5.png"),
	//require("../../assets/images/reviews/6.png"),
];

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

const Reviews = ({withProducts = true}) => {
	//const navigate = useNavigate(); // todo: go to product page

	return (
		<div className="flex md:hidden flex-col border-t border-[#E8E8E8] w-full max-w-[1241px] pb-[60px]">
			<div className="font-semibold text-[24px] leading-[17px] text-center py-10">ВІДГУКИ</div>
			<div className="flex flex-col gap-10 items-center">

				<div className="custom-screen-reviews-pagination flex justify-center mt-6"></div>
				<Swiper
					modules={[Pagination]}
					spaceBetween={20}
					slidesPerView={2.2}
					pagination={{clickable: true, el: ".custom-screen-reviews-pagination"}}
					className="max-w-md"
				>
					{images.map((image, index) => (
						<SwiperSlide key={index} className="max-w-fit">
							<img className="w-[193px] h-[344px]" src={image} alt="review"/>
						</SwiperSlide>
					))}
				</Swiper>

				{withProducts &&
					<Swiper
						modules={[Pagination]}
						spaceBetween={20}
						slidesPerView={1.5}
						pagination={{clickable: true, el: ".custom-product-reviews-pagination"}}
						className="max-w-md"
					>
						{reviews.slice(0, 9).map((review, index) => (
							<SwiperSlide key={index} className="max-w-[306px]">
								<ProductReview key={index} review={review}/>
							</SwiperSlide>
						))}
						<div className="custom-product-reviews-pagination flex justify-center mt-6"></div>
					</Swiper>
				}
			</div>
		</div>
	)
};

export default Reviews;
