import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

export default function Brand() {
  function getBrand() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["getBrand"],
    queryFn: getBrand,
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="row">
      {data?.data?.data.map((ele) => (
        <div className="col-md-3" key={ele._id}>
          <div className="inner">
            <img src={ele?.image} className="w-100" alt="" />
            <p className="text-center">{ele.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
