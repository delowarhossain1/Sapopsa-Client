import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import UserDashboardTitle from '../UserDashboardTitle/UserDashboardTitle';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../../../../firebase.init';
import Loading from './../../../../shared/Loading/Loading';
import { useQuery } from 'react-query';
import axios from 'axios';
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import { TfiFaceSad } from 'react-icons/tfi';

const MyOrders = () => {
    const [user, loading] = useAuthState(auth);

    const { isLoading, data: orders, } = useQuery('myOrders', () => (
        axios.get(`/my-orders?email=${user?.email}`, {
            headers: { auth: `Bearer ${getAccessToken()}` }
        })
            .then(res => res.data)
    ));

    if (loading || isLoading) {
        return <Loading />
    }

    return (

        <>
            <PageTitle title='My orders' />
            <UserDashboardTitle title='My orders' />

            {orders?.map(order => {
                const {_id, payment, placed, products, status} = order;
                const {img, title} = products[0];

                return (
                    <div className="boxColor" key={_id}>
                        <div className="orderInfo">
                            <div className="orderOder">
                                <p>Order <span className='order-number'>#{payment?.txn}</span> </p>
                                <p className="orderDate">Placed on {placed?.date} <span>{placed?.time}</span></p>
                            </div>
                            <div className="mnage">
                                <Link to={`order-details/${_id}`}>manage</Link>
                            </div>
                        </div>
                        <hr className="orderLine" />
                        <div className="boxcolor">
                            <div className="OrderDescription">
                                <div className="imgDes">
                                    <img src={img} alt="images" />
                                    <div className="imgTitle">
                                        {title?.length > 30 ? title?.slice(0,30)+'...' : title}
                                    </div>
                                </div>
                                
                                <div className="orderStatus">
                                    <p>{status}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

            {/* No Orders available */}
            {
                orders?.length === 0 &&

                <div className='user-empty-orders'>
                    <TfiFaceSad />
                    <p>There is no orders.</p>
                    <Link to='/'>Go Shopping</Link>
                </div>
            }
        </>
    );
};

export default MyOrders;