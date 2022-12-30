import React from 'react';
import Navbar from '../../shared/Navbar/Navbar';
import logo from "../../../images/sapopsa.png";
import fb from "../../../icons/facebook2.png";
import go from "../../../icons/google.png";
import auth from './../../../firebase.init';
import {useSignInWithGoogle} from "react-firebase-hooks/auth"

const Login = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    console.log(user)
    return (
        <div>
            <Navbar />

            <div class="container">
                <div class="smallContainer">
                    <div class="logInFrom">
                        <div class="login">
                            <div class="Logicon">
                                <img class="logIcon" src={logo} alt="" />
                            </div>
                            <h3>Login</h3>
                            <p>Let's check if you already have an account</p>
                            <div class="Logg">
                                <div class="logBox">
                                    <input type="email" required="required" />
                                    <span>E-mail</span>
                                </div>
                                <div class="logBox">
                                    <input type="password" required="required" />
                                    <span>Password</span>
                                </div>
                                <div class="logLog">
                                    <button type="submit">
                                        Login
                                        <i class="fa-solid fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="loginWith">
                                <button type="button" onClick={()=> signInWithGoogle()}>
                                    <h5>Login with</h5>
                                    <img class="facebock" src={go} alt="" />
                                </button>
                                <button class="logLog" type="button">
                                    <h5>Login with</h5>
                                    <img class="facebock" src={fb} alt="" />
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