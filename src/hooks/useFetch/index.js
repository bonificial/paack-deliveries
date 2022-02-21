import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDeliveriesListing } from "../../redux";
import { BASE_URL } from "../../api";

export function useFetchDeliveries(endpoint) {
  /* //Use fetch for the deliveries listing, separated from the general usefetch since this has extra
     housekeeping functions, among them updating the redux/persisted state*/

  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const deliveries = useSelector((state) => state.deliveries.value);

  useEffect(() => {
    if (!Object.keys(deliveries).length) {
      //If there are no deliveries  in redux state (or persisted localstorage), then load them from API
      (async function run() {
        setLoading(true); //Set Loading variable
        axios
          .get(`${BASE_URL}${endpoint}`)
          .then((response) => {
            setData(response.data);
            dispatch(setDeliveriesListing(response.data)); //push the loaded data to the redux state
          })
          .catch((err) => {
            setError(err);
          })
          .finally(() => {
            setLoading(false); //disable loading
          });
      })();
    } else {
      //If there are deliveries  in redux state (or persisted localstorage) ...
      setData(deliveries); // then set them as current data....
    }
  }, [endpoint]);
  return { loading, data, error };
}

export function useFetch(endpoint) {
  //Fetch from any endpint using axios
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async function run() {
      setLoading(true);

      axios
        .get(`${BASE_URL}${endpoint}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    })();
  }, [endpoint]);
  return { loading, data, error };
}
