// import Logo from "../Logo/Logo";
import {useMedia} from "../../utils/hooks/useMedia";
import {FooterContacts} from "./FooterContacts/FooterContacts";
import {FooterInformBlock} from "./FooterInformBlock/FooterInformBlock";
import FooterMenu from "./FooterMenu/FooterMenu";

// import {
//   FooterWrap,
//   InfoWrap,
//   ScheduleBlock,
//   ScheduleText,
//   ScheduleTitle,
//   Wrap,
// } from "./footer.styled";

import {
	FooterWrapper,
	FooterInner,
	Logo,
	LogoText,
	Socials,
	SocialLink,
	FooterNav,
	FooterNavLink,
	Copyright,
} from "./footer.styled";

const Footer = () => {
	const {isMobileScreen} = useMedia();
	return (
		// <FooterWrap>
		//   <Wrap>
		//     <Logo />
		//     {isMobileScreen && <FooterContacts />}
		//     {!isMobileScreen && (
		//       <InfoWrap>
		//         <FooterInformBlock />
		//         <FooterMenu />
		//         <FooterContacts />
		//       </InfoWrap>
		//     )}
		//   </Wrap>
		//   <ScheduleBlock>
		//     <ScheduleTitle>графік роботи</ScheduleTitle>
		//     <ScheduleText>пн - пт з 9:30 до 18:00</ScheduleText>
		//     <ScheduleText>сб - нд вихідний</ScheduleText>
		//   </ScheduleBlock>

		//   {/* <p>
		//     © 2023 <span>команда розробників</span>
		//   </p> */}
		// </FooterWrap>

		<FooterWrapper>
			<FooterInner>
				{/* Логотип */}
				<Logo href="/">
					<LogoText color="#8F49A3">BEAUTY</LogoText>
					<LogoText color="#DF4DA0">BLOSSOM</LogoText>
				</Logo>
				{/* Соцмережі */}
				<Socials>
					<SocialLink href="#">
						<img
							src={require("../../assets/icons/insta.svg").default}
							alt="insta"
							width={16}
							height={16}
						/>{" "}
						Інста
					</SocialLink>
					<SocialLink href="#">
						<img
							src={require("../../assets/icons/teleg.svg").default}
							alt="opt"
							width={16}
							height={16}
						/>{" "}
						Опт
					</SocialLink>
					<SocialLink href="#">
						<img
							src={require("../../assets/icons/teleg.svg").default}
							alt="drop"
							width={16}
							height={16}
						/>{" "}
						Дроп
					</SocialLink>
					<SocialLink href="#">
						<img
							src={require("../../assets/icons/viber.svg").default}
							alt="opt"
							width={16}
							height={16}
						/>{" "}
						Опт
					</SocialLink>
					<SocialLink href="#">
						<img
							src={require("../../assets/icons/viber.svg").default}
							alt="drop"
							width={16}
							height={16}
						/>{" "}
						<span>Дроп</span>
					</SocialLink>
				</Socials>
				{/* Меню */}
				<FooterNav>
					<FooterNavLink to="/">Про нас</FooterNavLink>
					<FooterNavLink to="/">Оптова співпраця</FooterNavLink>
					<FooterNavLink to="/">Оплата і доставка</FooterNavLink>
					<FooterNavLink to="/">Особистий кабінет</FooterNavLink>
					<FooterNavLink to="/">Контакти</FooterNavLink>
					<FooterNavLink to="/">Договір публічної оферти</FooterNavLink>
				</FooterNav>
				{/* Копірайт */}
				<Copyright>
					Усі права захищені.
					<br/>
					2025
				</Copyright>
			</FooterInner>
		</FooterWrapper>
	);
};

export default Footer;
