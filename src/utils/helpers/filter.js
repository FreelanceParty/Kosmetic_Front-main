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

export const hairFilters = [
	{
		order:   2,
		id:      'head-skin-type',
		title:   'Тип шкіри голови',
		options: [],
	},
	{
		order:   3,
		id:      'purpose',
		title:   'Призначення',
		options: [],
	},
];

export const faceFilters = [
	{
		order:   2,
		id:      'skin-type',
		title:   'Тип шкіри',
		options: [],
	},
	{
		order:   3,
		id:      'purpose',
		title:   'Призначення',
		options: [],
	},
	{
		order:   4,
		id:      'spf-type',
		title:   'Тип SPF',
		options: [],
	},
];
