export const sortOptions = [
	{
		id:    'default',
		label: 'За замовчуванням',
	},
	{
		id:    'title-asc',
		label: 'За назвою A-Z',
	},
	{
		id:    'title-desc',
		label: 'За назвою Z-A',
	},
	{
		id:    'price-asc',
		label: 'За ціною (зростання)',
	},
	{
		id:    'price-desc',
		label: 'За ціною (зменшення)',
	},
	{
		id:    'available-count-desc',
		label: 'Товари в наявності',
	},
];

export function availabilityComparator(a, b) {
	const isAvailableA = (a.amount || 0) > 0;
	const isAvailableB = (b.amount || 0) > 0;

	if (isAvailableA !== isAvailableB) {
		return isAvailableB - isAvailableA;
	}
	return 0;
}

export function getUserSortFunction(optionId) {
	switch (optionId) {
		case 'title-asc':
			return (a, b) => a.name.localeCompare(b.name);
		case 'title-desc':
			return (a, b) => b.name.localeCompare(a.name);
		case 'price-asc':
			return (a, b) => a.price - b.price;
		case 'price-desc':
			return (a, b) => b.price - a.price;
		case 'available-count-desc':
			return (a, b) => (b.amount || 0) - (a.amount || 0);
		default:
			return (a, b) => 0;
	}
}

export function combinedSortComparator(a, b, optionId) {
	const availabilityResult = availabilityComparator(a, b);

	if (availabilityResult !== 0) {
		return availabilityResult;
	}

	const userSortFunction = getUserSortFunction(optionId);
	return userSortFunction(a, b);
}