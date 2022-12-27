import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const Slider = () => {
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
                <SwiperSlide>
                    <img src='https://icms-image.slatic.net/images/ims-web/a3fcc2d3-83f1-461e-96b6-03167a629cb8.jpg' />
                </SwiperSlide>

                <SwiperSlide><img src="https://icms-image.slatic.net/images/ims-web/c6b67328-9d5c-4e87-b4a0-90775f4d755b.jpg" alt="" /></SwiperSlide>

                <SwiperSlide><img src="https://icms-image.slatic.net/images/ims-web/95847e2d-7548-4ec9-9a8a-5c49c0f7e23b.jpg" alt="" /></SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Slider;