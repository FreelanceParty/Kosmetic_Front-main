const SocialMediaListMobile = () => {
	const items = [
		{icon: 'insta', title: 'ІНСТА', link: '', src: require(`../../../assets/icons/insta.svg`).default},
		{icon: 'teleg', title: 'ОПТ', link: '', src: require(`../../../assets/icons/teleg.svg`).default},
		{icon: 'teleg', title: 'ДРОП', link: '', src: require(`../../../assets/icons/teleg.svg`).default},
		{icon: 'viber', title: 'ОПТ', link: '', src: require(`../../../assets/icons/viber.svg`).default},
		{icon: 'viber', title: 'ДРОП', link: '', src: require(`../../../assets/icons/viber.svg`).default},
	];

	return (
		<div className="flex gap-6">
			{items.map((item, index) => (
				<a href={item.link} key={index} className="flex flex-col gap-2 items-center justify-center px-2 py-[6px] bg-[#EFEFEF] rounded-[3px] cursor-pointer hover:text-[#E667A4]">
					<img
						src={item.src}
						alt={item.icon}
						width={16}
						height={16}
					/>
					<div className="font-medium text-[8px] leading-[6px]">{item.title}</div>
				</a>
			))}
		</div>
	)
}

export default SocialMediaListMobile;