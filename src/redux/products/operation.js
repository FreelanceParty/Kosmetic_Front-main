import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const getKey = (params) => JSON.stringify(params);

export const fetchProducts = createAsyncThunk(
	"products/fetchProducts",
	async (params, {rejectWithValue}) => {
		try {
			const {data} = await axios.get(`${REACT_APP_API_URL}/goods`, {params});
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
			const {data} = await axios.get(`${REACT_APP_API_URL}/goods/${id}`);
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
			const {data} = await axios.post(`${REACT_APP_API_URL}/goods`, product);
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
			const {data} = await axios.put(`${REACT_APP_API_URL}/goods/${product.id}`, product);
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
			const {data} = await axios.delete(`${REACT_APP_API_URL}/goods/${id}`);
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
			const {data} = await axios.get(`${REACT_APP_API_URL}/goods/search`, {
				params,
			});
			return {key: getKey(params), data}; // Додаємо ключ
			// return data;
		} catch (error) {
			return rejectWithValue({key: getKey(params), error: error.message});
		}
	}
);
