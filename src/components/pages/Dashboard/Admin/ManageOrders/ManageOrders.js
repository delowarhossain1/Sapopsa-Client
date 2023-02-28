import React, { useRef, useState } from 'react';
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
    const getSearchText = useRef();
    const [user, loading] = useAuthState(auth);
    const [searchText, setSearchText] = useState('Pending');

    const { isLoading, data: orders, } = useQuery(['orders', searchText], () => (
        axios.get(`http://localhost:5000/orders?searchText=${searchText}&email=${user?.email}`, {
            headers: { auth: `Bearer ${getAccessToken()}` }
        })
            .then(res => res.data)
    ));

    // Search handle
    const handleSearch = () => {
        const text = getSearchText.current.value;

        if (text && text?.length > 5) {

            if (text === "pending" || text === "shipping" || text === "delivered" || text === "cancelled") {
                const currectText = text.charAt(0).toUpperCase() + text.slice(1, text.length);
                setSearchText(currectText);

                // Set empty string in search field
                getSearchText.current.value = "";
            }
            else {
                setSearchText(text);

                // Set empty string in search field
                getSearchText.current.value = "";
            }
        };
    }

    if (loading || isLoading) {
        return <Loading />
    }

    // Css avtive class
    const active = css.active;

    return (
        <div>
            <DashboardTitle title='Orders' />
            <PageTitle title='Orders' />

            <div className={css.ordersPageContainer}>
                <div className={css.orderStateBtn}>
                    <button
                        onClick={() => setSearchText('Pending')}
                        className={searchText === 'Pending' ? active : 'state-btn'}
                    >Pending</button>

                    <button
                        onClick={() => setSearchText('Shipping')}
                        className={searchText === 'Shipping' ? active : 'state-btn'}
                    >Shipping</button>

                    <button
                        onClick={() => setSearchText('Delivered')}
                        className={searchText === 'Delivered' ? active : 'state-btn'}
                    >Delivered</button>

                    <button
                        onClick={() => setSearchText('Cancelled')}
                        className={searchText === 'Cancelled' ? active : 'state-btn'}
                    >Cancelled</button>

                </div>

                <div className={css.searchOrders}>
                    <input type='text' placeholder='Email / Phone / TXN ID / Status' autoFocus autoComplete='off' ref={getSearchText} />
                    <button
                        type="button"
                        onClick={handleSearch}
                    >Search</button>
                </div>
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
                        <th>Phone</th>
                        <th>email</th>
                        <th>TXN ID</th>
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
                                <th>{order?.dailyveryInfo?.phone}</th>
                                <th>{order?.dailyveryInfo?.email}</th>
                                <th>{order?.payment?.txn}</th>
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
                {orders?.length === 0 && <div className={css.orderNotAviable}>No Result found.</div>}
            </div>
        </div>
    );
};

export default ManageOrders;