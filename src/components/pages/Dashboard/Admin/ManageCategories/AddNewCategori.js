import React from 'react';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/AddNewCategory.module.css";

const AddNewCategori = () => {
    return (
        <div>
            <DashboardTitle title='Add new category' />

            <div className={css.newCategoryFrom}>
                <form className={css.form}>
                    <h4>Add new category</h4>
                    <input type="text" placeholder='Category Title' name="" />
                    <input type='file' name="" />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddNewCategori;