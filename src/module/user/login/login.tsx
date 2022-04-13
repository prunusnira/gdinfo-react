import React from "react";
import { Redirect } from "react-router-dom";
import store from "@/mobx/store";
import { observer } from "mobx-react";
import LoginPresenter from "./loginPresenter";
import LoginErrorModal from "./loginErrorModal";
import useUserInfo from "./useUserInfo";
import useGoogleLogin from "./useGoogleLogin";

const Login = observer(() => {
    const [newUser, token, updateUserInfo] = useUserInfo();
    const [isLoginError, loginErrorMsg, responseGoogle, responseFail] =
        useGoogleLogin(updateUserInfo);
    const { loginUser } = store;

    const goBackToIndex = () => {
        window.location.href = "/";
    };

    if (newUser) {
        // Redux LoginInfo token에 넣고 보내기
        loginUser.setUserData({
            token: token,
            id: "",
        });
        return <Redirect to={{ pathname: "/newuser" }} />;
    } else if (isLoginError) {
        return <LoginErrorModal errorMsg={loginErrorMsg} goBackToIndex={goBackToIndex} />;
    } else {
        return <LoginPresenter responseGoogle={responseGoogle} responseFail={responseFail} />;
    }
});

export default Login;
