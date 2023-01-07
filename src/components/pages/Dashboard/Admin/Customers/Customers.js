import React from 'react';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/Table.module.css";

const Customers = () => {
    return (
        <div>
            <DashboardTitle title='Customers' />
            <PageTitle title='Customers' />

            <div style={{ overflowX: 'auto' }}>
                <table className={css.table}>
                    <tr>
                        <th>#No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>

                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>
                            <button className={css.btn}>Make Admin</button>
                        </th>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default Customers;