import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PrimaryProductCard from './../../shared/PrimaryProductCard/PrimaryProductCard';

const CategoriesProducts = () => {
    const { cty } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/categories-products?cty=${cty}`;

        fetch(url)
            .then(res => res.json())
            .then(res => setProducts(res));

    }, [cty]);



    return (
        <div className='margin-top'>
            <div className='container'>
                <h1 style={{ textTransform: "uppercase", marginBottom: '20px', fontSize: '24px' }}> {cty?.split('-').join(' ')} </h1>

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
        </div >
    );
};

export default CategoriesProducts;