const HeaderMenu = ({icon, title, onClick, classes}) => {
	return (
		<div className={`flex gap-3 items-center cursor-pointer h-full max-h-[44px] ${classes ?? ''}`} onClick={onClick}>
			<img
				src={require(`../../assets/icons/header/${icon}.svg`)}
				alt={icon}
				className="w-6 lg:w-[18px] h-6 lg:h-[18px]"
			/>
			<div className="hidden lg:block">{title ?? ''}</div>
		</div>
	)
}

export default HeaderMenu;