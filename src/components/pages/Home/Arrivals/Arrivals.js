import React from 'react';
import logo from "../../../../images/1.png";
import img2 from '../../../../images/2.jpg'

const Arrivals = () => {
    return (
        <div>
            <div class="design-cats">
                {/* <!-- FIND YOUR THING --> */}
                <div style={{ width: '100%', margin: '0 auto', overflowX: 'auto' }}>
                    <div class="body-menu">
                        <div class="body-menu-item">
                            <div class="new">
                                <a class="noStyle" href="#">
                                    <img src={logo} alt="" />
                                </a>
                            </div>
                        </div>
                        <div class="body-menu-item">
                            <a class="noStyleLink" href="#">MENS</a>
                        </div>
                        <div class="body-menu-item">
                            <a class="noStyleLink" href="#">Women</a>
                        </div>
                        <div class="body-menu-item">
                            <a class="noStyleLink" href="#">Sports</a>
                        </div>
                    </div>
                </div>
            </div>




            <div class="container">
                <div class="newArrivals">
                    <hr/>
                        <div style={{width: '100%', margin: '0 auto', overflowX: 'auto'}}>
                            <div class="btnWrap">
                                <div class="btnDiv">
                                    <button class="btn">New Arrivals</button>
                                </div>
                                <div class="btnDiv">
                                    <button class="btn">WHAT'S TRENDING</button>
                                </div>
                                <div class="btnDiv">
                                    <button class="btn">MAMBER EXCLUSIVES</button>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        </div>
                        <div class="row">
                            <div class="col2">
                                <div class="CartImg">
                                    <a href="#"> <img src={img2} alt=""/></a>
                                    <div class="prices">$98</div>
                                </div>
                                <div class="ProDatils">
                                    <p class="productName">Beckenbauer Track Jacket</p>
                                    <p class="productStatus">Men's Originals</p>
                                    <p class="productStatus">early access black friday</p>
                                </div>
                            </div>

                            <div class="col2">
                                <div class="CartImg">
                                    <a href="#"> <img src={img2} alt=""/></a>
                                    <div class="prices">$98</div>
                                </div>
                                <div class="ProDatils">
                                    <p class="productName">Beckenbauer Track Jacket</p>
                                    <p class="productStatus">Men's Originals</p>
                                    <p class="productStatus">early access black friday</p>
                                </div>
                            </div>


                        </div>
                </div>
            </div>
            );
};

            export default Arrivals;