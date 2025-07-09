import React from "react";
import {
	CoopWrapper,
	CoopContent,
	CoopTitle,
	CoopSubtitle,
	CoopList,
	CoopListItem,
	CoopIcon,
	CoopText,
	CoopButton,
	CoopImageBlock,
	CoopImage,
} from "./Cooperation.styled";

const advantages = [
	{
		icon: require("../../assets/icons/cooperation/ellipse.svg").default,
		text: "пропонуємо вигідні умови для магазинів, салонів і дистриб’юторів.",
	},
	{
		icon: require("../../assets/icons/cooperation/ellipse.svg").default,
		text: "Надаємо консультації, підтримку на всіх етапах замовлення та швидку доставку.",
	},
	{
		icon: require("../../assets/icons/cooperation/ellipse.svg").default,
		text: "Зробимо співпрацю комфортною — і для вас, і для вашого бізнесу.",
	},
];

const Cooperation = () => (
	<CoopWrapper>
		<CoopTitle>Оптова співпраця</CoopTitle>
		<CoopContent>
			<CoopSubtitle>
				Шукаєте надійного постачальника корейської косметики?
			</CoopSubtitle>
			<CoopList>
				{advantages.map((item, idx) => (
					<CoopListItem key={idx}>
						<CoopIcon src={item.icon} alt="icon"/>
						<CoopText>{item.text}</CoopText>
					</CoopListItem>
				))}
			</CoopList>
			<CoopButton href="/cooperation">Умови співпраці</CoopButton>
			<CoopImageBlock>
				<CoopImage
					src={require("../../assets/images/cooperation/1.png")}
					alt="cooperation"
				/>
				<CoopImage
					src={require("../../assets/images/cooperation/2.png")}
					alt="cooperation"
				/>
				<CoopImage
					src={require("../../assets/images/cooperation/3.png")}
					alt="cooperation"
				/>
				<CoopImage
					src={require("../../assets/images/cooperation/4.png")}
					alt="cooperation"
				/>
			</CoopImageBlock>
		</CoopContent>
	</CoopWrapper>
);

export default Cooperation;
