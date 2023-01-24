import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../shared/Loading/Loading';
import PageTitle from '../../shared/PageTitle/PageTitle';
import cardPay from "../../../images/card-pay.png";

const Checkout = ({ setDeliveryInfo }) => {
    const [user, loading] = useAuthState(auth);
    const [isAgree, setIsAgree] = useState(false);

    const handleCheckoutInfo = (event) => {
        event.preventDefault();
        const e = event.target;
        const name = user?.displayName;
        const email = user?.email;
        const house = e.house.value;
        const city = e.city.value;
        const state = e.state.value;
        const zip = e.zip.value;
        // const country = e.country.value;


        const info = {
            name,
            email,
            house,
            zip,
            city,
            state
        }
        console.log(info);
        setDeliveryInfo(info);
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
                        <div className="checkoutInfo">
                            <div className="checkIn">
                                <div className="cInf">
                                    <h2>Shipping Info</h2>
                                </div>
                                <div className="checkFrom">
                                    <form onSubmit={handleCheckoutInfo}>
                                        <br /> <br />

                                        <input className="maxWidht" type="text" placeholder="Full Name" value={user?.displayName} readOnly /> <br /><br />

                                        <div className="minWidht">
                                            <input type="email" placeholder="Email" value={user?.email} readOnly />
                                            <input type="text" placeholder="Phone Number" />
                                        </div>
                                        <br /><br />

                                        <label htmlFor="info">Shipping Info</label> <br /> <br />
                                        <input className="maxWidht" type="text" placeholder="House/Street" name='house' /> <br /><br />

                                        <div className="minWidht">
                                            <input type="text" placeholder="City" name='city' />
                                            <input type="text" placeholder="State/Province" name='state' /> <br />
                                        </div>
                                        <br />

                                        <div className="minWidht">
                                            <input type="text" placeholder="Post/Zip Code" name='zip' />
                                        </div>

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

                                        <button className={`btN ${!isAgree ? 'disabledPlaceOrderBtn' : ''}`} type="submit" name="button" disabled={!isAgree} >Place order</button>
                                    </form>
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