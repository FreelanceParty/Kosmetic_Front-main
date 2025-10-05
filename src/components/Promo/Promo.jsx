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
		<div className={`bg-[#FFE8F5]`}>
			{isMobileScreen && <PromoWrapper style={{height: "28px"}}/>}

			<PromoWrapper className="flex justify-center py-[10px] w-full text-center z-10">
				{isMobileScreen ? (
					<PromoText
						href="https://t.me/+Eejgotzs-ktiMTIy"
						target="_blank"
						rel="noreferrer"
						className="text-xs leading-2"
					>
						Підписуйся на наш телеграм
					</PromoText>
				) : (
					<Swiper
						modules={[Autoplay]}
						slidesPerView={1}
						loop={true}
						autoplay={{
							delay:                50000,
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
									<PromoText href={msg.href} target="_blank" rel="noreferrer"
										className="font-medium text-md leading-[22px]">
										{msg.text}
									</PromoText>
								) : (
									<PromoText className="font-medium text-md leading-[22px]" as="span">{msg.text}</PromoText>
								)}
							</SwiperSlide>
						))}
					</Swiper>
				)}
			</PromoWrapper>
		</div>
	);
};

export default Promo;
