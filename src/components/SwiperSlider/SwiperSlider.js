import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import ProductItem from "../ProductItem/ProductItem";
import {useMedia} from "../../utils/hooks/useMedia";
import {List, SwiperList} from "./swiperSlider.styled";

const SwiperSlider = ({items}) => {
	const {screenType} = useMedia();
	return (
		<Swiper
			navigation={true}
			spaceBetween={10}
			slidesPerView={
				screenType === "mobile"
					? 1
					: screenType === "tablet"
						? 3
						: screenType === "small-desktop"
							? 3
							: 3
			}
			modules={[Navigation]}
			className={SwiperList}
			style={{marginLeft: "60px"}}
		>
			{items.map((item) => (
				<List>
					<SwiperSlide key={item.id}>
						<ProductItem product={item}/>
					</SwiperSlide>
				</List>
			))}
		</Swiper>
	);
};

export default SwiperSlider;
