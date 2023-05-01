import React, { useEffect, useRef, useState } from 'react';
import PageTitle from '../../../../shared/PageTitle/PageTitle';
import DashboardTitle from '../../DashboardTitle';
import css from "../../../../../css/settings.module.css";
import SwitchBtn from './../../../../shared/SwitchBtn/SwitchBtn';
import { getAccessToken } from '../../../../../utilites/setAndGetAccessToken';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../../../../firebase.init';
import Loading from '../../../../shared/Loading/Loading';
import UpdateBtn from '../../../../shared/Button/UpdateBtn';
import { GrAddCircle } from "react-icons/gr";
import useModal from './../../../../../hooks/useModal';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Settings = ({ settingsInfo = {} }) => {
    const { isNavbarTitleDisplay, offlinePayment, refetch, shippingCharge: shippingInfo } = settingsInfo;
    const [settingsUpdating, setSettingsUpdating] = useState(false);
    const shippingArea = useRef();
    const shippingCharge = useRef();
    const [user, userLoading] = useAuthState(auth);
    const [shippingItems, setShippingItems] = useState([]);
    const [isHeadingOn, setIsHeadingOn] = useState(true);
    const [isOfflinePayment, setIsOfflinePayment] = useState(false);
    const { successFullModal, simpleAlertWithConfirmBtn } = useModal();

    useEffect(() => {
        setShippingItems(shippingInfo || []);
    }, [settingsInfo, shippingInfo]);

    // Handle shipping items
    const handleShippingItem = () => {
        const area = shippingArea.current.value;
        const charge = Number(shippingCharge.current.value);

        if (area && charge) {
            const shipping = { area, charge };
            setShippingItems([...shippingItems, shipping]);

            // Clear the input box
            shippingArea.current.value = '';
            shippingCharge.current.value = '';
        }
    }

    // Remove shipping item
    const removeShippingItem = id => {
        const modalText = {
            text: 'Do you want to remove?',
            confirmBtn: "Yes."
        };

        simpleAlertWithConfirmBtn(modalText, () => {
            const rest = shippingItems?.filter((item, index) => id !== index);
            setShippingItems(rest);
        })
    }

    // Display web heading / on or off
    const isDispaly = (isOn) => setIsHeadingOn(isOn);

     // set offlone payment
     const handleOfflinePayment = (isOn) => setIsOfflinePayment(isOn);

    const handleSettings = () => {
        const alertText = {
            text: 'Do you want to update settings?',
            confirmBtn: 'Yes, I want.'
        }
        simpleAlertWithConfirmBtn(alertText, () => {
            // update loading status;
            setSettingsUpdating(true);

            const setting = {
                isNavbarTitleDisplay: isHeadingOn,
                shippingCharge: shippingItems,
            }

            const url = `/api/settings/shipping-navbarTitle-display?email=${user?.email}`;
            fetch(url, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    auth: `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify(setting)
            })
                .then(res => res.json())
                .then(res => {
                    // update loading status;
                    setSettingsUpdating(false);

                    if (res?.modifiedCount > 0) {
                        successFullModal('Settings updated.');
                        refetch();
                    }
                });
        })
    }

    // Set loading status.
    if (userLoading || settingsUpdating) <Loading />;

    return (
        <div>
            <PageTitle title='Settings' />
            <DashboardTitle title="Settings" />

            <div className={css.settingsBody}>
                <div className={css.settingsContainer}>
                    {/* Left side */}
                    <div>

                        <div className={css.settingsItem}>
                            <span>Navbar heading</span>
                            <span><strong>:</strong> <SwitchBtn
                                setStatus={isDispaly}
                                currentStatus={isNavbarTitleDisplay}
                            /></span>
                        </div>

                        <div className={css.settingsItem}>
                            <span>Offline Payment</span>
                            <span><strong>:</strong> <SwitchBtn
                                setStatus={handleOfflinePayment}
                                currentStatus={offlinePayment}
                            /></span>
                        </div>

                        <div className={css.settingsItem}>
                            <span>Navbar Title</span>
                            <span>
                                <strong>:</strong>
                                <Link to='navbar-title'>See more</Link>
                            </span>
                        </div>

                        <div className={css.settingsItem}>
                            <span>About us</span>
                            <span>
                                <strong>:</strong>
                                <Link to='about-us'>See more</Link>
                            </span>
                        </div>

                        <div className={css.settingsItem}>
                            <span>Terms & Condition</span>
                            <span>
                                <strong>:</strong>
                                <Link to='terms'>See more</Link>
                            </span>
                        </div>

                        <div className={css.settingsItem}>
                            <span>Contact us</span>
                            <span>
                                <strong>:</strong>
                                <Link to='contact-us'>See more</Link>
                            </span>
                        </div>

                    </div>

                    {/* right side */}
                    <div>
                        <div className={css.shippingSetting}>
                            <strong>Shipping charge : </strong>
                            <div className={css.charge}>
                                {
                                    shippingItems?.map((item, i) => (
                                        <span key={i * Math.random()}>

                                            {`${item?.area} - $${item?.charge}`}
                                            <AiOutlineCloseSquare
                                                onClick={() => removeShippingItem(i)} />

                                        </span>
                                    ))
                                }
                                {
                                    shippingItems?.length === 0 &&
                                    <span style={{ color: '#fb5200' }}>Set Area - $50</span>
                                }
                            </div>

                            <div>
                                <input type='text' placeholder='Area' ref={shippingArea} />
                                <input type='number' placeholder='Price' ref={shippingCharge} />
                                <button type="button" onClick={handleShippingItem}>Add <GrAddCircle /></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={css.settingUpdateBtn}>
                    <span onClick={handleSettings}>
                        <UpdateBtn />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Settings;