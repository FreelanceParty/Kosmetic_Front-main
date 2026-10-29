export const CHARACTERISTICS = [
	{field: "age", label: "Вік"},
	{field: "skinType", label: "Тип шкіри"},
	{field: "purpose", label: "Призначення"},
	{field: "volume", label: "Об’єм"},
	{field: "gender", label: "Стать"},
	{field: "category", label: "Категорія"},
	{field: "subCategory", label: "Підкатегорія"},
	{field: "country", label: "Країна виробник"},
];

export const getCharacteristics = (product) => CHARACTERISTICS
	.map(({field, label}) => ({label, value: String(product?.[field] ?? "").trim()}))
	.filter(({value}) => value);

const Characteristics = ({product}) => {
	return (
		<div className="flex flex-col gap-5 border-l border-[#000E55] pl-7 md:ml-10 uppercase text-md md:text-lg text-[#000E55]">
			{getCharacteristics(product).map(({label, value}) => (
				<div key={label}>
					<span className="font-semibold">{label} : </span>
					<span>{value}</span>
				</div>
			))}
		</div>
	);
};

export default Characteristics;
