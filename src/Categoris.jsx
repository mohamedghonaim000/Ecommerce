import React from 'react'
import Loading from './Loading';
import { getCategoris } from './APIS/getCategoris';
import { useState } from 'react';
import { useEffect } from 'react';
import Slider from 'react-slick';

export default function Categoris() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed:1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
    let [ProductsCat , setProductsCat]=useState([])
    let [loading , setloading]=useState(false)
    let [Msg , setMsg]=useState('')
  
  
    async function getcategorisApi(){
      setloading(true)
      let data = await getCategoris()
      console.log(data?.data);
  
          if(data?.data){
            
            setProductsCat(data?.data)
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
      getcategorisApi()
    },[])
    useEffect(()=>{
      ProductsCat
    },[ProductsCat])
  
    if (loading) {
      return <Loading></Loading>;
    }
    if (Msg) {
      return <h2 className='text-warning my-4' >{Msg}</h2>;
    }
  return (
    <div className='my-3'>
      <Slider {...settings}>
      {ProductsCat.map(ele=><img key={ele._id} src={ele.image} className='img-fluid slider-image'></img>)}
      </Slider>
    </div>
  )
}
