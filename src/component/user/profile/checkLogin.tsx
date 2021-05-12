import React from 'react';
import {Redirect} from 'react-router-dom';
import store from '../../../mobx/store';

const ProfileLoginCheck = () => {
    const {loginUser, loginStatus} = store

    if(loginStatus.isSigned) {
        return <Redirect to={`/profile/${loginUser.user.id}`} />
    }
    else {
        return <Redirect to={"/error/500"} />
    }
}

export default ProfileLoginCheck