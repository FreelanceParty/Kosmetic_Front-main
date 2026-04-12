import {useState, useEffect, useMemo, useRef} from "react";
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

import {routeHelper} from "../../utils/helpers/routeHelper";
import HeaderMenu from "./HeaderMenu";
import Basket from "../../popups/Basket";
import {Popup} from "../../popups/Abstracts/Popup";
import {usePopup} from "../../hooks/usePopup";
import {useSelector} from "react-redux";
import Logo from "../Logo/Logo";
import {HEADER_MEGA_MENU} from "../../utils/enums/headerMegaMenu";

const Header = () => {
	const {isOpen, content, openPopup, closePopup} = usePopup();
	const {getCategoryRoute} = routeHelper();
	const {isMobileScreen} = useMedia();
	const {pathname} = useLocation();
	const navigate = useNavigate();
	const menuContainerRef = useRef(null);

	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [openedDropdown, setOpenedDropdown] = useState(null);

	const isLoggedIn = useSelector(getIsLoggedIn);
	const userName = useSelector(getUserFirstName);
	const cartItems = useSelector(selectCart);
	const cartBadgeCount = useMemo(() => (
		(cartItems ?? []).reduce((sum, item) => sum + (Number(item?.quantity) || 0), 0)
	), [cartItems]);

	const navLinks = useMemo(() => ([
		{title: "ОБЛИЧЧЯ", href: getCategoryRoute("догляд для обличчя")},
		{title: "ВОЛОССЯ", href: getCategoryRoute("догляд для волосся")},
		{title: "МАКІЯЖ", href: getCategoryRoute("макіяж")},
		{title: "ТІЛО", href: getCategoryRoute("догляд для тіла")},
		{title: "НАБОРИ & ПОДАРУНКИ", href: getCategoryRoute("набори")},
		{title: "SALE", href: "/search?marker=sale&page=1&query=", styles: "text-[#B90003]"},
		{title: "NEW", href: "/search?marker=new&page=1&query=", styles: "text-green-600"},
		{title: "БРЕНДИ", href: "/brands"},
		{title: "ПРО НАС", href: "/about-us"},
	]), [getCategoryRoute]);

	const openedMenu = openedDropdown ? HEADER_MEGA_MENU[openedDropdown] : null;

	useEffect(() => {
		const handleDocumentMouseDown = (e) => {
			if (!menuContainerRef.current) {
				return;
			}
			if (!menuContainerRef.current.contains(e.target)) {
				setOpenedDropdown(null);
			}
		};

		const handleKeyDown = (e) => {
			if (e.key === "Escape") {
				setOpenedDropdown(null);
			}
		};

		document.addEventListener("mousedown", handleDocumentMouseDown);
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("mousedown", handleDocumentMouseDown);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	useEffect(() => {
		if (isSearchOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [isSearchOpen]);

	useEffect(() => {
		setOpenedDropdown(null);
	}, [pathname]);

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
			<div className="relative flex flex-col z-20 bg-white shadow-sm" ref={menuContainerRef}>
				<div className="flex justify-around border-b border-[#E8E8E8] py-[10px] lg:py-5 items-center">
					<div className="flex gap-5 lg:gap-[46px] max-h-[24px] md:max-h-[18px]">
						<HeaderMenu icon="mob-menu" classes="flex lg:hidden" onClick={() => setIsMobileMenuOpen(true)}/>
						<HeaderMenu icon="search" title="ПОШУК" onClick={() => handleSearchIconClick()}/>
						<HeaderMenu icon="cooperation" title="СПІВПРАЦЯ" classes="hidden lg:flex" onClick={() => navigate("/cooperation")}/>
					</div>
					<Logo/>
					<div className="flex gap-5 lg:gap-[46px] max-h-[24px] md:max-h-[18px]">
						<User icon="user" title={isLoggedIn ? userName : "ВХІД"} onClick={() => handleUserIconClick()}/>
						<HeaderMenu icon="basket" title="КОШИК" badgeCount={cartBadgeCount} onClick={() => handleGoToCart()}/>
					</div>
				</div>
				<div className="hidden lg:flex justify-center gap-10 font-semibold text-md leading-[10px] py-6">
					{navLinks.map((link, index) => {
						const isDropdownOpen = openedDropdown === link.title;
						const hasDropdown = Boolean(HEADER_MEGA_MENU[link.title]);
						if (hasDropdown) {
							return (
								<button
									key={index}
									type="button"
									className={`bg-transparent border-0 p-0 text-nowrap ${link.styles ?? ""} ${isDropdownOpen ? "text-[#FF63B8]" : ""}`}
									aria-haspopup="menu"
									aria-expanded={isDropdownOpen}
									aria-controls="header-mega-menu"
									onMouseEnter={() => setOpenedDropdown(link.title)}
								>
									<a key={index} href={link.href} className={`text-nowrap ${link.styles ?? ''}`}>{link.title}</a>
								</button>
							);
						}

						return (
							<a
								key={index}
								href={link.href}
								className={`text-nowrap ${link.styles ?? ""}`}
								onMouseEnter={() => setOpenedDropdown(null)}
							>
								{link.title}
							</a>
						);
					})}
				</div>

				{openedDropdown && openedMenu && (
					<div
						id="header-mega-menu"
						className="hidden lg:block absolute top-full left-0 w-full bg-white shadow-lg border-t border-[#E8E8E8] z-30"
						onMouseLeave={() => setOpenedDropdown(null)}
					>
						<div className="mx-auto w-full max-w-[1440px] pl-8 xl:pl-40 2xl:pl-60 py-8">
							<div className={`flex gap-x-10`}>
								{openedMenu.columns.map((col, idx) => (
									<div key={idx} className="min-w-0">
										<div className="flex flex-col gap-4">
											{(col.sections ?? []).map((section, sectionIdx) => (
												<div key={sectionIdx} className="min-w-0 flex flex-col gap-4">
													<a
														key={section.title}
														href={section.link ?? ((navLinks.find((l) => l.title === openedDropdown)?.href ?? "#") + '?category=' + section.title)}
														className="text-[#000E55] font-semibold text-sm uppercase tracking-wide hover:text-[#FF63B8] truncate leading-[12px]"
														onClick={() => setOpenedDropdown(null)}
													>
														{section.title}
													</a>
													<div className="flex flex-col gap-4">
														{(section.items ?? []).map((item, itemIdx) => (
															<a
																key={itemIdx}
																href={(navLinks.find((l) => l.title === openedDropdown)?.href ?? "#") + '?subcategory=' + item}
																className="text-[#000E55] text-sm font-normal hover:text-[#FF63B8] truncate leading-[12px]"
																onClick={() => setOpenedDropdown(null)}
															>
																{item}
															</a>
														))}
													</div>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
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
