import React from 'react';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/Table.module.css";
import css2 from "../../../../../css/ManageProduct.module.css";
import { useNavigate } from 'react-router-dom';
import img1 from "../../../../../images/1.jpg";

const ManageProducts = () => {
    const navigate = useNavigate();

    return (
        <div>
            <DashboardTitle title='Products' />
            <PageTitle title='manage products' />

            <div className={css2.addNewBtn}>
                <button onClick={()=> navigate('add-new-product')}>Add New Product</button>
            </div>

            <div>
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
                                <img src={img1} alt="" className={css2.displayImg} />
                            </th>
                            <th>This is a title.</th>
                            <th>
                                <button className={css2.deleteBtn}>Delete</button>
                            </th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;