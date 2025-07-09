// import { createSlice } from "@reduxjs/toolkit";

// import { fetchSearchResults } from "./operation";

// const searchSlice = createSlice({
//   name: "search",
//   initialState: {
//     items: [],
//     pagination: { currentPage: 1, totalPages: 1 },
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSearchResults.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSearchResults.fulfilled, (state, action) => {
//         state.loading = false;
//         console.log(action.payload);
//         state.items = action.payload.products;
//         console.log(action.payload);
//         state.pagination.currentPage = action.payload.currentPage;
//         state.pagination.totalPages = action.payload.totalPages;
//         console.log(state.pagination);
//       })
//       .addCase(fetchSearchResults.rejected, (state, action) => {
//         state.items = [];
//         state.pagination = { currentPage: 1, totalPages: 1 };
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { setSearch } = searchSlice.actions;
// export default searchSlice.reducer;
