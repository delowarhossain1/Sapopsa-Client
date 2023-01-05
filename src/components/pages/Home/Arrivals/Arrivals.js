import React, { useEffect, useState } from 'react';
import logo from "../../../../images/1.png";
import { useNavigate } from 'react-router-dom';
import LatestProductCard from './LatestProductCard';

const Arrivals = () => {
    const navigate = useNavigate();
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/latest-products')
            .then(res => res.json())
            .then(res => setLatestProducts(res));
    }, []);

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

                        <div className="body-menu-item" onClick={() => navigate('/men')}>
                            <span className="noStyleLink">MENS</span>
                        </div>

                        <div className="body-menu-item" onClick={() => navigate('/women')}>
                            <span className="noStyleLink" >Women</span>
                        </div>

                        <div className="body-menu-item" onClick={() => navigate('/sports')}>
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