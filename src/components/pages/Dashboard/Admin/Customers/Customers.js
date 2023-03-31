import React, { useEffect, useState } from 'react';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/Table.module.css";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import Loading from '../../../../shared/Loading/Loading';
import { useQuery } from 'react-query';
import axios from 'axios';

const Customers = () => {
    const [user, loading] = useAuthState(auth);

    const {data:allUsers, isLoading} = useQuery(['manage-customers', user], ()=>(
        axios.get(`/customers?email=${user?.email}`, {
            headers: {
                auth: `Bearer ${getAccessToken()}`
            }
        })
        .then(res => res.data)
    ))

    if (loading || isLoading) <Loading />;

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
                    </tr>

                    {
                        allUsers?.map((u, i) => (
                            <tr key={u?._id}>
                                <th>{i + 1}</th>
                                <th>{u?.name}</th>
                                <th>{u?.email}</th>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </div>
    );
};

export default Customers;