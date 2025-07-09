import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {PiShoppingCartFill, PiShoppingCartLight} from "react-icons/pi";

import {useMedia} from "../../utils/hooks/useMedia";
import Promo from "../Promo/Promo";
// import Logo from "../Logo/Logo";
import Menu from "../Menu/Menu";
import SearchForm from "../SearchForm/SearchForm";
import MobileMenu from "../Menu/MobileMenu/MobileMenu";
import AuthModal from "../Login/AuthModal/AuthModal";
import User from "../Login/User/User";
// import {
//   BasketFullWrap,
//   BasketIcon,
//   BasketIconFull,
//   BasketWrap,
//   CartQuantitySpan,
//   CartQuantityWrap,
//   CenterWrap,
//   Container,
//   ContainerHeader,
//   ContainerMobile,
//   HeaderLayout,
//   HeaderTop,
//   HeaderWrap,
//   LineLink,
//   LineWrap,
//   LoginShipingThumb,
//   MenuBottom,
//   MenuWrap,
//   Schedule,
//   SearchIcon,
//   TopWrap,
//   UserName,
//   Wrap,
//   WrapTop,
// } from "./header.styled";

import {ReactComponent as MenuIcon} from "../../assets/icons/header/mob-menu.svg";
import {ReactComponent as SearchIcon} from "../../assets/icons/header/search.svg";
import {ReactComponent as CoopIcon} from "../../assets/icons/header/cooperation.svg";
import {ReactComponent as UserIcon} from "../../assets/icons/header/user.svg";
import {ReactComponent as BasketIcon} from "../../assets/icons/header/basket.svg";

import {
	HeaderWrapper,
	HeaderInner,
	Logo,
	LogoText,
	IconsWrapper,
	IconButton,
	CartQuantityWrap,
	CartQuantitySpan,
} from "./header.styled";
import SlidingSearchForm from "../SlidingSearchForm/SlidingSearchForm";

const Header = () => {
	const {isMobileScreen} = useMedia();
	const {pathname} = useLocation();

	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLogin, setIsLogin] = useState(false);
	const [userName, setUserName] = useState("");
	const [cartItems, setCartItems] = useState([]);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

	// return (
	//   <>
	//     <Promo />
	//     {!isMobileScreen ? (
	//       <ContainerHeader>
	//         <Container>
	//           <HeaderTop>
	//             <HeaderWrap>
	//               <HeaderLayout>
	//                 <WrapTop>
	//                   <Logo />
	//                 </WrapTop>
	//                 <WrapTop>
	//                   <Wrap>
	//                     <LoginShipingThumb>
	//                       <SearchIcon onClick={handleSearchClick} />
	//                       <div
	//                         style={{ display: "flex", flexDirection: "column" }}
	//                       >
	//                         {isLogin && <UserName>{userName}</UserName>}
	//                         <div onClick={handleUserIconClick}>
	//                           <User />
	//                         </div>
	//                       </div>
	//                       <div style={{ position: "relative" }}>
	//                         {cartItems.length > 0 ? (
	//                           <BasketFullWrap>
	//                             <CartQuantityWrap>
	//                               <CartQuantitySpan>
	//                                 {cartItems.length}
	//                               </CartQuantitySpan>
	//                             </CartQuantityWrap>
	//                             <PiShoppingCartFill />
	//                           </BasketFullWrap>
	//                         ) : (
	//                           <BasketIcon>
	//                             <PiShoppingCartLight />
	//                           </BasketIcon>
	//                         )}
	//                       </div>
	//                     </LoginShipingThumb>
	//                   </Wrap>
	//                 </WrapTop>
	//               </HeaderLayout>
	//             </HeaderWrap>
	//           </HeaderTop>
	//           <MenuBottom $pathname={pathname}>
	//             <MenuWrap>
	//               <Menu />
	//             </MenuWrap>
	//             <SearchForm isSearchOpen={isSearchOpen} />
	//           </MenuBottom>
	//         </Container>
	//       </ContainerHeader>
	//     ) : (
	//       <ContainerMobile>
	//         <CenterWrap>
	//           <Logo />
	//         </CenterWrap>
	//         <CenterWrap>
	//           <MobileMenu />
	//           <SearchIcon onClick={handleSearchClick} />
	//           <div style={{ display: "flex", flexDirection: "column" }}>
	//             {isLogin && <UserName>{userName}</UserName>}
	//             <div onClick={handleUserIconClick}>
	//               <User />
	//             </div>
	//           </div>
	//           <div style={{ position: "relative" }}>
	//             {cartItems.length > 0 ? (
	//               <BasketFullWrap>
	//                 <CartQuantityWrap>
	//                   <CartQuantitySpan>{cartItems.length}</CartQuantitySpan>
	//                 </CartQuantityWrap>
	//                 <PiShoppingCartFill />
	//               </BasketFullWrap>
	//             ) : (
	//               <BasketIcon>
	//                 <PiShoppingCartLight />
	//               </BasketIcon>
	//             )}
	//           </div>
	//         </CenterWrap>
	//         <SearchForm isSearchOpen={isSearchOpen} />
	//       </ContainerMobile>
	//     )}
	//     {/* === AUTH MODAL ===
	//     {!isLogin && showAuthModal && (
	//       <AuthModal onClose={() => setShowAuthModal(false)} />
	//     )} */}
	//   </>
	// );
	return (
		<>
			{/* Промо-секція над Header */}
			<Promo/>
			{/* Header */}
			<HeaderWrapper>
				<HeaderInner>
					<IconsWrapper>
						{/* Бургер-меню */}
						{isMobileScreen && (
							<IconButton onClick={() => setIsMobileMenuOpen(true)}>
								<MenuIcon className="icon" width={44} height={44}/>
							</IconButton>
						)}

						{/* Search */}
						<IconButton onClick={() => setIsSearchOpen((prev) => !prev)}>
							<SearchIcon className="icon"/>
							{!isMobileScreen && "ПОШУК"}
						</IconButton>
						{!isMobileScreen && (
							<IconButton>
								<CoopIcon className="icon"/>
								{!isMobileScreen && "СПІВПРАЦЯ"}
							</IconButton>
						)}
					</IconsWrapper>
					{/* Логотип */}
					<Logo href="/">
						<LogoText color="#8F49A3">BEAUTY</LogoText>
						<LogoText color="#DF4DA0">BLOSSOM</LogoText>
					</Logo>

					<IconsWrapper>
						{/* Profile */}
						<IconButton onClick={handleUserIconClick}>
							<UserIcon className="icon"/>
							{!isMobileScreen && (isLogin ? "ВИХІД" : "ВХІД")}
						</IconButton>

						<IconButton onClick={() => setIsModalOpen(true)}>
							<BasketIcon className="basket"/>
							{!isMobileScreen && "КОШИК"}
						</IconButton>
					</IconsWrapper>
				</HeaderInner>
				{!isMobileScreen && <Menu/>}
			</HeaderWrapper>
			{/* === SEARCH ===  */}
			<SlidingSearchForm isSearchOpen={isSearchOpen}/>
			{/* === AUTH MODAL ===  */}
			{!isLogin && showAuthModal && (
				<AuthModal onClose={() => setShowAuthModal(false)}/>
			)}
			{/* === MOBILE MENU MODAL === */}
			{isMobileScreen && (
				<MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen}/>
			)}
		</>
	);
};

export default Header;
