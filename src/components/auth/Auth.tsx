import React, {useState, useEffect} from 'react';
import {sessionService} from "../../services/session";
import jwt from 'jwt-decode';
import "./Auth.css";
import logo from "../../assets/images/remndme_logo.png";
import { useHistory, useLocation } from 'react-router-dom';
const axios = require('axios').default;


function Auth() {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginState, setLoginState] = useState<boolean>(true);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        
        setLoginState((location.pathname === "/login") ? true : false);

        return () => {
            
        }
    }, [location.pathname])


    const signUp = () => {
        axios.post("http://localhost:4141/users", {username: username, password: password})
        .then((res: any) => login()).catch((err:any) => console.log(err));
    }

    const login = () => {
        axios.post("http://localhost:4141/auth/login", {username: username, password: password})
        .then((response:any) => {
            const user: any = jwt(response.data.tokens.token);
            sessionService.setUser(user);
        })
        .catch((error: any) => console.log(error))
    }

    const execute = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (loginState) {
            login();
        } else {
            signUp();
        }
    }   

    const changeLoginState = () => {
        if (loginState) {
            history.push('signup');
        } else {
            history.push("login");
        }

        setLoginState(!loginState);
    }


    return (
        <div className='auth-container'>
            <div className="auth-left">
                <div className="auth-left-logo">
                    <img src={logo} alt="remnd me logo"/>
                </div>
                <div className="auth-left-verbiage">
                    For when you become numb to app notifications
                </div>
                <button className="unfilled" onClick={e => changeLoginState()}>{(loginState)? 'Sign Up' : 'Login'}</button>
            </div>

            <div className="auth-right">
                <form action="">
                    <div className="auth-right-form-header">
                        {(loginState) ? 'Login' : 'Sign Up'}
                    </div>
                    <div className="input-group">
                        <label htmlFor="auth-username">Username</label>
                        <input value={username} onChange={e => setUsername(e.target.value)} id="auth-username" type="text" className="auth-right-username-input"/>
                    </div>

                    {
                        !loginState &&
                            <div className="input-group">
                                <label htmlFor="auth-phone">Phone Number</label>
                                <input id="auth-phone" type="text" className="auth-right-phone-number-input"/>
                            </div>
                    }
                    <div className="input-group">
                        <label htmlFor="auth-password">Password</label>
                        <input id="auth-password" value={password} onChange={e => setPassword(e.target.value)} type="password" className="auth-right-password-input"/>
                    </div>
                    <button className="filled" onClick={e => execute(e)}>{(loginState)? 'Login' : 'Sign Up'}</button>
                </form>
            </div>
        </div>
    )
}

export default Auth
