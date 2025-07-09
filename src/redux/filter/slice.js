import {createSlice} from "@reduxjs/toolkit";

const filterSlice = createSlice({
	name:         "filter",
	initialState: localStorage.getItem("filter") || null,
	reducers:     {
		setFilter: (_, {payload}) => {
			localStorage.setItem("filter", payload);
			console.log(payload);

			return payload;
		},
	},
});

export const {setFilter} = filterSlice.actions;
export default filterSlice.reducer;
