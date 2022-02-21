import React from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "./style.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Index(props) {
  const activeDelivery = useSelector((state) => state.delivery.value).active; //Get Current active  Delivery ID
  return (
    <Nav
      fill
      style={{
        position: "sticky",
        background: "#fff",
        zIndex: 9999,
        top: 0,
      }}
      variant="tabs"
      defaultActiveKey="/home"
    >
      <Nav.Item>
        <Nav.Link data-testid={"go_home"} className={"nav-link"} href="/">
          Home
        </Nav.Link>
      </Nav.Item>
      {activeDelivery && (
        <Nav.Item>
          <Nav.Link
            data-testid={"view_active_delivery"}
            className={"nav-link"}
            href={`/details/${activeDelivery}`} //Link to the details page for the current active delivery id
          >
            View Active Delivery Info
          </Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
}

export default Index;
