/******* Provides the Redux Slice,Reducer,Actions, and State for the Active Delivery ********/

import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../persistence/localStorage";

const initialState = Object.values({ ...loadState()?.delivery?.value }).length
  ? { ...loadState()?.delivery?.value }
  : { active: null };

export const current_delivery_slice = createSlice({
  name: "current_delivery",
  initialState: { value: initialState },
  reducers: {
    setCurrentDelivery: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setCurrentDelivery } = current_delivery_slice.actions;
export default current_delivery_slice.reducer;
