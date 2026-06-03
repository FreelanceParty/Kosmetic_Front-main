import React from "react";
import Button from "../ButtonNew/Button";
import ellipseIcon from "../../assets/icons/cooperation/ellipse.svg";
import cooperation1 from "../../assets/images/cooperation/1.png";
import cooperation2 from "../../assets/images/cooperation/2.png";
import cooperation3 from "../../assets/images/cooperation/3.png";
import cooperation4 from "../../assets/images/cooperation/4.png";

const advantages = [
	{
		icon: ellipseIcon,
		text: "пропонуємо вигідні умови для магазинів, салонів і дистриб’юторів.",
	},
	{
		icon: ellipseIcon,
		text: "Надаємо консультації, підтримку на всіх етапах замовлення та швидку доставку.",
	},
	{
		icon: ellipseIcon,
		text: "Зробимо співпрацю комфортною — і для вас, і для вашого бізнесу.",
	},
];

const images = [cooperation1, cooperation2, cooperation3, cooperation4]

const Cooperation = () => {
	return (
		<div className="flex flex-col border-t border-[#E8E8E8] w-full max-w-[1241px]">
			<div className="font-semibold text-[24px] leading-[17px] text-center py-10">ОПТОВА СПІВПРАЦЯ</div>
			<div className="flex flex-col md:flex-row p-10 gap-6 items-center rounded-[8px] bg-[#f6f6f6]">
				<div className="flex flex-col gap-6 md:gap-10 w-full md:w-1/2 justify-center">
					<div className="font-bold md:font-semibold text-md md:text-[clamp(16px,3vw,24px)] leading-[22px] md:leading-[clamp(22px,3vw,34px)] uppercase text-center md:text-left">Шукаєте
						надійного постачальника корейської косметики?
					</div>
					<div className="flex flex-col gap-[30px] md:gap-10 items-center">
						<div className="flex flex-col gap-5 md:gap-6">
							{advantages.map((advantage, index) => (
								<div key={index} className="flex gap-4 items-center">
									<img
										src={advantage.icon}
										alt="ellipse"
										width={10}
										height={10}
									/>
									<div className="font-medium text-md md:text-lg uppercase">{advantage.text}</div>
								</div>
							))}
						</div>
						<Button
							type="primary"
							text="УМОВИ СПІВПРАЦІ"
							classes="max-w-[246px]"
							to="/cooperation"
						/>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-2 lg:gap-4 w-full md:w-1/2 max-w-fit max-h-fit">
					{images.map((image, index) => (
						<div key={index} className="flex justify-center relative w-full h-full rounded-[3px]">
							<img className="rounded-[8px] w-full h-full" src={image} alt="category"/>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Cooperation;
