export const CABINET_TYPES = ["opt", "drop", "retail"];

export const CABINET_LABELS = {
	opt:    "Опт",
	drop:   "Дроп",
	retail: "Роздріб",
};

export const getCabinetLabel = (type) => CABINET_LABELS[type] ?? "";

// Cabinet type of an order, derived from its stored snapshot flags.
export const getOrderCabinetLabel = (order) => {
	if (order?.isDropUser) return CABINET_LABELS.drop;
	if (order?.isOptUser) return CABINET_LABELS.opt;
	return CABINET_LABELS.retail;
};
