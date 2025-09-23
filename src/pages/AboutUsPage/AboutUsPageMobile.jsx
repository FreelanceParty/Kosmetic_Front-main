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

import phoneImage from "../../assets/images/aboutUs/inst_mobile.png";
import ReviewsMobile from "../../components/Reviews/ReviewsMobile";

const ourValuesListItems = [
	{firstPart: "ЯКІСТЬ", secondPart: " — лише оригінальна продукція"},
	{firstPart: "ОСВІЧЕНІ МЕНЕДЖЕРИ", secondPart: " — постійно навчаються у косметологів"},
	{firstPart: "ПІДТРИМКА", secondPart: " — допоможемо підібрати те, що підходить саме вам"},
	{firstPart: "СТАБІЛЬНІСТЬ", secondPart: " — працюємо навіть без світла"},
];

const AboutUsPage = () => {
	return (
		<div className="flex md:hidden">
			<div className="flex flex-col pt-5 gap-[60px]">
				<div className="flex flex-col gap-8 px-4">
					<div className="font-semibold text-[18px] py-[10px] leading-[13px] text-center border-b border-[#F6F6F6]">ПРО НАС</div>
					<div className="text-md">
						Ми компанія <span className="font-bold text-[#8F49A3]">Beauty</span> <span className="font-bold text-[#DA469A]">Blossom</span> – прямі постачальники корейської косметики з
						Південної Кореї, Америки, Європи та України.
						<br/> <br/>
						У нас в наявності <span className="font-semibold">більше 50-ти популярних брендів та більше 2500 тис товарів.</span>
						<br/> <br/>
						В нашому асортименті ви завжди знайдете : <span className="font-semibold">догляд</span> для шкіри обличчя, догляд для тіла та волосся. Засоби для <span
						className="font-semibold">лікування акне та розацеа.</span> Засоби для <span className="font-semibold">омолодження та ліфтинг</span> ефекту.
						Засоби для макіяжу та навіть <span className="font-semibold">аксесуари</span> : косметички, щітки для волосся та пов’язки.
					</div>
					<img src={phoneImage} alt="phone" className="max-w-full"/>
				</div>
				<div className="flex flex-col gap-10 px-4">
					<div className="font-semibold text-[18px] leading-[13px] text-center border-b border-[#F6F6F6]">ЧОМУ ОБИРАЮТЬ НАС</div>
					<div className="flex flex-col gap-10 justify-center pt-[28px] text-md">
						<div className="relative flex items-center h-[137px] w-full bg-[#f6f6f6] rounded-[8px]">
							<img src={`${benefits1}`} alt="1" className="w-[48px] h-[48px] absolute -top-6 left-[28px]"/>
							<div className="w-full px-[43px]"><span className="font-semibold">ЧЕСНІ ЦІНИ</span> І ВЕЛИКИЙ ВИБІР</div>
						</div>
						<div className="relative flex items-center justify-center h-[137px] w-full bg-[#f6f6f6] rounded-[8px]">
							<img src={`${benefits2}`} alt="2" className="w-[48px] h-[48px] absolute -top-6 right-[28px]"/>
							<div className="w-full px-[43px]"><span className="font-semibold">ШВИДКА</span> ДОСТАВКА ПО УКРАЇНІ</div>
						</div>
						<div className="relative flex items-center justify-center h-[137px] w-full bg-[#f6f6f6] rounded-[8px]">
							<img src={`${benefits3}`} alt="3" className="w-[48px] h-[48px] absolute -top-6 left-[28px]"/>
							<div className="w-full px-[43px]">ІНДИВІДУАЛЬНИЙ<span className="font-semibold"> ПІДХІД</span></div>
						</div>
						<div className="relative flex items-center justify-center h-[137px] w-full bg-[#f6f6f6] rounded-[8px]">
							<img src={`${benefits4}`} alt="4" className="w-[48px] h-[48px] absolute -top-6 right-[28px]"/>
							<div className="w-full px-[43px]"><span className="font-semibold">МИ СПРАВЖНІ</span>, НЕ ХОВАЄМОСЬ ЗА БОТАМИ І ШАБЛОНАМИ</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-10 px-4">
					<div className="font-semibold text-[18px] leading-[13px] text-center border-b border-[#F6F6F6]">НАШІ ЦІННОСТІ</div>
					<div className="flex justify-between gap-8 items-center flex-col">
						<CooperationList items={ourValuesListItems}/>
						<img src={`${ourValuesImage1}`} alt="1" className="rounded-[8px] w-full"/>
					</div>
				</div>
					<ReviewsMobile withProducts={false}/>
				<div className="flex flex-col gap-10 mb-[60px] items-center px-8">
					<div className="text-[20px] max-w-[800px]">
						Приєднуйтесь до нашої спільноти краси!<br/>
						Ми тут, щоб допомогти вам знайти свій ідеальний догляд і зробити себе щасливішою 💕
					</div>
					<div className="flex flex-col gap-5 w-full">
						<Button
							type="primary"
							text="ПЕРЕЙТИ ДО КАТАЛОГУ"
							classes="!w-full"
						/>
						<Button
							type="secondary"
							text="ЗАРЕЄСТРУВАТИСЬ/УВІЙТИ"
							classes="!w-full"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutUsPage;
