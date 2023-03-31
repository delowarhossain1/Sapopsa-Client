import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/ManageCategories.module.css";
import css2 from "../../../../../css/Table.module.css";
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import Loading from '../../../../shared/Loading/Loading';
import { getAccessToken } from "../../../../../utilites/setAndGetAccessToken";
import useModal from './../../../../../hooks/useModal';
import { useQuery } from 'react-query';
import axios from 'axios';

const ManageCategories = () => {
    const [user, userLoading] = useAuthState(auth);
    const { deleteModal, successFullModal } = useModal();

    const {data:allCategory, isLoading, refetch} = useQuery(['manage-categories', user], ()=>(
        axios.get(`/all-categories?email=${user?.email}`, {
            headers : {auth : `Bearer ${getAccessToken()}`}
        })
        .then(res => res.data)
    ));

    // delete category
    const deleteCategory = (id) => {

        deleteModal(() => {
            if (user && id) {
                fetch(`/category/${id}?email=${user?.email}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        auth: `Bearer ${getAccessToken()}`
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res?.deletedCount) {
                            successFullModal();
                            refetch();
                        }
                    })
            }
        });

    }

    // Set loading status
    if (userLoading || isLoading) <Loading />;

    return (
        <div>
            <DashboardTitle title='Categories' />

            <div className={css.newBtn}>
                <button>
                    <Link to='add-new-category'>Add new category</Link>
                </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table className={css2.table}>
                    <tr>
                        <th>#No.</th>
                        <th>IMG</th>
                        <th>Category</th>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>


                    {
                        allCategory?.map((c, i) => (
                            <tr key={c?._id}>
                                <th>{i + 1}</th>
                                <th>
                                    <img src={c?.img} className={css2.categoryImg} alt="category img" />
                                </th>
                                <th>{c?.thisIsFor}</th>
                                <th>{c?.title}</th>
                                <th>
                                    <button
                                        className={css2.deleteBtn}
                                        onClick={() => deleteCategory(c?._id)}
                                    >Delete</button>
                                </th>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </div>
    );
};

export default ManageCategories;