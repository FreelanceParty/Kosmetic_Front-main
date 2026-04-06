const Canals = ({headerText, isOpt}) => {
	const viberLink    = isOpt ? 'https://invite.viber.com/?g2=AQBjEaVPVoQvBVJyynmJykhGNyF1TYTNKqRX1LQe7fdkVyzcb%2BAcG6%2F4HUH74WIs' : 'https://invite.viber.com/?g2=AQBbJ%2BXb2uClMFSC6vure1IGuhLvlb144kglbXjoA0lex1DPoo79HdiJ5Ef6o0No',
	      telegramLink = isOpt ? 'https://t.me/+Eejgotzs-ktiMTIy' : 'https://t.me/+aQ3BwgOjRUQ5MDQy';
	return (
		<div className="flex flex-col gap-8">
			<div className="font-semibold text-xl leading-[22px]">{headerText}</div>
			<div className="flex flex-col gap-6">
				<a className="flex gap-4 justify-center lg:justify-start items-center hover:text-[#E667A4]" href={viberLink}>
					<img
						src={require("../../../../assets/icons/viber.svg").default}
						alt="viber"
						width={16}
						height={16}
					/>
					<div className="font-medium text-md">VIBER</div>
				</a>
				<a className="flex gap-4 justify-center lg:justify-start items-center hover:text-[#E667A4]" href={telegramLink}>
					<img
						src={require("../../../../assets/icons/teleg.svg").default}
						alt="tg"
						width={16}
						height={16}
					/>
					<div className="font-medium text-md">TELEGRAM</div>
				</a>
			</div>
		</div>
	);
};

export default Canals;
