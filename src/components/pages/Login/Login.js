import React, { useEffect } from 'react';
import logo from "../../../images/sapopsa.png";
import fb from "../../../icons/facebook2.png";
import go from "../../../icons/google.png";
import auth from './../../../firebase.init';
import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../shared/Loading/Loading';
import { setAccessToken } from "../../../utilites/setAndGetAccessToken";
import { signOut } from 'firebase/auth';
import PageTitle from '../../shared/PageTitle/PageTitle';

const Login = () => {
    const [signInWithGoogle, user, loading] = useSignInWithGoogle(auth);

    // After login 
    const location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";
    console.log()
    useEffect(() => {
        if (user) {
            
            const email = user?.user?.email;
            const name = user?.user?.displayName;
            const url = `http://localhost:5000/user?email=${email}&name=${name}`;

            fetch(url, { method: 'PUT'})
                .then(res => res.json())
                .then(res => {
                    if (res?.token) {
                        setAccessToken(res.token);
                        navigate(from);
                    }
                    else{
                        signOut(auth);
                        navigate('/login')
                    }
                });

        }
    }, [user, navigate, from]);

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <PageTitle title='Login' />

            <div className="container">
                <div className="smallContainer">
                    <div className="logInFrom">
                        <div className="login">
                            <div className="Logicon">
                                <img className="logIcon" src={logo} alt="" />
                            </div>
                            <h3>Login</h3>
                            <p>Let's check if you already have an account</p>
                            <div className="Logg">
                                <div className="logBox">
                                    <input type="email" required="required" />
                                    <span>E-mail</span>
                                </div>
                                <div className="logBox">
                                    <input type="password" required="required" />
                                    <span>Password</span>
                                </div>
                                <div className="logLog">
                                    <button type="submit">
                                        Login
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="loginWith">

                                <button type="button" onClick={() => signInWithGoogle()}>
                                    <h5>Login with</h5>
                                    <img className="facebock" src={go} alt="" />
                                </button>

                                <button className="logLog" type="button">
                                    <h5>Login with</h5>
                                    <img className="facebock" src={fb} alt="" />
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;