import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const Slider = () => {
    const [sliders, setSliders] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/sliders')
        .then(res => res.json())
        .then(res => setSliders(res));

    }, []);

    console.log(sliders);

    return (
        <div className='slider'>
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}

                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >

                {
                    sliders?.map(slider => (
                        <SwiperSlide><img src={slider?.img} alt="slider" /></SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    );
};

export default Slider;