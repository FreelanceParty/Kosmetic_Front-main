export function routeHelper() {

	const getCategoryRoute = (category) => {
		category = category.toLowerCase().trim();
		switch (category) {
			case "догляд для волосся":
				return "/katehoriji/hairCare";
			case "догляд для тіла":
				return "/katehoriji/bodyCare";
			case "макіяж":
				return "/katehoriji/makeup";
			case "набори":
				return "/katehoriji/folds";

			case "догляд для обличчя":
				return "/katehoriji/";
			case "захист від сонця":
				return "/katehoriji/";
			case "аксесуари для догляду":
				return "/katehoriji/";
			case "пробники":
				return "/katehoriji/";
		}
	};

	return {getCategoryRoute};
}
