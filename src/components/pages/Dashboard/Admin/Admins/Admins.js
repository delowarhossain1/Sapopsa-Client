import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/Table.module.css";
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import Loading from '../../../../shared/Loading/Loading';
import useModal from './../../../../../hooks/useModal';
import { Link } from 'react-router-dom';

const Admins = () => {
    const [refetch, setRefetch] = useState(false);
    const [user, loading] = useAuthState(auth);
    const [admins, setAdmins] = useState([]);
    const { simpleAlertWithConfirmBtn, successFullModal } = useModal();

    useEffect(() => {
        fetch(`http://localhost:5000/admins?email=${user?.email}`, {
            headers: {
                auth: `Bearer ${getAccessToken()}`
            }
        })
            .then(res => res.json())
            .then(res => setAdmins(res))
            .catch(err => console.log(err))

    }, [user, refetch]);

    // remove admin
    const removeAdmin = (email) => {
        const message = {
            text: 'Do you want to remove him to an admin?',
            confirmBtn: 'Yes, remove.'
        }

        simpleAlertWithConfirmBtn(message, () => {
            if (email && user) {
                const url = `http://localhost:5000/delete-admin?email=${user?.email}&deleteAdmin=${email}`;

                fetch(url, {
                    method: 'PATCH',
                    headers: {
                        auth: `Bearer ${getAccessToken()}`
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res?.modifiedCount) {
                            successFullModal();
                            setRefetch(true);
                        }
                    })
            }
        });
    };

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <DashboardTitle title='Admins' />
            <PageTitle title='Admins' />

            <div style={{display : 'flex', justifyContent : 'flex-end'}}>
                <button style={{ padding: '5px', cursor: 'pointer' }}>
                    <Link to='add-new-admin' style={{color : 'black'}}>
                        Add New Admin
                    </Link>
                </button>
            </div>


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
                                <th>{i + 1}</th>
                                <th>{admin?.name}</th>
                                <th>{admin?.email}</th>
                                <th>
                                    <button
                                        className={css.btn}
                                        disabled={admins?.length === 0}
                                        onClick={() => removeAdmin(admin?.email)}
                                    >Delete Admin</button>
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