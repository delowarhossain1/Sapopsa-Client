import React from 'react';
import Navbar from '../../../../shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';


const MyDashboard = () => {
    return (
        <>
            <Navbar />

            <div className="backColor">
                <div className="container">
                    <div className="myOrder">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyDashboard;