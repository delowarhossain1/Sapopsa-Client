import React, { useState } from 'react';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/ManageProduct.module.css";

const AddNewProduct = () => {
    const [displayIMG, setDisplayIMG] = useState(null);
    const [galleryIMG, setGalleryIMG] = useState([]);


    return (
        <div>
            <DashboardTitle title='Add New Product' />
            <PageTitle title='add new product' />

            <form>
                <div className={css.row1}>
                    <label for="title">Title</label>
                    <input type='text' id='title' name='title' placeholder='Product title' />
                </div>

                <div className={css.row2}>
                    {/* product size */}
                    <div>
                        <div className={css.sizeBtn}>
                            <label for="size">Size</label>
                            <input type='text' id='size' placeholder='M, L, XL' />
                        </div>
                    </div>

                    <div>
                        <label for="price">Price</label>
                        <input type='number' id='price' placeholder='$100' min='1' />
                    </div>


                    <div>
                        <label for="for">For</label>
                        <select id='for'>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="sports">Sports</option>
                        </select>
                    </div>

                    <div>
                        <label for="category">Category</label>
                        <select id='category'>
                            <option value="male">Male</option>
                        </select>
                    </div>

                    <div>
                        <label for="shipping">Shipping</label>
                        <select id='shipping'>
                            <option value="male">Dhaka</option>
                        </select>
                    </div>
                </div>

                <div className={css.row4}>
                    <div>
                        <label for="displayIMG">Display IMG</label>
                        <input type="file" id='displayIMG' name="" />
                    </div>

                    <div>
                        <label for="galleryIMG">Gallery IMG</label>
                        <input type="file" id='galleryIMG' name="galleryIMG" multiple />
                    </div>

                </div>

                <div className={css.row3}>
                    <div>
                        <label for="des">Description</label>
                        <textarea name='des' id='des' placeholder='Description'></textarea>
                    </div>

                    <div className={css.specBox}>
                        <div>
                            <label for="spe">Specification</label>

                            <div>

                            </div>
                        </div>


                        <div className={css.addList}>
                            <input type="text" name="" placeholder='Specification' />
                            <button type="button">Add</button>
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