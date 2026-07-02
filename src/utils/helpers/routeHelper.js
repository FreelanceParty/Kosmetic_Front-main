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
			route: "/katehoriji/sunProtection",
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
		if (!category) {
			return "/katehoriji";
		}
		const normalized = category.toLowerCase().trim();
		const found = categories.find(cat => cat.name.toLowerCase().trim() === normalized);
		return found ? found.route : "/katehoriji";
	};

	const getCategoryByRoute = (route) => {
		if (!route) {
			return null;
		}
		const segments = route.split("/").filter(Boolean);
		const baseRoute = segments.length >= 2
			? `/${segments[0]}/${segments[1]}`
			: `/${segments[0] ?? ""}`;
		const found = categories.find(category => category.route === baseRoute)
			?? categories.find(category => category.route === route);
		return found ? found.name : null;
	};

	return {getCategoryRoute, getCategoryByRoute};
}
