const SocialMediaList = () => {
	const items = [
		{icon: 'insta', title: 'ІНСТА', link: '', src: require(`../../../assets/icons/insta.svg`).default},
		{icon: 'teleg', title: 'ОПТ', link: '', src: require(`../../../assets/icons/teleg.svg`).default},
		{icon: 'teleg', title: 'ДРОП', link: '', src: require(`../../../assets/icons/teleg.svg`).default},
		{icon: 'viber', title: 'ОПТ', link: '', src: require(`../../../assets/icons/viber.svg`).default},
		{icon: 'viber', title: 'ДРОП', link: '', src: require(`../../../assets/icons/viber.svg`).default},
	];

	return (
		<div className="flex gap-[58px]">
			<img
				className="cursor-pointer"
				src={require("../../../assets/images/insta_rounded.svg").default}
				alt="insta"
				width={110}
				height={110}
			/>
			<div className="flex flex-col gap-6">
				{items.map((item, index) => (
					<div key={index} className="flex gap-4 items-center cursor-pointer">
						<img
							src={item.src}
							alt={item.icon}
							width={16}
							height={16}
						/>
						<div className="font-medium text-md">{item.title}</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default SocialMediaList;