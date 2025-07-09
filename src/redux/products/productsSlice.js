import {createSlice} from "@reduxjs/toolkit";
import {fetchProducts, fetchSearchResults} from "./operation";

const getKey = (params) => JSON.stringify(params);

const productsSlice = createSlice({
	name:          "products",
	initialState:  {
		lists:      {}, // Об'єкт, де ключ — унікальні параметри запиту, а значення — список товарів
		pagination: {}, // Пагінація по кожному запиту
		loading:    {}, // Стан завантаження для кожного запиту
		error:      {}, // Помилки для кожного запиту
	},
	reducers:      {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state, action) => {
				const key = action.meta.arg && getKey(action.meta.arg);
				if (key) {
					state.loading[key] = true;
					state.error[key] = null;
				}
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				const {key, data} = action.payload;

				state.loading[key] = false;
				state.lists[key] = data.products; // Зберігаємо продукти за ключем
				state.pagination[key] = {
					totalItems:  data.totalItems,
					totalPages:  data.totalPages,
					currentPage: data.currentPage,
				};
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				const {key, error} = action.payload;
				state.lists[key] = [];
				state.pagination[key] = {totalPages: 1, currentPage: 1};
				state.loading[key] = false;
				state.error[key] = error;
			})
			.addCase(fetchSearchResults.pending, (state, action) => {
				const key = action.meta.arg && getKey(action.meta.arg);
				if (key) {
					state.loading[key] = true;
					state.error[key] = null;
				}
			})
			.addCase(fetchSearchResults.fulfilled, (state, action) => {
				const {key, data} = action.payload;
				state.loading[key] = false;
				state.lists[key] = data.products; //
				state.pagination[key] = {
					totalItems:  data.totalItems,
					totalPages:  data.totalPages,
					currentPage: data.currentPage,
				};
			})
			.addCase(fetchSearchResults.rejected, (state, action) => {
				const {key, error} = action.payload;
				state.lists[key] = [];
				state.pagination[key] = {totalPages: 1, currentPage: 1};
				state.loading[key] = false;
				state.error[key] = error;
			});
	},
});

export const {setProduct} = productsSlice.actions;
export default productsSlice.reducer;
