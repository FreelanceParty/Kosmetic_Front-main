import CooperationList from "../_elements/CooperationList";
import {MainTitle, SecondaryTitle} from "../CooperationPage.styled";
import Button from "../../../components/ButtonNew/Button";
import {useNavigate} from "react-router-dom";

const RetailOrders = () => {
	const navigate = useNavigate();
	const orderConditionsListItems = [
		{firstPart: "БЕЗ МІНІМАЛЬНОЇ СУМИ ЗАМОВЛЕННЯ", secondPart: " — замовляй хоч один крем 😉"},
		{firstPart: "БЕЗКОШТОВНА ДОСТАВКА", secondPart: " — при умові від 2000 грн"},
		{firstPart: "ПОВНА ОПЛАТА НА РАХУНОК ФОП", secondPart: ""},
		{firstPart: "НАКЛАДНИЙ ПЛАТІЖ", secondPart: " — за передплатою 100 грн"},
	];
	const bonusesListItems = [
		{firstPart: "-15% ДО ДНЯ НАРОДЖЕННЯ", secondPart: " — активна за 3 днів до та після"},
		{firstPart: "НАКЛАДНИЙ ПЛАТІЖ", secondPart: " — за передплатою 100 грн"},
		{firstPart: "ЗНИЖКА ЗА ВІДГУК", secondPart: (
			<> — позначай нас на фото або відео в {" "}
				<a
					href="https://www.instagram.com/beauty_blossom_ua?igsh=OWs4ZjAwdTkyczd3&utm_source=qr"
					target="_blank"
					rel="noreferrer"
					className={'hover:text-[#E667A4] underline'}
				>
					INSTAGRAM
				</a>
			</>
		)},
		{firstPart: "ПОВНА ОПЛАТА НА ФОП", secondPart: ""},
	];

	return (
		<div className="flex flex-col gap-8 items-center md:items-start text-[#000E55]">
			<div className="flex flex-col gap-[60px]">
				<div className="flex flex-col gap-[33px]">
					<MainTitle className="lg:hidden">
						РОЗДРІБНІ ЗАМОВЛЕННЯ
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
							месенжер Telegram / Viber / WhatsApp
						</div>
						<div className="font-semibold text-md">ВАЖЛИВО. Якщо отримувач буде інший, вказуйте в коментарях дані отримувача.</div>
					</div>
				</div>
			</div>
			<Button type="primary" text="ВПЕРЕД ЗА ПОКУПКАМИ" onClick={() => navigate('/search?page=1&query=')}/>
		</div>
	);
};

export default RetailOrders;
