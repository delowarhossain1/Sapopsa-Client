import React, { useState } from 'react';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/AddNewCategory.module.css";
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';

const AddNewCategori = () => {
    const [user, loading] = useAuthState(auth);
    const [categoryImg, setCategoryImg] = useState({});

    const handleSubmit = e => {
        e.preventDefault();
        const title = e.target.title.value;

        const formData = new FormData();
        formData.append('categoryImg', categoryImg);
        formData.append('title', title);
        console.log(formData)

        if (formData) {
            fetch(`http://localhost:5000/categories?email=${user?.email}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    auth: `Bearer ${getAccessToken()}` 
                },
                body: formData
            })
                .then(res => res.json())
                .then(res => console.log(res));
        }
    }

    return (
        <div>
            <DashboardTitle title='Add new category' />

            <div className={css.newCategoryFrom}>
                <form className={css.form} onSubmit={handleSubmit}>
                    <h4>Add new category</h4>
                    
                    <input type="text" placeholder='Category Title' name="title" required />

                    <input type='file' name="avater" onChange={(e) => setCategoryImg(e.target.files[0])} required />

                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddNewCategori;