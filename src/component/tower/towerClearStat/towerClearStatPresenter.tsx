import React from 'react'
import { BodyContent, BodyHeader, Button, Container, ItemRow } from '../../../styled/styledCommon'
import TowerStatTable from './towerStatTable'
import TitleStatTable from './titleStatTable'
import txtTowerStat from './txttowerstat'
import { TowerClearData, FloorClearData } from './towerClearData'

interface Props {
    lang: string,
    towerList: Array<TowerClearData>,
    titleList: Array<FloorClearData>
}

const TowerClearStatPresenter = (props: Props) => {
    return (
        <Container>
            <ItemRow>
                <h3>Tower clear status</h3>
            </ItemRow>
            <ItemRow id='top'>
                <a href='#titlesection'>
                    <Button>
                        {(txtTowerStat.btntitle as any)[props.lang]}
                    </Button>
                </a>
            </ItemRow>
            <ItemRow>
                <BodyHeader>
                    <h4>{(txtTowerStat.towerhead as any)[props.lang]}</h4>
                </BodyHeader>
                <BodyContent>
                    <TowerStatTable list={props.towerList} />
                </BodyContent>
            </ItemRow>
            <ItemRow>
                <a href='#top'>
                    <Button>
                        {(txtTowerStat.btntop as any)[props.lang]}
                    </Button>
                </a>
            </ItemRow>
            <ItemRow id='titlesection'>
                <BodyHeader>
                    <h4>{(txtTowerStat.titlehead as any)[props.lang]}</h4>
                </BodyHeader>
                <BodyContent id='titlelist'>
                    <ItemRow>
                        {(txtTowerStat.duplicate as any)[props.lang]}
                    </ItemRow>
                    <ItemRow>
                        <TitleStatTable list={props.titleList} />
                    </ItemRow>
                </BodyContent>
            </ItemRow>
            <ItemRow>
                <a href='#top'>
                    <Button>
                        {(txtTowerStat.btntop as any)[props.lang]}
                    </Button>
                </a>
            </ItemRow>
        </Container>
    )
}

export default TowerClearStatPresenter