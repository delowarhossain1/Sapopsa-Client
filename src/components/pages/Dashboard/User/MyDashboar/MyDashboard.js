import React from 'react';
import img1 from "../../../../../images/1.jpg"
import Navbar from '../../../../shared/Navbar/Navbar';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import {AiOutlineLogin} from "react-icons/ai";
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import auth from './../../../../../firebase.init';

const MyDashboard = () => {
    return (
        <>  
            <Navbar />
            <PageTitle title='My orders' />

            <div class="backColor">
                <div class="container">
                    <div class="myOrder">
                        <div className='my-dashboard-heading'>
                            <h2 class="orderMainTitle">My Orders</h2>

                            <button onClick={()=> signOut(auth)}>
                                <AiOutlineLogin />
                                <span>Log out</span>
                            </button>
                        </div>


                        <div class="boxColor">
                            <div class="orderInfo">
                                <div class="orderOder">
                                    <p>Order <span className='order-number'>#1349502345820</span> </p>
                                    <p class="orderDate">Placed on 14 Aug 2022 <span>17:27:15</span></p>
                                </div>
                                <div class="mnage">
                                    <Link to='order-details'>manage</Link>
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyDashboard;