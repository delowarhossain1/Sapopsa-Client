import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useQuery } from 'react-query';
import axios  from 'axios';

const Slider = ({setLoading}) => {

    const {data:sliders, isLoading} = useQuery('sliders', ()=>(
        axios.get('/api/sliders')
        .then(res => res?.data)
    ));

    // Set loading
    if(isLoading) setLoading(true);

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
                        <SwiperSlide
                         key={slider?._id}>
                            <img src={slider?.img} alt="slider" />
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    );
};

export default Slider;