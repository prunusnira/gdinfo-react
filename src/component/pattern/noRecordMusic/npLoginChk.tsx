import { observer } from 'mobx-react';
import React from 'react';
import {Redirect} from 'react-router-dom';
import store from '../../../mobx/store';

const NotPlayedLoginCheck = observer(() => {
    const {loginUser, loginStatus} = store

    if(loginStatus.isSigned) {
        return <Redirect to={"/notplayed/gf/"+loginUser.user.id+"/0/1"} />
    }
    else {
        return <Redirect to={"/error/500"} />
    }
})

export default NotPlayedLoginCheck