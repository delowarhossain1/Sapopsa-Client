import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../DashboardTitle';
import PageTitle from './../../../../shared/PageTitle/PageTitle';
import { FiShoppingBag } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import css from "../../../../../css/ReportDisplay.module.css";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import Loading from '../../../../shared/Loading/Loading';
import { FaUserCircle } from "react-icons/fa";

const Report = () => {
    const [user, loading] = useAuthState(auth);
    const [allReport, setAllReport] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/report?email=${user?.email}`, {
            headers: {
                auth: `Bearer ${getAccessToken()}`
            }
        })
            .then(res => res.json())
            .then(res => setAllReport(res));
    }, [user]);

    if (loading) {
        return <Loading />
    }
    const { orders, totalOrders, totalUsers, users } = allReport;
    console.log(totalOrders)

    return (
        <div>
            <PageTitle title='dashboard report' />
            <DashboardTitle title='Report' />

            <div className={css.reportDisplay}>

                <div className={css.display}>
                    <div className={css.displayIcon}><FiShoppingBag /></div>
                    <div>Today's Order</div>
                    <div className={css.displayNumber}>00</div>
                </div>

                <div className={css.display}>
                    <div className={css.displayIcon}><FiShoppingBag /></div>
                    <div>Total orders</div>
                    <div className={css.displayNumber}>{totalOrders}+</div>
                </div>

                <div className={css.display}>
                    <div className={css.displayIcon}><FaUserFriends /></div>
                    <div>Total Customer</div>
                    <div className={css.displayNumber}>{totalUsers}+</div>
                </div>

            </div>

            <div className={css.row}>

                <div>
                    <h3 className={css.title}>Recent orders</h3>
                </div>

                <div>
                    <h3 className={css.title}>Recent customers</h3>

                    <div>
                        {
                            users?.map((u, i) => (
                                <div className={css.user}>
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