import {createSlice} from "@reduxjs/toolkit";

import {fetchBrands} from "./operation";

const brandsSlice = createSlice({
	name:          "brands",
	initialState:  {
		items:   [],
		error:   null,
		loading: false,
	},
	reducers:      {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBrands.pending, (state) => {
				state.error = null;
				state.loading = true;
			})
			.addCase(fetchBrands.fulfilled, (state, action) => {
				state.items = action.payload;
				state.loading = false;
			})
			.addCase(fetchBrands.rejected, (state, action) => {
				state.error = action.payload.error;
				state.loading = false;
			});
	},
});

export const {setBrand} = brandsSlice.actions;
export default brandsSlice.reducer;
