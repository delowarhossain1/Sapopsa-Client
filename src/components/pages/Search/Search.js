import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../shared/Loading/Loading';
import css from "../../../css/Search.module.css";
import css2 from "../../../css/categoriesProduct.module.css";
import PrimaryProductCard from '../../shared/PrimaryProductCard/PrimaryProductCard';

const Search = () => {
    const { text } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // start loading
        setLoading(true);

        fetch('/search', {
            headers: {
                search: text
            }
        })
            .then(res => res.json())
            .then(res => {
                setProducts(res);
                // stop loading. 
                setLoading(false);
            });
    }, [text]);

    // loading status
    if (loading) <Loading />;

    return (
        <div className='marginTop'>
            <div className='container'>
                <div className={css2.categoriesProducts}>
                    {
                        products?.map(product => (
                            <PrimaryProductCard key={product?._id} product={product} />
                        ))
                    }
                </div>
                {/* Product not found. */}
                {
                    products?.length === 0 &&
                    <div className={css.emptyProduct}>
                        Product not found.
                    </div>
                }
            </div>
        </div>
    );
};

export default Search;