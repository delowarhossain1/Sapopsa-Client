import React, { useState } from 'react';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/AddNewCategory.module.css";
import axios from 'axios';
import { getAccessToken } from "../../../../../utilites/setAndGetAccessToken";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../../../../firebase.init';
import Loading from '../../../../shared/Loading/Loading';
import useModal from './../../../../../hooks/useModal';
import { useNavigate } from 'react-router-dom';

const AddNewSlider = () => {
    const [loading, setLoading] = useState(false);
    const [user, UserLoading] = useAuthState(auth);
    const [sliderImage, setSliderImage] = useState(null);
    const { successFullModal, simpleMessageDisplay } = useModal();
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        // Loading status updated;
        setLoading(true);

        e.preventDefault();
        const type = /image.*/;

        if (sliderImage.type.match(type)) {
            const title = e.target.title.value;
            const formData = new FormData();
            formData.append('img', sliderImage);
            formData.append('title', title);

            const url = `/api/sliders?email=${user?.email}`;
            axios.post(url, formData, {
                headers: {
                    auth: `Bearer ${getAccessToken()}`
                },
            })
                .then(res => {
                    if (res?.data?.insertedId && res?.status === 200) {
                        // Loading status updated;
                        setLoading(true);

                        successFullModal();
                        navigate('/dashboard/manage-slider/');
                    }
                    else {
                        // Loading status updated;
                        setLoading(true);
                        simpleMessageDisplay('Slider upload failed. Please try again.')
                    }
                });
        }
        else{
            // Loading status updated;
            setLoading(true);
            simpleMessageDisplay("Unable to upload this file. Try another image file.");
        }

    }

    if (loading || UserLoading) {
        return <Loading />
    }

    return (
        <div>
            <DashboardTitle title='Add new slider' />

            <div className={css.newCategoryFrom}>
                <form className={css.form} onSubmit={handleSubmit}>
                    <h4>Add new slider</h4>
                    <input type="text" placeholder='Slider Title' name="title" required />
                    <input type='file' onChange={(e) => setSliderImage(e.target.files[0])} required />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddNewSlider;