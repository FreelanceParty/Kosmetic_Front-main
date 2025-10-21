import React, {useState} from "react";
import "swiper/css";
import "swiper/css/pagination";
import {useNavigate} from "react-router-dom";
import Button from "../ButtonNew/Button";
import ReviewSlider from "./_elements/ReviewSlider";
import ProductReview from "./_elements/ProductReview";

const Reviews = ({reviews}) => {
	const navigate = useNavigate(); // todo: go to product page
	const [count, setCount] = useState(3);

	return (
		<div className="hidden md:flex flex-col border-t border-[#E8E8E8] w-full max-w-[1241px] pb-[210px]">
			<div className="font-semibold text-[24px] leading-[17px] text-center py-10">ВІДГУКИ</div>
			<div className="flex flex-col gap-10 items-center">
				<ReviewSlider/>
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
					{reviews.slice(0, count).map((review, index) => (
						<ProductReview key={index} review={review}/>
					))}
				</div>
				{count < 9 &&
					<Button
						type="primary"
						text="БІЛЬШЕ ВІДГУКІВ"
						classes="max-w-[230px]"
						onClick={() => setCount(count + 3)}
					/>
				}
			</div>
		</div>
	)
};

export default Reviews;
