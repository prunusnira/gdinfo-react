import { observer } from 'mobx-react'
import React from 'react'
import {Redirect} from 'react-router-dom'
import store from '@/mobx/store'

const PlayCountLoginCheck = observer(() => {
    const {loginUser, loginStatus} = store

    if(loginStatus.isSigned) {
        return <Redirect to={`/mybest/${loginUser.user.id}`} />
    }
    else {
        return <Redirect to={"/error/500"} />
    }
})

export default PlayCountLoginCheck