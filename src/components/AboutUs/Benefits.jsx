import {ReactComponent as Car} from "../../assets/icon/mainBenefits/car.svg";
import {ReactComponent as CreditCard} from "../../assets/icon/mainBenefits/creditCard.svg";
import {ReactComponent as Cube} from "../../assets/icon/mainBenefits/cube.svg";
import {ReactComponent as Happy} from "../../assets/icon/mainBenefits/happy.svg";
import {ReactComponent as Percentage} from "../../assets/icon/mainBenefits/percentage.svg";
import {
	BenefitsBlockDIV,
	BenefitsSVGContainer,
	BenefitsSVGItemDIV,
	BenefitsTextContainer,
	BenefitsTextP,
	IconWraper,
	TextSecond,
} from "./aboutUs.styled";

const benefitsData = [
	{Icon: Car, description: "Доставка Новою поштою 1-3 дні"},
	{Icon: CreditCard, description: " Готівкова та безготівкова (ФОП) "},
	{Icon: Cube, description: "Вигідні акційні пропозиції та знижки"},
	{Icon: Happy, description: "Поповнення товару кожні 2 тижня"},
	{Icon: Percentage, description: "Якісна консультація та відмінний сервіс"},
];

const Benefits = () => {
	return (
		<BenefitsBlockDIV>
			<BenefitsSVGContainer>
				{benefitsData.map(({Icon, description}, index) => (
					<BenefitsSVGItemDIV key={index}>
						<IconWraper>
							<Icon width="100px" height="100px"/>
						</IconWraper>
						<BenefitsTextP>{description}</BenefitsTextP>
					</BenefitsSVGItemDIV>
				))}
			</BenefitsSVGContainer>
			<BenefitsTextContainer>
				<TextSecond>
					Індивідуальний підхід, постійна онлайн підтримка менеджерів та їхня
					експертність – саме те, що є в нас! Ми гарантуємо високий та якісний
					сервіс.
				</TextSecond>
				<TextSecond>Саме ми - твій єдиний надійний постачальник!</TextSecond>
			</BenefitsTextContainer>
		</BenefitsBlockDIV>
	);
};

export default Benefits;
