/******* Provides the Redux Slice,Reducer,Actions, and State for the Filters ********/

import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../persistence/localStorage";

const initialState = Object.values({ ...loadState()?.filters?.value }).length
  ? { ...loadState()?.filters?.value }
  : {
      show_u: true,
      show_d: true,
      show_i: true,
    }; ////show undelivered, delivered, idle
export const filters_slice = createSlice({
  name: "filters",
  initialState: { value: initialState },
  reducers: {
    setFilters: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setFilters } = filters_slice.actions;
export default filters_slice.reducer;
