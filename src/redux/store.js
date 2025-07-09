import {configureStore} from "@reduxjs/toolkit";

import productsReducer from "./products/productsSlice";
import searchReducer from "./search/searchSlice";
import filterSlice from "./filter/slice";
import brandsReducer from "./brands/brandsSlice";

const store = configureStore({
	reducer: {
		products: productsReducer,
		search:   searchReducer,
		filter:   filterSlice,
		brands:   brandsReducer,
	},
});

export default store;
