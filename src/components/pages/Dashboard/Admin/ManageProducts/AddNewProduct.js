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
    const sizeChartLaval1 = useRef();
    const sizeChartLaval2 = useRef();
    const sizeChartLaval3 = useRef();
    const sizeChartLaval4 = useRef();
    const navigate = useNavigate();
    const [productUploading, setProductUploading] = useState(false);
    const [user, loading] = useAuthState(auth);
    const { simpleMessageDisplay, successFullModal } = useModal();
    const [productCLR, setProductCLR] = useState([]);
    const [specification, setSpecification] = useState([]);
    const [allSize, setAllSize] = useState([]);
    const [categories, setCategories] = useState({});
    const [sizeChartData, setSizeChatData] = useState([]);

    // Get all categories
    useEffect(() => {
        axios.get('/api/categories-list')
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

    // Handle size chart
    const handleSizeChart = () => {
        const label1 = sizeChartLaval1.current.value || "Title";
        const label2 = sizeChartLaval2.current.value || "Title";
        const label3 = sizeChartLaval3.current.value || "Title";
        const label4 = sizeChartLaval4.current.value || "Title";

        setSizeChatData([...sizeChartData, { label1, label2, label3, label4 }]);

        // Empty input field
        sizeChartLaval1.current.value = '';
        sizeChartLaval2.current.value = '';
        sizeChartLaval3.current.value = '';
        sizeChartLaval4.current.value = '';
    }

    // Handle add product
    const handleProduct = (event) => {
        // Set loading status;
        setProductUploading(true);

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


        if (displayIMG?.type?.match(reg) && galleryIMG?.length < 3) {
            const title = e.title.value;
            const price = e.price.value;
            const regularPrice = e.regularPrice.value;
            const thisIsFor = e.thisIsFor.value;
            const category = e.category.value;
            const des = e.des.value;

            const formData = new FormData();
            formData.append('title', title);
            formData.append('price', price);
            formData.append('regularPrice', regularPrice);
            formData.append('thisIsFor', thisIsFor);
            formData.append('category', category);
            formData.append('des', des);
            formData.append('galleryIMG', displayIMG);

            for (let file of galleryIMG) formData.append('galleryIMG', file);

            formData.append('size', JSON.stringify(allSize));
            formData.append('specification', JSON.stringify(specification));
            formData.append('colors', JSON.stringify(productCLR));
            formData.append('sizeChart', JSON.stringify(sizeChartData));

            // Update database
            const url = `/api/product?email=${user?.email}`;
            axios.post(url, formData, {
                headers: {
                    auth: `Bearer ${getAccessToken()}`
                }
            })
                .then(res => {
                    if (res?.data?.insertedId && res?.status === 200) {
                        // Set loading status;
                        setProductUploading(false);

                        successFullModal();
                        navigate('/dashboard/manage-products');
                    }
                    else {
                        // Set loading status;
                        setProductUploading(false);
                        // Error message
                        simpleMessageDisplay("Please try again.");
                    }
                });
        }
        else {
            // Set loading status;   
            setProductUploading(false);

            simpleMessageDisplay('Only image file can upload and Gallery image must be less then 3.');
        }
    }

    if (loading || productUploading) {
        return <Loading />
    }

    return (
        <div>
            <DashboardTitle title='Add New Product' />
            <PageTitle title='Add new product' />

            <form onSubmit={handleProduct}>
                <div className={css.row1}>
                    <label htmlFor="title">Title</label>
                    <input type='text' id='title' name='title' placeholder='Product title' required />
                </div>

                <div className={css.row2}>
                    {/* product size */}
                    <div>
                        <div className={css.sizeBtn}>
                            <label htmlFor="size">
                                <span>Size :</span>

                                {
                                    allSize?.map((btn, i) => (
                                        <button
                                            title='click to remove'
                                            type="button"
                                            onClick={() => removeSize(i)}
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

                    <div className={css.priceBox}>
                        <div>
                            <label htmlFor="regularPrice">Regular Price</label>
                            <input type='number' name='regularPrice' id='regularPrice' placeholder='Regular Price' min='1' required autoComplete='off' />
                        </div>

                        <div>
                            <label htmlFor="price">Price</label>
                            <input type='number' name='price' id='price' placeholder='Price' min='1' required autoComplete='off' />
                        </div>
                    </div>


                    <div>
                        <label htmlFor="for">For</label>
                        <select id='for' name='thisIsFor' required>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="sports">Sports</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="category">Category</label>
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
                        <label htmlFor="displayIMG">Display IMG</label>
                        <input type="file" id='displayIMG' name="displayIMG" required />
                    </div>

                    <div>
                        <label htmlFor="galleryIMG">Gallery IMG</label>
                        <input type="file" id='galleryIMG' name="galleryIMG" multiple required />
                    </div>

                    <div>
                        <div className={css.colorBox}>
                            <label htmlFor="colorPic">Color : </label>
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
                        <label htmlFor="des">Description</label>
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


                {/* Size chart */}
                <div className={css.sizeChart}>
                    <div>
                        <h4>Size chart</h4>
                        <div>
                            <input type="text" placeholder='Label 1' ref={sizeChartLaval1} />
                            <input type="text" placeholder='Label 2' ref={sizeChartLaval2} />
                        </div>
                        <div>
                            <input type="text" placeholder='Label 3' ref={sizeChartLaval3} />
                            <input type="text" placeholder='Label 4' ref={sizeChartLaval4} />
                        </div>

                        <button type='button' onClick={handleSizeChart}>Add</button>
                    </div>

                    {/* Size chart display */}
                    <div>
                        <table>
                            {
                                sizeChartData?.map((list, index) => (
                                    <tr key={index * Math.random()}>
                                        <td>{list?.label1}</td>
                                        <td>{list?.label2}</td>
                                        <td>{list?.label3}</td>
                                        <td>{list?.label4}</td>
                                    </tr>
                                ))
                            }
                        </table>
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