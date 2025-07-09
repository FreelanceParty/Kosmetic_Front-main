import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5000/api";

export const fetchBrands = createAsyncThunk(
	"brands/fetchBrands",
	async (_, {rejectWithValue}) => {
		try {
			const {data} = await axios.get("/brands");
			return data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || "Помилка завантаження брендів"
			);
		}
	}
);
