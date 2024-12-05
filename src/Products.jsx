import React, { useEffect } from "react";
import FeturedProducts from "./FeturedProducts";
import Loading from "./Loading";
import { getCategoris } from "./APIS/getCategoris";
import { useState } from "react";
import { getProductsCategoryId } from "./APIS/getProducts";

export default function Products() {
  let[licategory, setlicategory]=useState([])
  let [ProductsCat, setProductsCat] = useState([]);
  let [loading, setloading] = useState(false);
  let [Msg, setMsg] = useState("");

  async function getcategorisApi() {
    setloading(true);
    let data = await getCategoris();
    console.log(data?.data);

    if (data?.data) {
      setProductsCat(data?.data);
      setloading(false);
      setMsg("");
    } else {
      setMsg(data);
      setloading(false);
    }
  }

  useEffect(() => {
    getcategorisApi();
  }, []);

  async function getData(id){
    
    let data= await getProductsCategoryId(id)
    console.log(data.data);
    
    if (data?.data) {
      setlicategory(data?.data);
      setloading(false);
      setMsg("");
    } else {
      setMsg(data);
      setloading(false);
    }
  }
  

  if (loading) {
    return <Loading></Loading>;
  }
  if (Msg) {
    return <h2 className="text-warning my-4">{Msg}</h2>;
  }
  return (
    <div className="row">
      <div className="col-md-2">
        <ul className="list-unstyled">
          {ProductsCat.map((prod) => (
            <li  className="py-2 cursor-pointer " key={prod._id} onClick={()=>getData(prod._id)}>{prod.name}</li>
          ))}
        </ul>
      </div>
      <div className="col-md-10">
        <FeturedProducts arr={licategory}></FeturedProducts>
      </div>
    </div>
  );
}
