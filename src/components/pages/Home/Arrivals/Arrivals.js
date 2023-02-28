import React from 'react';
import logo from "../../../../images/1.png";
import { useNavigate } from 'react-router-dom';
import LatestProductCard from './LatestProductCard';
import { useQuery } from 'react-query';
import axios from 'axios';

const Arrivals = ({ setLoading }) => {
    const navigate = useNavigate();

    const { data: latestProducts, isLoading } = useQuery('latest-products', () => (
        axios.get('http://localhost:5000/latest-products')
            .then(res => res?.data)
    ));

    // Set loading
    if (isLoading) setLoading(true);

    return (
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
    );
};

export default Arrivals;