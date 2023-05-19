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
    const { successFullModal } = useModal();
    const [specification, setSpecification] = useState([]);
    const [categories, setCategories] = useState({});
    const [user, isLoading] = useAuthState(auth);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({});
    const [title, setTitle] = useState('');
    const [thisIsFor, setThisIsFor] = useState('');
    const [regularPrice, setRegularPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    // Product category list
    useEffect(() => {
        axios.get('/api/categories-list')
            .then(res => setCategories(res?.data));
    }, []);

    // get product
    useEffect(() => {
        // Loading status
        setLoading(true);

        fetch(`/api/get-product/${id}`)
            .then(res => res.json())
            .then(res => {
                setProduct(res);
                setLoading(false);
            });
    }, [id]);

    // Set previous product info;
    useEffect(() => {
        const { title, thisIsFor, regularPrice, price, category, description, specification } = product;

        setTitle(title);
        setThisIsFor(thisIsFor);
        setRegularPrice(regularPrice);
        setPrice(price);
        setCategory(category)
        setDescription(description);
        setSpecification(specification)
    }, [product]);

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
        const thisIsFor = t.thisIsFor.value;
        const category = t.category.value;


        const data = {
            title,
            thisIsFor,
            specification,
            category,
            description,
            price: Number(price),
            regularPrice: Number(regularPrice),
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

                    <input
                        type='text'
                        id='title'
                        name='title'
                        placeholder='Product Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                </div>

                <div className={css.row2}>


                    <div>
                        <label htmlFor="regularPrice">Regular Price</label>

                        <input
                            type='number'
                            name='regularPrice'
                            id='regularPrice'
                            placeholder='Regular Price'
                            min='1'
                            autoComplete='off'
                            value={regularPrice}
                            onChange={(e) => setRegularPrice(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="price">Price</label>
                        <input
                            type='number'
                            name='price'
                            id='price'
                            placeholder='Price'
                            min='1'
                            autoComplete='off'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>



                    {/* Product for */}
                    <div>
                        <label htmlFor="for">For</label>
                        <select id='for' name='thisIsFor'>
                            <option
                                value="male"
                                selected={thisIsFor === 'male'}
                            >Male</option>

                            <option
                                value="female"
                                selected={thisIsFor === 'female'}
                            >Female</option>

                            <option
                                value="sports"
                                selected={thisIsFor === 'sports'}
                            >
                                Sports
                            </option>

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
                                        value={c?.route}
                                        selected={category === c?.route}
                                    >

                                        {c?.title}

                                    </option>
                                ))
                            }
                            {
                                categories?.women?.map(c => (
                                    <option
                                        key={c?._id}
                                        value={c?.route}
                                        selected={category === c?.route}
                                    >
                                        {c?.title}
                                    </option>
                                ))
                            }
                            {
                                categories?.sports?.map(c => (
                                    <option
                                        key={c?._id}
                                        value={c?.route}
                                        selected={category === c?.route}
                                    >
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
                        <textarea
                            name='des'
                            id='des'
                            value={description}
                            placeholder='Description'
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
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