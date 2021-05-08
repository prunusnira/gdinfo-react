import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {sha256} from 'js-sha256';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import txtLogin from './txtLogin';

import CommonData from '../Common/commonData';
import store from '../../../../mobx/store';
import { observer } from 'mobx-react';
import { BodyContent, BodyHeader, Container, ItemCol, ItemRow } from '../../../../styled/styledCommon';
import LoginInfo from '../Common/loginInfo';

const Login = observer(() => {
    const [newUser, setNewUser] = useState(false)
    const [token, setNewToken] = useState('')

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
        console.log(e);
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
    else {
        return (
            <>
                <Container>
                    <ItemRow>
                        <ItemCol size={10}>
                            <BodyHeader>
                                <h3>{(txtLogin.title as any)[lang]}</h3>
                            </BodyHeader>
                            <BodyContent>
                                <ItemRow>
                                    <span>{(txtLogin.google as any)[lang]}</span>
                                </ItemRow>
                                <ItemRow>
                                    <GoogleLogin
                                        theme="dark"
                                        clientId={CommonData.googleLoginClientId}
                                        buttonText="Login with Google"
                                        onSuccess={responseGoogle}
                                        onFailure={responseFail}
                                        isSignedIn={false}
                                        cookiePolicy={'single_host_origin'} />
                                </ItemRow>
                            </BodyContent>
                        </ItemCol>
                    </ItemRow>
                    <div style={{display: 'none'}}>
                        <form action='/loginseq' id='register' method='post'>
                            <input type='text' id='token' name='token' />
                        </form>
                    </div>
                </Container>
            </>
        )
    }
})

export default Login