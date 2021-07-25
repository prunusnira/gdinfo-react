import { observer } from 'mobx-react'
import React from 'react'
import {Redirect, useParams} from 'react-router-dom'
import store from '@/mobx/store'

interface Matchprops {
    gtype: string
}

const ProfileLoginCheck = observer(() => {
    const {loginUser, loginStatus} = store
    const {gtype} = useParams<Matchprops>()

    if(loginStatus.isSigned) {
        if(gtype === "gf") {
            return <Redirect to={`/skill/2/${loginUser.user.id}/gf/1/1`} />
        }
        else {
            return <Redirect to={`/skill/2/${loginUser.user.id}/dm/1/1`} />
        }
    }
    else {
        return <Redirect to={"/error/500"} />
    }
})

export default ProfileLoginCheck