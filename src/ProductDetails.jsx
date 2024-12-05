import React from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { useState } from "react";
import { useEffect } from "react";
import { getSpecificProduct } from "./APIS/getspecificProduct";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from 'uuid';
import { getProductsCategoryId } from "./APIS/getProducts";
import Item from "./Item";


export default function ProductDetails() {
  let { id ,CategoryId } = useParams();
  let [imagesrc, setimagesrc] = useState("");
  let [Products, setProducts] = useState([]);
  let [relatedProducts, setrelatedProducts] = useState([]);
  let [loading, setloading] = useState(false);
  let [Msg, setMsg] = useState("");

  async function getspecificProductApi() {
    let { data } = await getSpecificProduct(id);
    console.log(data);

    if (data) {
      setProducts(data);
      setloading(false);
      setMsg("");
    } else {
      setMsg(data);
      setloading(false);
    }
  }
  ///////////////////////// related products
  async function getProductsCategoryIdApi() {
    let { data } = await getProductsCategoryId(CategoryId);
    console.log(data);

    if (data) {
      setrelatedProducts(data);
      setloading(false);
      setMsg("");
    } else {
      setMsg(data);
      setloading(false);
    }
  }


  function changesrc(e) {
    setimagesrc(e.target.src);
  }

  useEffect(() => {
    getProductsCategoryIdApi();
  }, []);


  useEffect(() => {
    getspecificProductApi();
  }, [id]);



  if (loading) {
    return <Loading></Loading>;
  }
  if (Msg) {
    return <h2 className="text-danger my-4">{Msg}</h2>;
  }

  return (
    <div className="row align-items-center">
      <div className="col-md-4">
        <img
          src={imagesrc ? imagesrc : Products.imageCover}
          className="w-100"
          alt=""
        />
        <ul className="d-flex products list-unstyled p-0 m-0">
          {Products?.images?.map((img) => (
                <li key={uuidv4()} >
              <motion.img
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                src={img}
                onClick={changesrc}
                className="w-75 cursor-pointer"
                alt=""
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="col-md-8 ">
        <p className="line-clamp  text-success">{Products.title}</p>
        <p className="line-clamp  ">{Products.description}</p>

        <p className="text-success">{Products?.category?.name}</p>
        <div className="d-flex justify-content-between my-2">
          <p>{Products.price} EGP</p>
          <p>
            <i className="fas fa-star text-warning"></i>
            {Products.ratingsAverage}
          </p>
        </div>
        <button className="btn bg-success text-white w-100 rounded-2">
          Add to cart
        </button>
      </div>
      <h2 className="text-success d-block pt-5">related products:</h2>
      {relatedProducts.map(prod=><Item key={prod._id} prod={prod}></Item>)}
    </div>
  );
}
