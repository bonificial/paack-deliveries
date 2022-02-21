import React, { useState } from "react";
import styles from "./style.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentDelivery, setDeliveriesListing } from "../../redux";
import { pushDeliveryUpdates } from "../../api";

const cx = classNames.bind(styles);

function DeliveryInformation({ delivery, loading }) {
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(loading); // is the delivery information being fetched ?

  const activeDelivery = useSelector((state) => state.delivery.value).active; // Current Delivery
  const isIdle = delivery?.delivery?.status === "idle" || false; //Status of current delivery

  const changeDeliveryStatus = (isDelivered) => {
    //Update the status of the delivery accordingly
    let orderDelivery = {
      ...delivery.delivery,
      status: isDelivered ? "delivered" : "undelivered",
    };
    let updatedDeliveryInfo = {
      ...delivery,
      delivery: orderDelivery,
    };
    setProcessing(true);

    pushDeliveryUpdates(delivery.id, updatedDeliveryInfo) //Push delivery updates to server
      .then((response) => {
        alert("Delivery Info Updated.");

        dispatch(setCurrentDelivery({ active: null })); //Set Active Delivery to Null Once Delivery Status is changed
        dispatch(setDeliveriesListing({})); //Clear Current Deliveries to Force a Fresh API request for updated Content
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error Updating", err);
      })
      .finally(() => {
        setProcessing(false); //Disable processing Indicator
      });
  };
  return (
    <div className="row justify-content-center root">
      <h1 className={"sticky-title text-center"}>
        {loading && ".. Fetching "}Delivery Information{" "}
      </h1>
      <h5 className={"sticky-title text-center"}>
        {processing && "Please wait .."}
      </h5>
      <div className="col-md-10">
        <div className={"card justify-content-center"}>
          {delivery && (
            <div className="card-body ">
              <div className={"card-header"}>
                <div className={"delivery_meta text-center"}>
                  <h5 className="card-title text-center">
                    Client: {delivery.client}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted text-center">
                    {delivery.customer.address},{delivery.customer.city}
                  </h6>
                  <div
                    className={`indicator ${delivery.delivery.status}`}
                  ></div>
                  <span
                    data-test-id={"delivery_status"}
                    className={"text-capitalize"}
                  >
                    {delivery.delivery.status}
                  </span>{" "}
                  &nbsp;
                  <span>{activeDelivery && <>Current Active Delivery</>}</span>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <h6 className="card-text mt-4"> Customer Details </h6>
                  <p>Name: {delivery.customer.name}</p>
                  <p>Address: {delivery.customer.address}</p>
                  <p>City: {delivery.customer.city}</p>
                  <p>Zip: {delivery.customer.zipCode}</p>

                  <p>
                    Cordinates (Lat,Lng): {delivery.customer.latitude},
                    {delivery.customer.longitude}
                  </p>
                </div>
                <div className="col-md-4">
                  <h6 className="card-text mt-4"> Delivery Info </h6>
                  <p>Delivery ID: {delivery.id}</p>
                  <p>Status: {delivery.delivery.status}</p>
                  <p>
                    Cordinates (Lat,Lng): {delivery.delivery.latitude},
                    {delivery.delivery.longitude}
                  </p>
                </div>
              </div>
              <div
                className={"card-footer text-center d-flex justify-content-end"}
              >
                <div className="flex-grow-1 ">
                  <button
                    data-testid={"mark-active"}
                    title={"Only one delivery can be active at a time!"}
                    disabled={activeDelivery || !isIdle}
                    className={`btn flex-grow-1 ${
                      !activeDelivery || delivery.delivery.status !== "idle"
                        ? "btn-primary"
                        : " btn-secondary"
                    }`}
                    onClick={() => {
                      dispatch(setCurrentDelivery({ active: delivery.id }));
                    }}
                  >
                    Mark Active
                  </button>
                </div>
                <div
                  className={` flex-grow-1 justify-content-around  ${
                    activeDelivery === delivery.id ? "d-flex" : "d-none"
                  }`}
                >
                  <button
                    data-testid={"mark-delivered"}
                    className={"btn btn-success mx-3"}
                    onClick={() => changeDeliveryStatus(true)}
                  >
                    Mark Delivered
                  </button>

                  <button
                    data-testid={"mark-undelivered"}
                    className={"btn btn-warning mx-3"}
                    onClick={() => changeDeliveryStatus(false)}
                  >
                    Mark Undelivered
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeliveryInformation;
