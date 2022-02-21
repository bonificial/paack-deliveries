import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./style.scss";
import { filterFromArray } from "../../utils";

const cx = classNames.bind(styles);

function Index(props) {
  const activeDelivery = useSelector((state) => state.delivery.value).active; //Get The Current Active Delivery
  let deliveries = useSelector((state) => state.deliveries.value); //Get All Deliverries
  let activeDeliveryInfo = filterFromArray(deliveries, "id", activeDelivery)[0]; //Fetch the current delivery information from all deliveries

  return (
    <>
      {activeDelivery &&
        activeDeliveryInfo && ( // Show current active Delivery information
          <div className={"d-flex flex-column align-items-start py-3"}>
            <h4
              className={`text-muted delivery ${
                activeDelivery && "in-progress"
              }`}
            >
              Active Delivery :{" "}
              {activeDelivery && activeDelivery ? activeDelivery : "None"}
            </h4>
            <p className={"smaller-text"}>
              Delivering to {activeDeliveryInfo.client}
            </p>
            <p className={"smaller-text"}>
              Location: {activeDeliveryInfo.customer.address},{" "}
              {activeDeliveryInfo.customer.city}
            </p>
          </div>
        )}
    </>
  );
}

export default Index;
