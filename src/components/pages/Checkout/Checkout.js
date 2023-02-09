import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../shared/Loading/Loading';
import PageTitle from '../../shared/PageTitle/PageTitle';
import cardPay from "../../../images/card-pay.png";
import css from "../../../css/checkout.module.css";
import { getProducts } from '../../../utilites/addToCard';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ setCheckoutInfo }) => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [isAgree, setIsAgree] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const storedProducts = getProducts();
        setProducts(storedProducts);
    }, []);

    // Product calculation
    const subTotal = products.reduce((sTotal, items) => items.totalPrice + sTotal, 0);
    const total = subTotal;

    const handleCheckoutInfo = (event) => {
        event.preventDefault();
        const date = new Date();
        const e = event.target;
        const name = user?.displayName;
        const email = user?.email;
        const phone = e.phone.value;
        const addressLineOne = e.addressOne.value;
        const addressLineTwo = e.addressTwo.value;
        const shippingArea = e.shippingArea.value;

        const info = {
            total,
            products,
            status : 'Pending',
            isMultipleOrder : products.length > 1,
            placed : {
                date : date.toDateString(),
                time : date.toLocaleTimeString()
            },
            dailyveryInfo : {
                name,
                email,
                phone,
                addressLineOne,
                shippingArea,
                addressLineTwo : addressLineTwo || 'N/A'
            }
        }

        setCheckoutInfo(info);
        navigate('/payment')
    }

    if (loading) {
        <Loading />
    }


    return (
        <div>
            <PageTitle title='shipping info' />
            <div className="container">
                <div className="smallContainer">
                    <div className="marginTop">

                        <div className="cInf">
                            <h2>Shipping Info</h2>
                        </div>

                        <div className={css.checkoutInfoCont}>

                            <div className={css.productInfo}>

                                {
                                    products?.map(product => (
                                        <div className={css.productList} key={product?.id}>
                                            <img src={product?.img} alt="product" />

                                            <div>
                                                <span>{product?.title.length > 20 ? product.title.slice(0, 20) + '...' : product?.title}</span>
                                                <span>Price : ${product.price}</span>
                                                <span>Size : {product.size}</span>
                                                <span>Qty : {product.quantity}</span>
                                            </div>
                                        </div>
                                    ))
                                }


                                <div className={css.subTotal}>
                                    <span>Sub total : ${subTotal}</span>
                                    <span>Shipping : $120</span>
                                    <span>Total : $120</span>
                                </div>
                            </div>

                            <div className={css.checkOutInfo}>
                                <div className="checkoutInfo">
                                    <div className="checkIn">
                                        <div className="checkFrom">
                                            <form onSubmit={handleCheckoutInfo} className={css.form}>
                                                <br /> <br />

                                                <label for="">Name</label>
                                                <input className="maxWidht" type="text" placeholder="Full Name" value={user?.displayName} readOnly disabled /> <br /><br />

                                                <div className="minWidht">
                                                    <label for="email">Email</label>
                                                    <input type="email" id='email' placeholder="Email" value={user?.email} readOnly disabled />

                                                    <label for="number">Phone</label>
                                                    <input type="number" id='number' placeholder="Phone Number" name='phone' required />
                                                </div>

                                               <div className={css.selectOption}>
                                                    <label for="">Shipping area</label>
                                                    <select name='shippingArea'>
                                                        <option value="">Dhaka - 50tk</option>
                                                    </select>
                                               </div>

                                                <div className="minWidht">
                                                    <label for="add">Address</label>

                                                    <input type="text" placeholder="Address line 1" name='addressOne' id='add' required />
                                                    <input type="text" placeholder="Address line 2" name='addressTwo' />
                                                </div><br />

                                                <br />
                                                <div className="note">
                                                    *Approximate shipping duration is 7-10 days. Tracking id and tracking link will be sent via
                                                    email after the products are shipped.
                                                </div>
                                                <br />
                                                <div className="form-check form-check-inline payment-method-selector"
                                                    style={{ width: '270px !important' }}>
                                                    <label className="form-cimport { useAuthState } from 'react-firebase-hooks/auth' heck-label">
                                                        <input className="foimport { useNavigate } from 'react-router-dom';
rm-check-input payment-method-radio" type="radio" name="payment_method"
                                                            value="ssl_card" checked="" />
                                                        <img src={cardPay} className="payment-method-logo" alt="" />
                                                    </label>
                                                </div>
                                                <br />
                                                <br />
                                                <div className="alert-container"></div>

                                                <input className="tnc-check" style={{ display: 'inline-block', marginRight: '5px' }} type="checkbox" onClick={(e) => setIsAgree(e.target.checked)} />

                                                <span style={{ display: 'inline' }}>I agree to <a href="/terms" target="_blank">Terms &amp;
                                                    Conditions</a>, <a href="/refund-policy" target="_blank">Refund Policy</a> and <a
                                                        href="/privacy-policy" target="_blank">Privacy Policy</a> of sapopsa.</span>
                                                <br /><br />


                                                <button
                                                    className={`btN ${!isAgree ? 'disabledPlaceOrderBtn' : ''}`}
                                                    type="submit"
                                                    name="button"
                                                    disabled={!isAgree}
                                                >Place order</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;