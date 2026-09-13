import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser, switchCabinet, addCabinet } from "./operation";

const initialState = {
	firstName: null,
	lastName: null,
	email: null,
	number: null,
	token: null,
	isLoggedIn: false,
	isRefreshing: false,
	isRegister: false,
	isAdmin: false,
	optUser: false,
	dropUser: false,
	ownedCabinets: [],
	activeCabinet: null,
	city: null,
	link: null,
	onlineShop: false,
	offlineShop: false,
	socialMedia: false,
	_id: null,
};

// optUser/dropUser mirror the ACTIVE cabinet so the existing price selectors keep
// working; ownedCabinets/activeCabinet drive the switcher. The shared cabinet
// details (city/link/shop type) prefill the "add cabinet" form.
const applyCabinetState = (state, payload) => {
	state.optUser = payload.optUser;
	state.dropUser = payload.dropUser;
	state.ownedCabinets = payload.ownedCabinets ?? state.ownedCabinets;
	state.activeCabinet = payload.activeCabinet ?? state.activeCabinet;
	if (payload.city !== undefined) state.city = payload.city;
	if (payload.link !== undefined) state.link = payload.link;
	if (payload.onlineShop !== undefined) state.onlineShop = payload.onlineShop;
	if (payload.offlineShop !== undefined) state.offlineShop = payload.offlineShop;
	if (payload.socialMedia !== undefined) state.socialMedia = payload.socialMedia;
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(register.pending, (state, action) => state)
			.addCase(register.fulfilled, (state, action) => {
				state.firstName = action.payload.firstName;
				state.lastName = action.payload.lastName;
				state.email = action.payload.email;
				state.number = action.payload.number;
				state.isAdmin = action.payload.isAdmin;
				applyCabinetState(state, action.payload);
				state._id = action.payload._id;
				state.isLoggedIn = true;
				state.isRegister = true;
				state.token = action.payload.token;
			})
			.addCase(logIn.fulfilled, (state, action) => {
				state.firstName = action.payload.firstName;
				state.lastName = action.payload.lastName;
				state.email = action.payload.email;
				state.number = action.payload.number;
				state.isAdmin = action.payload.isAdmin;
				applyCabinetState(state, action.payload);
				state._id = action.payload._id;
				state.isLoggedIn = true;
				state.isRegister = true;
				state.token = action.payload.token;
			})
			.addCase(switchCabinet.fulfilled, (state, action) => {
				applyCabinetState(state, action.payload);
			})
			.addCase(addCabinet.fulfilled, (state, action) => {
				applyCabinetState(state, action.payload);
			})
			.addCase(register.rejected, (state, action) => state)
			.addCase(logIn.pending, (state, action) => state)
			.addCase(logOut.fulfilled, (state) => {
				state.firstName = null;
				state.lastName = null;
				state.email = null;
				state.number = null;
				state.token = null;
				state.isAdmin = false;
				state.isLoggedIn = false;
				state.isRegister = false;
				state.optUser = false;
				state.dropUser = false;
				state.ownedCabinets = [];
				state.activeCabinet = null;
				state.city = null;
				state.link = null;
				state.onlineShop = false;
				state.offlineShop = false;
				state.socialMedia = false;
				state._id = null;
			})
			.addCase(refreshUser.pending, (state, action) => {
				state.isRefreshing = true;
			})
			.addCase(refreshUser.fulfilled, (state, action) => {
				state.firstName = action.payload.firstName;
				state.lastName = action.payload.lastName;
				state.number = action.payload.number;
				state.email = action.payload.email;
				state.isAdmin = action.payload.isAdmin;
				applyCabinetState(state, action.payload);
				state._id = action.payload._id;
				state.isLoggedIn = true;
				state.isRegister = true;
				state.isRefreshing = false;
			})
			.addCase(refreshUser.rejected, (state, action) => {
				const status = action.payload?.status;
				if (status === 401 || status === 403) {
					state.firstName = null;
					state.lastName = null;
					state.number = null;
					state.email = null;
					state.isAdmin = false;
					state.optUser = false;
					state.dropUser = false;
					state.ownedCabinets = [];
					state.activeCabinet = null;
					state.city = null;
					state.link = null;
					state.onlineShop = false;
					state.offlineShop = false;
					state.socialMedia = false;
					state._id = null;
					state.token = null;
					state.isLoggedIn = false;
				}
				state.isRefreshing = false;
			}),
});

export const authReducer = authSlice.reducer;
