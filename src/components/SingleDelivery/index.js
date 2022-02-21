import React from "react";
import styles from "./style.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function SingleDeliveryListItem({ delivery }) {
  //List item for the deliveries listing
  return (
    <div
      data-id={delivery.id}
      data-status={`${
        delivery.delivery.status === "delivered"
          ? "delivery_is_done"
          : delivery.delivery.status === "undelivered"
          ? "delivery_not_done"
          : "delivery_is_idle"
      }`}
      className={` root single-delivery-list-item d-flex justify-content-between align-items-center mb-2 flex-grow-1`}
    >
      <Link
        style={{
          textDecoration: "none",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        to={`/details/${delivery.id}`}
        key={delivery.id}
      >
        <div className={`indicator ${delivery.delivery.status}`}>&nbsp;</div>
        {/*//Status of the Delivery*/}
        <div className={"d-flex flex-column flex-grow-1"}>
          <span> {delivery.client} </span> {/*//Name of the client  */}
          <span className={"smaller-text"}>
            {delivery.customer.address},{delivery.customer.city}{" "}
            {/*Address of the Customer*/}
          </span>
        </div>
        <span>➧</span>
      </Link>
    </div>
  );
}

export default SingleDeliveryListItem;
