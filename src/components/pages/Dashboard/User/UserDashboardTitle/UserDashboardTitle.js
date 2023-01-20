import React from 'react';
import { AiOutlineLogin } from "react-icons/ai";
import auth from '../../../../../firebase.init';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import useAdmin from '../../../../../hooks/useAdmin';

const UserDashboardTitle = ({ title = 'Simple title' }) => {
    const [isAdmin] = useAdmin();

    return (
        <div className='my-dashboard-heading'>
            <h2 className="orderMainTitle">{title}</h2>

            <div style={{ display: 'flex' }}>
                <button onClick={() => signOut(auth)}>
                    <AiOutlineLogin />
                    <span>Log out</span>
                </button>

                { isAdmin &&
                    <button style={{ marginLeft: '10px' }}>
                        <Link style={{ color: 'white' }} to='/dashboard'>Admin dashboard</Link>
                    </button>
                }
            </div>
        </div>
    );
};

export default UserDashboardTitle;