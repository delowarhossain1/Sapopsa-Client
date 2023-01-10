import React, { useEffect, useState } from 'react';
import DashboardTitle from './../../DashboardTitle';
import css from "../../../../../css/ManageHeading.module.css";
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import Loading from '../../../../shared/Loading/Loading';
import { getAccessToken } from "../../../../../utilites/setAndGetAccessToken";

const ManageHeading = () => {
    const [user, loading] = useAuthState(auth);
    const [heading, setHeading] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/web-heading')
            .then(res => res.json())
            .then(res => setHeading(res));

    }, []);

    // handle update heading
    const handleHading = (e) => {
        e.preventDefault();
        const heading = e.target.heading.value;

        if (heading && user) {
            
            fetch(`http://localhost:5000/web-heading?email=${user?.email}`, {
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                    auth: getAccessToken()
                },
                body: JSON.stringify(heading)
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res) {

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

            <div>
                {
                    heading?.map(h => (
                        <div key={h?._id} style={{ background: '#ddd', padding: '4px' }}>{h.heading}</div>
                    ))
                }

                <form className={css.form} onSubmit={handleHading}>
                    <textarea placeholder='Update Heading' name='heading'></textarea>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default ManageHeading;