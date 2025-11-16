import SocialMediaList from "./Sections/SocialMediaList";
import SocialMediaListMobile from "./Sections/SocialMediaListMobile";
import Logo from "../Logo/Logo";

const Footer = () => {
	return (
		<div>
			<div className="flex flex-col lg:hidden px-4 pt-[60px] pb-10 bg-[#F6F6F6]">
				<div className="flex flex-col pb-8 border-b items-center gap-6">
					<div className="flex gap-[6px] font-semibold text-[36px]">
						<Logo/>
					</div>
					<SocialMediaListMobile/>
				</div>
				<div className="flex flex-col gap-[60px] pt-8">
					<div className="flex flex-col gap-6 text-[14px] leading-[10px]">
						<a href="/about-us">Про нас</a>
						<a href="/cooperation">Оптова співпраця</a>
						<a href="/">Оплата і доставка</a>
						<a href="/cabinet">Особистий кабінет</a>
						<a href="/contacts">Контакти</a>
						<a href="/">Договір публічної оферти</a>
					</div>
					<div className="text-[10px] text-center leading-[12px]">Всі права захищені. <br/> {new Date().getFullYear()}</div>
				</div>
			</div>
			<div className="hidden lg:flex flex-col gap-[30px] px-10 xl:px-[100px] pt-[56px] bg-[#F6F6F6]">
				<div className="flex justify-between gap-5 pl-10">
					<div className="flex flex-col gap-[30px]">
						<div className="font-semibold text-[24px] leading-[17px]">МИ В СОЦ. МЕРЕЖАХ</div>
						<SocialMediaList/>
					</div>
					<div className="flex gap-8 xl:gap-[60px]">
						<div className="flex flex-col gap-6 text-sm">
							<div className="font-semibold leading-[10px]">КОМПАНІЯ</div>
							<a className="leading-[10px]" href="/about-us">Про нас</a>
							<a className="leading-[10px]" href="/cooperation">Оптова співпраця</a>
							<a className="leading-[10px]" href="/">Дропшипінг</a>
							<a className="leading-[10px]" href="/">Договір публічної оферти</a>
							<a className="leading-[10px]" href="/contacts">Контакти</a>
						</div>
						<div className="flex gap-[34px]">
							<div className="flex flex-col gap-6 font-semibold">
								<a className="leading-[10px]" href="/">ОБЛИЧЧЯ</a>
								<a className="leading-[10px]" href="/">ВОЛОССЯ</a>
								<a className="leading-[10px]" href="/">МАКІЯЖ</a>
								<a className="leading-[10px]" href="/">БРЕНДИ</a>
							</div>
							<div className="flex flex-col gap-6 font-semibold">
								<a className="leading-[10px]" href="/">ТІЛО</a>
								<a className="leading-[10px]" href="/">SALE</a>
								<a className="leading-[15px]" href="/">НАБОРИ &<br/>ПОДАРУНКИ</a>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-5 items-center justify-center h-[135px] border-t border-[#B2B2B2]">
					<Logo/>
					<div className="text-sm">Всі права захищені. {new Date().getFullYear()}</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
