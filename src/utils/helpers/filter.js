import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const defaultFilters = [
	{
		order:   1,
		id:      'new-and-offers',
		title:   'Новинки / Акції',
		options: [
			{
				id:    'new',
				title: 'Новинки',
			},
			{
				id:    'sale',
				title: 'SALE',
				style: 'text-[#B90003]',
			},
		],
	},
];

export const statusFilters = [
	{
		order: 1,
		id:    'new',
		title: 'Новий',
	},
	{
		order: 2,
		id:    'accepted',
		title: 'Прийняте в роботу',
	},
	{
		order: 3,
		id:    'collecting',
		title: 'Збирається',
	},
	{
		order: 4,
		id:    'collected',
		title: 'Зібрано',
	},
	{
		order: 5,
		id:    'sent',
		title: 'Відправлено',
	},
	{
		order: 6,
		id:    'cancelled',
		title: 'Відміна',
	},
];

export const getAllFilters = async () => {
	try {
		const response = await axios.get(`${API_URL}/filters`);
		return response.data;
	} catch (e) {
		return [];
	}
}

export const getFiltersForProducts = async (products) => {
	const filterIds = [
		...new Set(products.flatMap(p => p.filterTagIds.match(/\d+/g) || []).map(Number))
	];
	const filters = await getAllFilters();
	return filters.filter((f) => filterIds.includes(f.id));
}

export const getConvertedFiltersForProducts = async (products) => {
	const filters = await getFiltersForProducts(products);
	return Object.values(
		filters.reduce((acc, filter) => {
			if (!filter.category || !filter.subCategory) {
				return acc;
			}

			const categoryName = filter.category;
			if (!acc[categoryName]) {
				acc[categoryName] = {
					order:   1,
					id:      categoryName,
					title:   categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
					options: []
				};
			}

			const subExists = acc[categoryName].options.some(opt => opt.id === filter.id);
			if (!subExists) {
				acc[categoryName].options.push({
					id:    filter.id,
					title: filter.subCategory
				});
			}
			return acc;
		}, {})
	);
}

export const applyFiltersToProducts = (products, filters, priceFilter) => {
	if (filters.length > 0) {
		const isNew = filters.includes('new');
		const isSale = filters.includes('sale');
		if (isNew || isSale) {
			products = products.filter(i => (isNew && i.new === true) || (isSale && i.sale === true));
		}
		const excludedSlugs = ['sale', 'new'];
		const filterIds = filters.filter(id => !excludedSlugs.includes(id));
		if (filterIds.length > 0) {
			products = filterProductsByFilterIds(products, filterIds);
		}
	}
	if (priceFilter) {
		products = products.filter(i => i.price >= priceFilter[0] && i.price <= priceFilter[1]);
	}
	return products;
}

export const filterProductsByFilterIds = (products, filterIds) => {
	return products.filter(p => {
		const pIds = p.filterTagIds.match(/\d+/g)?.map(Number) || [];
		return pIds.some(id => filterIds.includes(id));
	});
}
