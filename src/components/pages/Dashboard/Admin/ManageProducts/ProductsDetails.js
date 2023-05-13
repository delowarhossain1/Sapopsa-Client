import React, { useEffect, useState } from 'react';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import DashboardTitle from '../../DashboardTitle';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../../../../firebase.init';
import Loading from '../../../../shared/Loading/Loading';
import css from "../../../../../css/ProductDetail.module.css"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { CgHashtag } from 'react-icons/cg';
import { GrEdit } from 'react-icons/gr';

const ProductsDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [user, userLoading] = useAuthState(auth);
    const [product, setProduct] = useState({});

    useEffect(() => {

        const url = `/api/get-product/${id}`;
        axios.get(url)
            .then(res => {
                setProduct(res.data);
                setLoadingStatus(false);
            });
    }, [user, id]);


    // Set loading status
    if (userLoading || loadingStatus) <Loading />;

    const {_id, category, colors, description, galleryIMG, img, price, size, specification, thisIsFor, title } = product;

    return (
        <div>
            <PageTitle title='Product details' />
            <DashboardTitle title="Product Details" />

            <div className={css.ProductEditBtn}>
                <button
                    onClick={()=> navigate(`/dashboard/manage-products/details/edit/${_id}`)}
                >Edit <GrEdit /></button>
            </div>

            <div>
                {/* Title */}
                <div className={css.bg}>
                    <p className={css.title}>{title}</p>
                </div>

                <div className={css.productMeta}>
                    <div className={css.images}>
                        <div className={css.displayImg}>
                            <img src={img} alt=''/>
                        </div>

                        <div className={css.gallery}>
                            {
                                galleryIMG?.map((gImg, index) => (
                                    <div
                                        key={index * Math.random()}
                                        className={css.galleryImg}>
                                        <img src={gImg} alt=''/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={css.metaInfo}>
                        <p>For : {thisIsFor}</p>
                        <p>Category : {category}</p>
                        <p>Price : ${price}</p>

                        <div className={css.size}>
                            <span>Size : </span>
                            <div>
                                {
                                    size?.map((s, i) => (
                                        <button
                                            key={i * Math.random()}
                                            className={css.colorBtn}
                                            type="button"
                                        >
                                            {s}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                        <div className={css.colors}>
                            <span>Color : </span>
                            <div>
                                {
                                    colors?.map((c, i) => (
                                        <span
                                            key={i * Math.random()}
                                            className={css.colorBtn}
                                            style={{background : c}}
                                        ></span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4>Specification</h4>
                        <ul className={css.specList}>
                            {
                                specification?.map((item, index) => (
                                    <li key={index * Math.random()}>
                                        <CgHashtag />
                                        <span>{item}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className={css.description}>
                    <p>Description : </p>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductsDetails;