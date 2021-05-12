import React, { useEffect } from 'react'
import TowerStatList from './towerStatItem'
import { TowerStatData } from './towerStatData'
import txtTower from '../txttower'
import { BodyContent, BodyHeader, Container, ItemCol, ItemRow } from '../../../styled/styledCommon'
import { towerName, towerDesc } from '../towername'

interface Props {
    name: string,
    isPassed: string,
    id: string,
    list: Array<TowerStatData>,
    lang: string
}

const TowerStatPresenter = (props: Props) => {
	return (
		<Container>
			<ItemRow setVertical={true}>
				<BodyHeader>
					<h3 id="towername">
					{
						(towerName as any)[props.name] !== undefined ?
							(towerName as any)[props.name][props.lang] : ''
					}
					</h3>
				</BodyHeader>
				<BodyContent className="text-center">
					<ItemRow>
						<span dangerouslySetInnerHTML={{
							__html: (towerDesc as any)[props.name] !== undefined ?
							(towerDesc as any)[props.name][props.lang] : ''}}>
						</span>
					</ItemRow>
					<ItemRow>
						{(txtTower.detail.desc as any)[props.lang]}
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
							id={props.id}
							list={props.list}
							lang={props.lang} />
					</ItemRow>
				</BodyContent>
			</ItemRow>
		</Container>
	)
}

export default TowerStatPresenter