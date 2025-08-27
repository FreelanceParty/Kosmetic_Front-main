import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {PiShoppingCartFill, PiShoppingCartLight} from "react-icons/pi";

import {useMedia} from "../../utils/hooks/useMedia";
import Promo from "../Promo/Promo";
// import Logo from "../Logo/Logo";
import Menu from "../Menu/Menu";
import SearchForm from "../SearchForm/SearchForm";
import MobileMenu from "../Menu/MobileMenu/MobileMenu";
import AuthModal from "../Login/AuthModal/AuthModal";
import User from "../Login/User/User";

import {ReactComponent as MenuIcon} from "../../assets/icons/header/mob-menu.svg";
import {ReactComponent as SearchIcon} from "../../assets/icons/header/search.svg";
import {ReactComponent as CoopIcon} from "../../assets/icons/header/cooperation.svg";
import {ReactComponent as UserIcon} from "../../assets/icons/header/user.svg";
import {ReactComponent as BasketIcon} from "../../assets/icons/header/basket.svg";

import SlidingSearchForm from "../SlidingSearchForm/SlidingSearchForm";
import {routeHelper} from "../../utils/helpers/routeHelper";
import HeaderMenu from "./HeaderMenu";
import Basket from "../../popups/Basket";
import {Popup} from "../../popups/Abstracts/Popup";
import {usePopup} from "../../hooks/usePopup";

const Header = () => {
	const {isOpen, content, openPopup, closePopup} = usePopup();
	const {getCategoryRoute} = routeHelper();
	const {isMobileScreen} = useMedia();
	const {pathname} = useLocation();
	const navigate = useNavigate();

	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLogin, setIsLogin] = useState(false);
	const [userName, setUserName] = useState("");
	const [cartItems, setCartItems] = useState([]);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navLinks = [
		{title: "ОБЛИЧЧЯ", href: getCategoryRoute("догляд для обличчя")},
		{title: "ВОЛОССЯ", href: getCategoryRoute("догляд для волосся")},
		{title: "МАКІЯЖ", href: getCategoryRoute("макіяж")},
		{title: "ТІЛО", href: getCategoryRoute("догляд для тіла")},
		{title: "НАБОРИ & ПОДАРУНКИ", href: getCategoryRoute("набори")},
		{title: "SALE", href: '/', styles: "text-[#B90003]"}, // todo: href
		{title: "БРЕНДИ", href: "/brands"},
		{title: "ПРО НАС", href: "/about-us"},
	];

	// const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

	// Перевірка логіну
	useEffect(() => {
		const token = localStorage.getItem("token");
		const name = localStorage.getItem("firstName");
		const cart = JSON.parse(localStorage.getItem("cart")) || [];

		setIsLogin(!!token);
		setUserName(name || "");
		setCartItems(cart);
	}, []);
	// console.log(isLogin);

	const handleSearchClick = () => setIsSearchOpen((prev) => !prev);

	const handleUserIconClick = () => {
		if (!isLogin) {
			setShowAuthModal(true);
		} else {
			localStorage.removeItem("token");
			localStorage.removeItem("firstName");
			setIsLogin(false);
			setUserName("");
		}
	};

	return (
		<>
			<Promo/>
			<div className="flex flex-col">
				<div className="flex justify-around border-b border-[#E8E8E8] py-[10px] lg:py-[25.5px] items-center">
					<div className="flex gap-5 lg:gap-[46px] max-h-[44px]">
						<HeaderMenu icon="mob-menu" classes="flex lg:hidden" onClick={() => setIsMobileMenuOpen(true)}/>
						<HeaderMenu icon="search" title="ПОШУК" onClick={() => {
						}}/>
						<HeaderMenu icon="cooperation" title="СПІВПРАЦЯ" classes="hidden lg:flex" onClick={() => navigate("/cooperation")}/>
					</div>
					<a href="/" className="flex gap-[6px] font-semibold text-lg lg:text-[36px] leading-[12px] lg:leading-[25px]">
						<div className="text-[#8F49A3]">BEAUTY</div>
						<div className="text-[#DF4DA0]">BLOSSOM</div>
					</a>
					<div className="flex gap-5 lg:gap-[46px] max-h-[44px]">
						<HeaderMenu icon="user" title="ВХІД" onClick={() => navigate("/cabinet")}/>
						<HeaderMenu icon="basket" title="КОШИК" onClick={() => openPopup(<Basket/>)}/>
					</div>
				</div>
				<div className="hidden lg:flex justify-center gap-10 font-semibold text-md leading-[10px] py-6">
					{navLinks.map((link, index) => (
						<a key={index} href={link.href} className={`text-nowrap ${link.styles ?? ''}`}>{link.title}</a>
					))}
				</div>
			</div>
			{!isLogin && showAuthModal && (
				<AuthModal onClose={() => setShowAuthModal(false)}/>
			)}
			<Popup isOpen={isOpen} content={content} onClose={closePopup}/>
			<MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen}/>
		</>
	);
};

export default Header;
