const SocialMediaListMobile = () => {
	const items = [
		{icon: 'insta', title: 'BEAUTY_BLOSSOM_UA', link: 'https://www.instagram.com/beauty_blossom_ua?igsh=OWs4ZjAwdTkyczd3&utm_source=qr', src: require(`../../../assets/icons/insta.svg`).default},
		{icon: 'teleg', title: 'ДЛЯ ОПТОВИХ КЛІЄНТІВ', link: 'https://t.me/+Eejgotzs-ktiMTIy', src: require(`../../../assets/icons/teleg.svg`).default},
		{icon: 'teleg', title: 'ДРОП', link: 'https://t.me/+aQ3BwgOjRUQ5MDQy', src: require(`../../../assets/icons/teleg.svg`).default},
		{
			icon:  'viber',
			title: 'ДЛЯ ОПТОВИХ КЛІЄНТІВ',
			link:  'https://invite.viber.com/?g2=AQBjEaVPVoQvBVJyynmJykhGNyF1TYTNKqRX1LQe7fdkVyzcb%2BAcG6%2F4HUH74WIs',
			src:   require(`../../../assets/icons/viber.svg`).default
		},
		{
			icon:  'viber',
			title: 'ДРОП',
			link:  'https://invite.viber.com/?g2=AQBbJ%2BXb2uClMFSC6vure1IGuhLvlb144kglbXjoA0lex1DPoo79HdiJ5Ef6o0No',
			src:   require(`../../../assets/icons/viber.svg`).default
		},
	];

	return (
		<div className="grid grid-cols-5 gap-1 xs:gap-4 sm:gap-6">
			{items.map((item, index) => (
				<a href={item.link} key={index} className="max-w-[100px] flex flex-col gap-2 items-center justify-center px-2 py-[6px] bg-[#EFEFEF] rounded-[3px] cursor-pointer hover:text-[#E667A4]">
					<img
						src={item.src}
						alt={item.icon}
						width={16}
						height={16}
					/>
					<div className="w-full font-medium text-[8px] leading-[9px] hover:text-[#E667A4] line-clamp-3 text-center">{item.title}</div>
				</a>
			))}
		</div>
	)
}

export default SocialMediaListMobile;