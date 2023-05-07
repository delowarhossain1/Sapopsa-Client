import React, { useState } from 'react';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/ManageCategories.module.css";
import UpdateBtn from '../../../../shared/Button/UpdateBtn';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import useModal from '../../../../../hooks/useModal';
import Loading from '../../../../shared/Loading/Loading';

const UpdateCategory = () => {
   const {id} = useParams();
   const navigate = useNavigate();
   const {successFullModal} = useModal();
   const [user, userLoading] = useAuthState(auth);
   const [loading, setLoading] = useState(false);

    const handleUpdate = (e) =>{
        // set loading status
        setLoading(true);

        e.preventDefault();
        const text = e.target.title.value;

        if(text){
            fetch(`/api/category/${id}?email=${user?.email}`, {
                method : "PATCH",
                headers : {
                    'content-type' : 'application/json',
                    auth : `Bearer ${getAccessToken()}`
                },
                body : JSON.stringify({title : text})
            })
            .then(res => res.json())
            .then(res => {
                if(res?.modifiedCount){
                    // set loading status
                    setLoading(false);

                    successFullModal();
                    navigate('/dashboard/manage-categories');
                }
            })
        }
    }


    // Loading status
    if(userLoading || loading) {
        return <Loading />
    }

    return (
        <div>
            <PageTitle title='Update category' />
            <DashboardTitle title='Update category' />

            <div>
                <form className={css.updateCategory} onSubmit={handleUpdate}>
                    <label>Update Category</label>
                    <input type='text' name='title' placeholder='Enter the title.....' />
                    <UpdateBtn />
                </form>
            </div>
        </div>
    );
};

export default UpdateCategory;