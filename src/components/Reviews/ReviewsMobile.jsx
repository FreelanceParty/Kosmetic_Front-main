import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import {useNavigate} from "react-router-dom";
import ProductReview from "./_elements/ProductReview";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import review1 from "../../assets/images/reviews/photo_1_2026-05-04_09-18-29.jpg";
import review2 from "../../assets/images/reviews/photo_2_2026-05-04_09-18-29.jpg";
import review3 from "../../assets/images/reviews/photo_3_2026-05-04_09-18-29.jpg";
import review4 from "../../assets/images/reviews/photo_4_2026-05-04_09-18-29.jpg";
import review5 from "../../assets/images/reviews/photo_5_2026-05-04_09-18-29.jpg";
import review6 from "../../assets/images/reviews/photo_6_2026-05-04_09-18-29.jpg";
import review7 from "../../assets/images/reviews/photo_7_2026-05-04_09-18-29.jpg";
import review8 from "../../assets/images/reviews/photo_8_2026-05-04_09-18-29.jpg";
import review9 from "../../assets/images/reviews/photo_9_2026-05-04_09-18-29.jpg";
import review10 from "../../assets/images/reviews/photo_10_2026-05-04_09-18-29.jpg";
import review11 from "../../assets/images/reviews/photo_11_2026-05-04_09-18-29.jpg";
import review12 from "../../assets/images/reviews/photo_12_2026-05-04_09-18-29.jpg";

const images = [review1, review2, review3, review4, review5, review6, review7, review8, review9, review10, review11, review12];

const Reviews = ({withProducts = true, reviews}) => {
	//const navigate = useNavigate(); // todo: go to product page

	return (
		<div className="flex md:hidden flex-col border-t border-[#E8E8E8] w-full max-w-[1241px] pb-[60px] overflow-x-hidden">
			<div className="font-semibold text-[24px] leading-[17px] text-center py-10">ВІДГУКИ</div>
			<div className="flex flex-col gap-10 items-center">

				<div className="custom-screen-reviews-pagination flex justify-center mt-6"></div>
				<Swiper
					modules={[Pagination]}
					spaceBetween={20}
					slidesPerView={2.2}
					pagination={{clickable: true, el: ".custom-screen-reviews-pagination"}}
					className="w-full max-w-md overflow-hidden"
				>
					{images.map((image, index) => (
						<SwiperSlide key={index} className="max-w-fit">
							<img className="w-[193px] h-[344px] object-cover object-center" src={image} alt="review"/>
						</SwiperSlide>
					))}
				</Swiper>

				{withProducts &&
					<Swiper
						modules={[Pagination]}
						spaceBetween={20}
						slidesPerView={1.5}
						pagination={{clickable: true, el: ".custom-product-reviews-pagination"}}
						className="w-full max-w-md overflow-hidden"
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
