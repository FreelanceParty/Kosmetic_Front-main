import React, {useState} from "react";
import ChevronLeftIcon from "../../Icons/ChevronLeftIcon";
import ChevronRightIcon from "../../Icons/ChevronRightIcon";

const images = [
	//require("../../assets/images/reviews/1.png"),
	require("../../../assets/images/reviews/2.png"),
	require("../../../assets/images/reviews/3.png"),
	require("../../../assets/images/reviews/4.png"),
	require("../../../assets/images/reviews/5.png"),
	require("../../../assets/images/reviews/2.png"),
	require("../../../assets/images/reviews/3.png"),
	require("../../../assets/images/reviews/4.png"),
	require("../../../assets/images/reviews/5.png"),
	//require("../../assets/images/reviews/6.png"),
];

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
								<img className="w-[193px] h-[344px]" src={image} alt={"review image"}/>
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
