import React, {useState} from "react";
import ProductCard from "./ProductCard/ProductCard";
import Button from "../ButtonNew/Button";
import ChevronLeftIcon from "../Icons/ChevronLeftIcon";
import ChevronRightIcon from "../Icons/ChevronRightIcon";

const ProductSlider = ({title, products}) => {
	const [index, setIndex] = useState(0);

	const itemsPerPage = 4;
	const step = 2;

	const maxIndex = Math.max(0, products.length - itemsPerPage);

	const handlePrev = () => setIndex(prev => Math.max(prev - step, 0));
	const handleNext = () => setIndex(prev => Math.min(prev + step, maxIndex));

	if (!products || products.length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex flex-col gap-10 pt-10 max-w-full xl:max-w-[1240px] items-center border-t border-[#E8E8E8]">
			<div className="font-semibold text-center text-[24px] leading-[17px]">{title}</div>
			{/* mobile: дві в рядку */}
			<div className="md:hidden grid grid-cols-2 sm:grid-cols-3 gap-4 w-fit mx-auto">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} isSlider={true}/>
				))}
			</div>
			{/* desktop */}
			<div className="hidden md:flex items-center w-full relative">
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
						className="flex transition-transform duration-500 ease-in-out"
						style={{
							width:     `${(products.length / itemsPerPage) * 100}%`,
							transform: `translateX(-${(index * 100) / products.length}%)`,
						}}
					>
						{products.map((product, idx) => (
							<div
								key={idx}
								style={{
									width:        `${100 / products.length}%`,
									flex:         "0 0 auto",
									paddingLeft:  "4px",
									paddingRight: "4px",
								}}
							>
								<ProductCard product={product} isSlider={true}/>
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

			<Button classes="max-w-[177px]" type="primary" text="УСІ ТОВАРИ"/>
		</div>
	);
};

export default ProductSlider;
