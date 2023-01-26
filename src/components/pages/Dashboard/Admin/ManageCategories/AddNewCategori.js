import React, { useState } from 'react';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/AddNewCategory.module.css";
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import axios from "axios";

const AddNewCategori = () => {
    const [user, loading] = useAuthState(auth);
    const [file, setFile] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        const title = e.target.title.value;

        const formData = new FormData();
        formData.append('avatar', file);

        if (formData) {
            const url = `http://localhost:5000/categories?email=${user?.email}`;

            axios.post(url, formData, {
                headers : {
                    'content-type': 'multipart/form-data',
                    auth : `Bearer ${getAccessToken()}`
                }
            })
            .then(res => console.log(res))
        }
    }

    return (
        <div>
            <DashboardTitle title='Add new category' />

            <div className={css.newCategoryFrom}>
                <form className={css.form} onSubmit={handleSubmit}>
                    <h4>Add new category</h4>
                    
                    <input type="text" placeholder='Category Title' name="title" required />

                    <input type='file' name="avater" onChange={(e) => setFile(e.target.files[0])} required />

                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddNewCategori;