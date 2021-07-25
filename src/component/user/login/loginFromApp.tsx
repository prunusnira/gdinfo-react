import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Redirect, Link, useParams} from 'react-router-dom'

import CommonData from '@/component/common/commonData'
import { observer } from 'mobx-react'
import store from '@/mobx/store'
import LoginInfo from '../loginInfo'
import { BodyContent, BodyHeader, Button, Container, ItemCol, ItemRow } from '@/styled/styledCommon'

import txtLoginKo from '@/lang/user/login/txtLogin-ko'
import txtLoginJp from '@/lang/user/login/txtLogin-jp'
import txtLoginEn from '@/lang/user/login/txtLogin-en'

interface MatchProps {
    uid: string
}

const LoginFromApp = observer(() => {
    const {uid} = useParams<MatchProps>()
    
    const [logindone, setLoginDone] = useState(false)
    const [token, setToken] = useState(uid)
    const [failed, setFailed] = useState(false)

    const {language, loginUser, loginStatus} = store
    const lang = language.lang

    const txtLogin =
        lang === 'ko' ? txtLoginKo :
            lang === 'jp' ? txtLoginJp : txtLoginEn

    useEffect(() => {
        // 존재하는 token인지 확인
        checkUserTokenExist(token);
    }, [])

    const updateUserinfo = (info: LoginInfo) => {
        loginUser.setUserData(info)
        loginStatus.setSignStatus(true)
    }

    const checkUserTokenExist = (token: string) => {
        axios.post(CommonData.dataUrl+"getuser/"+token)
        .then((res) => {
            if(res.data.mydata == null) {
                // 로그인 되어있지 않은 상태
                setFailed(true)
            }
            else {
                // 로그인 되어있는 상태
                loginFromApp(uid);
            }
        });
    }

    const loginFromApp = (hash: string) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', CommonData.dataUrl+"loginseq");
        xhr.setRequestHeader('Content-Type',
                'application/x-www-form-urlencoded');
        xhr.onload = function() {
            const rtn = xhr.responseText;
            const json = JSON.parse(rtn);

            switch(json.loginData.stat) {
                case "login":
                    updateUserinfo(json.loginData);
                    window.location.href="/index";
                    break;
                case "newuser":
                    setToken(json.loginData.token)
                    setFailed(true)
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

    if(logindone) {
        // redirect home
        return (
            <Redirect to={{
                pathname: "/"
            }} />
        )
    }
    else if(failed) {
        return (
            <Container>
                <ItemRow>
                    <ItemCol size={12}>
                        <BodyHeader>
                            <h3>{txtLogin.titleAppFail}</h3>
                        </BodyHeader>
                        <BodyContent>
                            <ItemRow>
                                <h4>{txtLogin.contentAppFailTitle}</h4>
                            </ItemRow>
                            <ItemRow>
                                <span dangerouslySetInnerHTML={{__html: txtLogin.contentAppFail}}></span>
                            </ItemRow>
                            <ItemRow>
                                <Link to='/'>
                                    <Button>Home</Button>
                                </Link>
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
        )
    }
    else {
        return (
            <Container>
                <ItemRow>
                    <h3>Please wait for sequence is done</h3>
                </ItemRow>
            </Container>
        )
    }
})

export default LoginFromApp