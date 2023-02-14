import React from 'react';
import img1 from "../../../../../images/1.jpg";
import { Link } from 'react-router-dom';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import UserDashboardTitle from '../UserDashboardTitle/UserDashboardTitle';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../../../../firebase.init';
import Loading from './../../../../shared/Loading/Loading';
import { useQuery } from 'react-query';
import axios from 'axios';
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';

const MyOrders = () => {
    const [user, loading] = useAuthState(auth);

    const { isLoading, data: orders, } = useQuery('myOrders', () => (
        axios.get(`http://localhost:5000/my-orders?email=${user?.email}`, {
            headers: { auth: `Bearer ${getAccessToken()}` }
        })
            .then(res => res.data)
    ));

    console.log(orders);

    if (loading || isLoading) {
        return <Loading />
    }

    return (

        <>
            <PageTitle title='My orders' />
            <UserDashboardTitle title='My orders' />

            {orders?.map(order => {
                const {_id, payment, placed, products, status} = order;
                return (
                    <div className="boxColor">
                        <div className="orderInfo">
                            <div className="orderOder">
                                <p>Order <span className='order-number'>#1349502345820</span> </p>
                                <p className="orderDate">Placed on 14 Aug 2022 <span>17:27:15</span></p>
                            </div>
                            <div className="mnage">
                                <Link to='order-details/123456456'>manage</Link>
                            </div>
                        </div>
                        <hr className="orderLine" />
                        <div className="boxcolor">
                            <div className="OrderDescription">
                                <div className="imgDes">
                                    <img src={img1} alt="images" />
                                    <div className="imgTitle">Lorem ipsum dolor sit amet consectetur adipisicing elit...</div>
                                </div>
                                <div className="Orderquantity">
                                    <p className="Qty">Qty: <span>1</span></p>
                                </div>
                                <div className="orderStatus">
                                    <p>{status}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    );
};

export default MyOrders;