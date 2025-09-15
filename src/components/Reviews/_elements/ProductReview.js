import RateHearts from "../../RateHearts/RateHearts";

const ProductReview = ({review}) => {
	return (
		<div className="flex flex-col">
			<div className="flex gap-4 px-4 py-5 rounded-[8px] bg-[#EDF8FF]">
				<div className="min-h-[80px] min-w-[80px]">
					<img src={review.product.image} alt="product" className="rounded-[8px]"/>
				</div>
				<div className="flex flex-col text-md">
					<div className="line-clamp-1 font-semibold">{review.product.brand}</div>
					<div className="line-clamp-3 leading-[18px]">{review.product.name}</div>
				</div>
			</div>
			<div className="flex flex-col gap-4 px-4 py-5 text-md">
				<div className="flex flex-col md:flex-row gap-4 justify-between">
					<div className="flex gap-4">
						<RateHearts
							count={review.rating}
						/>
						<div className="font-semibold">{review.name}</div>
					</div>
					<div className="leading-[11px]">{review.date}</div>
				</div>
				<div className="line-clamp-3">{review.text}</div>
			</div>
		</div>
	)
}
export default ProductReview;