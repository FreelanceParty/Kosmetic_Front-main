import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const token = {
	set(token) {
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	},
	unset() {
		axios.defaults.headers.common.Authorization = "";
	},
};

export const register = createAsyncThunk(
	"auth/register",
	async (credentials, thunkAPI) => {
		try {
			const {data} = await axios.post("http://localhost:3002/api/auth/register", credentials);
			return data;
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const logIn = createAsyncThunk(
	"auth/login",
	async (credentials, thunkAPI) => {
		try {
			const {data} = await axios.post("http://localhost:3002/api/auth/login", credentials);
			token.set(data.token);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const logOut = createAsyncThunk(
	"auth/logout",
	async (_, {rejectWithValue}) => {
		try {
			await axios.post("http://localhost:3002/api/auth/logout");
			token.unset();
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data?.message || "Server error");
			}
			return rejectWithValue("Server error");
		}
	}
);

export const refreshUser = createAsyncThunk(
	"auth/refreshUser",
	async (_, thunkAPI) => {
		const state = thunkAPI.getState();
		const persistedToken = state.auth.token;

		if (persistedToken === null) {
			return thunkAPI.rejectWithValue("Unable to fetch user");
		}

		try {
			const {data} = await axios.get("http://localhost:3002/api/auth/current", {
				headers: {
					Authorization: `Bearer ${persistedToken}`,
				},
			});
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);
