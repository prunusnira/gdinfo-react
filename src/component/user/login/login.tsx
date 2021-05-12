import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {sha256} from 'js-sha256';
import { GoogleLoginResponse } from 'react-google-login';

import CommonData from '../../common/commonData';
import store from '../../../mobx/store';
import { observer } from 'mobx-react';
import LoginInfo from '../../common/loginInfo';
import LoginPresenter from './loginPresenter';
import LoginErrorModal from './loginErrorModal';

const Login = observer(() => {
    const [newUser, setNewUser] = useState(false)
    const [token, setNewToken] = useState('')
    const [isLoginError, setLoginError] = useState(false)
    const [loginErrorMsg, setLoginErrorMsg] = useState('')

    const {language, loginUser, loginStatus} = store
    const lang = language.lang

    const updateUserinfo = (info: LoginInfo) => {
        loginUser.setUserData(info)
        loginStatus.setSignStatus(true)
    }
    
    const responseGoogle = (res: GoogleLoginResponse) => {
        const token = res.getBasicProfile().getEmail().split("@")[0];
        const hash = sha256(token);
        
        const xhr = new XMLHttpRequest();
        xhr.open('POST', CommonData.dataUrl+"loginseq");
        xhr.setRequestHeader('Content-Type',
                'application/x-www-form-urlencoded');
        xhr.onload = function() {
            const rtn = xhr.responseText;
            const json = JSON.parse(rtn);
            const loginData = JSON.parse(json.loginData);

            switch(loginData.stat) {
                case "login":
                    updateUserinfo(loginData)
                    window.location.href="/index";
                    break;
                case "newuser":
                    setNewToken(loginData.token)
                    setNewUser(true)
                    break;
                case "prohibit":
                    break;
            }
        };
        xhr.send('token=' + hash);
    }

    const responseFail = (e: any) => {
        setLoginError(true)
        setLoginErrorMsg(e.details)
        console.log(e)
    }

    const goBackToIndex = () => {
        window.location.href = '/'
    }

    if(newUser) {
        // Redux LoginInfo token에 넣고 보내기
        loginUser.setUserData({
            token: token,
            id: ""
        })
        return (
            <Redirect to={{ pathname: "/newuser" }} />
        )
    }
    else if(isLoginError) {
        return (
            <LoginErrorModal
                lang={lang}
                errorMsg={loginErrorMsg}
                goBackToIndex={goBackToIndex} />
        )
    }
    else {
        return (
            <LoginPresenter
                responseGoogle={responseGoogle}
                responseFail={responseFail} />
        )
    }
})

export default Login