import React, { useEffect, useState } from 'react';
import DashboardTitle from './../../DashboardTitle';
import css from "../../../../../css/ManageHeading.module.css";
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import Loading from '../../../../shared/Loading/Loading';
import { getAccessToken } from "../../../../../utilites/setAndGetAccessToken";
import useModal from './../../../../../hooks/useModal';
import SwitchBtn from '../../../../shared/SwitchBtn/SwitchBtn';

const ManageHeading = () => {
    const { successFullModal } = useModal();
    const [refetch, setRefetch] = useState(false);
    const [user, loading] = useAuthState(auth);
    const [heading, setHeading] = useState({heading : ''});

    // Get website heading
    useEffect(() => {
        fetch('http://localhost:5000/web-heading')
            .then(res => res.json())
            .then(res => setHeading(res));

    }, [refetch]);

    // Display heading / on or off
    const isDispaly = (isOn) => {
        const url = `http://localhost:5000/display-web-heading?email=${user?.email}`;

        fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                auth: `Bearer ${getAccessToken()}`
            },
            body : JSON.stringify({isOn})
        })
    }



    // handle update heading
    const handleHading = (e) => {
        e.preventDefault();
        let headingField = e.target.heading;
        let updatedHeading = headingField.value;

        if (updatedHeading && user) {

            fetch(`http://localhost:5000/web-heading?email=${user?.email}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    auth: `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify({ heading: updatedHeading })
            })
                .then(res => res.json())
                .then(res => {
                    if (res?.modifiedCount) {
                        setRefetch(true);
                        successFullModal();
                        headingField.value = ''
                    }
                })
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <DashboardTitle title='Heading' />
            <PageTitle title='manage heading' />

            <div style={{ marginTop: '10px' }}>
                <SwitchBtn isOn={isDispaly} />
            </div>

            <div className={css.container}>
                <div className={css.headingText}>{heading?.heading}</div>

                <form className={css.form} onSubmit={handleHading}>
                    <textarea placeholder='Update Heading' name='heading'></textarea>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default ManageHeading;