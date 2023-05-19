import React, { useState } from 'react';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/AddNewCategory.module.css";
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import axios from "axios";
import Loading from '../../../../shared/Loading/Loading';
import useModal from './../../../../../hooks/useModal';
import { useNavigate } from 'react-router-dom';

const AddNewCategori = () => {
    const { successFullModal, simpleMessageDisplay } = useModal();
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [file, setFile] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        const reg = /image.*/;

        if (file.type.match(reg)) {
            const title = e.target.title.value;
            const category = e.target.category.value;
            const route = title.toLowerCase().split(' ').join('-');

            const formData = new FormData();
            formData.append('img', file);
            formData.append('title', title);
            formData.append('thisIsFor', category);
            formData.append('route', route);

            const url = `/api/categories?email=${user?.email}`;
            axios.post(url, formData, {
                headers: {
                    auth: `Bearer ${getAccessToken()}`
                }
            })
                .then(res => {
                    if (res?.data?.insertedId || res?.status === 200) {
                        successFullModal();
                        navigate('/dashboard/manage-categories');
                    }
                    else {
                        simpleMessageDisplay('Category upload faild. Plase try again.');
                    }
                })
                .catch(err => console.log(err))
        }
        else {
            simpleMessageDisplay('Unable upload this file. Please try another image file.');
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <DashboardTitle title='Add new category' />

            <div className={css.newCategoryFrom}>
                <form className={css.form} onSubmit={handleSubmit}>
                    <h4>Add new category</h4>

                    <div>
                        <label htmlFor="title">Category title</label>
                        <input type="text" placeholder='Category Title' name="title" id='title' required />
                    </div>

                    <div className={css.selectCategory}>
                        <label>Select category</label>
                        <select required name='category'>
                            <option value='men'>Men</option>
                            <option value='women'>women</option>
                            <option value='sports'>Sports</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="file">Category IMG (w500 &#215; h500) Max size : 100 KB</label>
                        <input type='file' name="avater" onChange={(e) => setFile(e.target.files[0])} id='file' required />
                    </div>

                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddNewCategori;