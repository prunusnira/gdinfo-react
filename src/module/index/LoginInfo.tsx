import React from 'react'
import { observer } from 'mobx-react'
import useLoginInfo from './useLoginInfo'
import LoginInfoPresenter from './LoginInfoPresenter'

const UserLoginInfo = observer(() => {
    const [loading, data] = useLoginInfo()
    
    return (
        <LoginInfoPresenter
            loading={loading}
            data={data} />
    )
})

export default UserLoginInfo