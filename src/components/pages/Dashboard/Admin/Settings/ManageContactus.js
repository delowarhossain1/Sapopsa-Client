import React, { useState } from 'react';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/settings.module.css";
import UpdateBtn from '../../../../shared/Button/UpdateBtn';
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import useModal from '../../../../../hooks/useModal';
import Loading from '../../../../shared/Loading/Loading';

const ManageContactus = ({ info = {} }) => {
    const { phone, email, refetch } = info;
    const [user, userLoading] = useAuthState(auth);
    const [updating, setUpdating] = useState(false);
    const {successFullModal} = useModal();

    // Handle contact info
    const handleContactInfo = (event) => {
        event.preventDefault();
        // Set loading
        setUpdating(true);

        const phone = event.target.phone;
        const email = event.target.email;
        const phoneText = phone.value;
        const emailText = email.value;

        if (phoneText || emailText) {
            // Contact info;
            const doc = {
                phone: phoneText || phone,
                email: emailText || email
            };


            fetch(`/api/settings/contact?email=${user?.email}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    auth: `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify(doc)
            })
                .then(res => res.json())
                .then(res => {
                    // update loading status
                    setUpdating(false);

                    // Set empty 
                    phone.value = '';
                    email.value = '';

                    if (res?.modifiedCount) {
                        refetch();
                        successFullModal();
                        
                    }
                })
        }

    }

    // Loading status
    if(userLoading || updating) <Loading />

    return (
        <div>
            <PageTitle title='Manage contact' />
            <DashboardTitle title='Manage Contact' />

            <div className={css.contactInfoContainer}>
                <div>
                    <p>Phone : {phone}</p>
                    <p>Email : {email}</p>
                </div>


                <form onSubmit={handleContactInfo}>
                    <input type="tel" name="phone" placeholder='Enter the phone number.' required/>
                    <input type="email" name="email" placeholder='Enter the email address' required/>
                    <UpdateBtn />
                </form>
            </div>
        </div>
    );
};

export default ManageContactus;