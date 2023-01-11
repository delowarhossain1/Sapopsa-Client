import React, { useEffect, useState } from 'react';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/Table.module.css";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import Loading from '../../../../shared/Loading/Loading';

const Customers = () => {
    const [user, loading] = useAuthState(auth);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/customers?email=${user?.email}`, {
            headers: {
                auth: `Bearer ${getAccessToken()}`
            }
        })
            .then(res => res.json())
            .then(res => setAllUsers(res));

    }, [user]);

    // Make admin
    const makeAdmin = (email) => {
        if (user?.email) {

            fetch(`http://localhost:5000/make-admin?email=${user?.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    auth: `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify(email)
            })
                .then(res => res.json())
                .then(res => console.log(res));
        }
    }

    if (loading) {
        return <Loading />
    }

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

                    {
                        allUsers?.map((u, i) => (
                            <tr key={u?._id}>
                                <th>{i + 1}</th>
                                <th>{u?.name}</th>
                                <th>{u?.email}</th>
                                <th>
                                    <button
                                        className={css.btn}
                                        disabled={u?.role === 'admin'}
                                        onClick={() => makeAdmin(u?.email)}
                                    >Make Admin
                                    </button>
                                </th>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </div>
    );
};

export default Customers;