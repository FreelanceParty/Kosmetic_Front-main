import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import {useMedia} from "../../utils/hooks/useMedia";
import Promo from "../Promo/Promo";
// import Logo from "../Logo/Logo";
import Menu from "../Menu/Menu";
import SearchForm from "../SearchForm/SearchForm";
import MobileMenu from "../Menu/MobileMenu/MobileMenu";
import User from "../Login/User/User";
import {getIsLoggedIn, getUserFirstName} from "../../redux/auth/selectors";
import {selectCart} from "../../redux/cart/selectors";

import SlidingSearchForm from "../SlidingSearchForm/SlidingSearchForm";
import {routeHelper} from "../../utils/helpers/routeHelper";
import HeaderMenu from "./HeaderMenu";
import Basket from "../../popups/Basket";
import {Popup} from "../../popups/Abstracts/Popup";
import {usePopup} from "../../hooks/usePopup";
import {useSelector} from "react-redux";
import Logo from "../Logo/Logo";

const Header = () => {
	const {isOpen, content, openPopup, closePopup} = usePopup();
	const {getCategoryRoute} = routeHelper();
	const {isMobileScreen} = useMedia();
	const {pathname} = useLocation();
	const navigate = useNavigate();

	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const isLoggedIn = useSelector(getIsLoggedIn);
	const userName = useSelector(getUserFirstName);
	const cartItems = useSelector(selectCart);

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

	useEffect(() => {
		if (isSearchOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [isSearchOpen]);

	const handleSearchIconClick = () => {
		setIsSearchOpen((prev) => !prev);
	}

	const handleUserIconClick = () => {
		if (!isLoggedIn) {
			navigate("/authorization");
		}
	};

	const handleGoToCart = () => {
		if (isMobileScreen) {
			navigate("/cart")
		} else {
			openPopup(<Basket onClose={closePopup}/>)
		}
	}

	return (
		<>
			{isSearchOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-10"
					onClick={() => setIsSearchOpen(false)}
				/>
			)}
			<Promo/>
			<div className="relative flex flex-col z-20 bg-white">
				<div className="flex justify-around border-b border-[#E8E8E8] py-[10px] lg:py-5 items-center">
					<div className="flex gap-5 lg:gap-[46px] max-h-[24px] md:max-h-[18px]">
						<HeaderMenu icon="mob-menu" classes="flex lg:hidden" onClick={() => setIsMobileMenuOpen(true)}/>
						<HeaderMenu icon="search" title="ПОШУК" onClick={() => handleSearchIconClick()}/>
						<HeaderMenu icon="cooperation" title="СПІВПРАЦЯ" classes="hidden lg:flex" onClick={() => navigate("/cooperation")}/>
					</div>
					<Logo/>
					<div className="flex gap-5 lg:gap-[46px] max-h-[24px] md:max-h-[18px]">
						<User icon="user" title={isLoggedIn ? userName : "ВХІД"} onClick={() => handleUserIconClick()}/>
						<HeaderMenu icon="basket" title="КОШИК" onClick={() => handleGoToCart()}/>
					</div>
				</div>
				<div className="hidden lg:flex justify-center gap-10 font-semibold text-md leading-[10px] py-6">
					{navLinks.map((link, index) => (
						<a key={index} href={link.href} className={`text-nowrap ${link.styles ?? ''}`}>{link.title}</a>
					))}
				</div>
				<div className={`absolute top-full left-0 w-full z-10 ${isSearchOpen ? "block" : "hidden"}`}>
					<SearchForm isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}/>
				</div>
			</div>
			<Popup isOpen={isOpen} content={content} onClose={closePopup}/>
			<MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen}/>
		</>
	);
};

export default Header;
