import CooperationList from "../_elements/CooperationList";
import {MainTitle, SecondaryTitle} from "../CooperationPage.styled";
import Button from "../_elements/Button/Button";

const PersonalOrders = () => {
	const orderConditionsListItems = [
		{firstPart: "БЕЗ МІНІМАЛЬНОЇ СУМИ ЗАМОВЛЕННЯ", secondPart: " — замовляй хоч один крем 😉"},
		{firstPart: "БЕЗКОШТОВНА ДОСТАВКА", secondPart: " — при умові від 2000 грн"},
		{firstPart: "ПОВНА ОПЛАТА НА РАХУНОК ФОП", secondPart: ""},
		{firstPart: "НАКЛАДЕНИЙ ПЛАТІЖ", secondPart: " — за передплатою 100 грн"},
	];
	const bonusesListItems = [
		{firstPart: "-15% ДО ДНЯ НАРОДЖЕННЯ", secondPart: " — активна за 3 днів до та після"},
		{firstPart: "НАКЛАДЕНИЙ ПЛАТІЖ", secondPart: " — за передплатою 100 грн"},
		{firstPart: "ЗНИЖКА ЗА ВІДГУК", secondPart: " — позначай нас на фото або відео в INSTAGRAM  (посилання тут)"},
		{firstPart: "ПОВНА ОПЛАТА НА ФОП", secondPart: ""},
	];

	return (
		<div className="flex flex-col gap-8 items-center md:items-start text-[#000E55]">
			<div className="flex flex-col gap-[60px]">
				<div className="flex flex-col gap-[33px]">
					<MainTitle className="md:hidden">
						ОСОБИСТІ ЗАМОВЛЕННЯ
					</MainTitle>
					<div className="flex flex-col gap-6">
						<div className="font-medium text-xl ">КУПУЙ ЛЕГКО, ШВИДКО ТА З ВИГОДОЮ</div>
						<div className="text-lg">
							<span className="font-semibold text-lg text-[#8F49A3]">BEAUTY</span>
							<span className="font-semibold text-lg text-[#DF4DA0]">BLOSSOM </span>
							- ЦЕ КОСМЕТИКА БЕЗ МІНІМАЛОК І БЕЗ ЗАЙВИХ СКЛАДНОЩІВ.
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-8">
					<SecondaryTitle>УМОВИ ЗБЕРІГАННЯ</SecondaryTitle>
					<CooperationList items={orderConditionsListItems}/>
				</div>
				<div className="flex flex-col gap-8">
					<SecondaryTitle>БОНУСИ ТА ЗНИЖКИ</SecondaryTitle>
					<CooperationList items={bonusesListItems}/>
				</div>
				<div className="flex flex-col gap-10">
					<div className="font-semibold text-2xl text-center md:text-left">ОФОРМЛЮЙТЕ ЗАМОВЛЕННЯ ЛЕГКО!</div>
					<div className="flex flex-col gap-6 leading-[160%]">
						<div className="font-normal text-md">Просто додайте товар в корзину , введіть свої дані та оформіть замовлення. Реквізити для оплати надсилає менеджер після підтвердження
							замовлення в будь який
							месенжер Telegram / Viber / WhatsUp
						</div>
						<div className="font-semibold text-md">ВАЖЛИВО. Якщо отримувач буде інший, вказуйте в коментарях дані отримувача.</div>
					</div>
				</div>
			</div>
			<Button type="primary" text="ВПЕРЕД ЗА ПОКУПКАМИ"/>
		</div>
	);
};

export default PersonalOrders;
