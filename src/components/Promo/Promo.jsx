import React from "react";
import {PromoWrapper, PromoText} from "./Promo.styled";
import {useMedia} from "../../utils/hooks/useMedia";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import "swiper/css";

const promoMessages = [
	{
		text: "Підписуйся на наш телеграм, щоб дізнатись першим про новинки",
		href: "https://t.me/+Eejgotzs-ktiMTIy",
	},
	{
		text: "Безкоштовна доставка від 3000 грн",
		href: "",
	},
	{
		text: "Зареєструйся на сайті, щоб побачити оптові ціни",
		href: "",
	},
];

const Promo = () => {
	const {isMobileScreen} = useMedia();

	return (
		<>
			{isMobileScreen && <PromoWrapper style={{height: "37px"}}/>}

			<PromoWrapper>
				{isMobileScreen ? (
					<PromoText
						href="https://t.me/+Eejgotzs-ktiMTIy"
						target="_blank"
						rel="noreferrer"
					>
						Підписуйся на наш телеграм
					</PromoText>
				) : (
					<Swiper
						modules={[Autoplay]}
						slidesPerView={1}
						loop={true}
						autoplay={{
							delay:                5000,
							disableOnInteraction: false,
							pauseOnMouseEnter:    true,
						}}
						speed={1000}
						allowTouchMove={false}
						style={{width: "100%"}}
					>
						{promoMessages.map((msg, idx) => (
							<SwiperSlide key={idx}>
								{idx === 0 ? (
									<PromoText href={msg.href} target="_blank" rel="noreferrer">
										{msg.text}
									</PromoText>
								) : (
									<PromoText as="span">{msg.text}</PromoText>
								)}
							</SwiperSlide>
						))}
					</Swiper>
				)}
			</PromoWrapper>
		</>
	);
};

export default Promo;
