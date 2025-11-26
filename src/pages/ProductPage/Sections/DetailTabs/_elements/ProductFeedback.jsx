import RateHearts from "../../../../../components/RateHearts/RateHearts";

const ProductFeedback = ({feedback}) => {
	const date = new Date(feedback.createdAt).toLocaleDateString("uk-UA");
	const hasImage = feedback.image && feedback.image.startsWith('data:image');

	return (
		<div className="flex flex-col md:flex-row w-full max-w-[820px]">
			<div className="flex gap-8 justify-between w-full max-w-[400px]">
				<div className="flex flex-col gap-4">
					<div className="font-semibold text-md leading-[18px]">{feedback.firstName}</div>
					<div className="font-normal text-md leading-[18px]">{date}</div>
				</div>
				<div className="flex flex-col gap-4">
					<RateHearts heartSize={14} count={feedback.rate} containerClasses="justify-end"/>
					<div className="font-normal text-md leading-[18px]">{feedback.message}</div>
				</div>
			</div>
			{hasImage && (
				<div className="mt-2 md:m-0 md:ml-5">
					<img
						src={feedback.image}
						alt={`Зображення від ${feedback.firstName}`}
						className="max-w-[200px] max-h-[200px] object-cover rounded-md border border-gray-200"
					/>
				</div>
			)}
		</div>
	);
}

export default ProductFeedback;
