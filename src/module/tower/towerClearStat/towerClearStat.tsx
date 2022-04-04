import React from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'
import TowerClearStatPresenter from './towerClearStatPresenter'
import useTowerClear from './useTowerClear'
import useFloorClear from './useFloorClear'

interface MatchProps {
    id: string
}

const TowerClearStat = observer(() => {
    const {id} = useParams<MatchProps>()
    const towerList = useTowerClear(id)
    const titleList = useFloorClear(id)

    return (
        <TowerClearStatPresenter
            towerList={towerList}
            titleList={titleList} />
    )
})

export default TowerClearStat;