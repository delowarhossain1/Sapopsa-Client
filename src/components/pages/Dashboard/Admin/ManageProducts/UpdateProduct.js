import React, { useEffect, useRef, useState } from 'react';
import DashboardTitle from './../../DashboardTitle';
import PageTitle from './../../../../shared/PageTitle/PageTitle';
import axios from 'axios';
import { MdOutlineClose } from 'react-icons/md';
import css from "../../../../../css/ManageProduct.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../../../shared/Loading/Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import useModal from './../../../../../hooks/useModal';

const UpdateProduct = () => {
    const speciRef = useRef();
    const { id } = useParams();
    const navigate = useNavigate();
    const {successFullModal} = useModal();
    const [specification, setSpecification] = useState([]);
    const [categories, setCategories] = useState({});
    const [user, isLoading] = useAuthState(auth);
    const [loading, setLoading] = useState(false);

    // Product category list
    useEffect(() => {
        axios.get('/api/categories-list')
            .then(res => setCategories(res?.data));
    }, []);

    // Set specification
    const handleSpecification = () => {
        const speci = speciRef.current.value;
        if (speci) {
            const newSeci = [...specification, speci];
            setSpecification(newSeci);
            speciRef.current.value = '';
        }
    }

    // Remove specification
    const removeSpeci = (index) => {
        const rest = specification?.filter((spe, i) => i !== index);
        setSpecification(rest);
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        // update loading status
        setLoading(true);

        // info
        const t = e.target;
        const title = t.title.value;
        const regularPrice = t.regularPrice.value;
        const price = t.price.value;
        const thisIsFor = t.thisIsFor.value;
        const category = t.category.value;
        const description = t.des.value;

        const data = {
            title,
            thisIsFor,
            specification,
            category,
            description,
            price : Number(price),
            regularPrice : Number(regularPrice),
        }

        fetch(`/api/product/${id}?email=${user?.email}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                auth: `Bearer ${getAccessToken()}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res?.modifiedCount > 0) {
                    // update loading status
                    setLoading(false);
                    
                    navigate('/dashboard/manage-products');

                    successFullModal();
                }
            })

    }

    // loading status
    if (isLoading || loading) {
        return <Loading />
    }

    return (
        <div>
            <DashboardTitle title="Update Info" />
            <PageTitle title='Update product info' />

            <form onSubmit={handleUpdate}>
                <div className={css.row1}>
                    <label htmlFor="title">Title</label>
                    <input type='text' id='title' name='title' placeholder='Product Title' />
                </div>

                <div className={css.row2}>


                    <div>
                        <label htmlFor="regularPrice">Regular Price</label>
                        <input type='number' name='regularPrice' id='regularPrice' placeholder='Regular Price' min='1' autoComplete='off' />
                    </div>

                    <div>
                        <label htmlFor="price">Price</label>
                        <input type='number' name='price' id='price' placeholder='Price' min='1' autoComplete='off' />
                    </div>



                    {/* Product for */}
                    <div>
                        <label htmlFor="for">For</label>
                        <select id='for' name='thisIsFor'>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="sports">Sports</option>
                        </select>
                    </div>

                    {/* Product Category */}
                    <div>
                        <label htmlFor="category">Category</label>
                        <select id='category' name='category'>
                            {
                                categories?.men?.map(c => (
                                    <option
                                        key={c?._id}
                                        value={c?.route}>
                                        {c?.title}
                                    </option>
                                ))
                            }
                            {
                                categories?.women?.map(c => (
                                    <option
                                        key={c?._id}
                                        value={c?.route}>
                                        {c?.title}
                                    </option>
                                ))
                            }
                            {
                                categories?.sports?.map(c => (
                                    <option
                                        key={c?._id}
                                        value={c?.route}>
                                        {c?.title}
                                    </option>
                                ))
                            }

                        </select>
                    </div>

                </div>

                {/* Product description and speacification */}
                <div className={css.row3}>
                    <div>
                        <label htmlFor="des">Description</label>
                        <textarea name='des' id='des' placeholder='Description'></textarea>
                    </div>

                    <div className={css.specBox}>
                        <div>
                            <label>Specification</label>

                            <ul>
                                {
                                    specification?.map((spe, i) => (
                                        <li key={i}>
                                            <span>{spe}</span>
                                            <span><MdOutlineClose onClick={() => removeSpeci(i)} /></span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>


                        <div className={css.addList}>
                            <input type="text" placeholder='Specification' ref={speciRef} />
                            <button type="button" onClick={handleSpecification}>Add</button>
                        </div>
                    </div>
                </div>

                <div className={css.submitBtnArea}>
                    <button type="submit" className={css.submitBtn}>Update Info</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;