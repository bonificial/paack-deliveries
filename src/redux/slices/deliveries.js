/******* Provides the Redux Slice,Reducer,Actions, and State for the Deliveries Listing ********/

import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../persistence/localStorage";

const initialState = { ...loadState()?.deliveries?.value } || {};

export const deliveries_listing_slice = createSlice({
  name: "deliveries_listing",
  initialState: { value: initialState },
  reducers: {
    setDeliveriesListing: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setDeliveriesListing } = deliveries_listing_slice.actions;
export default deliveries_listing_slice.reducer;
