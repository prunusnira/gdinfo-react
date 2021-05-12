import React, { useState } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import CommonData from '../../common/commonData';
import store from '../../../mobx/store';
import { observer } from 'mobx-react';
import ResetPresenter from './resetPresenter';

const ProfileReset = observer(() => {
    const [redirect, setRedirect] = useState(false)

    const {language, loginUser, loginStatus} = store
    const lang = language.lang

    const resetData = () => {
        const url = CommonData.dataUrl+"resetdata";

        const data = new URLSearchParams();
        data.append("id", loginUser.user.id);

        axios.post(url, data)
        .then((res) => {
            setRedirect(true)
        })
        .catch((err) => {
            console.error(err);
        });
    }

    if(redirect) {
        return <Redirect to="/profile" />
    }
    if(!loginStatus.isSigned) {
        return <Redirect to="/error/500" />
    }
    else {
        return (
            <ResetPresenter
                lang={lang}
                resetData={resetData} />
        )
    }
})

export default ProfileReset