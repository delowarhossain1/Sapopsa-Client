import React, { useEffect, useState } from 'react';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import DashboardTitle from '../../DashboardTitle';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../../../../firebase.init';
import Loading from '../../../../shared/Loading/Loading';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductsDetails = () => {
    const { id } = useParams();
    const [user, userLoading] = useAuthState(auth);
    const [product, setProduct] = useState({});

    useEffect(() => {
        const url = `http://localhost:5000/get-product/${id}`;
        axios.get(url)
            .then(res => setProduct(res.data));
    }, [user, id]);

    console.log(product);
    // Set loading status
    if (userLoading) <Loading />;

    const {category, colors, description, galleryIMG, img, price, size, specification, thisIsFor, title, _id} = product;

    return (
        <div>
            <PageTitle title='Product details' />
            <DashboardTitle title="Product Details" />


        </div>
    );
};

export default ProductsDetails;