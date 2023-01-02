import React from 'react';
import DashboardTitle from '../../DashboardTitle';
import PageTitle from './../../../../shared/PageTitle/PageTitle';
import {FiShoppingBag} from "react-icons/fi";
import {FaUserFriends} from "react-icons/fa";
import css from "../../../../../css/ReportDisplay.module.css";

const Report = () => {
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
                    <div className={css.displayNumber}>00</div>
                </div>

                <div className={css.display}>
                    <div className={css.displayIcon}><FaUserFriends /></div>
                    <div>Total Customer</div>
                    <div className={css.displayNumber}>00</div>
                </div>

            </div>

            <div>
                <div>Recent orders</div>

                <div>Recent reviews</div>
            </div>
        </div>
    );
};

export default Report;