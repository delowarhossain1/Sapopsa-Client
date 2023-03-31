import React, { useEffect, useState } from 'react';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import UserDashboardTitle from '../UserDashboardTitle/UserDashboardTitle';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import axios from 'axios';
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import Loading from "../../../../shared/Loading/Loading";
import {RxCross2} from "react-icons/rx"

const OrderDetails = () => {
    const [user, loading] = useAuthState(auth);
    const [orderInfoLoading, setOrdersInfoLoading] = useState(false);
    const { id } = useParams();
    const [order, setOrder] = useState({});

    useEffect(() => {
        // Set loading status;
        setOrdersInfoLoading(true);

        axios.get(`/get-order?id=${id}&email=${user?.email}`, {
            headers: { auth: `Bearer ${getAccessToken()}` }
        })
            .then(function (res) {
                setOrder(res?.data);
                // Update loading status;
                setOrdersInfoLoading(false);
            });
    }, [id])

    //Pending status
    if (loading || orderInfoLoading) {
        return <Loading />
    }

    // Orders info;
    const { dailyveryInfo, payment, placed, products, status, total, subTotal } = order;

    return (
        <div>
            <PageTitle title='Order details' />
            <UserDashboardTitle title='Order details' />

            <div>
                <div className="boxColor">
                    <div className="orderInfo">
                        <div className="orderOder">
                            <p>Order <a href="#">#{payment?.txn}</a> </p>
                            <p className="orderDate">Placed on {placed?.date} <span>{placed?.time}</span></p>
                        </div>

                        <div className="orderStatus">
                            <p>{status}</p>
                        </div>

                        <div className="mnage">
                            <div className="p">
                                Total: $<span>{total}</span>
                            </div>
                        </div>
                    </div>
                    <hr className="orderLine" />

                    <div>
                        {products?.map(product => {
                            const {id, img, price, quantity, size, title, totalPrice, color} = product;

                            return (
                                <div className="OrderDescription" key={id}>
                                    <div className="imgDes">
                                        <img src={img} alt="images" />
                                        <div className="imgTitle">{title}</div>
                                    </div>
                                    <div className="Orderquantity">
                                        <p className="Qty">Qty: <span>{quantity}</span></p>
                                        <p className="Qty">Size: <span>{size}</span></p>
                                        <p className="Qty selectedColorBtn">
                                            Color: 
                                            <span style={{background : color}}></span>
                                        </p>
                                    </div>

                                    <div>
                                        <p>Price : ({price}<RxCross2/> {quantity}) ${totalPrice}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="address">
                    <div className="firstAddress">
                        <div className="shippingAdd">
                            <p className="shippingTitle">Address</p>
                            <p className="shippingName"> {dailyveryInfo?.name} </p>
                            <p className="shippingName"> {dailyveryInfo?.phone} </p>
                            <p className="shippingName"> {dailyveryInfo?.email} </p>
                            <p className="shippingName"> Area : {dailyveryInfo?.shippingArea} </p>
                            <p><span className="Orbill">Location</span> {dailyveryInfo?.addressLineOne}, {dailyveryInfo?.addressLineTwo} </p>
                        </div>
                    </div>
                    <div className="firstAddress">
                        <div className="shippingAdd">
                            <h3>Total Summary</h3>
                            <div className="summaryBox">
                                <div className="leftSummary">
                                    <p>Sub Total </p>
                                    <p>Delivery Fee</p>
                                    <p>Total</p>

                                </div>
                                <div className="rightSummary">
                                    <p>${subTotal}</p>
                                    <p>${dailyveryInfo?.shippingCharge}</p>
                                    <p>$ {total}</p>
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