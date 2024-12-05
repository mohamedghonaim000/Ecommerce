import React, { useEffect, useState } from 'react'
import { getProducts } from './APIS/getProducts'
import Loading from './Loading';
import Item from './Item';

export default function FeturedProducts({arr}) {
  useEffect(()=>{arr},[arr])
  let [ProductsArr , setProductsArr]=useState([])
  let [loading , setloading]=useState(false)
  let [Msg , setMsg]=useState('')


  async function getProductsApi(){
    setloading(true)
    let data = await getProducts()
    console.log(data?.data);

        if(data?.data){
          
          setProductsArr(data?.data)
          setloading(false)
          setMsg('')
        }
        else
        {
          setMsg(data)
          setloading(false)
        }    
  }

  useEffect(()=>{
    getProductsApi()
  },[])

  if (loading) {
    return <Loading></Loading>;
  }
  if (Msg) {
    return <h2 className='text-warning my-4' >{Msg}</h2>;
  }



  return (
    <div className="row">
      {arr?.length>0?arr.map(prod=><Item key={prod._id} prod={prod}></Item>):ProductsArr.map(prod=><Item key={prod._id} prod={prod}></Item>)}
    </div>
  )
}