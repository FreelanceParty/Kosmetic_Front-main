const Tag = ({isSale}) => {
	const title = isSale ? 'SALE' : 'NEW';

	const bgClass = isSale
		? 'bg-[#B5E9B7]'
		: 'bg-[#D6ECFF]';

	return (
		<div
			className={`flex items-center justify-center rounded-l-full w-[69px] h-[30px] font-medium text-sm leading-[10px] ${bgClass}`}
		>
			{title}
		</div>
	)
}

export default Tag;