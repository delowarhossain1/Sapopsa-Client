import React from 'react';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/AddNewCategory.module.css";

const AddNewSlider = () => {

    const handleSubmit = () =>{
        fetch('http://localhost:5000/sliders', {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({name : "delowar"})
        })
    }

    return (
        <div>
            <DashboardTitle title='Add new slider' />

            <div className={css.newCategoryFrom}>
                <form className={css.form} onSubmit={handleSubmit}>
                    <h4>Add new slider</h4>
                    <input type="text" placeholder='Slider Title' name="" />
                    <input type='file' name="" />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddNewSlider;