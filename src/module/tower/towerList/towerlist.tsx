import React from 'react'
import TowerListPresenter from './towerListPresenter'
import useTowerList from './useTowerList'

const TowerList = () => {
    const {towerGF, towerDM, towerSP} = useTowerList()
    
    return (
        <TowerListPresenter
            towerGF={towerGF}
            towerDM={towerDM}
            towerSP={towerSP} />
    )
}

export default TowerList