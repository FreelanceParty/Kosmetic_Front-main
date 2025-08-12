import React from "react";

const RateHearts = ({count, onRate, isReadonly = true, heartSize = 16}) => {
	const handleClick = (index) => {
		if (isReadonly) {
			return;
		}
		if (onRate) {
			onRate(index + 1);
		}
	};

	return (
		<div className={`flex`}>
			{Array.from({length: 5}).map((_, index) => {
				const isFilled = index < count;
				return (
					<img
						key={index}
						className={`p-[1px] ${!isReadonly ? "cursor-pointer" : ""}`}
						src={
							isFilled
								? require("../../assets/icons/heart-filled.svg").default
								: require("../../assets/icons/heart-empty.svg").default
						}
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
