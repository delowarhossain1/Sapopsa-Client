import React from 'react';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/ManageProduct.module.css";

const AddNewProduct = () => {
    return (
        <div>
            <DashboardTitle title='Add New Product' />
            <PageTitle title='add new product' />

            <form>
                <div className={css.row1}>
                    <input type='text' placeholder='Product title' />
                </div>

                <div className={css.row2}>
                    {/* product size */}
                    <div>
                        <h4>Size : </h4>

                        <div className={css.sizeBtn}>
                            <input type='text' placeholder='Size : M' />
                            <button type='button'>Add Size</button>
                        </div>


                    </div>

                    <input type='number' placeholder='$ Product price' min='1' />


                    <select>
                        <option>This is for...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="sports">Sports</option>
                    </select>

                    <select>
                        <option>This is for...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="sports">Sports</option>
                    </select>


                </div>

                <div className={css.row3}>
                    <textarea placeholder='Description'></textarea>
                    <textarea placeholder='Specification'></textarea>
                </div>


                <button type="submit" className={css.submitBtn}>Submit</button>
            </form>
        </div>
    );
};

export default AddNewProduct;