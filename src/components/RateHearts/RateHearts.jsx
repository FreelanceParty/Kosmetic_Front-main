import React from "react";
import heartFilledIcon from "../../assets/icons/heart-filled.svg";
import heartEmptyIcon from "../../assets/icons/heart-empty.svg";

const RateHearts = ({count, onRate, isReadonly = true, heartSize = 16, containerClasses}) => {
	const handleClick = (index) => {
		if (isReadonly) {
			return;
		}
		if (onRate) {
			onRate(index + 1);
		}
	};

	return (
		<div className={`flex ${containerClasses ?? ''}`}>
			{Array.from({length: 5}).map((_, index) => {
				const isFilled = index < count;
				return (
					<img
						key={index}
						className={`p-[1px] ${!isReadonly ? "cursor-pointer" : ""}`}
						src={isFilled ? heartFilledIcon : heartEmptyIcon}
						alt="heart"
						width={heartSize}
						height={heartSize}
						onClick={() => handleClick(index)}
					/>
				);
			})}
		</div>
	);
};

export default RateHearts;
