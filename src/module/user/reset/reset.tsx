import React from 'react'
import {Redirect} from 'react-router-dom'
import store from '@/mobx/store'
import { observer } from 'mobx-react'
import ResetPresenter from './resetPresenter'
import useDataReset from './useDataReset'

const ProfileReset = observer(() => {
    const [redirect, resetData] = useDataReset()

    if(redirect) {
        return <Redirect to="/profile" />
    }
    if(!store.loginStatus.isSigned) {
        return <Redirect to="/error/500" />
    }
    else {
        return (
            <ResetPresenter
                resetData={resetData} />
        )
    }
})

export default ProfileReset