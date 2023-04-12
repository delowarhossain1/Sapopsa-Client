import React, { useEffect, useState } from 'react';
import DashboardTitle from './../../DashboardTitle';
import css from "../../../../../css/ManageHeading.module.css";
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import Loading from '../../../../shared/Loading/Loading';
import { getAccessToken } from "../../../../../utilites/setAndGetAccessToken";
import useModal from './../../../../../hooks/useModal';

const ManageHeading = ({headingInfo = {}}) => {
    const [titleUpdating, setTitleUpdateing] = useState(false);
    const {navbarTitle, refetch} = headingInfo;
    const { successFullModal } = useModal();
    const [user, userLoading] = useAuthState(auth);

    // handle update heading
    const handleHading = (e) => {
        // Set loading status
        setTitleUpdateing(true);

        e.preventDefault();
        let headingField = e.target.heading;
        let updatedHeading = headingField.value;

        if (updatedHeading && user) {

            fetch(`/api/settings/navbar-title?email=${user?.email}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    auth: `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify({ navbarTitle: updatedHeading })
            })
                .then(res => res.json())
                .then(res => {
                    // update loading status
                    setTitleUpdateing(false);

                    if (res?.modifiedCount) {
                        refetch();
                        successFullModal();
                        headingField.value = ''
                    }
                })
        }
    }

    if (userLoading || titleUpdating) {
        return <Loading /> 
    }

    return (
        <div>
            <DashboardTitle title='Heading' />
            <PageTitle title='manage heading' />

            <div className={css.container}>
                <div className={css.headingText}>{navbarTitle}</div>

                <form className={css.form} onSubmit={handleHading}>
                    <textarea placeholder='Update Heading' name='heading' required></textarea>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default ManageHeading;