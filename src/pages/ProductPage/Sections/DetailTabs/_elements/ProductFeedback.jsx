import RateHearts from "../../../../../components/RateHearts/RateHearts";

const ProductFeedback = ({feedback}) => {
	const date = new Date(feedback.createdAt).toLocaleDateString("uk-UA");
	return (
		<div className="flex w-[620px] justify-between">
			<div className="flex flex-col gap-5">
				<div className="font-semibold text-md">{feedback.firstName}</div>
				<div className="font-normal text-md">{date}</div>
			</div>
			<div className="flex flex-col gap-5 w-[430px]">
				<RateHearts heartSize={14} count={feedback.rate}/>
				<div className="font-normal text-md">{feedback.message}</div>
			</div>
		</div>
	);
}

export default ProductFeedback;
