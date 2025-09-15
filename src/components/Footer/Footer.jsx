import SocialMediaList from "./Sections/SocialMediaList";
import SocialMediaListMobile from "./Sections/SocialMediaListMobile";

const Footer = () => {
	return (
		<div>
			<div className="flex flex-col lg:hidden px-4 pt-[60px] pb-10 bg-[#F6F6F6]">
				<div className="flex flex-col pb-8 border-b items-center gap-6">
					<div className="flex gap-[6px] font-semibold text-[36px]">
						<div className="text-[#8F49A3]">BEAUTY</div>
						<div className="text-[#DF4DA0]">BLOSSOM</div>
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
					<div className="text-[10px] text-center">Всі права захищені. <br/> {new Date().getFullYear()}</div>
				</div>
			</div>
			<div className="hidden lg:flex flex-col gap-[30px] px-10 xl:px-[100px] pt-[56px] bg-[#F6F6F6]">
				<div className="flex justify-between gap-5 pl-10">
					<div className="flex flex-col gap-[30px]">
						<div className="font-semibold text-[24px]">МИ В СОЦ. МЕРЕЖАХ</div>
						<SocialMediaList/>
					</div>
					<div className="flex gap-8 xl:gap-[60px]">
						<div className="flex flex-col gap-6 text-sm">
							<div className="font-semibold">КОМПАНІЯ</div>
							<a href="/about-us">Про нас</a>
							<a href="/cooperation">Оптова співпраця</a>
							<a href="/">Дропшипінг</a>
							<a href="/">Договір публічної оферти</a>
							<a href="/contacts">Контакти</a>
						</div>
						<div className="flex gap-[34px]">
							<div className="flex flex-col gap-6 font-semibold">
								<a href="/">ОБЛИЧЧЯ</a>
								<a href="/">ВОЛОССЯ</a>
								<a href="/">МАКІЯЖ</a>
								<a href="/">БРЕНДИ</a>
							</div>
							<div className="flex flex-col gap-6 font-semibold">
								<a href="/">ТІЛО</a>
								<a href="/">SALE</a>
								<a href="/">НАБОРИ & ПОДАРУНКИ</a>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-5 items-center justify-center h-[135px] border-t border-[#B2B2B2]">
					<div className="flex gap-[6px] font-semibold text-[36px]">
						<div className="text-[#8F49A3]">BEAUTY</div>
						<div className="text-[#DF4DA0]">BLOSSOM</div>
					</div>
					<div className="text-sm">Всі права захищені. {new Date().getFullYear()}</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
