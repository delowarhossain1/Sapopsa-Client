import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/Table.module.css";
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import Loading from '../../../../shared/Loading/Loading';

const Admins = () => {
    const [user, loading] = useAuthState(auth);
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/admins?email=${user?.email}`, {
            headers: {
                auth: `Bearer ${getAccessToken()}`
            }
        })
            .then(res => res.json())
            .then(res => setAdmins(res));

    }, [user]);

    if(loading){
        return <Loading />
    }

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


                    {
                        admins?.map((admin, i) => (
                            <tr key={admin._id}>
                                <th>{ i + 1}</th>
                                <th>{admin?.name}</th>
                                <th>{admin?.email}</th>
                                <th>
                                    <button className={css.btn}>Delete Admin</button>
                                </th>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </div>
    );
};

export default Admins;