import React from 'react';
import {Redirect} from 'react-router-dom';
import { observer } from 'mobx-react';
import store from '../../../mobx/store';

const SnapshotLoginCheck = observer(() => {
    const {loginUser, loginStatus} = store

    if(loginStatus.isSigned) {
        return <Redirect to={`/skill/snapshot/list/${loginUser.user.id}`} />
    }
    else {
        return <Redirect to={"/error/500"} />
    }
})

export default SnapshotLoginCheck