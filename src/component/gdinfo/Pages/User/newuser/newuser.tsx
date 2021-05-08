import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import txtNewuser from './txtnewuser';

import CommonData from '../../Common/commonData';
import store from '../../../../../mobx/store';
import { observer } from 'mobx-react';
import { BodyContent, BodyHeader, Button, Container, ItemRow } from '../../../../../styled/styledCommon';
import LoginInfo from '../../Common/loginInfo';

const NewUser = observer(() => {
    const [moveToAbout, setMoveToAbout] = useState(false)
    const [moveToIndex, setMoveToIndex] = useState(false)

    const {language, loginStatus, loginUser} = store
    const lang = language.lang

    const updateUserinfo = (info: LoginInfo) => {
        loginUser.setUserData(info)
    }

    const addNewUser = () => {
        loginUser.setLogout()
        const params = new URLSearchParams()
        params.append("token", loginUser.user.token)
        axios.post(CommonData.dataUrl+"newuser", params)
        .then((res) => {
            const json = res.data.loginData
            switch(json.stat) {
                case "login":
                    updateUserinfo(json)
                    setMoveToAbout(true)
                    break;
                case "error":
                default:
                    setMoveToIndex(true)
                    break;
            }
        });
    }

    const dropUser = () => {
        axios.post(`${CommonData.dataUrl}dropuser`)
        .then((res) => {
            setMoveToIndex(true)
        })
    }

    if(moveToAbout) {
        return <Redirect to={"/aboutpc"} />
    }
    else if(moveToIndex) {
        return <Redirect to={"/index"} />
    }
    else {
        return (
            <Container>
                <ItemRow setVertical={true}>
                    <BodyHeader>
                        <h3>Sign Up</h3>
                    </BodyHeader>
                    <BodyContent>
                        <ItemRow setVertical={true}>
                            <h4>{(txtNewuser.title as any)[lang]}</h4>
                            <span>{(txtNewuser.desc as any)[lang]}</span>
                        </ItemRow>
                        <ItemRow>
                            <Button onClick={() => addNewUser()}>
                                {(txtNewuser.btnsign as any)[lang]}
                            </Button>
                            <Button onClick={() => dropUser()}>
                                {(txtNewuser.btndecline as any)[lang]}
                            </Button>
                        </ItemRow>
                    </BodyContent>
                </ItemRow>
            </Container>
        )
    }
})

export default NewUser