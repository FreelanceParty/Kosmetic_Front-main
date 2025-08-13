import RateHearts from "../../../../../components/RateHearts/RateHearts";

const ProductFeedback = ({feedback}) => {
	return (
		<div className="flex w-[620px] justify-between">
			<div className="flex flex-col gap-5">
				<div className="font-semibold text-md">{feedback.user.name}</div>
				<div className="font-normal text-md">{feedback.date}</div>
			</div>
			<div className="flex flex-col gap-5 w-[430px]">
				<RateHearts heartSize={14} count={feedback.rate}/>
				<div className="font-normal text-md">{feedback.text}</div>
			</div>
		</div>
	);
}

export default ProductFeedback;
