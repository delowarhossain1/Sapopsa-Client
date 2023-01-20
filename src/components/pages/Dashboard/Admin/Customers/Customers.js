import React, { useEffect, useState } from 'react';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/Table.module.css";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import Loading from '../../../../shared/Loading/Loading';
import useModal from './../../../../../hooks/useModal';

const Customers = () => {
    const [refatch, setRefatch] = useState(false);
    const { simpleAlertWithConfirmBtn, successFullModal } = useModal();
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

    }, [user, refatch]);

    // Make admin
    const makeAdmin = (email) => {
        const alert = {
            text : 'Do you want to make him an admin?',
            confirmBtn : 'Yes, I want'
        }

        simpleAlertWithConfirmBtn(alert, () => {
            if (user?.email) {
                
                const url = `http://localhost:5000/make-admin?email=${user?.email}&newAdminEmail=${email}`;

                fetch(url, {
                    method: 'PATCH',
                    headers: {
                        auth: `Bearer ${getAccessToken()}`
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        if(res?.modifiedCount){
                            successFullModal();
                            setRefatch(true);
                        }
                    });
            }
        })
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