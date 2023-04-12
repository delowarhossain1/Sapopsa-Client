import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../shared/Loading/Loading';
import PageTitle from '../../shared/PageTitle/PageTitle';
import css from "../../../css/checkout.module.css";
import { getProducts } from '../../../utilites/addToCard';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ setCheckoutInfo, shippingCharge = [{charge :0, area : 'Area'}] }) => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [isAgree, setIsAgree] = useState(false);
    const [products, setProducts] = useState([]);
    const [shippingChg, setShippingChg] = useState(0);
    const [shippingArea, setShippingArea] = useState('');

    // set product info
    useEffect(() => {
        const storedProducts = getProducts();
        setProducts(storedProducts);

        if (shippingCharge?.length > 0) {
            // Set shipping charge
            setShippingChg(shippingCharge[0]['charge'] || 0);
            // Set shipping area 
            setShippingArea(shippingCharge[0]['area'] || '');
        }

    }, [shippingCharge]);

    // Set shipping charge
    const handleShippingChrg = (e) =>{
        const charge = e.target.value;
        const area = e.target.selectedOptions[0].getAttribute('data-area');

        // Update state;
        setShippingChg(charge);
        setShippingArea(area)
    }

    // Product calculation
    const subTotal = products?.reduce((sTotal, items) => items.totalPrice + sTotal, 0);
    const total = Number(subTotal) + Number(shippingChg);

    const handleCheckoutInfo = (event) => {
        event.preventDefault();
        const date = new Date();
        const e = event.target;
        const name = user?.displayName;
        const email = user?.email;
        const phone = e.phone.value;
        const addressLineOne = e.addressOne.value;
        const addressLineTwo = e.addressTwo.value;

        const info = {
            products,
            total,
            subTotal,
            status: 'Pending',
            isMultipleOrder: products.length > 1,
            placed: {
                date: date.toDateString(),
                time: date.toLocaleTimeString()
            },
            dailyveryInfo: {
                name,
                email,
                phone,
                addressLineOne,
                shippingArea,
                shippingCharge : shippingChg,
                addressLineTwo: addressLineTwo || 'N/A'
            }
        }

        setCheckoutInfo(info);
        navigate('/payment')
    }

    // Set loading status
    if (loading) <Loading />;


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
                                        <div className={css.productList} key={product?.id * Math.random()}>
                                            <img src={product?.img} alt="product" />

                                            <div>
                                                <h4>{product?.title.length > 20 ? product.title.slice(0, 20) + '...' : product?.title}</h4>
                                                <p>Price : ${product?.price}</p>
                                                <p>Size : {product?.size}</p>
                                                <p>Qty : {product?.quantity}</p>
                                                <p className='selectedColorBtn'>
                                                    Color : 
                                                    <span style={{background : product?.color}}></span>
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }


                                <div className={css.subTotal}>
                                    <span>Sub total : ${subTotal}</span>
                                    <span>Shipping : ${shippingChg} <small>({shippingArea})</small></span>
                                    <span>Total : ${total}</span>
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
                                                    <input type="tel" id='number' placeholder="Phone Number" name='phone' required />
                                                </div>

                                                <div className={css.selectOption}>
                                                    <label for="">Shipping area</label>
                                                    <select
                                                        name='shippingCharge'
                                                        value={shippingChg}
                                                        onChange={handleShippingChrg}
                                                        >

                                                        {
                                                            shippingCharge?.map((item, i) => {
                                                                const { charge, area } = item;

                                                                return (
                                                                    <option
                                                                        value={charge}
                                                                        data-area={area}
                                                                        key={i * Math.random()}       
                                                                    >
                                                                        {`${area} - $${charge}`}
                                                                    </option>
                                                                )
                                                            })
                                                        }

                                                    </select>
                                                </div>

                                                <div className="minWidht">
                                                    <label for="add">Address</label>

                                                    <input type="text" placeholder="Address line 1" name='addressOne' id='add' required />
                                                    <input type="text" placeholder="Address line 2" name='addressTwo' />
                                                </div><br />

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