// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5000/api";

// export const fetchSearchResults = createAsyncThunk(
//   "search/fetchSearchResults",
//   async (params, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get("/products/search", {
//         params,
//       });
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Помилка пошуку");
//     }
//   }
// );
