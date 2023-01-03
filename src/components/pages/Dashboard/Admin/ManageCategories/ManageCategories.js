import React from 'react';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/ManageCategories.module.css";
import { Link } from 'react-router-dom';

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

export default ManageCategories;