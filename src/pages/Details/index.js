import React from "react";
import { useParams } from "react-router-dom";
import { DeliveryInformation } from "../../components";
import { useFetch } from "../../hooks/useFetch";

function Index(props) {
  let params = useParams();
  const { loading, data, error } = useFetch(`/deliveries/${params.id}`);
  return (
    <div className="container flex-grow-1  ">
      <DeliveryInformation delivery={data} loading={loading} />{" "}
      {/*The Delivery Information Component*/}
    </div>
  );
}

export default Index;
