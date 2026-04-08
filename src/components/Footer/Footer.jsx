import SocialMediaList from "./Sections/SocialMediaList";
import SocialMediaListMobile from "./Sections/SocialMediaListMobile";
import Logo from "../Logo/Logo";
import {Link} from "react-router-dom";
import {routeHelper} from "../../utils/helpers/routeHelper";

const Footer = () => {
	const {getCategoryRoute} = routeHelper();

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
						<Link to="/about-us">Про нас</Link>
						<Link to="/cooperation">Оптова співпраця</Link>
						<a href="/">Оплата і доставка</a>
						<Link to="/cabinet">Особистий кабінет</Link>
						<Link to="/cooperation?section=contacts">Контакти</Link>
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
						<div className="flex flex-col gap-5 text-sm">
							<div className="font-semibold leading-[12px]">КОМПАНІЯ</div>
							<Link className="leading-[12px]" to="/about-us">Про нас</Link>
							<Link className="leading-[12px]" to="/cooperation?section=business">Оптова співпраця</Link>
							<Link className="leading-[12px]" to="/cooperation?section=dropshipping">Дропшипінг</Link>
							<a className="leading-[12px]" href="/">Договір публічної оферти</a>
							<Link className="leading-[12px]" to="/cooperation?section=contacts">Контакти</Link>
						</div>
						<div className="flex gap-[34px]">
							<div className="flex flex-col gap-6 font-semibold">
								<Link className="leading-[10px]" to={getCategoryRoute("догляд для обличчя")}>ОБЛИЧЧЯ</Link>
								<Link className="leading-[10px]" to={getCategoryRoute("догляд для волосся")}>ВОЛОССЯ</Link>
								<Link className="leading-[10px]" to={getCategoryRoute("макіяж")}>МАКІЯЖ</Link>
								<Link className="leading-[10px]" to="/brands">БРЕНДИ</Link>
							</div>
							<div className="flex flex-col gap-6 font-semibold">
								<Link className="leading-[10px]" to={getCategoryRoute("догляд для тіла")}>ТІЛО</Link>
								<Link className="leading-[10px]" to="/search?marker=sale&page=1&query=">SALE</Link>
								<Link className="leading-[10px]" to="/search?marker=new&page=1&query=">NEW</Link>
								<Link className="leading-[15px]" to={getCategoryRoute("набори")}>НАБОРИ &<br/>ПОДАРУНКИ</Link>
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
