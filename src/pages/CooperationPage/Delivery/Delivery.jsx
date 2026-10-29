import CooperationList from "../_elements/CooperationList";
import {MainTitle, SecondaryTitle} from "../CooperationPage.styled";
import Button from "../../../components/ButtonNew/Button";

const Delivery = () => {
	const paymentListItems = [
		{firstPart: "ПОВНА ОПЛАТА НА РАХУНОК ФОП.", secondPart: " Після перевірки та збору вашого замовлення, ми надсилаємо в месенджер актуальний рахунок ФОП для оплати"},
		{firstPart: "НАКЛАДНИЙ ПЛАТІЖ.", secondPart: (
			<> Відправка замовлень накладним платежем відбувається тільки по передоплаті 100 грн.
				<br/>
				<span className="font-semibold">ЗВЕРНІТЬ УВАГУ: комісія Нової Пошти за переказ коштів становить 2% + 20 грн</span>
			</>
		)},
	];
	const deliveryListItems = [
		{firstPart: "НОВА ПОШТА.", secondPart: " Доставляємо замовлення по Україні виключно Новою Поштою: у відділення, поштомат або кур’єром прямо до ваших дверей"},
		{firstPart: "ДЛЯ ОПТОВИХ ТА ДРОПШИПІНГОВИХ КЛІЄНТІВ.", secondPart: " Доставка здійснюється за рахунок отримувача"},
		{firstPart: "ДЛЯ РОЗДРІБНИХ КЛІЄНТІВ.", secondPart: (
			<> Безкоштовна доставка замовлення на суму <span className="font-semibold">від 2000 грн</span> (у відділення, поштомат або кур’єрською доставкою)</>
		)},
	];
	const shippingTimeListItems = [
		{firstPart: "", secondPart: "Оформлені та оплачені замовлення до 14:00 — відправляються в той самий день до 21:00"},
		{firstPart: "", secondPart: "При оплаті після 14:00 — відправка відбувається на наступний робочий день до 21:00"},
	];
	const deliveryCostListItems = [
		{firstPart: "", secondPart: "Вартість доставки у відділення, поштомат та кур’єрської доставки здійснюється за тарифами Нової Пошти"},
	];

	return (
		<div className="flex flex-col gap-8 items-center lg:items-start text-[#000E55]">
			<MainTitle className="w-full">ОПЛАТА ТА ДОСТАВКА</MainTitle>
			<div className="flex flex-col gap-[60px] max-h-[min(450px,60vh)] lg:max-h-[min(520px,60vh)] overflow-y-auto pr-5 xl:pr-[100px] max-w-full lg:max-w-[880px]">
				<div className="flex flex-col gap-8">
					<SecondaryTitle>УМОВИ ОПЛАТИ</SecondaryTitle>
					<CooperationList items={paymentListItems}/>
				</div>
				<div className="flex flex-col gap-8">
					<SecondaryTitle>УМОВИ ДОСТАВКИ ПО УКРАЇНІ</SecondaryTitle>
					<CooperationList items={deliveryListItems}/>
				</div>
				<div className="flex flex-col gap-8">
					<SecondaryTitle>ТЕРМІНИ ВІДПРАВКИ ДЛЯ ВСІХ КЛІЄНТІВ</SecondaryTitle>
					<CooperationList items={shippingTimeListItems}/>
				</div>
				<div className="flex flex-col gap-8">
					<SecondaryTitle>ВАРТІСТЬ ДОСТАВКИ</SecondaryTitle>
					<CooperationList items={deliveryCostListItems}/>
				</div>
				<div className="flex flex-col gap-6 text-md leading-[160%]">
					<SecondaryTitle>ВАЖЛИВА ІНФОРМАЦІЯ ЩОДО ОТРИМАННЯ ЗАМОВЛЕНЬ НОВОЮ ПОШТОЮ!</SecondaryTitle>
					<p>Любі клієнти, просимо уважно перевіряти свої замовлення безпосередньо у відділенні Нової Пошти, перш ніж забрати посилку.</p>
					<div>
						<p className="font-semibold">🔎 НА ЩО НЕОБХІДНО ЗВЕРНУТИ УВАГУ ПІД ЧАС ОТРИМАННЯ?</p>
						<p>• Цілісність транспортного пакування та відсутність зовнішніх пошкоджень.</p>
						<p>• Стан товарів усередині посилки.</p>
						<p>• Відповідність фактичної ваги відправлення зазначеним даним.</p>
					</div>
					<div>
						<p className="font-semibold">❗ ЩО РОБИТИ, ЯКЩО ВИЯВЛЕНО ПРОБЛЕМУ?</p>
						<p>Якщо ви помітили пошкодження, нестачу товару або розбіжності у найменуванні, не поспішайте забирати відправлення.</p>
					</div>
					<p>Необхідно одразу звернутися до працівника Нової Пошти для офіційної фіксації ситуації та оформлення відповідного акта. За потреби ви можете відмовитися від отримання посилки й оформити її повернення відправнику.</p>
					<p>Також, просимо обов'язково повідомити про ситуацію свого персонального менеджера, щоб ми могли оперативно допомогти з її вирішенням.</p>
					<div>
						<p className="font-semibold">⚠️ ЗВЕРНІТЬ УВАГУ!</p>
						<p>Після того як посилку отримано та винесено за межі відділення, підтвердити пошкодження або нестачу товару, що виникли під час транспортування, може бути значно складніше.</p>
					</div>
					<p>Якщо замовлення було отримано без перевірки, звернення щодо транспортних пошкоджень, нестачі товару, обміну чи компенсації можуть бути відхилені через відсутність належної фіксації під час видачі.</p>
					<p className="font-semibold">ВИНЯТОК СТАНОВЛЯТЬ ВИПАДКИ ВИРОБНИЧОГО БРАКУ, ЯКІ РОЗГЛЯДАЮТЬСЯ ОКРЕМО ВІДПОВІДНО ДО ВСТАНОВЛЕНОГО ПОРЯДКУ ТА ЧИННОГО ЗАКОНОДАВСТВА.</p>
					<p>💗 Ми дбаємо про те, щоб кожне замовлення потрапило до вас у належному стані, тому просимо приділити кілька хвилин перевірці посилки під час отримання.</p>
					<p className="font-semibold">ДЯКУЄМО ЗА СПІВПРАЦЮ, УВАЖНІСТЬ ТА ДОВІРУ!</p>
				</div>
			</div>
			<Button type="primary" text="ВПЕРЕД ЗА ПОКУПКАМИ" to="/search?page=1&query="/>
		</div>
	);
};

export default Delivery;
