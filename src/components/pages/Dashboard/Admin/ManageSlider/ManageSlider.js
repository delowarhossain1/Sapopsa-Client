import React from 'react';
import DashboardTitle from '../../DashboardTitle';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import css from "../../../../../css/ManageSlider.module.css";
import css2 from "../../../../../css/Table.module.css";
import { Link } from 'react-router-dom';
import img1 from "../../../../../images/1.jpg";

const ManageSlider = () => {
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

                    <tr>
                        <th>01</th>
                        <th>
                            <img src={img1} className={css2.categoryImg} alt="" />
                        </th>
                        <th>This is a title.</th>
                        <th>
                            <button className={css2.deleteBtn}>Delete</button>
                        </th>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default ManageSlider;