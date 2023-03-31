import React from 'react';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/AddNewAdmin.module.css";
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../../../../firebase.init';
import Loading from '../../../../shared/Loading/Loading';
import modal from "../../../../../hooks/useModal";
import { useNavigate } from 'react-router-dom';

const AddNewAdmin = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const { simpleMessageDisplay, successFullModal } = modal();

    const handleAdmin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;

        //  update database
        const url = `/make-admin?email=${user?.email}`;

        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                auth: `Bearer ${getAccessToken()}`
            },
            body: JSON.stringify({ email })
        })
            .then(res => res.json())
            .then(res => {

                if (res?.matchedCount === 0 || res?.modifiedCount === 0) {
                    simpleMessageDisplay("Maybe user not registerd or already admin.")
                }
                else if (res?.modifiedCount === 1) {
                    successFullModal();
                    navigate('/dashboard/admins/');
                }
            })
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <PageTitle title='Add new admin' />
            <DashboardTitle title="Add new  admin" />

            <div className={css.container}>

                <form className={css.form} onSubmit={handleAdmin}>
                    <input type='email' name='email' placeholder='Enter the admin email' required autoComplete='off' />
                    <button type="submit">Add an admin</button>
                </form>
            </div>
        </div>
    );
};

export default AddNewAdmin;