import React from 'react'
import TowerStatList from './towerStatList'
import { TowerStatData } from './towerStatData'
import { BodyContent, BodyHeader, Container, ItemCol, ItemRow } from '@/styled/styledCommon'
import TitleType from './data/titleType'
import store from '@/mobx/store'

import { towerName, towerDesc } from '@/lang/tower/towername'
import txtTowerKo from '@/lang/tower/txtTower-ko'
import txtTowerJp from '@/lang/tower/txtTower-jp'
import txtTowerEn from '@/lang/tower/txtTower-en'

interface Props {
    name: string,
    isPassed: string,
    list: Array<TowerStatData>,

	showTitleChangeModal: boolean,
    setTitleToBeChanged: (t: TitleType) => void,
    setTitleChangeModal: (b: boolean) => void,
}

const TowerStatPresenter = (props: Props) => {
	const lang = store.language.lang
	const id = store.loginUser.user.id
    const txtTower =
        lang === 'ko' ? txtTowerKo :
            lang === 'jp' ? txtTowerJp : txtTowerEn
			
	return (
		<Container>
			<ItemRow setVertical={true}>
				<BodyHeader>
					<h3 id="towername">
					{
						(towerName as any)[props.name] !== undefined ?
							(towerName as any)[props.name][lang] : ''
					}
					</h3>
				</BodyHeader>
				<BodyContent className="text-center">
					<ItemRow>
						<span dangerouslySetInnerHTML={{
							__html: (towerDesc as any)[props.name] !== undefined ?
							(towerDesc as any)[props.name][lang] : ''}}>
						</span>
					</ItemRow>
					<ItemRow>
						{txtTower.detail.desc}
					</ItemRow>
				</BodyContent>
			</ItemRow>
			<ItemRow setVertical={true}>
				<BodyHeader>
					<ItemRow>
						<ItemCol size={5} isFlatUnderLg={true}>
							<h3>Clear Status</h3>
						</ItemCol>
						<ItemCol size={5} isFlatUnderLg={true}>
							<img alt="ispassed" style={{width:"100%"}}
								src={props.isPassed} />
						</ItemCol>
					</ItemRow>
				</BodyHeader>
				<BodyContent>
					{/* 진행 상태 표기 */}
					<ItemRow id="towerlist" setVertical={true}>
						<TowerStatList
							id={id}
							list={props.list}
							setTitleChangeModal={props.setTitleChangeModal}
							setTitleToBeChanged={props.setTitleToBeChanged} />
					</ItemRow>
				</BodyContent>
			</ItemRow>
		</Container>
	)
}

export default TowerStatPresenter