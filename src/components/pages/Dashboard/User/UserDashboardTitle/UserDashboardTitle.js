import React from 'react';
import { AiOutlineLogin } from "react-icons/ai";
import auth from '../../../../../firebase.init';
import { signOut } from 'firebase/auth';

const UserDashboardTitle = ({title = 'Simple title'}) => {
    return (
        <div className='my-dashboard-heading'>
            <h2 class="orderMainTitle">{title}</h2>

            <button onClick={() => signOut(auth)}>
                <AiOutlineLogin />
                <span>Log out</span>
            </button>
        </div>
    );
};

export default UserDashboardTitle;