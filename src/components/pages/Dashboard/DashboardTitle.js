import React from 'react';  
import { FaHome } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import css from "../../../css/DashboardTitle.module.css";
import { Link } from 'react-router-dom';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../shared/Loading/Loading';

const DashboardTitle = ({title = 'Title here...'}) => {
    const [user, userLoading] = useAuthState(auth);
    const [signOut, signOutLoading] = useSignOut(auth);
    
    if(userLoading && signOutLoading){
        return <Loading />
    }

    return (
        <div className={css.head}>
            <h2 className={css.dashboardTitle}>{title}</h2>

            <div className={css.icon}>
                <Link to='/' title='Home page' className={css.homeIcon}><FaHome /></Link>

                <span title='Log out' className={css.logOut} onClick={()=> signOut()}><AiOutlineLogout /></span>

                <span className={css.profile} title='Hey, this is you'>
                    <img src={user.photoURL} alt='Profile' />
                </span>
            </div>
        </div>
    );
};

export default DashboardTitle;