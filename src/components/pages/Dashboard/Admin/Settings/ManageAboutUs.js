import React from 'react';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import DashboardTitle from '../../DashboardTitle';
import UpdateBtn from '../../../../shared/Button/UpdateBtn';
import css from "../../../../../css/settings.module.css";

const ManageAboutUs = () => {
    // const 
    return (
        <div>
            <PageTitle title='Manage about us' />
            <DashboardTitle title='Manage About Us' />

            <div>
                <div className={css.aboutUsText}>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>  
                </div>

                <form className={css.aboutUsForm}>
                    <textarea placeholder='About us' name='aboutus'></textarea>
                    <UpdateBtn />
                </form>
            </div>
        </div>
    );
};

export default ManageAboutUs;