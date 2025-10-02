import {configureStore} from "@reduxjs/toolkit";

import productsReducer from "./products/productsSlice";
import searchReducer from "./search/searchSlice";
import filterSlice from "./filter/slice";
import brandsReducer from "./brands/brandsSlice";
import cartReducer from "./cart/slice";
import {authReducer} from "./auth/slice";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
	auth:     authReducer,
	products: productsReducer,
	search:   searchReducer,
	filter:   filterSlice,
	cart:     cartReducer,
	brands:   brandsReducer,
});

const persistConfig = {
	key:       'root',
	storage,
	whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer:    persistedReducer,
	middleware: (getDefaultMiddleware) =>
		            getDefaultMiddleware({
			            serializableCheck: {
				            ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
			            },
		            }),
});

export const persistor = persistStore(store);
export default store;
