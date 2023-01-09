import React, { useEffect, useState } from 'react';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/Table.module.css";
import css2 from "../../../../../css/ManageProduct.module.css";
import { useNavigate } from 'react-router-dom';
import img1 from "../../../../../images/1.jpg";
import { getAccessToken } from "../../../../../utilites/setAndGetAccessToken";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import useModal from './../../../../../hooks/useModal';

const ManageProducts = () => {
    const navigate = useNavigate();
    const {deleteModal} = useModal();
    const [user, userLoading] = useAuthState(auth);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/products?email=${user?.email}`, {
            headers: {
                auth: `Bearer ${getAccessToken()}`
            }
        })
            .then(res => res.json())
            .then(res => setProducts(res));

    }, [user]);


    // Delete product
    const deleteProduct = (id) => {
        deleteModal()
    }

    return (
        <div>
            <DashboardTitle title='Products' />
            <PageTitle title='manage products' />

            <div className={css2.addNewBtn}>
                <button onClick={() => navigate('add-new-product')}>Add New Product</button>
            </div>

            <div>
                <div style={{ overflowX: 'auto' }}>
                    <table className={css.table}>
                        <tr>
                            <th>#No.</th>
                            <th>IMG</th>
                            <th>Price</th>
                            <th>Title</th>
                            <th>Action</th>
                        </tr>

                        {
                            products?.map((product, i) => (
                                <tr key={product?._id}>
                                    <th>{i + 1}</th>
                                    <th>
                                        <img src={product?.img} alt="product" className={css2.displayImg} />
                                    </th>
                                    <th>${product?.price}</th>
                                    <th>{product?.title}</th>
                                    <th>
                                        <button 
                                        className={css2.deleteBtn}
                                            onClick={()=> deleteProduct(product._id)}
                                        >Delete</button>
                                    </th>
                                </tr>
                            ))
                        }
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;