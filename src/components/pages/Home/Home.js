import React from 'react';
import Loading from './../../shared/Loading/Loading';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from 'react-router-dom';
import LatestProductCard from './Arrivals/LatestProductCard';
import logo from "../../../images/1.png";


const Home = () => {
    const navigate = useNavigate();


    // Get Slider
    const { data: sliders, isLoading: slidersLoading } = useQuery('sliders', () => (
        axios.get('/api/sliders')
            .then(res => res?.data)
    ));

    // Get categories
    const { data: categories, isLoading: categoriesLoading } = useQuery('homepage-categories', () => (
        axios.get('/api/categories')
            .then(res => res?.data)
    ));

    // Get arrivals
    const { data: latestProducts, isLoading: latestProductLoading } = useQuery('latest-products', () => (
        axios.get('/api/latest-products')
            .then(res => res?.data)
    ));

    // Set loading status
    if(slidersLoading || categoriesLoading || latestProductLoading) {
        return <Loading />
    }
    
    return (

        <div>
            {/* Sliders */}
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


            {/* Categories */}

            <div>
                {/* <!-- home section end --> */}
                <div className="noImageTitle">
                    <h1>FIND YOUR COICE</h1>
                </div>

                <div className="container conTainer">
                    <div className="row">

                        {
                            categories?.map(category => (
                                <div
                                    className="col"
                                    style={{ border: '1px solid #ddd', borderRadius: "2px", cursor: 'pointer' }}
                                    onClick={() => navigate(`/category/${category?.route}`)}
                                    key={category?._id}
                                >

                                    <img src={category?.img} alt="category" />
                                    <div className="productBtn">
                                        <span>{category?.title}</span>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>


            {/* Arrivals */}

            <div>
            <div className="design-cats">
                {/* <!-- FIND YOUR THING --> */}
                <div style={{ width: '100%', margin: '0 auto', overflowX: 'auto' }}>
                    <div className="body-menu">
                        <div className="body-menu-item">
                            <div className="new">
                                <div className="noStyle">
                                    <img src={logo} alt="logo" />
                                </div>
                            </div>
                        </div>

                        <div className="body-menu-item" onClick={() => navigate('/product-for/male')}>
                            <span className="noStyleLink">MENS</span>
                        </div>

                        <div className="body-menu-item" onClick={() => navigate('/product-for/female')}>
                            <span className="noStyleLink" >Women</span>
                        </div>

                        <div className="body-menu-item" onClick={() => navigate('/product-for/sports')}>
                            <span className="noStyleLink" >Sports</span>
                        </div>
                    </div>
                </div>
            </div>




            <div className="container">
                <div className="newArrivals">

                    <div style={{ width: '100%', margin: '0 auto', overflowX: 'auto' }}>
                        <div className="btnWrap">
                            <div className="btnDiv">
                                <button className="btn">Latest product</button>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>

                <div className="row">
                    {
                        latestProducts?.map(product => (
                            <LatestProductCard
                                key={product._id}
                                product={product} />
                        ))
                    }

                </div>
            </div>
        </div>

        </div>
        // <>
        //    <Slider setLoading={setLoading}/>
        //    <Categories setLoading={setLoading}/> 
        //    <Arrivals setLoading={setLoading}/>
        // </>
    );
};

export default Home;