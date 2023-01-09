import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/ManageCategories.module.css";
import css2 from "../../../../../css/Table.module.css";
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import Loading from '../../../../shared/Loading/Loading';
import {getAccessToken} from "../../../../../utilites/setAndGetAccessToken";
import useModal from './../../../../../hooks/useModal';

const ManageCategories = () => {
    const [user, userLoading] = useAuthState(auth);
    const {deleteModal} = useModal();
    const [allCategory, setAllCategory] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/all-categories?email=${user?.email}`, {
            headers : {
                auth : `Bearer ${getAccessToken()}`
            }
        })
            .then(res => res.json())
            .then(res => setAllCategory(res))

    }, [user]);

    if (userLoading) {
        return <Loading />
    }

    return (
        <div>
            <DashboardTitle title='Categories' />

            <div className={css.newBtn}>
                <button>
                    <Link to='add-new-category'>Add new category</Link>
                </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table className={css.table}>
                    <tr>
                        <th>#No.</th>
                        <th>IMG</th>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>


                    {
                        allCategory?.map((c, i) => (
                            <tr key={c?._id}>
                                <th>{i + 1}</th>
                                <th>
                                    <img src={c?.img} className={css2.categoryImg} alt="" />
                                </th>
                                <th>{c?.title}</th>
                                <th>
                                    <button 
                                    className={css2.deleteBtn}
                                    onClick={()=> deleteModal()}
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