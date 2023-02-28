import React from 'react';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import UserDashboardTitle from '../UserDashboardTitle/UserDashboardTitle';
import img from "../../../../../images/1.jpg";

const OrderDetails = () => {
    return (
        <div>
            <PageTitle title='Order details' />
            <UserDashboardTitle title='Order details' />

            <div>
                <div className="boxColor"> 
                    <div className="orderInfo">
                        <div className="orderOder">
                            <p>Order <a href="#">#1349502345820</a> </p>
                            <p className="orderDate">Placed on 14 Aug 2022 <span>17:27:15</span></p>
                        </div>
                        <div className="mnage">
                            <div className="p">
                                Total: $ <span>100</span>
                            </div>
                        </div>
                    </div>
                    <hr className="orderLine" />
                    <div className="OrderDescription">
                        <div className="imgDes">
                            <img src={img} alt="images" />
                            <div className="imgTitle">Lorem ipsum dolor sit amet consectetur adipisicing elit...</div>
                        </div>
                        <div className="Orderquantity">
                            <p className="Qty">Qty: <span>1</span></p>
                        </div>
                        <div className="orderStatus">
                            <p>Panding</p>
                        </div>
                    </div>
                </div>

                <div className="address">
                    <div className="firstAddress">
                        <div className="shippingAdd">
                            <p className="shippingTitle">Address</p>
                            <p className="shippingName"> Deloar hossian </p>
                            <p className="shippingName"> 0178751485 </p>
                            <p className="shippingName"> delowar@gmail.com </p>
                            <p><span className="Orbill">Location</span> Dhaka, Bangladesh </p>
                        </div>
                    </div>
                    <div className="firstAddress">
                        <div className="shippingAdd">
                            <h3>Total Summary</h3>
                            <div className="summaryBox">
                                <div className="leftSummary">
                                    <p>Subtotal</p>
                                    <p>Delivery Fee</p>
                                    <p>Total</p>

                                </div>
                                <div className="rightSummary">
                                    <p>$100</p>
                                    <p>$100</p>
                                    <p>$ 100</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;