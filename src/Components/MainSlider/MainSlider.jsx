{
  /*

  == we install "slick-carousel/slick/slick.css" and "slick-carousel/slick/slick-theme.css" and make import for them in 'main.jsx' and imprt Slider here

== don't forget to write Slider tag below inside return

*/
}

import React from "react";
import Slider from "react-slick";
import mainSliderFoto1 from "../../assets/images/slider-image-3.jpeg";
import mainSliderFoto2 from "../../assets/images/grocery-banner-2.jpeg";
import mainSliderFoto3 from "../../assets/images/grocery-banner.png";
import secoundSliderFoto1 from "../../assets/images/slider-image-1.jpeg";
import secoundSliderFoto2 from "../../assets/images/slider-image-2.jpeg";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return (
    <>
      <div className="row px-20 lg:pt-20">
        <div className="w-3/4">
          <Slider {...settings}>
            <img src={mainSliderFoto1} className="w-full h-[400px] " />
            <img src={mainSliderFoto2} className="w-full h-[400px] " />
            <img src={mainSliderFoto3} className="w-full h-[400px] " />
          </Slider>
        </div>
        <div className="w-1/4">
          <img src={secoundSliderFoto1} className="w-full h-[200px]" />
          <img src={secoundSliderFoto2} className="w-full h-[200px] " />
        </div>
      </div>
    </>
  );
}
