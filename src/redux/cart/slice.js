import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",

	initialState: [],
	reducers:     {
		setCart:            (state, action) => {
			const itemsToAdd = Array.isArray(action.payload) ? action.payload : [];
			state.length = 0;
			state.push(...itemsToAdd);
		},
		addToCart:          (state, action) => {
			const {quantity} = action.payload;
			const key = action.payload?.id ?? action.payload?.productId;
			const existingItem = state.find((item) => {
				const itemKey = item?.id ?? item?.productId;
				return itemKey != null && String(itemKey) === String(key);
			});

			if (existingItem) {
				existingItem.quantity = quantity;
				Object.assign(existingItem, action.payload);
			} else {
				state.push(action.payload);
			}
		},
		removeFromCart:     (state, action) => {
			const key = action.payload?.id ?? action.payload?.productId;
			return state.filter((item) => {
				const itemKey = item?.id ?? item?.productId;
				return String(itemKey) !== String(key);
			});
		},
		removeQuantityCart: (state, action) => {
			const {_id, quantity} = action.payload;
			const existingItemIndex = state.findIndex((item) => item._id === _id);

			if (existingItemIndex !== -1) {
				const existingItem = state[existingItemIndex];

				if (existingItem.quantity > 1) {
					existingItem.quantity = quantity;
				} else {
					state.splice(existingItemIndex, 1);
				}
			}
		},
		removeCart:         (state, action) => {
			const {itemId} = action.payload;
			const updatedCart = state.filter((item) => item._id !== itemId);

			return updatedCart;
		},
		deleteAll:          () => {
			return [];
		},
	},
});

export const {
	             setCart,
	             addToCart,
	             removeFromCart,
	             removeQuantityCart,
	             removeCart,
	             deleteAll
             } = cartSlice.actions;
export default cartSlice.reducer;
