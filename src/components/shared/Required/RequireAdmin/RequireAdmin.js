import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../Loading/Loading';
import auth from './../../../../firebase.init';
import useAdmin from './../../../../hooks/useAdmin';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const RequireAdmin = ({children}) => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [isAdmin, adminLoading] = useAdmin(user);

    if(loading || adminLoading){
        return <Loading />
    }

    if(! isAdmin){
        signOut(auth);
        navigate('/login');
        return;
    }

    return children;
};

export default RequireAdmin;