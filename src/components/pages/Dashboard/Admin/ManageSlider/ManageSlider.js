import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../DashboardTitle';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import css from "../../../../../css/ManageSlider.module.css";
import css2 from "../../../../../css/Table.module.css";
import { Link } from 'react-router-dom';
import useModal from './../../../../../hooks/useModal';

const ManageSlider = () => {
    const {deleteModal} = useModal();
    const [sliders, setSliders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/sliders',)
            .then(res => res.json())
            .then(res => setSliders(res));
    }, []);

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

export default ManageSlider;