export function routeHelper() {

	const categories = [
		{
			name:  "Догляд для обличчя",
			route: "/katehoriji/faceCare",
		},
		{
			name:  "Догляд для волосся",
			route: "/katehoriji/hairCare",
		},
		{
			name:  "Догляд для тіла",
			route: "/katehoriji/bodyCare",
		},
		{
			name:  "Макіяж",
			route: "/katehoriji/makeup",
		},
		{
			name:  "Набори",
			route: "/katehoriji/folds",
		},
		// todo:
		{
			name:  "Захист від сонця",
			route: "/katehoriji",
		},
		{
			name:  "Аксесуари для догляду",
			route: "/katehoriji",
		},
		{
			name:  "Пробники",
			route: "/katehoriji",
		},
	];

	const getCategoryRoute = (category) => {
		category = category.toLowerCase().trim();
		return categories.find(cat => cat.name.toLowerCase().trim() === category).route;
	};

	const getCategoryByRoute = (route) => {
		return categories.find(category => category.route === route).name;
	};

	return {getCategoryRoute, getCategoryByRoute};
}
