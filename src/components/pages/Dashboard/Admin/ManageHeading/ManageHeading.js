import React from 'react';
import DashboardTitle from './../../DashboardTitle';
import css from "../../../../../css/ManageHeading.module.css";

const ManageHeading = () => {
    return (
        <div>
            <DashboardTitle title='Heading' />

            <div>
                <div style={{background: '#ddd', padding : '4px'}}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly</div>

                <form className={css.form}>
                    <textarea placeholder='Update Heading'></textarea>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default ManageHeading;