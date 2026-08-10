export const resolveUserPrice = (product, {isOptUser, isDropUser} = {}) => {
	if (!product) {
		return 0;
	}
	if (isDropUser) {
		return product.priceDrop;
	}
	if (isOptUser) {
		return product.priceOPT;
	}
	return product.price;
};

export const resolveUserPriceOld = (product, {isOptUser, isDropUser} = {}) => {
	if (!product) {
		return 0;
	}
	if (isDropUser) {
		return product.priceOldDrop;
	}
	if (isOptUser) {
		return product.priceOldOPT;
	}
	return product.priceOld;
};

export const getPriceLabel = ({isOptUser, isDropUser} = {}) => {
	if (isDropUser) {
		return 'Дроп ціна';
	}
	if (isOptUser) {
		return 'Оптова ціна';
	}
	return 'Роздрібна ціна';
};
