import React from "react";
import CooperationList from "../_elements/CooperationList";
import {MainTitle, SecondaryTitle} from "../CooperationPage.styled";
import Button from "./../_elements/Button/Button";

const Business = () => {
	const orderConditionsListItems = [
		{firstPart: "МІНІМАЛЬНЕ ЗАМОВЛЕННЯ ЛИШЕ 2500 ГРН", secondPart: ""},
		{firstPart: "ПОВНА ОПЛАТА НА РАХУНОК ФОП", secondPart: ""},
		{firstPart: "НАКЛАДЕНИЙ ПЛАТІЖ НА ПЕРШЕ ЗАМОВЛЕННЯ", secondPart: " —  за передплатою 100 грн"},
		{firstPart: "ВІДПРАВКА НОВОЮ ПОШТОЮ", secondPart: " — 1-3 дні з моменту оплати замовлення"},
		{firstPart: "НАДАЄМО УСІ НЕОБХІДНІ ДОКУМЕНТИ", secondPart: " — видаткова, товарна накладна, рахунок-фактура"},
		{firstPart: "ДОСТАВКА ЗА РАХУНОК ОТРИМУВАЧА", secondPart: ""},
	];

	return (
		<div className="flex flex-col gap-8 items-center text-[#000E55]">
			<div className="flex flex-col gap-[60px]">
				<div className="flex flex-col gap-8 lg:gap-6">
					<MainTitle>
						СПІВПРАЦЯ ДЛЯ ОПТОВИХ КЛІЄНТІВ
					</MainTitle>
					<div className="font-normal text-lg">ПРОФЕСІЙНИЙ ПІДХІД І ЗРУЧНІ УМОВИ ДЛЯ БІЗНЕСУ</div>
				</div>
				<div className="flex flex-col gap-8">
					<SecondaryTitle>УМОВИ ЗАМОВЛЕННЯ</SecondaryTitle>
					<CooperationList items={orderConditionsListItems}/>
				</div>
				<div className="flex flex-col gap-8">
					<SecondaryTitle>ЩОБ ПОБАЧИТИ ОПТОВІ ЦІНИ – ЗАРЕЄСТРУЙТЕСЬ АБО УВІЙДІТЬ, ЯК ОПТОВИЙ ПОКУПЕЦЬ!</SecondaryTitle>
					<div className="flex flex-col lg:flex-row gap-[18px] lg:gap-8 items-center">
						<Button type="primary" text="ЗАРЕЄСТРУВАТИСЬ"/>
						<Button type="secondary" text="УВІЙТИ В КАБІНЕТ"/>
					</div>
				</div>
				<div className="flex flex-col gap-10">
					<div className="font-semibold text-2xl text-center lg:text-left">ОФОРМЛЮЙТЕ ЗАМОВЛЕННЯ ЛЕГКО!</div>
					<div className="flex flex-col gap-6 leading-[160%]">
						<div className="font-normal text-md">Увійдіть/зареєструйтесь на сайті, додайте товар в корзину на суму більше 2500 грн, введіть свої дані для відправки та оформлюйте замовлення! Реквізити для оплати надсилає менеджер після підтвердження замовлення в будь який месенжер Telegram / Viber / WhatsUp
						</div>
						<div className="font-semibold text-md">ВАЖЛИВО. Якщо отримувач буде інший, вказуйте в коментарях дані отримувача.</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Business;
