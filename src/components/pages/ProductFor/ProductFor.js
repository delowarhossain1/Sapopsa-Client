import React from 'react';
import { useParams } from 'react-router-dom';
import PrimaryProductCard from '../../shared/PrimaryProductCard/PrimaryProductCard';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loading from "../../shared/Loading/Loading";

const ProductFor = () => {
    const { id } = useParams();

    const {data:products, isLoading} = useQuery(['product-for', id], ()=>(
        axios.get(`http://localhost:5000/product-for?thisIsFor=${id}`)
        .then(res => res?.data)
    ));

    // set loading status
    if(isLoading) <Loading />;

    return (
        <div className="margin-top">
            <div className='container'>

                <h1 style={{ textTransform: "uppercase", marginBottom: '20px', fontSize: '24px' }}>{id}'s {id === 'sports' ? 'collection' : 'fashion'}</h1>

                <div className='product-container'>

                    {
                        products?.map(product => (
                            <PrimaryProductCard
                                key={product?._id}
                                product={product} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductFor;