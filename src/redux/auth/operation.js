import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export const token = {
	set(token) {
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
		localStorage.setItem("token", token);
	},
	unset() {
		delete axios.defaults.headers.common.Authorization;
		localStorage.removeItem("token");
	},
};

export const register = createAsyncThunk(
	"auth/register",
	async (credentials, thunkAPI) => {
		try {
			const {data} = await axios.post(`${REACT_APP_API_URL}/auth/register`, credentials);
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
			const {data} = await axios.post(`${REACT_APP_API_URL}/auth/login`, credentials);
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
			await axios.post(`${REACT_APP_API_URL}/auth/logout`);
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
			axios.defaults.headers.common.Authorization = `Bearer ${persistedToken}`;
			const {data} = await axios.get(`${REACT_APP_API_URL}/auth/current`);
			return data;
		} catch (error) {
			token.unset();
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);
