import React from 'react';
import Navbar from '../../shared/Navbar/Navbar';
import PageTitle from '../../shared/PageTitle/PageTitle';
import { getProducts, removeProduct } from "../../../utilites/addToCard";

const AddToCard = () => {
    const products = getProducts();

    return (
        <>
            <PageTitle title='You added this products' />
            <Navbar />

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
                                                    <small>Prices: ${product?.price}</small>
                                                    <br />

                                                    <p style={{cursor : 'pointer', marginTop : '7px'}} onClick={()=> removeProduct()}>Remove</p>
                                                </div>
                                            </div>

                                        </td>
                                        <td>
                                            <input type="number" value="1" />
                                        </td>
                                        <td>
                                            $70.00
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="tatalPrice">
                            <table>
                                <tbody>
                                    <td>Subtotal</td>
                                    <td>$200.00</td>
                                </tbody>
                            </table>
                        </div>
                        <div className="plOrder">
                            <a href="/places-order.html"> <button type="button">Place Order</button></a>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default AddToCard;