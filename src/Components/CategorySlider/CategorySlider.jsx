{
  /*

  == we install "slick-carousel/slick/slick.css" and "slick-carousel/slick/slick-theme.css" and make import for them in 'main.jsx' and imprt Slider here

== don't forget to write Slider tag below inside return

*/
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay: true,
  };

  // ---------------------------------------------------------------

  let [categories, setCategories] = useState([]);

  function getCategory() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <div className="px-20 mb-10 md:block hidden">
        <h2 className="py-2 text-xl text-gray-800 font-medium">
          Shop Popular Categories{" "}
        </h2>
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category.name}>
              <img
                src={category.image}
                className="category-img w-full"
                alt={category.name}
              />
              <h3 className="font-light mt-2 "> {category.name} </h3>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
