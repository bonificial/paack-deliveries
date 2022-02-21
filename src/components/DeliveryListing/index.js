import React from "react";
import styles from "./style.scss";
import classNames from "classnames/bind";
import { useFetchDeliveries } from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { SingleDelivery } from "../index";
import { Form } from "react-bootstrap";
import { setFilters } from "../../redux";
import { filterFromArray } from "../../utils";

const cx = classNames.bind(styles);

function DeliveryListing() {
  /* Get status of deliveries, whether they are loading or not. Same function will store the deliveries listing in a redux state, where they will also be persisted in the localstorage */
  const { loading } = useFetchDeliveries("/deliveries");

  let deliveries = useSelector((state) => state.deliveries.value); // Get the deliveries from the redux store
  const dispatch = useDispatch(); //initialize a dispatcher
  let filters = useSelector((state) => state.filters.value); //get the available filters state

  //Filter the fetched deliveries as per the filters state above. The result will be output
  let filteredDeliveries = filterFromArray(
    deliveries,
    "status",
    [
      filters.show_d && "delivered",
      filters.show_u && "undelivered",
      filters.show_i && "idle",
    ],
    "delivery"
  );

  return (
    <div className={""}>
      <h1 className={"sticky-title"}>
        Paack Deliveries {loading && <span>loading</span>}{" "}
      </h1>
      <div className="row">
        <div className="col-md-4 offset-md-2">
          {!loading && (
            <div className="delivery-listing  ">
              {Object.keys(filteredDeliveries).length && //If there is at least 1 delivery after filtration
                Object.values(filteredDeliveries).map((delivery, key) => {
                  return <SingleDelivery key={key} delivery={delivery} />;
                })}
              {Object.keys(filteredDeliveries).length === 0 && ( //If there is no delivery after filtration
                <h5>No Delivery Available :: Recheck Filters</h5>
              )}
            </div>
          )}
        </div>
        <div className="col-md-4 offset-md-2">
          <div className="controlers-legend d-flex flex-column align-items-start position-absolute">
            <h5>Filter Delivery Statuses</h5>
            <div className={"d-flex align-items-center"}>
              <Form.Check
                inline
                data-testid={"check_enable_delivered"}
                type={"checkbox"}
                checked={filters.show_d}
                onChange={(e) => {
                  dispatch(
                    setFilters({ ...filters, show_d: e.target.checked }) //Set the filter for 'delivered'
                  );
                }}
              />
              <span className={`indicator delivered`}>&nbsp; </span>Showing
              "Delivered"
            </div>
            <div className={"d-flex align-items-center"}>
              <Form.Check
                inline
                data-testid={"check_enable_undelivered"}
                type={"checkbox"}
                checked={filters.show_u}
                onChange={(e) => {
                  dispatch(
                    setFilters({ ...filters, show_u: e.target.checked }) //Set the filter for 'undelivered'
                  );
                }}
              />
              <span className={`indicator undelivered`}>&nbsp; </span>
              Showing "Undelivered"
            </div>
            <div className={"d-flex align-items-center"}>
              <Form.Check
                data-testid={"check_enable_idle"}
                inline
                type={"checkbox"}
                checked={filters.show_i}
                onChange={(e) => {
                  dispatch(
                    setFilters({ ...filters, show_i: e.target.checked }) //Set the filter for 'idle'
                  );
                }}
              />
              <span className={`indicator idle`}>&nbsp; </span>Showing "Idle"
            </div>
            <p className={"pt-5"}>
              Click a Delivery from the Left to view its full details
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryListing;
