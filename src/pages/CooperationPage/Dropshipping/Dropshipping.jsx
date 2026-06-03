import CooperationList from "../_elements/CooperationList";
import {MainTitle, SecondaryTitle} from "../CooperationPage.styled";
import Button from "../../../components/ButtonNew/Button";
import viberIcon from "../../../assets/icons/viber.svg";
import telegIcon from "../../../assets/icons/teleg.svg";

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
						<a className="flex gap-4 items-center hover:text-[#E667A4] underline cursor-pointer" href="https://invite.viber.com/?g2=AQBbJ%2BXb2uClMFSC6vure1IGuhLvlb144kglbXjoA0lex1DPoo79HdiJ5Ef6o0No">
							<img
								src={viberIcon}
								alt="viber"
								width={16}
								height={16}
							/>
							<div className="font-medium text-md">VIBER</div>
						</a>
						<a className="flex gap-4 items-center hover:text-[#E667A4] underline cursor-pointer" href="https://t.me/+aQ3BwgOjRUQ5MDQy">
							<img
								src={telegIcon}
								alt="teleg"
								width={16}
								height={16}
							/>
							<div className="font-medium text-md">TELEGRAM</div>
						</a>
					</div>
				</div>
			</div>
			<Button type="primary" text="ВПЕРЕД ЗА ПОКУПКАМИ" to="/search?page=1&query="/>
		</div>
	);
};

export default Dropshipping;
