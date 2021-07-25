import React from 'react'
import { observer } from 'mobx-react'
import RecentPresenter from './recentPresenter'
import useRecent from './useRecent'

const Recent = observer(() =>  {
    const recentUserList = useRecent()

    return (
        <RecentPresenter
            recentUserList={recentUserList} />
    )
})

export default Recent