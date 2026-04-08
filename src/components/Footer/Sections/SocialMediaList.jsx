import Logo from "../../Logo/Logo";
const SocialMediaList = () => {
	const items = [
		{icon: 'insta', title: 'BEAUTY_BLOSSOM_UA', link: 'https://www.instagram.com/beauty_blossom_ua?igsh=OWs4ZjAwdTkyczd3&utm_source=qr', src: require(`../../../assets/icons/insta.svg`).default},
		{icon: 'teleg', title: 'ДЛЯ ОПТОВИХ КЛІЄНТІВ', link: 'https://t.me/+Eejgotzs-ktiMTIy', src: require(`../../../assets/icons/teleg.svg`).default},
		{icon: 'teleg', title: 'ДРОПШИПІНГ', link: 'https://t.me/+aQ3BwgOjRUQ5MDQy', src: require(`../../../assets/icons/teleg.svg`).default},
		{icon: 'viber', title: 'ДЛЯ ОПТОВИХ КЛІЄНТІВ', link: 'https://invite.viber.com/?g2=AQBjEaVPVoQvBVJyynmJykhGNyF1TYTNKqRX1LQe7fdkVyzcb%2BAcG6%2F4HUH74WIs', src: require(`../../../assets/icons/viber.svg`).default},
		{icon: 'viber', title: 'ДРОПШИПІНГ', link: 'https://invite.viber.com/?g2=AQBbJ%2BXb2uClMFSC6vure1IGuhLvlb144kglbXjoA0lex1DPoo79HdiJ5Ef6o0No', src: require(`../../../assets/icons/viber.svg`).default},
	];

	return (
		<div className="flex gap-[58px]">
			<Logo/>
			<div className="flex flex-col gap-4">
				{items.map((item, index) => (
					<a href={item.link} key={index} className="flex gap-4 items-center cursor-pointer">
						<img
							src={item.src}
							alt={item.icon}
							width={16}
							height={16}
						/>
						<div className="font-medium text-md leading-[16px] hover:text-[#E667A4]">{item.title}</div>
					</a>
				))}
			</div>
		</div>
	)
}

export default SocialMediaList;