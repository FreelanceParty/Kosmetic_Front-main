const Canals = ({headerText}) => {
	return (
		<div className="flex flex-col gap-8">
			<div className="font-semibold text-xl leading-[22px]">{headerText}</div>
			<div className="flex flex-col gap-6">
				<div className="flex gap-4 justify-center lg:justify-start items-center">
					<img
						src={require("../../../../assets/icons/viber.svg").default}
						alt="viber"
						width={16}
						height={16}
					/>
					<div className="font-medium text-md">VIBER</div>
				</div>
				<div className="flex gap-4 justify-center lg:justify-start items-center">
					<img
						src={require("../../../../assets/icons/teleg.svg").default}
						alt="tg"
						width={16}
						height={16}
					/>
					<div className="font-medium text-md">TELEGRAM</div>
				</div>
			</div>
		</div>
	);
};

export default Canals;
