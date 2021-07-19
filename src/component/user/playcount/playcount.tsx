import React from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'
import PlayCountPresenter from './playcountPresenter'
import useUserData from '../../common/useUserData'
import usePlayCount from './usePlayCount'
import useCountDivCtrl from './useCountDivCtrl'

interface MatchProps {
    id: string
}

const PlayCount = observer(() => {
    const {id} = useParams<MatchProps>()
    const [userName, profileLink, titleTower] = useUserData(id)
    const [plist, glist, dlist, mlist] = usePlayCount(id)
    const [display0, display1, display2, display3, changeDiv] = useCountDivCtrl()
    
    return (
        <PlayCountPresenter
            userName={userName}
            id={id}
            towerTitle={titleTower}
            display0={display0}
            display1={display1}
            display2={display2}
            display3={display3}
            plist={plist}
            glist={glist}
            dlist={dlist}
            mlist={mlist}
            changeDiv={changeDiv} />
    )
})

export default PlayCount;