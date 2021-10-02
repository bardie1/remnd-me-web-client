import * as React from 'react';
import {useState, useEffect, useContext} from 'react';
import {sessionService} from "../../services/session";
import jwt from 'jwt-decode';
import "./Auth.css";
import logo from "../../assets/images/remndme_logo.png";
import { useHistory, useLocation } from 'react-router-dom';
import {UserContext} from '../../context/userContext';
import AuthService from "../../services/auth";
import { AxiosError, AxiosResponse } from 'axios';
import Loader from '../shared/loader/Loader';
import InfoCard from '../shared/infoCard/InfoCard';
const axios = require('axios').default;



interface IAuthProps {
}

const Auth: React.FunctionComponent<IAuthProps> = (props) => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loginState, setLoginState] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [formValid, setFormValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const userContext = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    

    useEffect(() => {
        
        setLoginState((location.pathname === "/login") ? true : false);

        return () => {
            
        }
    }, [location.pathname])

    useEffect(() => {
        if (username && password) {
            setFormValid(true);
            if (!loginState && !confirmPassword) {
                setFormValid(false);
            }
        } else {
            setFormValid(false);
        }

    }, [username, password, loginState, confirmPassword])


    const signUp = () => {
        setErrorMessage(null);
        axios.post("http://localhost:4141/users", {username: username, password: password})
        .then((res: any) => login()).catch((err:any) => console.log(err.message));
    }

    const login = () => {
        setErrorMessage(null);
        setLoading(true);
        AuthService.login(username, password)
        .then((res: AxiosResponse<any>) => {
            const user: any = jwt(res.data.tokens.token);
            sessionService.setUser(user, res.data.tokens);
            userContext.login(user);
            history.push("/home");
        }).catch((error: AxiosError) => {
            if (error.response?.status === 404 || error.response?.status === 401) {
                setErrorMessage("Login Details are incorrect. Please try again.")
            } else {
                setErrorMessage("Oops something went wrong! Please try again later");
            }
        }).finally(() => {
            setLoading(false);
        });
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
            setConfirmPassword('');
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
            {
                errorMessage && <InfoCard text={errorMessage} alignment="center" cardType="error" />
            }
            <div className="input-group">
                <label htmlFor="auth-username">Username</label>
                <input value={username} onChange={e => setUsername(e.target.value)} id="auth-username" type="text" className="auth-right-username-input"/>
            </div>
            <div className="input-group">
                <label htmlFor="auth-password">Password</label>
                <input id="auth-password" value={password} onChange={e => setPassword(e.target.value)} type="password" className="auth-right-password-input"/>
            </div>

            {
                !loginState && 
                <div className="input-group">
                    <label htmlFor="auth-password-confirm">Confirm Password</label>
                    <input id="auth-password-confirm" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" className="auth-right-password-input"/>
                </div>
            }
            {
                loading ?
                <div id="auth-loader-holder">
                    <Loader color="green" size="50px"/>
                </div> 
                : 
                <button disabled={!formValid ? true : false} className="filled" onClick={e => execute(e)}>{(loginState)? 'Login' : 'Sign Up'}</button>
            }
        </form>
    </div>
</div>
  );
};

export default Auth;