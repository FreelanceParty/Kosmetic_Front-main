import basketIcon from "../../assets/icons/header/basket.svg";
import cooperationIcon from "../../assets/icons/header/cooperation.svg";
import mobMenuIcon from "../../assets/icons/header/mob-menu.svg";
import searchIcon from "../../assets/icons/header/search.svg";
import userIcon from "../../assets/icons/header/user.svg";

const icons = {
	basket:      basketIcon,
	cooperation: cooperationIcon,
	"mob-menu":  mobMenuIcon,
	search:      searchIcon,
	user:        userIcon,
};

const HeaderMenu = ({icon, title, onClick, classes, badgeCount}) => {
	return (
		<div className={`flex gap-3 items-center cursor-pointer h-full max-h-[44px] ${classes ?? ''}`} onClick={onClick}>
			<div className="relative">
				<img
					src={icons[icon]}
					alt={icon}
					className="w-6 lg:w-[18px] h-6 lg:h-[18px]"
				/>
				{Boolean(badgeCount) && badgeCount > 0 && (
					<span
						className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[#E667A4] text-white text-[12px] leading-[18px] text-center"
						aria-label={`Кількість товарів у кошику: ${badgeCount}`}
					>
						{badgeCount}
					</span>
				)}
			</div>
			<div className="hidden lg:block">{title ?? ''}</div>
		</div>
	)
}

export default HeaderMenu;