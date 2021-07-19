import React, {useState} from 'react'
import axios from 'axios'
import CommonData from '../../common/commonData'
import { Redirect, useParams } from 'react-router-dom'
import store from '../../../mobx/store'
import { observer } from 'mobx-react'
import TowerStatPresenter from './towerStatPresenter'
import TitleChangeModal from './titleChangeModal/titleChangeModal'
import TitleType from './data/titleType'

import txtTowerKo from '../../../lang/tower/txtTower-ko'
import txtTowerJp from '../../../lang/tower/txtTower-jp'
import txtTowerEn from '../../../lang/tower/txtTower-en'
import useTowerStat from './useTowerStat'
import useTitleModal from './useTitleModal'

interface MatchProps {
	tower: string
}

const TowerStat = observer(() => {
	const {loginStatus} = store
	const {tower} = useParams<MatchProps>()
	const [name, isPassed, list] = useTowerStat(tower)
	const [
        showTitleChangeModal, titleToBeChanged,
        setTitleChangeModal, setTitleToBeChanged, changeTitle
    ] = useTitleModal()

    if(!loginStatus.isSigned) {
		return <Redirect to={"/error/500"} />
	}
	return (
		<>
			<TowerStatPresenter
				name={name}
				isPassed={isPassed}
				list={list}

				showTitleChangeModal={showTitleChangeModal}
				setTitleChangeModal={setTitleChangeModal}
				setTitleToBeChanged={setTitleToBeChanged} />
			<TitleChangeModal
				showTitleChangeModal={showTitleChangeModal}
				titleToBeChanged={titleToBeChanged}
				setTitleChangeModal={setTitleChangeModal}
				changeTitle={changeTitle} />
		</>
	)
})

export default TowerStat