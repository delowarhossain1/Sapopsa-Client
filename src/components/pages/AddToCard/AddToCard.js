import React, { useEffect, useState } from 'react';
import PageTitle from '../../shared/PageTitle/PageTitle';
import { getProducts, removeProduct } from "../../../utilites/addToCard";
import { Link } from 'react-router-dom';
import { getAccessToken } from '../../../utilites/setAndGetAccessToken';

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

    // Payment button
    const handlePayment = () => {
        const products = getProducts();
        const url = `http://localhost:5000/create-checkout-session`;

        fetch(url, {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                auth : `${getAccessToken()}`
            },
            body : JSON.stringify(products)
        })
        .then(res => res.json())
        .then(res => {
            if(res?.url){
                window.location.href = res?.url;
            }
        })
        .catch(err => console.log(err))
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
                                                    <p>{product?.title?.length > 30 ? product.title.slice(0, 30) + '..' : product.title}</p>
                                                    <small>Prices: ${product?.price}</small> <br/>
                                                    <small>Size: {product?.size}</small>
                                                    <br />

                                                    <p style={{ cursor: 'pointer', marginTop: '7px' }} onClick={()=> removeCardItem(product.id)}>Remove</p>
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
                            {/* <Link to="/checkout"> */}
                                <button type="button" 
                                disabled={products.length > 0 ? false : true}
                                onClick={handlePayment}
                                >Place Order</button>
                            {/* </Link> */}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default AddToCard;