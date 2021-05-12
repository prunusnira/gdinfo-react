import React, { useEffect, useState } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import CommonData from '../../common/commonData';
import store from '../../../mobx/store';
import { observer } from 'mobx-react';
import LoginInfo from '../../common/loginInfo';
import NewUserPresenter from './newuserPresenter';
import Error500 from '../../error/500';
import txtNewuser from './txtnewuser';

const NewUser = observer(() => {
    const [moveToIndex, setMoveToIndex] = useState(false)
    const [isValidAccess, setValidAccess] = useState(true)

    const {language, loginUser, loginStatus} = store
    const lang = language.lang

    useEffect(() => {
        // params에 token이 있는지 확인
        if(checkParamHasToken()) {
            // 토큰이 이미 DB에 있는지 확인
            checkUserAlreadyExist()
        }
        else {
            setValidAccess(false)
        }
    }, [])

    const checkParamHasToken = () => {
        const token = loginUser.user.token
        if(token === '') return false
        else return true
    }

    const checkUserAlreadyExist = () => {
        const token = loginUser.user.token
        fetch(`${CommonData.dataUrl}getuser/${token}`)
        .then(d => {
            return d.json()
        })
        .then(d => {
            if(d.mydata !== 'null') {
                setValidAccess(false)
            }
        })
    }

    const updateUserinfo = (info: LoginInfo) => {
        loginUser.setUserData(info)
        loginStatus.setSignStatus(true)
    }

    const addNewUser = () => {
        const params = new URLSearchParams()
        params.append("token", loginUser.user.token)
        axios.post(`${CommonData.dataUrl}newuser`, params)
        .then((res) => {
            const json = JSON.parse(res.data.loginData)
            switch(json.stat) {
                case "login":
                    updateUserinfo({
                        token: json.token,
                        id: json.id
                    })
                    setMoveToIndex(true)
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

    if(moveToIndex) {
        return <Redirect to={"/index"} />
    }
    else if(isValidAccess) {
        return (
            <NewUserPresenter
                lang={lang}
                addNewUser={addNewUser}
                dropUser={dropUser} />
        )
    }
    else {
        alert((txtNewuser.invalidAccess as any)[lang])
        return (
            <Error500 />
        )
    }
})

export default NewUser