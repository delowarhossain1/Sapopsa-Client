import React, { useEffect, useState } from 'react';
import PageTitle from '../../shared/PageTitle/PageTitle';
import { getProducts, removeProduct } from "../../../utilites/addToCard";
import {Link} from "react-router-dom"

const AddToCard = ({refetch, reFetchValue}) => {
    const [reload, setReload] = useState(false);
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const storedProducts = getProducts();
        setProducts(storedProducts);
    }, [reload]);

    // Remove product 
    const removeCardItem = (id) => {
        removeProduct(id);
        setReload(!reload);
        refetch(!reFetchValue);
    }

    // calculate 
    const totalAmunt = products.reduce((s, p) => p.totalPrice + s, 0);

    return (
        <>
            <PageTitle title='You added this products' />

            <div className="container">
                <div className="smallContainer">
                    <div className="marginTop">
                        <h2 className="cartTitle">Your Cart</h2>
                        <table className="cartTable">
                            <tbody>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                </tr>
                                {products?.map((product, i) => (
                                    <tr key={i * Math.random()}>
                                        <td>
                                            <div className="cartInfo">
                                                <img width="100px" src={product?.img} alt="product" />
                                                <div>
                                                    <h3>{product?.title?.length > 30 ? product.title.slice(0, 30) + '..' : product.title}</h3>
                                                    <p>Price: ${product?.price}</p>
                                                    <p>Size: {product?.size}</p>

                                                    <p className='selectedColorBtn'>
                                                        Color: 
                                                        <span style={{background : product?.color}}></span>
                                                    </p>
                                            
                                                    <p style={{ cursor: 'pointer', marginTop: '7px', color : 'blue' }} onClick={()=> removeCardItem(product.id)}>Remove</p>
                                                </div>
                                            </div>

                                        </td>
                                        <td>
                                            <span>{product.quantity}</span>
                                        </td>
                                        <td>
                                            ${product?.totalPrice}
                                        </td>
                                    </tr>
                                ))}

                                {/* If add to empty */}
                                {
                                    products?.length === 0 &&

                                    <div className='empty-card'>
                                        <p>Your card is empty. <Link to='/'>Shopping</Link></p>
                                    </div>
                                }
                            </tbody>
                        </table>
                        <div className="tatalPrice">
                            <table>
                                <tbody>
                                    <td>Subtotal</td>
                                    <td>${totalAmunt}</td>
                                </tbody>
                            </table>
                        </div>
                        <div className="plOrder">
                            <Link to="/checkout">
                                <button type="button" 
                                disabled={products.length > 0 ? false : true}
                                >Place Order</button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default AddToCard;