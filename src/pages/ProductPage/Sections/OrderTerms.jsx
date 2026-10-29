const terms = [
	"безкоштовна доставка для роздрібних клієнтів від 2000 грн",
	"доставка по Україні Новою Поштою протягом 1-2 днів",
	"вартість доставки за тарифами Нової Пошти до відділення, поштомату або кур’єрська доставка до ваших дверей",
	"доступна оплата на рахунок ФОП або накладним платежем по передоплаті 100 грн",
];

const OrderTerms = ({classes}) => {
	return (
		<ul className={`flex flex-col gap-4 leading-[130%] ${classes ?? ""}`}>
			<li className="font-normal">— мінімальна сума оптового замовлення 3000 грн</li>
			{terms.map((term) => (
				<li key={term} className="font-light">— {term}</li>
			))}
		</ul>
	);
};

export default OrderTerms;
