import React, { useState } from 'react';
import DashboardTitle from '../../DashboardTitle';
import PageTitle from './../../../../shared/PageTitle/PageTitle';
import css2 from "../../../../../css/Table.module.css";
import { useQuery } from "react-query";
import axios from 'axios';
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../../../../firebase.init';
import Loading from '../../../../shared/Loading/Loading';
import { AiOutlineShopping, AiOutlineShoppingCart } from 'react-icons/ai';
import css from "../../../../../css/ManageOrder.module.css";
import { Link } from 'react-router-dom';

const ManageOrders = () => {
    const [user, loading] = useAuthState(auth);
    const [state, setState] = useState('Pending');

    const { isLoading, data: orders, } = useQuery('orders', () => (
        axios.get(`http://localhost:5000/orders?status=Pending&email=${user?.email}`, {
            headers: { auth: `Bearer ${getAccessToken()}` }
        })
            .then(res => res.data)
    ));

    if (loading || isLoading) {
        return <Loading />
    }

    const active = css.active;

    return (
        <div>
            <DashboardTitle title='Orders' />
            <PageTitle title='Orders' />

            <div className={css.orderStateBtn}>
                <button
                    onClick={() => setState('Pending')}
                    className={state === 'Pending' ? active : 'state-btn'}
                >Pending</button>

                <button
                    onClick={() => setState('Shipping')}
                    className={state === 'Shipping' ? active : 'state-btn'}
                >Shipping</button>

                <button
                    onClick={() => setState('Delivered')}
                    className={state === 'Delivered' ? active : 'state-btn'}
                >Delivered</button>

                <button
                    onClick={() => setState('Cancelled')}
                    className={state === 'Cancelled' ? active : 'state-btn'}
                >Cancelled</button>

            </div>
            <div style={{ overflowX: 'auto' }}>
                <table className={css2.table}>
                    <tr>
                        <th>#No.</th>
                        <th>IMG</th>
                        <th>Item(s)</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>


                    {
                        orders?.map((order, i) => (
                            <tr key={order?._id}>
                                <th>{i + 1}</th>
                                <th>
                                    {
                                        order?.isMultipleOrder ? <AiOutlineShoppingCart style={{ fontSize: '20px' }} /> : <AiOutlineShopping style={{ fontSize: '20px' }} />
                                    }
                                </th>
                                <th>{order?.isMultipleOrder ? "Multiple" : "Single"}</th>
                                <th>{order?.status}</th>
                                <th>${order?.total}</th>
                                <th>{order?.placed?.date}</th>
                                <th>
                                    <Link 
                                    to={`order-details/${order?._id}`}>
                                        <button
                                            className={css2.deleteBtn}
                                        >Views</button>
                                    </Link>
                                </th>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;