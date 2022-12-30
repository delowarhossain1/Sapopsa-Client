import React from 'react';
import logo from "../../../../images/1.png";
import img2 from '../../../../images/2.jpg'

const Arrivals = () => {
    return (
        <div>
            <div className="design-cats">
                {/* <!-- FIND YOUR THING --> */}
                <div style={{ width: '100%', margin: '0 auto', overflowX: 'auto' }}>
                    <div className="body-menu">
                        <div className="body-menu-item">
                            <div className="new">
                                <a className="noStyle" href="#">
                                    <img src={logo} alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="body-menu-item">
                            <a className="noStyleLink" href="#">MENS</a>
                        </div>
                        <div className="body-menu-item">
                            <a className="noStyleLink" href="#">Women</a>
                        </div>
                        <div className="body-menu-item">
                            <a className="noStyleLink" href="#">Sports</a>
                        </div>
                    </div>
                </div>
            </div>




            <div className="container">
                <div className="newArrivals">
                    <hr/>
                        <div style={{width: '100%', margin: '0 auto', overflowX: 'auto'}}>
                            <div className="btnWrap">
                                <div className="btnDiv">
                                    <button className="btn">New Arrivals</button>
                                </div>
                                <div className="btnDiv">
                                    <button className="btn">WHAT'S TRENDING</button>
                                </div>
                                <div className="btnDiv">
                                    <button className="btn">MAMBER EXCLUSIVES</button>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        </div>
                        <div className="row">
                            <div className="col2">
                                <div className="CartImg">
                                    <a href="#"> <img src={img2} alt=""/></a>
                                    <div className="prices">$98</div>
                                </div>
                                <div className="ProDatils">
                                    <p className="productName">Beckenbauer Track Jacket</p>
                                    <p className="productStatus">Men's Originals</p>
                                    <p className="productStatus">early access black friday</p>
                                </div>
                            </div>

                            <div className="col2">
                                <div className="CartImg">
                                    <a href="#"> <img src={img2} alt=""/></a>
                                    <div className="prices">$98</div>
                                </div>
                                <div className="ProDatils">
                                    <p className="productName">Beckenbauer Track Jacket</p>
                                    <p className="productStatus">Men's Originals</p>
                                    <p className="productStatus">early access black friday</p>
                                </div>
                            </div>


                        </div>
                </div>
            </div>
            );
};

            export default Arrivals;