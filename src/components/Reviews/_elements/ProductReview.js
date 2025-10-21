import RateHearts from "../../RateHearts/RateHearts";

const ProductReview = ({review}) => {
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}.${month}.${year}`;
	};

	return (
		<div className="flex flex-col">
			<div className="flex gap-4 px-4 py-5 rounded-[8px] bg-[#EDF8FF]">
				<div className="w-full h-full max-w-[80px] max-h-[80px]">
					<img src={review.product.images} alt="product" className="rounded-[8px]"/>
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
							count={review.rate}
						/>
						<div className="font-semibold">{review.firstName}</div>
					</div>
					<div className="leading-[11px]">{formatDate(review.createdAt)}</div>
				</div>
				<div className="line-clamp-3">{review.message}</div>
			</div>
		</div>
	)
}
export default ProductReview;