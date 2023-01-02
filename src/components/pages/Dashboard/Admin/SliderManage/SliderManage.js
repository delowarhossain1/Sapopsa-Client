import React from 'react';
import DashboardTitle from './../../DashboardTitle';
import PageTitle from './../../../../shared/PageTitle/PageTitle';
import css from "../../../../../css/ManageSlider.module.css";

const SliderManage = () => {
    return (
        <div>
            <DashboardTitle title='Sliders' />
            <PageTitle title='manage sliders' />

            <div>
                <div>
                    <button className={css.addNewBtn}>Add new</button>
                </div>

                <div>
                    
                </div>
            </div>
        </div>
    );
};

export default SliderManage;