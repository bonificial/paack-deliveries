/******* Provides the Redux Store for all Redux Managed States; Also listens for store updates to synchronise with persisted localstorage values ********/

import { configureStore } from "@reduxjs/toolkit";
import {
  DeliveriesListingReducer,
  DeliveryInfoReducer,
  FiltersReducer,
} from "../index";
import { saveState } from "../persistence/localStorage";

const store = configureStore({
  reducer: {
    deliveries: DeliveriesListingReducer,
    delivery: DeliveryInfoReducer,
    filters: FiltersReducer,
  },
});
store.subscribe(() => {
  console.log("saving state", store.getState());
  saveState(store.getState());
});
export default store;
