import React from 'react';
import DashboardTitle from '../../DashboardTitle';
import PageTitle from './../../../../shared/PageTitle/PageTitle';
import { FiShoppingBag } from "react-icons/fi";
import {FaShippingFast } from "react-icons/fa";
import {TiGroup } from "react-icons/ti";
import {BiCategory } from "react-icons/bi";
import {GiCrystalGrowth } from "react-icons/gi";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { GiBoxUnpacking } from "react-icons/gi";
import css from "../../../../../css/ReportDisplay.module.css";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import Loading from '../../../../shared/Loading/Loading';
import { FaUserCircle } from "react-icons/fa";
import numberCount from './../../../../../utilites/numberCount';
import { useQuery } from 'react-query';
import axios from 'axios';

const Report = () => {
    const [user, loading] = useAuthState(auth);

    const { isLoading, data: allReport } = useQuery(['dashboard-report', user], () => (
        axios.get(`/api/report?email=${user?.email}`, {
            headers: { auth: `Bearer ${getAccessToken()}` }
        })
            .then(res => res?.data)
    ))

    if (loading || isLoading) {
        return <Loading />
    }

    const { orders, totalOrders, totalUsers, users, todaysOrders, successFulDelivered, totalProducts, totalCategories } = allReport;

    return (
        <div>
            <PageTitle title='dashboard report' />
            <DashboardTitle title='Report' />

            <div className={css.reportDisplay}>
                <div className={css.display}>
                    <div className={css.displayIcon}><FiShoppingBag /></div>
                    <div>Today's Order</div>
                    <div className={css.displayNumber}>{numberCount(todaysOrders)}+</div>
                </div>

                <div className={css.display}>
                    <div className={css.displayIcon}><TfiShoppingCartFull /></div>
                    <div>Total Orders</div>
                    <div className={css.displayNumber}>{numberCount(totalOrders)}+</div>
                </div>

                <div className={css.display}>
                    <div className={css.displayIcon}><FaShippingFast /></div>
                    <div>Successful Delivered</div>
                    <div className={css.displayNumber}>{numberCount(successFulDelivered)}+</div>
                </div>

                <div className={css.display}>
                    <div className={css.displayIcon}><GiCrystalGrowth /></div>
                    <div>Total Products</div>
                    <div className={css.displayNumber}>{numberCount(totalProducts)}+</div>
                </div>

                <div className={css.display}>
                    <div className={css.displayIcon}><TiGroup /></div>
                    <div>Total Customer</div>
                    <div className={css.displayNumber}>{numberCount(totalUsers)}+</div>
                </div>


                <div className={css.display}>
                    <div className={css.displayIcon}><BiCategory /></div>
                    <div>Product Categories</div>
                    <div className={css.displayNumber}>{numberCount(totalCategories)}+</div>
                </div>


            </div>

            <div className={css.row}>

                <div>
                    <h3 className={css.title}>Recent orders</h3>

                    <div>
                        {
                            orders?.map(order => {
                                const { isMultipleOrder, total, placed } = order

                                return (
                                    <div className={css.displayOrder} key={order?._id}>
                                        <div>
                                            <GiBoxUnpacking className={css.productCardIcon}/>
                                            <span>{placed?.date}</span>
                                        </div>
                                        <span>{isMultipleOrder ? "Multiple Items" : "Single Item"}</span>
                                        <span>${total}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div>
                    <h3 className={css.title}>Recent customers</h3>

                    <div>
                        {
                            users?.map((u, i) => (
                                <div className={css.user} key={i * Math.random()}>
                                    <div>
                                        <FaUserCircle />
                                    </div>

                                    <h5>{u?.name}</h5>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;