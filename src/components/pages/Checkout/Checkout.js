import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../shared/Loading/Loading';
import Navbar from '../../shared/Navbar/Navbar';
import PageTitle from '../../shared/PageTitle/PageTitle';
import cardPay from "../../../images/card-pay.png";

const Checkout = () => {
    const [user, loading] = useAuthState(auth);
    const [isAgree, setIsAgree] = useState(false);

    const handleCheckoutInfo = () => {
        const date = new Date();

        const info = {

            placed: {
                date: date.toDateString(),
                time: date.toLocaleTimeString()
            },

            productInfo: {
                img: '',
                title: ''
            },

            orderInfo: {
                status: 'Pending',
                quantity: 0,
                price: 0,
            },

            deliveryInfo: {
                name: '',
                email: '',
                address: '',
                house: '',
                zip: '',
                country: '',
                city: '',
            }

        }
    }

    if (loading) {
        <Loading />
    }

    return (
        <div>
            <PageTitle title='Checkout' />
            <Navbar />

            <div className="container">
                <div className="smallContainer">
                    <div className="marginTop">
                        <div className="checkoutInfo">
                            <div className="checkIn">
                                <div className="cInf">
                                    <h2>Checkout Info</h2>
                                    {/* <div className="checkFrom2">
                                        <a href="./cart.html">Modify Order</a>
                                    </div> */}
                                </div>
                                <div className="checkFrom">
                                    <form action="#">
                                        <br /> <br />

                                        <input className="maxWidht" type="text" placeholder="Full Name" value={user?.displayName} readOnly /> <br /><br />
                                        <div className="minWidht">
                                            <input type="email" placeholder="Email" value={user?.email} readOnly />
                                            <input type="text" placeholder="Phone Number" />
                                        </div>
                                        <br /><br />
                                        <label htmlFor="info">Shipping Info</label> <br /> <br />
                                        <input className="maxWidht" type="text" placeholder="House/Street" /> <br /><br />
                                        <div className="minWidht">
                                            <input type="text" placeholder="City" />
                                            <input type="text" placeholder="State/Province" /> <br />
                                        </div>
                                        <br />
                                        <div className="minWidht">
                                            <input type="text" placeholder="Post/Zip Code" />
                                            <select autoComplete="off" className="form-control width-half-left disctrict_select"
                                                name="district" id="district">
                                                <option value="Australia">Australia</option>
                                                <option value="Austria">Austria</option>
                                                <option value="Canada">Canada</option>
                                                <option value="China">China</option>
                                                <option value="Denmark">Denmark</option>
                                                <option value="France">France</option>
                                                <option value="Germany">Germany</option>
                                                <option value="Iceland">Iceland</option>
                                                <option value="India">India</option>
                                                <option value="Indonesia">Indonesia</option>
                                                <option value="Iran">Iran</option>
                                                <option value="Ireland">Ireland</option>
                                                <option value="Italy">Italy</option>
                                                <option value="Japan">Japan</option>
                                                <option value="Kazakhstan">Kazakhstan</option>
                                                <option value="Lithuania">Lithuania</option>
                                                <option value="Malaysia">Malaysia</option>
                                                <option value="Maldives">Maldives</option>
                                                <option value="Mauritius">Mauritius</option>
                                                <option value="Nepal">Nepal</option>
                                                <option value="Netherlands">Netherlands</option>
                                                <option value="New Zealand">New Zealand</option>
                                                <option value="Norway">Norway</option>
                                                <option value="Oman">Oman</option>
                                                <option value="Pakistan">Pakistan</option>
                                                <option value="Philippines">Philippines</option>
                                                <option value="Poland">Poland</option>
                                                <option value="Portugal">Portugal</option>
                                                <option value="Singapore">Singapore</option>
                                                <option value="Somalia">Somalia</option>
                                                <option value="Saudi Arabia">Saudi Arabia</option>
                                                <option value="Spain">Spain</option>
                                                <option value="South Africa">South Africa</option>
                                                <option value="SriLanka">SriLanka</option>
                                                <option value="Sweden">Sweden</option>
                                                <option value="Switzerland">Switzerland</option>
                                                <option value="Thailand">Thailand</option>
                                                <option value="Turkey">Turkey</option>
                                                <option value="UAE">UAE</option>
                                                <option value="United Kingdom">United Kingdom</option>
                                                <option value="United States">United States</option>
                                            </select>
                                        </div>
                                    </form>
                                    <br /><br />
                                    <div className="note">
                                        *Approximate shipping duration is 7-10 days. Tracking id and tracking link will be sent via
                                        email after the products are shipped.
                                    </div>
                                    <br />
                                    <div className="form-check form-check-inline payment-method-selector"
                                        style={{ width: '270px !important' }}>
                                        <label className="form-cimport { useAuthState } from 'react-firebase-hooks/auth';
heck-label">
                                            <input className="form-check-input payment-method-radio" type="radio" name="payment_method"
                                                value="ssl_card" checked="" />
                                            <img src={cardPay} className="payment-method-logo" alt="" />
                                        </label>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="alert-container"></div>

                                    <input className="tnc-check" style={{ display: 'inline-block' }} type="checkbox" onClick={(e) => setIsAgree(e.target.checked)} />

                                    <span style={{ display: 'inline' }}>I agree to <a href="/terms" target="_blank">Terms &amp;
                                        Conditions</a>, <a href="/refund-policy" target="_blank">Refund Policy</a> and <a
                                            href="/privacy-policy" target="_blank">Privacy Policy</a> of sapopsa.</span>
                                    <br /><br />
                                    <button className={`btN ${!isAgree ? 'disabledPlaceOrderBtn' : ''}`} type="button" name="button" disabled={true}>Proceed To Secure Payment</button>
                                </div>
                            </div>
                            <br /><br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;