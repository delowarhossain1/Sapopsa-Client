import React from 'react';
import { FaHome } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import { RiDashboardLine } from 'react-icons/ri';
import css from "../../../css/DashboardTitle.module.css";
import { Link } from 'react-router-dom';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../shared/Loading/Loading';

const DashboardTitle = ({ title = 'Title here...' }) => {
    const [user, userLoading] = useAuthState(auth);
    const [signOut, signOutLoading] = useSignOut(auth);

    if (userLoading && signOutLoading) {
        return <Loading />
    }

    return (
        <div className={css.head}>
            <h2 className={css.dashboardTitle}>
                <RiDashboardLine className={css.titleIcon} />
                <span>{title}</span>
            </h2>

            <div className={css.icon}>
                <div>
                    <Link to='/' title='Home page' className={css.homeIcon}><FaHome /></Link>
                </div>

                <div title='Log out' className={css.logOut} onClick={() => signOut()}><AiOutlineLogout /></div>

                <div className={css.profile} title='Hey, this is you'>
                    <img src={user.photoURL} alt='Profile' />
                </div>
            </div>
        </div>
    );
};

export default DashboardTitle;