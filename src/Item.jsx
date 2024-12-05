import React from "react";
import { Link } from 'react-router-dom';

export default function Item({ prod }) {
  return (
    <div className="col-md-2">
      <div className="product p-2 cursor-pointer">
        <Link to={`/ProductDetails/${prod?._id}/${prod?.category?._id}`}>
          <img src={prod?.imageCover} className="w-100" alt="" />
          <p className="text-success">{prod?.category?.name}</p>
          <p className="line-clamp  ">{prod.title}</p>
          <div className="d-flex justify-content-between my-2">
            <p>{prod.price} EGP</p>
            <p>
              <i className="fas fa-star text-warning"></i>
              {prod.ratingsAverage}
            </p>
          </div>
        </Link>
        <button className="btn bg-success text-white rounded-2">
          Add to cart
        </button>
      </div>
    </div>
  );
}
