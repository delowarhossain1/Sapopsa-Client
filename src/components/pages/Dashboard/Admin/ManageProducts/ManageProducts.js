import React from 'react';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/Table.module.css";
import css2 from "../../../../../css/ManageProduct.module.css";
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from "../../../../../utilites/setAndGetAccessToken";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import useModal from './../../../../../hooks/useModal';
import Loading from '../../../../shared/Loading/Loading';
import { useQuery } from 'react-query';
import axios from 'axios';
import EuroSign from './../../../../shared/EuroSign/EuroSign';

const ManageProducts = () => {
    const navigate = useNavigate();
    const { deleteModal, successFullModal } = useModal();
    const [user, userLoading] = useAuthState(auth);


    const {data:products, refetch,  isLoading} = useQuery(['manage-products', user], ()=>(
        axios.get(`/api/products?email=${user?.email}`, {
            headers : {auth: `Bearer ${getAccessToken()}`}
        })
        .then(res => res.data)
    ))


    // Delete product
    const deleteProduct = (id) => {
        if (user) {
            deleteModal(() => {
                fetch(`/api/product/${id}?email=${user?.email}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        auth: `Bearer ${getAccessToken()}`
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res?.deletedCount) {
                            successFullModal();
                            refetch();
                        }
                    })
            });
        }
    }

    if (userLoading || isLoading) {
        return <Loading />
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
                            <th>Category</th>
                            <th>For</th>
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
                                    <th><EuroSign price={product?.price} /></th>
                                    <th>{product?.category}</th>
                                    <th>{product?.thisIsFor}</th>

                                    <th>{product?.title?.length > 15 ? product?.title.slice(0, 15) + '..' : product?.title}</th>

                                    <th>
                                        <button
                                            className={css2.deleteBtn}
                                            onClick={() => deleteProduct(product._id)}
                                        >Delete</button>
                                        
                                        <button 
                                            className={css2.detailsBtn}
                                            onClick={()=> navigate(`details/${product?._id}`)}
                                        >Details</button>
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