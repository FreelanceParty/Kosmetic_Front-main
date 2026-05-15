import React, {useState} from "react";
import ChevronLeftIcon from "../../Icons/ChevronLeftIcon";
import ChevronRightIcon from "../../Icons/ChevronRightIcon";
import review1 from "../../../assets/images/reviews/photo_1_2026-05-04_09-18-29.jpg";
import review2 from "../../../assets/images/reviews/photo_2_2026-05-04_09-18-29.jpg";
import review3 from "../../../assets/images/reviews/photo_3_2026-05-04_09-18-29.jpg";
import review4 from "../../../assets/images/reviews/photo_4_2026-05-04_09-18-29.jpg";
import review5 from "../../../assets/images/reviews/photo_5_2026-05-04_09-18-29.jpg";
import review6 from "../../../assets/images/reviews/photo_6_2026-05-04_09-18-29.jpg";
import review7 from "../../../assets/images/reviews/photo_7_2026-05-04_09-18-29.jpg";
import review8 from "../../../assets/images/reviews/photo_8_2026-05-04_09-18-29.jpg";
import review9 from "../../../assets/images/reviews/photo_9_2026-05-04_09-18-29.jpg";
import review10 from "../../../assets/images/reviews/photo_10_2026-05-04_09-18-29.jpg";
import review11 from "../../../assets/images/reviews/photo_11_2026-05-04_09-18-29.jpg";
import review12 from "../../../assets/images/reviews/photo_12_2026-05-04_09-18-29.jpg";

const images = [review1, review2, review3, review4, review5, review6, review7, review8, review9, review10, review11, review12];

const ReviewSlider = () => { // todo: update slider
	const [index, setIndex] = useState(0);

	const itemsPerPage = 6;
	const step = 2;

	const maxIndex = Math.max(0, images.length - itemsPerPage);

	const handlePrev = () => setIndex(prev => Math.max(prev - step, 0));
	const handleNext = () => setIndex(prev => Math.min(prev + step, maxIndex));

	return (
		<div className="flex items-center w-full relative bg-[#EDF8FF] p-10 rounded-[8px]">
			<button
				onClick={handlePrev}
				disabled={index === 0}
				aria-label="Prev"
				className="p-2 disabled:opacity-40"
			>
				<ChevronLeftIcon classes="cursor-pointer w-[16px] h-[27px]"/>
			</button>

			<div className="overflow-hidden flex-1">
				{/* TRACK */}
				<div
					className="flex transition-transform duration-500 gap-4 ease-in-out"
					style={{
						transform: `translateX(-${(index * 100) / images.length}%)`,
					}}
				>
					{images.map((image, idx) => (
						<div
							key={idx}
							style={{
								flex:         "0 0 auto",
								paddingLeft:  "8px",
								paddingRight: "8px",
							}}
						>
							<img className="w-[193px] h-[344px] object-cover object-center" src={image} alt={"review"}/>
						</div>
					))}
				</div>
			</div>

			<button
				onClick={handleNext}
				disabled={index >= maxIndex}
				aria-label="Next"
				className="p-2 disabled:opacity-40"
			>
				<ChevronRightIcon classes="cursor-pointer w-[16px] h-[27px]"/>
			</button>
		</div>
	);
};

export default ReviewSlider;
