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
                <div class="boxColor"> 
                    <div class="orderInfo">
                        <div class="orderOder">
                            <p>Order <a href="#">#1349502345820</a> </p>
                            <p class="orderDate">Placed on 14 Aug 2022 <span>17:27:15</span></p>
                        </div>
                        <div class="mnage">
                            <div class="p">
                                Total: $ <span>100</span>
                            </div>
                        </div>
                    </div>
                    <hr class="orderLine" />
                    <div class="OrderDescription">
                        <div class="imgDes">
                            <img src={img} alt="images" />
                            <div class="imgTitle">Lorem ipsum dolor sit amet consectetur adipisicing elit...</div>
                        </div>
                        <div class="Orderquantity">
                            <p class="Qty">Qty: <span>1</span></p>
                        </div>
                        <div class="orderStatus">
                            <p>Panding</p>
                        </div>
                    </div>
                </div>

                <div class="address">
                    <div class="firstAddress">
                        <div class="shippingAdd">
                            <p class="shippingTitle">Address</p>
                            <p class="shippingName"> Deloar hossian </p>
                            <p class="shippingName"> 0178751485 </p>
                            <p class="shippingName"> delowar@gmail.com </p>
                            <p><span class="Orbill">Location</span> Dhaka, Bangladesh </p>
                        </div>
                    </div>
                    <div class="firstAddress">
                        <div class="shippingAdd">
                            <h3>Total Summary</h3>
                            <div class="summaryBox">
                                <div class="leftSummary">
                                    <p>Subtotal</p>
                                    <p>Delivery Fee</p>
                                    <p>Total</p>

                                </div>
                                <div class="rightSummary">
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