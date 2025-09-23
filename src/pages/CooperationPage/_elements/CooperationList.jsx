import {ListItem} from "./CooperationList.styled";

const CooperationList = ({items, classes}) => {
	return (
		<div className={`flex flex-col gap-6 ${classes ?? ''}`}>
			{items.map((item, index) => (
				<ListItem key={index}>
					<div className="mt-[3px] min-w-[10px] min-h-[10px] w-[10px] h-[10px] bg-[#000E55] rounded-full"></div>
					<p>
						<span className="font-semibold text-md text-[#000E55]">{item.firstPart}</span>
						<span className="font-normal text-md text-[#000E55]">{item.secondPart}</span>
					</p>
				</ListItem>
			))}
		</div>
	);
};

export default CooperationList;