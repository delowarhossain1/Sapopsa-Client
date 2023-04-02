import React, { useState } from 'react';
import css from "../../../css/checkout.module.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router-dom';
import sadIMG from "../../../images/sad-gif.gif";
import {AiOutlineArrowRight} from "react-icons/ai";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../../firebase.init';
import {getAccessToken} from "../../../utilites/setAndGetAccessToken";
import Loading from '../../shared/Loading/Loading';
import useModal from './../../../hooks/useModal';

const Payment = ({ checkoutInfo }) => {
    const [loading, setLoading] = useState(false);
    const {simpleMessageDisplay} = useModal();
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const { total, products } = checkoutInfo;

    const handleOrder = (data) => {
        // Set loading
        setLoading(true);

        if(user && data){
            const url = `/api/order?email=${user?.email}`;

            fetch(url, {
                method : "POST",
                headers : {
                    'content-type' : 'application/json',
                    auth : `Bearer ${getAccessToken()}`
                },
                body : JSON.stringify(data) 
            })
            .then(res => res.json())
            .then(res => {
                // Loading false
                setLoading(false);

                if(res?.insertedId){
                    simpleMessageDisplay('Congratulations! Your order has been completed.');
                    navigate('/')
                }
                else{
                    simpleMessageDisplay('Something went wrong. Please contact us.')
                }
            });
        }
    }

    if(loading){
        return <Loading />
    }

    return (
        <div className='smallContainer'>
            <div className='marginTop'>
                {(products?.length > 0 && total) ? 
                    <div className={css.PaymentContainer}>
                    <div>
                        <h2 className={css.orderSummeryText}>Order Summary</h2>
                        <span className={css.subTotalText}>Subtotal ({products?.length} Item'(s) and shipping fee included) - ${total}</span>

                        <h5 className={css.totalAmoutText}>Total Amount : ${total}</h5>
                    </div>
                    
                    <div className={css.paypalBTNS}>
                        {products?.length > 0 &&
                            <PayPalScriptProvider options={{ "client-id": `${process.env.REACT_APP_PAYPAL_CLIENT_ID}` }}>
                                <PayPalButtons
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: total,
                                                    },
                                                },
                                            ],
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then((details) => {
                                            const payment = {
                                                name : details.payer.name.given_name,
                                                txn : details?.purchase_units[0].payments?.captures[0].id,
                                                amount : details?.purchase_units[0].payments?.captures[0].amount.value,
                                                currency : details?.purchase_units[0].payments?.captures[0].amount.currency_code
                                            }
                                            // Order info
                                            const data = {...checkoutInfo, payment};

                                            if(payment.txn){
                                                // update data base....
                                                handleOrder(data);
                                            }   
                                            else{
                                                
                                            }
                                        });
                                    }}
                                />
                            </PayPalScriptProvider>}
                    </div>
                </div>
                    :
                    <div className={css.warningBox}>
                        <img src={sadIMG} alt="" />
                        <p className={css.warningText}>Something went wrong.</p>
                        <button type="button" onClick={()=> navigate('/checkout')}>Go Back <AiOutlineArrowRight /> </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Payment;