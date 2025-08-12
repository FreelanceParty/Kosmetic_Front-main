import CooperationList from "../_elements/CooperationList";
import {MainTitle, SecondaryTitle} from "../CooperationPage.styled";
import Button from "../../../components/ButtonNew/Button";

const Dropshipping = () => {
	const orderConditionsListItems = [
		{firstPart: "БЕЗ МІНІМАЛЬНОЇ СУМИ ЗАМОВЛЕННЯ", secondPart: ""},
		{firstPart: "ПОВНА ОПЛАТА НА РАХУНОК ФОП", secondPart: ""},
		{firstPart: "ДОСТАВКА ЗА РАХУНОК ОТРИМУВАЧА", secondPart: ""},
		{firstPart: "ВІДПРАВКА НОВОЮ ПОШТОЮ", secondPart: " — 1-3 дні з моменту оплати замовлення"},
	];
	const importantListItems = [
		{firstPart: "ВІДПРАВКА ЛИШЕ НОВОЮ ПОШТОЮ ТА ЧЕРЕЗ СТВОРЕНУ ВАМИ ТТН", secondPart: ""},
		{firstPart: "ВІДПРАВЛЯЄМО ЗАМОВЛЕННЯ ПІСЛЯ 100% ОПЛАТИ", secondPart: ""},
		{firstPart: "ЗАМОВЛЕННЯ ВІДПРАВЛЯЄМО ДЕНЬ В ДЕНЬ", secondPart: " — при оформленні та оплаті до 14:00"},
	];

	return (
		<div className="flex flex-col gap-8 items-center lg:items-start text-[#000E55]">
			<div className="flex flex-col gap-[60px]">
				<div className="flex flex-col gap-8">
					<MainTitle>
						СПІВПРАЦЯ ДРОПШИПІНГ
					</MainTitle>
					<div className="font-normal text-lg">ІДЕАЛЬНЕ РІШЕННЯ ДЛЯ ОНЛАЙН-МАГАЗИНІВ</div>
				</div>
				<div className="flex flex-col gap-8">
					<SecondaryTitle>УМОВИ ЗАМОВЛЕННЯ</SecondaryTitle>
					<CooperationList items={orderConditionsListItems}/>
				</div>
				<div className="flex flex-col gap-8">
					<SecondaryTitle className="text-[#B90003]">ВАЖЛИВО!</SecondaryTitle>
					<CooperationList items={importantListItems}/>
				</div>
				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-6 text-center lg:text-left">
						<SecondaryTitle>ДЕ ДІЗНАТИСЬ БІЛЬШЕ?</SecondaryTitle>
						<div className="font-normal text-md">Детальна інструкція зі створення ТТН та актуальні ціни — в наших каналах:</div>
					</div>
					<div className="flex flex-col gap-6">
						<div className="flex gap-4 items-center">
							<img
								src={require("../../../assets/icons/viber.svg").default}
								alt="viber"
								width={16}
								height={16}
							/>
							<div className="font-medium text-md">VIBER</div>
						</div>
						<div className="flex gap-4 items-center">
							<img
								src={require("../../../assets/icons/teleg.svg").default}
								alt="teleg"
								width={16}
								height={16}
							/>
							<div className="font-medium text-md">TELEGRAM</div>
						</div>
					</div>
				</div>
			</div>
			<Button type="primary" text="ВПЕРЕД ЗА ПОКУПКАМИ"/>
		</div>
	);
};

export default Dropshipping;
