import React from 'react';
import img1 from "../../../../../images/1.jpg";
import { Link } from 'react-router-dom';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import UserDashboardTitle from '../UserDashboardTitle/UserDashboardTitle';

const MyOrders = () => {

    return (

        <>
            <PageTitle title='My orders' />
            <UserDashboardTitle title='My orders' />

            <div class="boxColor">
                <div class="orderInfo">
                    <div class="orderOder">
                        <p>Order <span className='order-number'>#1349502345820</span> </p>
                        <p class="orderDate">Placed on 14 Aug 2022 <span>17:27:15</span></p>
                    </div>
                    <div class="mnage">
                        <Link to='order-details/123456456'>manage</Link>
                    </div>
                </div>
                <hr class="orderLine" />
                <div class="boxcolor">
                    <div class="OrderDescription">
                        <div class="imgDes">
                            <img src={img1} alt="images" />
                            <div class="imgTitle">Lorem ipsum dolor sit amet consectetur adipisicing elit...</div>
                        </div>
                        <div class="Orderquantity">
                            <p class="Qty">Qty: <span>1</span></p>
                        </div>
                        <div class="orderStatus">
                            <p>Cancelled</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyOrders;