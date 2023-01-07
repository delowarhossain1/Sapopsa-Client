import React from 'react';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/ManageCategories.module.css";
import css2 from "../../../../../css/Table.module.css";
import { Link } from 'react-router-dom';
import img1 from "../../../../../images/1.jpg";

const ManageCategories = () => {
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

export default ManageCategories;