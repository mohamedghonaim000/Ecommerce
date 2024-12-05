import React from 'react'
import mainImg from '../src/assets/slider-image-1.jpeg'
import img2 from '../src/assets/slider-image-2.jpeg'
import img3 from '../src/assets/slider-image-3.jpeg'
import Slider from 'react-slick'
export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed:1500,
        arrows:false
        
      };
  return (
    <div className='row'>
        <div className="col-md-8">
            <Slider {...settings}>
                <img src={mainImg} className='top-slider' alt="" />
                <img src={img2} className='top-slider' alt="" />
                <img src={img3} className='top-slider' alt="" />
            </Slider>
        </div>
        <div className="col-md-4">
        <img src={img2} className='w-100 bottom-slider' alt="" />
        <img src={img3} className='w-100 bottom-slider' alt="" />

        </div>
    </div>
  )
}
