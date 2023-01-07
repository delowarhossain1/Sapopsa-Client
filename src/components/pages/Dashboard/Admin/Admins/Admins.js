import React from 'react';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/Table.module.css";
import PageTitle from '../../../../shared/PageTitle/PageTitle';

const Admins = () => {
    return (
        <div>
            <DashboardTitle title='Admins' />
            <PageTitle title='admins' />

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
                            <button className={css.btn}>Delete Admin</button>
                        </th>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default Admins;