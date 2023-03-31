import React, { useEffect, useRef, useState } from 'react';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/ManageProduct.module.css";
import { MdOutlineClose } from 'react-icons/md';
import useModal from './../../../../../hooks/useModal';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../../../../firebase.init';
import Loading from './../../../../shared/Loading/Loading';
import axios from "axios";
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import { useNavigate } from 'react-router-dom';

const AddNewProduct = () => {
    const clrRef = useRef();
    const speciRef = useRef();
    const sizeRef = useRef();
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const { simpleMessageDisplay, successFullModal } = useModal();
    const [productCLR, setProductCLR] = useState([]);
    const [specification, setSpecification] = useState([]);
    const [allSize, setAllSize] = useState([]);
    const [categories, setCategories] = useState({});

    // Get all categories
    useEffect(()=>{
        axios.get('/categories-list')
            .then(res => setCategories(res?.data));
    }, [])


    // Set color 
    const handleColor = () => {
        const color = clrRef.current.value;
        if (color) {
            const newColor = [...productCLR, color];
            setProductCLR(newColor);
        }
    }

    // Remove color 
    const removeColor = (index) => {
        const rest = productCLR?.filter((clr, i) => i !== index);
        setProductCLR(rest);
    }

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

    // Add size 
    const handleSize = () => {
        let size = sizeRef.current.value;
        if (size) {
            const newSize = [...allSize, size];
            setAllSize(newSize);
            sizeRef.current.value = '';
        }
    }

    // Remove size
    const removeSize = (index) => {
        const rest = allSize.filter((btn, i) => i !== index);
        setAllSize(rest);
    }

    // Handle add product
    const handleProduct = (event) => {
        event.preventDefault();
        const e = event.target;
        const reg = /image.*/;
        const displayIMG = e.displayIMG.files[0];
        const galleryIMG = e.galleryIMG.files;

        // Verify file
        for (let file of galleryIMG) {
            if (!file?.type?.match(reg)) {
                simpleMessageDisplay('Only image file can upload.');
                return;
            }
        }


        if (displayIMG?.type?.match(reg) && galleryIMG?.length < 4) {
            const title = e.title.value;
            const price = e.price.value;
            const thisIsFor = e.thisIsFor.value;
            const category = e.category.value;
            const des = e.des.value;

            const formData = new FormData();
            formData.append('title', title);
            formData.append('price', price);
            formData.append('thisIsFor', thisIsFor);
            formData.append('category', category);
            formData.append('des', des);
            formData.append('galleryIMG', displayIMG);

            for (let file of galleryIMG) formData.append('galleryIMG', file);

            // Set product size
            if(allSize?.length > 0){
                for (let s of allSize) formData.append('size', s);
            }
            else{
                formData.append('size', '')
            }

            // Set specification
            if(specification?.length > 0){
                for (let spe of specification) formData.append('specification', spe);
            }
            else{
                formData.append('specification', []); 
            }

            // Set colors
            if(productCLR?.length > 0){
                for (let clr of productCLR) formData.append('colors', clr);
            }
            else{
                formData.append('colors', []);
            }

            // Update database
            const url = `/product?email=${user?.email}`;
            axios.post(url, formData, {
                headers : {
                    auth : `Bearer ${getAccessToken()}`
                }
            })
            .then(res => {
                if(res?.data?.insertedId && res?.status === 200){
                    successFullModal();
                    navigate('/dashboard/manage-products');
                }
            });
        }
        else {
            simpleMessageDisplay('Only image file can upload and Gallery image must be less then 4.');
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <DashboardTitle title='Add New Product' />
            <PageTitle title='Add new product' />

            <form onSubmit={handleProduct}>
                <div className={css.row1}>
                    <label for="title">Title</label>
                    <input type='text' id='title' name='title' placeholder='Product title' required/>
                </div>

                <div className={css.row2}>
                    {/* product size */}
                    <div>
                        <div className={css.sizeBtn}>
                            <label for="size">
                                <span>Size :</span>

                                {
                                    allSize?.map((btn, i)=> (
                                        <button 
                                            title='click to remove'
                                             type="button"
                                             onClick={()=> removeSize(i)}
                                             key={i}
                                            >{btn}</button>
                                    ))
                                }

                            </label>
                            <div className={css.sizeAddingBox}>
                                <input type='text' id='size' placeholder='XL' ref={sizeRef} />
                                <button type="button" onClick={handleSize}>Add</button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label for="price">Price</label>
                        <input type='number' name='price' id='price' placeholder='$100' min='1' required />
                    </div>


                    <div>
                        <label for="for">For</label>
                        <select id='for' name='thisIsFor' required>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="sports">Sports</option>
                        </select>
                    </div>

                    <div>
                        <label for="category">Category</label>
                        <select id='category' name='category' required>
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

                <div className={css.row4}>
                    <div>
                        <label for="displayIMG">Display IMG</label>
                        <input type="file" id='displayIMG' name="displayIMG" required/>
                    </div>

                    <div>
                        <label for="galleryIMG">Gallery IMG</label>
                        <input type="file" id='galleryIMG' name="galleryIMG" multiple required/>
                    </div>

                    <div>
                        <div className={css.colorBox}>
                            <label for="colorPic">Color : </label>
                            <div>
                                {
                                    productCLR?.map((clr, i) => (
                                        <button
                                            type='button'
                                            title='click to remove'
                                            key={i}
                                            style={{ background: clr }}
                                            className={css.colorBTN}
                                            onClick={() => removeColor(i)}
                                        ></button>
                                    ))
                                }
                            </div>
                        </div>

                        <div className={css.colorPicker}>
                            <input type='color' id='colorPic' ref={clrRef} />
                            <button type="button" onClick={handleColor}>Add Color</button>
                        </div>
                    </div>
                </div>

                <div className={css.row3}>
                    <div>
                        <label for="des">Description</label>
                        <textarea name='des' id='des' placeholder='Description' required></textarea>
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
                    <button type="submit" className={css.submitBtn}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddNewProduct;