import React, { useEffect, useState } from 'react';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import DashboardTitle from '../../DashboardTitle';
import UpdateBtn from '../../../../shared/Button/UpdateBtn';
import css from "../../../../../css/settings.module.css";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import Loading from '../../../../shared/Loading/Loading';
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import useModal from '../../../../../hooks/useModal';

const ManageAboutUs = ({ aboutus = {} }) => {
    const { aboutUs: aboutusText, refetch } = aboutus;
    const { successFullModal, simpleAlertWithConfirmBtn } = useModal();
    const [user, userLoading] = useAuthState(auth);
    const [settingsUpdating, setSettingUpdating] = useState(false);

    // Handle about us text
    const handleAboutUs = (event) => {
        // update loading status
        setSettingUpdating(true);

        event.preventDefault();
        const aboutUs = event.target.aboutus.value;

        // confirm alert
        const alertText = {
            text: 'Do you want to update about us info?',
            confirmBtn: 'Yes, I want.'
        }

        simpleAlertWithConfirmBtn(alertText, () => {
            // update loading status
            setSettingUpdating(true);

            fetch(`/api/settings/about-us?email=${user?.email}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                    auth: `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify({ aboutUs })
            })
                .then(res => res.json())
                .then(res => {
                    // update loading status
                    setSettingUpdating(false);
                    // clear the text;
                    event.target.aboutus.value = '';
                    // Reload the data
                    refetch();

                    if (res?.modifiedCount > 0) {
                        successFullModal("Information update successfully.");
                    }
                })

        })

    }


    // loading status
    if (userLoading || settingsUpdating) <Loading />

    return (
        <div>
            <PageTitle title='Manage about us' />
            <DashboardTitle title='Manage About Us' />

            <div>
                <div className={css.aboutUsText}>
                    <p>{aboutusText}</p>
                </div>

                <form className={css.aboutUsForm} onSubmit={handleAboutUs}>
                    <textarea placeholder='About us' name='aboutus' required></textarea>
                    <UpdateBtn />
                </form>
            </div>
        </div>
    );
};

export default ManageAboutUs;