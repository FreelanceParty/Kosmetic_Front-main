import React from "react";
import {Link} from "react-router-dom";
import CooperationList from "../CooperationPage/_elements/CooperationList";
import ReviewSlider from "../../components/Reviews/_elements/ReviewSlider";
import Button from "../../components/ButtonNew/Button";

import ourValuesImage1 from "../../assets/images/aboutUs/1.png";
import ourValuesImage2 from "../../assets/images/aboutUs/2.png";

import benefits1 from "../../assets/images/aboutUs/benefits/1.png";
import benefits2 from "../../assets/images/aboutUs/benefits/2.png";
import benefits3 from "../../assets/images/aboutUs/benefits/3.png";
import benefits4 from "../../assets/images/aboutUs/benefits/4.png";

import phoneImage from "../../assets/images/aboutUs/phone.png";

const ourValuesListItems = [
	{firstPart: "ЯКІСТЬ", secondPart: " — лише оригінальна продукція"},
	{firstPart: "ОСВІЧЕНІ МЕНЕДЖЕРИ", secondPart: " — постійно навчаються у косметологів"},
	{firstPart: "ПІДТРИМКА", secondPart: " — допоможемо підібрати те, що підходить саме вам"},
	{firstPart: "СТАБІЛЬНІСТЬ", secondPart: " — працюємо навіть без світла"},
];

const AboutUsPage = () => {
	return (
		<div className="hidden md:flex max-w-[1280px] mx-auto px-[20px]">
			<div className="flex flex-col pt-[34px]">
				<div className="flex gap-[10px] text-sm leading-[10px] mb-10">
					<Link className="cursor-pointer" to="/">Головна</Link>
					<div className="border-[#000E55] border-l"></div>
					<span>Про нас</span>
				</div>
				<div className="flex flex-col gap-10 mb-[100px]">
					<div className="font-semibold text-[24px] leading-[17px] text-center">ПРО НАС</div>
					<div className="relative flex bg-[#F6F6F6] gap-[26px] rounded-[8px]">
						<img src={phoneImage} alt="phone" className="absolute max-w-[264px] inset-0 my-auto"/>
						<div className="text-md py-[54px] ml-[290px] pr-10">
							Ми компанія <span className="font-bold text-[#8F49A3]">Beauty</span> <span className="font-bold text-[#DA469A]">Blossom</span> – прямі постачальники корейської косметики з
							Південної Кореї, Америки, Європи та України.
							<br/> <br/>
							У нас в наявності <span className="font-semibold">більше 50-ти популярних брендів та більше 2500 тис товарів.</span>
							<br/> <br/>
							В нашому асортименті ви завжди знайдете : <span className="font-semibold">догляд</span> для шкіри обличчя, догляд для тіла та волосся. Засоби для <span
							className="font-semibold">лікування акне та розацеа.</span> Засоби для <span className="font-semibold">омолодження та ліфтинг</span> ефекту.
							Засоби для макіяжу та навіть <span className="font-semibold">аксесуари</span> : косметички, щітки для волосся та пов’язки.
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-10 mb-[100px] text-center">
					<div className="font-semibold text-[24px] leading-[17px] text-center">ЧОМУ ОБИРАЮТЬ НАС</div>
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-center pt-[28px] text-md">
						<div className="relative flex items-center justify-center h-[137px] w-full bg-[#f6f6f6] rounded-[8px]">
							<img src={`${benefits1}`} alt="1" className="w-[48px] h-[48px] absolute -top-6"/>
							<div><span className="font-semibold">ЧЕСНІ ЦІНИ</span> І<br/>ВЕЛИКИЙ ВИБІР</div>
						</div>
						<div className="relative flex items-center justify-center h-[137px] w-full bg-[#f6f6f6] rounded-[8px]">
							<img src={`${benefits2}`} alt="2" className="w-[48px] h-[48px] absolute -top-6"/>
							<div><span className="font-semibold">ШВИДКА</span> ДОСТАВКА<br/>ПО УКРАЇНІ</div>
						</div>
						<div className="relative flex items-center justify-center h-[137px] w-full bg-[#f6f6f6] rounded-[8px]">
							<img src={`${benefits3}`} alt="3" className="w-[48px] h-[48px] absolute -top-6"/>
							<div>ІНДИВІДУАЛЬНИЙ<span className="font-semibold"><br/>ПІДХІД</span></div>
						</div>
						<div className="relative flex items-center justify-center h-[137px] w-full bg-[#f6f6f6] rounded-[8px]">
							<img src={`${benefits4}`} alt="4" className="w-[48px] h-[48px] absolute -top-6"/>
							<div><span className="font-semibold">МИ СПРАВЖНІ</span>, НЕ<br/>ХОВАЄМОСЬ ЗА<br/>БОТАМИ І ШАБЛОНАМИ</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-10 mb-[100px]">
					<div className="font-semibold text-[24px] leading-[17px] text-center">НАШІ ЦІННОСТІ</div>
					<div className="flex justify-between gap-1 items-center">
						<CooperationList classes="w-1/2" items={ourValuesListItems}/>
						<div className="flex gap-4 w-1/2">
							<img src={`${ourValuesImage1}`} alt="1" className="rounded-[8px] w-1/2"/>
							<img src={`${ourValuesImage2}`} alt="2" className="rounded-[8px] w-1/2"/>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-10">
					<div className="font-semibold text-[24px] leading-[17px] text-center">ВІДГУКИ</div>
					<ReviewSlider/>
				</div>
				<div className="flex flex-col gap-10 py-[100px] items-center text-center">
					<div className="font-semibold text-[20px] max-w-[800px]">
						Приєднуйтесь до нашої спільноти краси!<br/>
						Ми тут, щоб допомогти вам знайти свій ідеальний догляд і зробити себе щасливішою 💕
					</div>
					<div className="flex gap-[30px]">
						<Button
							type="primary"
							text="ПЕРЕЙТИ ДО КАТАЛОГУ"
							classes="w-[306px]"
						/>
						<Button
							type="secondary"
							text="ЗАРЕЄСТРУВАТИСЬ/УВІЙТИ"
							classes="w-[332px]"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutUsPage;
