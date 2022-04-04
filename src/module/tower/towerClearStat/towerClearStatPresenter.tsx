import React from 'react'
import { BodyContent, BodyHeader, Button, Container, ItemRow } from '@/styled/styledCommon'
import TowerStatTable from './towerStatTable'
import TitleStatTable from './titleStatTable'
import { TowerClearData, FloorClearData } from './towerClearData'

import txtTowerStatKo from '@/lang/tower/towerClearStat/txtTowerStat-ko'
import txtTowerStatJp from '@/lang/tower/towerClearStat/txtTowerStat-jp'
import txtTowerStatEn from '@/lang/tower/towerClearStat/txtTowerStat-en'
import store from '@/mobx/store'

interface Props {
    towerList: Array<TowerClearData>,
    titleList: Array<FloorClearData>
}

const TowerClearStatPresenter = (props: Props) => {
    const lang = store.language.lang

    const txtTowerStat =
        lang === 'ko' ? txtTowerStatKo :
            lang === 'jp' ? txtTowerStatJp : txtTowerStatEn

    return (
        <Container>
            <ItemRow>
                <h3>Tower clear status</h3>
            </ItemRow>
            <ItemRow id='top'>
                <a href='#titlesection'>
                    <Button>
                        {txtTowerStat.btntitle}
                    </Button>
                </a>
            </ItemRow>
            <ItemRow>
                <BodyHeader>
                    <h4>{txtTowerStat.towerhead}</h4>
                </BodyHeader>
                <BodyContent>
                    <TowerStatTable list={props.towerList} />
                </BodyContent>
            </ItemRow>
            <ItemRow>
                <a href='#top'>
                    <Button>
                        {txtTowerStat.btntop}
                    </Button>
                </a>
            </ItemRow>
            <ItemRow id='titlesection'>
                <BodyHeader>
                    <h4>{txtTowerStat.titlehead}</h4>
                </BodyHeader>
                <BodyContent id='titlelist'>
                    <ItemRow>
                        {txtTowerStat.duplicate}
                    </ItemRow>
                    <ItemRow>
                        <TitleStatTable list={props.titleList} />
                    </ItemRow>
                </BodyContent>
            </ItemRow>
            <ItemRow>
                <a href='#top'>
                    <Button>
                        {txtTowerStat.btntop}
                    </Button>
                </a>
            </ItemRow>
        </Container>
    )
}

export default TowerClearStatPresenter