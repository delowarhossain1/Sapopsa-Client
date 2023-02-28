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
import { useQuery } from 'react-query';
import axios from 'axios';
import { AiOutlineCloseSquare } from 'react-icons/ai';

const Settings = () => {
    const shippingArea = useRef();
    const shippingCharge = useRef();
    const [isHeadingOn, setIsHeadingOn] = useState(true);
    const [user, userLoading] = useAuthState(auth);
    const [shippingItems, setShippingItems] = useState([]);
    const { successFullModal, simpleAlertWithConfirmBtn } = useModal();

    // Get all settings
    const {data:settings, isLoading, refetch} = useQuery(['settings-management', user], 
    ()=>(
        axios.get(`http://localhost:5000/settings?email=${user?.email}`, {
            headers : {auth : `Bearer ${getAccessToken()}`}
        })
        .then(res => res.data)
    ));

    useEffect(()=>{
        setShippingItems(settings?.shippingCharge || []);
    }, [settings]);

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
            text : 'Do you want to remove?',
            confirmBtn : "Yes."
        };

        simpleAlertWithConfirmBtn(modalText, ()=>{
            const rest = shippingItems?.filter((item, index) => id !== index);
            setShippingItems(rest);
        })
    }

    // Display web heading / on or off
    const isDispaly = (isOn) => setIsHeadingOn(isOn);

    const handleSettings = () => {
        const alertText = {
            text : 'Do you want to update settings?',
            confirmBtn : 'Yes, I want.'
        }
        simpleAlertWithConfirmBtn(alertText, () => {
            const setting = {
                isNavbarTitleDisplay : isHeadingOn,
                shippingCharge: shippingItems,
            }

            const url = `http://localhost:5000/settings?email=${user?.email}`;
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
                    if (res?.modifiedCount > 0) {
                        successFullModal('Settings updated.');
                        refetch();
                    }
                });
        })
    }

    // Set loading status.
    if (userLoading || isLoading) <Loading />;

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
                                currentStatus = {settings?.isNavbarTitleDisplay}
                                /></span>
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
                                                onClick={()=> removeShippingItem(i)}/>

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