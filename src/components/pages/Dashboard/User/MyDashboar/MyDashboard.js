import React from 'react';
import { Outlet } from 'react-router-dom';


const MyDashboard = () => {
    return (
        <>
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