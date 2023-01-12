import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../DashboardTitle';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import css from "../../../../../css/ManageSlider.module.css";
import css2 from "../../../../../css/Table.module.css";
import { Link } from 'react-router-dom';
import useModal from './../../../../../hooks/useModal';
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import Loading from '../../../../shared/Loading/Loading';

const ManageSlider = () => {
    const [reFetch, setReFetch] = useState(false);
    const [user, loading] = useAuthState(auth);
    const { deleteModal, successFullModal } = useModal();
    const [sliders, setSliders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/sliders',)
            .then(res => res.json())
            .then(res => setSliders(res));
    }, [reFetch]);


    // delete category
    const deleteSlider = (id) => {

        deleteModal(() => {
            if (user && id) {
                fetch(`http://localhost:5000/slider/${id}?email=${user?.email}`, {
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
                            setReFetch(true);
                        }
                    })
            }
        });

    }

    if(loading){
        return <Loading />
    }

    return (
        <div>
            <DashboardTitle title='Sliders' />
            <PageTitle title='manage sliders' />

            <div className={css.newBtn}>
                <button>
                    <Link to='add-new-slider'>Add new slider</Link>
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
                        sliders?.map((slider, i) => (
                            <tr key={slider?._id}>
                                <th>{i + 1}</th>
                                <th>
                                    <img src={slider?.img} className={css2.categoryImg} alt="" />
                                </th>
                                <th>{slider?.title}</th>
                                <th>
                                    <button
                                        className={css2.deleteBtn}
                                        onClick={() => deleteSlider(slider?._id)}
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

export default ManageSlider;