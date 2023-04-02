import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PrimaryProductCard from '../../shared/PrimaryProductCard/PrimaryProductCard';
import axios from 'axios';
import Loading from "../../shared/Loading/Loading";
import ProductNotFoundText from '../../shared/ProductNotFoundText/ProductNotFoundText';
import css from "../../../css/categoriesProduct.module.css"

const ProductFor = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // set loading status;
        setIsLoading(true);

        axios.get(`/api/product-for?thisIsFor=${id}`)
            .then(res => {
                // set loading status;
                setIsLoading(false);

                setProducts(res?.data)
            })
    }, [id])

    // set loading status
    if (isLoading) <Loading />;

    return (
        <div className="margin-top">
            <div className='container'>

                <h1 style={{ textTransform: "uppercase", marginBottom: '20px', fontSize: '24px' }}>{id}'s {id === 'sports' ? 'collection' : 'fashion'}</h1>

                <div className={css.categoriesProducts}>

                    {
                        products?.map(product => (
                            <PrimaryProductCard
                                key={product?._id}
                                product={product} />
                        ))
                    }
                </div>

                {/* Is product not available. */}

                {
                    products?.length === 0 && <ProductNotFoundText />
                }
                
            </div>
        </div>
    );
};

export default ProductFor;