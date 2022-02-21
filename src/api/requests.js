/******* Export the common API requests ********/
import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const pushDeliveryUpdates = (id, data) => {
  return axios.put(`${BASE_URL}/deliveries/${id}`, data);
};
