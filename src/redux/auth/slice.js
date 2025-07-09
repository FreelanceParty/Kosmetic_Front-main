import {createSlice} from "@reduxjs/toolkit";

import {logIn, logOut, refreshUser, register} from "./operation";

const initialState = {
	firstName:    null,
	lastName:     null,
	email:        null,
	number:       null,
	token:        null,
	isLoggedIn:   false,
	isRefreshing: false,
	isRegister:   false,
	isAdmin:      false,
	optUser:      false,
	id:           null,
	error:        null,
	loading:      false,
};
const authSlice = createSlice({
	name:          "auth",
	initialState,
	reducers:      {},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.error = null;
				state.loading = true;
			})
			.addCase(logIn.pending, (state) => {
				state.error = null;
				state.loading = true;
			})
			.addCase(logOut.pending, (state) => {
				state.error = null;
				state.loading = true;
			})
			.addCase(refreshUser.pending, (state) => {
				state.isRefreshing = true;
				state.error = null;
				state.loading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.firstName = action.payload.firstName;
				state.lastName = action.payload.lastName;
				state.email = action.payload.email;
				state.number = action.payload.number;
				state.id = action.payload.id;
				state.token = action.payload.token;
				state.isRefreshing = false;
				state.isRegister = true;
				state.isLoggedIn = true;
				state.isAdmin = action.payload.isAdmin;
				state.optUser = action.payload.optUser;
			})
			.addCase(logIn.fulfilled, (state, action) => {
				state.firstName = action.payload.firstName;
				state.lastName = action.payload.lastName;
				state.email = action.payload.email;
				state.number = action.payload.number;
				state.id = action.payload.id;
				state.token = action.payload.token;
				state.isRegister = true;
				state.isLoggedIn = true;
				state.isAdmin = action.payload.isAdmin;
				state.optUser = action.payload.optUser;
			})
			.addCase(logOut.fulfilled, (state) => {
				state = initialState;
			})
			.addCase(refreshUser.fulfilled, (state, action) => {
				state.firstName = action.payload.firstName;
				state.lastName = action.payload.lastName;
				state.email = action.payload.email;
				state.number = action.payload.number;
				state.id = action.payload.id;
				state.token = action.payload.token;
				state.isRefreshing = false;
				state.isRegister = true;
				state.isLoggedIn = true;
				state.isAdmin = action.payload.isAdmin;
				state.optUser = action.payload.optUser;
			})
			.addCase(register.rejected, (state, action) => {
				state.error = action.payload.error;
				state.loading = false;
			})
			.addCase(logIn.rejected, (state, action) => {
				state.error = action.payload.error;
				state.loading = false;
			})
			.addCase(logOut.rejected, (state, action) => {
				state.error = action.payload.error;
				state.loading = false;
			})
			.addCase(refreshUser.rejected, (state, action) => {
				state = initialState;
				state.error = action.payload.error;
				state.loading = false;
			});
	},
});

export const {setAuth} = authSlice.actions;
export const authReducer = authSlice.reducer;
