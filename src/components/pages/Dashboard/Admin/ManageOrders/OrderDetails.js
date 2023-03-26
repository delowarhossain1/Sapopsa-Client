import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/ManageOrder.module.css";
import axios from 'axios';
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../../../../firebase.init';
import Loading from '../../../../shared/Loading/Loading';
import useModal from './../../../../../hooks/useModal';
import UpdateBtn from '../../../../shared/Button/UpdateBtn';

const OrderDetails = () => {
    const { id } = useParams();
    const getOrderStatus = useRef();
    const [user, loading] = useAuthState(auth);
    const [order, setOrder] = useState({});
    const [refetch, setRefetch] = useState(false);
    const { 
        simpleAlertWithConfirmBtn,
        successFullModal,
        simpleMessageDisplay 
    } = useModal();

    useEffect(() => {
        const url = `http://localhost:5000/get-order?id=${id}&email=${user?.email}`;
        axios.get(url, {
            headers: { auth: `Bearer ${getAccessToken()}` }
        })
            .then(res => setOrder(res.data));
    }, [id, user, refetch]);

    // Update order status
    const handleStatus = () => {
        const status = getOrderStatus?.current?.value;

        const alertInfo = {
            text: `Do you want to update order status? '${status}'`,
            confirmBtn: "Yes"
        }

        simpleAlertWithConfirmBtn(alertInfo, () => {
            if (user?.email) {

                const url = `http://localhost:5000/update-order-status/${order?._id}?status=${status}&email=${user?.email}`;

                fetch(url, {
                    method : 'PATCH',
                    headers : {
                        auth : `Bearer ${getAccessToken()}`
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res?.modifiedCount > 0) {
                            successFullModal('Order status updated.');
                            setRefetch(!refetch)
                        }
                        else {
                            simpleMessageDisplay("Something went wrong. Please check current order status.");
                        };
                    })
            }
        })
    }

    if (loading) {
        return <Loading />
    }

    const { total, subTotal, status, products, placed, payment, dailyveryInfo: dInfo } = order;

    return (
        <div>
            <PageTitle title='Order details' />
            <DashboardTitle title='Order Details' />

            <div>
                <div className={css.orderDetailBG}>
                    <div className={css.heading}>
                        <div className={css.orderNum}>
                            <span>Order #{payment?.txn}</span>
                            <span>Placed on {placed?.date} {placed?.time}</span>
                        </div>

                        <span className={css.orderStatus}>{status}</span>

                        <div>
                            <span>Total : ${total}</span>
                        </div>
                    </div>
                </div>

                <div className={css.ordersCards}>
                    <div>
                        {
                            products?.map(product => {
                                const { img, price, quantity, size, title, totalPrice, color } = product;
                                return (
                                    <div className={css.orderCard}>
                                        <div className={css.cardDes}>
                                            <div>
                                                <img src={img} alt="product img" />
                                                <span>{title?.length > 30 ? title.slice(0, 30) + '...' : title}</span>
                                            </div>
                                            <div>
                                                <span>Size : {size}</span>
                                                <span>Qty : {quantity}</span>

                                                <p className='selectedColorBtn'>
                                                    Color :
                                                     <span style={{background : `${color}`}}></span>
                                                </p>
                                            </div>

                                            <span>Price : (${price} * {quantity}) ${totalPrice}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }


                        <div className={css.summeryBox}>
                            <div className={css.orderSummery}>
                                <span>Total Summary</span>
                                <sapn>Sub total : ${subTotal}</sapn>
                                <sapn>Shipping Fee : ${dInfo?.shippingCharge}</sapn>
                                <sapn>Total : ${total}</sapn>
                            </div>
                        </div>
                    </div>

                    <div className={css.orderInfo}>
                        <span>Order information</span>
                        <span>Name : {dInfo?.name}</span>
                        <span>TXN : #{payment?.txn}</span>
                        <span>Email : {dInfo?.email}</span>
                        <span>Mobile : {dInfo?.phone}</span>
                        <span>Address 1: {dInfo?.addressLineOne}</span>
                        <span>Address 2: {dInfo?.addressLineTwo}</span>
                        <span>Shipping area : {dInfo?.shippingArea}</span>
                        <span>Status : {status}</span>

                        <div className={css.paymentInfo}>
                            <span>Payment information</span>
                            <span>Account Name : {payment?.name}</span>
                            <span>Amount : ${payment?.amount}</span>
                            <span>currency : {payment?.currency}</span>
                            <span>Transaction ID : #{payment?.txn}</span>
                        </div>
                    </div>
                </div>

                <div className={css.takeAction}>
                    <div>
                        <label>Update Order State</label>
                        <select ref={getOrderStatus}>
                            <option value="Pending">Pending</option>
                            <option value="Shipping">Shipping</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                <div className={css.updateBtn}>
                    <span onClick={handleStatus}>
                        <UpdateBtn />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;