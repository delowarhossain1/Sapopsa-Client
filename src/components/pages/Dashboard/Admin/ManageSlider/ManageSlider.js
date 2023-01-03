import React from 'react';
import DashboardTitle from '../../DashboardTitle';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import css from "../../../../../css/ManageSlider.module.css";
import { Link } from 'react-router-dom';

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
                        <th>01</th>
                        <th>This is a title.</th>
                        <th>
                            <button className={css.deleteBtn}>Delete</button>
                            <button className={css.editBtn}>Edit</button>
                        </th>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default ManageSlider;