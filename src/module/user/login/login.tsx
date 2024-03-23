import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginErrorModal from './loginErrorModal';
import LoginPresenter from './loginPresenter';
import useGoogleLogin from './useGoogleLogin';
import useUserInfo from './useUserInfo';

const Login = () => {
    const { isNewUser, updateUserInfo } = useUserInfo();
    const { isLoginError, loginErrorMsg, responseGoogle, responseFail } =
        useGoogleLogin(updateUserInfo);

    const goBackToIndex = () => {
        window.location.href = '/';
    };

    if (isNewUser) {
        return <Navigate replace to={'/newuser'} />;
    }
    if (isLoginError) {
        return <LoginErrorModal errorMsg={loginErrorMsg} goBackToIndex={goBackToIndex} />;
    }
    return <LoginPresenter responseGoogle={responseGoogle} responseFail={responseFail} />;
};

export default Login;
