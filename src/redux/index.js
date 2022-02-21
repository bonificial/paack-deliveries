/******* Export all Redux Data Management Resources Required from a single entry point in this directory ********/

export { default as DeliveriesListingReducer } from "./slices/deliveries";
export { default as DeliveryInfoReducer } from "./slices/delivery";
export { default as FiltersReducer } from "./slices/filters";
export { default as globalStore } from "./store";
export { setDeliveriesListing } from "./slices/deliveries";
export { setCurrentDelivery } from "./slices/delivery";
export { setFilters } from "./slices/filters";
