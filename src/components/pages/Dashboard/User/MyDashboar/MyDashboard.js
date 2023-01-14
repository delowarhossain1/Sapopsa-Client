import React from 'react';
import Navbar from '../../../../shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';


const MyDashboard = () => {
    return (
        <>
            <Navbar />

            <div class="backColor">
                <div class="container">
                    <div class="myOrder">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyDashboard;