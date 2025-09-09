import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export const fetchBrands = createAsyncThunk(
	"brands/fetchBrands",
	async (_, {rejectWithValue}) => {
		try {
			const {data} = await axios.get(`${REACT_APP_API_URL}/brands`);
			return data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || "Помилка завантаження брендів"
			);
		}
	}
);
