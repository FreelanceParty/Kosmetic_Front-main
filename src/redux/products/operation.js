import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.baseURL = "https://kosmetic-back.onrender.com/api";

const getKey = (params) => JSON.stringify(params);

export const fetchProducts = createAsyncThunk(
	"products/fetchProducts",
	async (params, {rejectWithValue}) => {
		try {
			const {data} = await axios.get("/products", {params});
			return {key: getKey(params), data}; // Додаємо ключ
		} catch (error) {
			return rejectWithValue({key: getKey(params), error: error.message});
		}
	}
);
export const getProductById = createAsyncThunk(
	"products/getProductById",
	async (id, {rejectWithValue}) => {
		try {
			const {data} = await axios.get(`/products/${id}`);
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const addProduct = createAsyncThunk(
	"products/addProduct",
	async (product, {rejectWithValue}) => {
		try {
			const {data} = await axios.post("/products", product);
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const updateProduct = createAsyncThunk(
	"products/updateProduct",
	async (product, {rejectWithValue}) => {
		try {
			const {data} = await axios.put(`/products/${product.id}`, product);
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const deleteProduct = createAsyncThunk(
	"products/deleteProduct",
	async (id, {rejectWithValue}) => {
		try {
			const {data} = await axios.delete(`/products/${id}`);
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const fetchSearchResults = createAsyncThunk(
	"search/fetchSearchResults",
	async (params, {rejectWithValue}) => {
		try {
			const {data} = await axios.get("/products/search", {
				params,
			});
			return {key: getKey(params), data}; // Додаємо ключ
			// return data;
		} catch (error) {
			return rejectWithValue({key: getKey(params), error: error.message});
		}
	}
);
