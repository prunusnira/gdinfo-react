import React from 'react'
import {Link} from 'react-router-dom'
import TowerListImg from './toweritem'
import TowerListData from './towerlistData'
import store from '@/mobx/store'
import { BodyContent, BodyHeader, Button, Container, ItemCol, ItemRow } from '@/styled/styledCommon'

import txtTowerKo from '@/lang/tower/txtTower-ko'
import txtTowerJp from '@/lang/tower/txtTower-jp'
import txtTowerEn from '@/lang/tower/txtTower-en'

interface Props {
    towerGF: Array<TowerListData>,
    towerDM: Array<TowerListData>,
    towerSP: Array<TowerListData>,
}

const TowerListPresenter = (props: Props) => {
    const lang = store.language.lang

    const txtTower =
        lang === 'ko' ? txtTowerKo :
            lang === 'jp' ? txtTowerJp : txtTowerEn

    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>The Tower</h3>
                </BodyHeader>
                <BodyContent>
                    <ItemRow>
                        {txtTower.main.desc}
                    </ItemRow>
                    <ItemRow>
                        <Link to={"/tower/howto"}>
                            <Button>
                                {txtTower.main.howto}
                            </Button>
                        </Link>
                    </ItemRow>
                </BodyContent>
            </ItemRow>

            <ItemRow id="towerlist">
                <ItemCol size={5} isFlatUnderLg={true}>
                    <BodyHeader>
                        <h3>{txtTower.main.skilltower}&nbsp;GuitarFreaks</h3>
                    </BodyHeader>
                    <BodyContent>
                        <ItemRow setVertical={true}>
                            <TowerListImg list={props.towerGF} />
                        </ItemRow>
                    </BodyContent>
                </ItemCol>
                <ItemCol size={5} isFlatUnderLg={true}>
                    <BodyHeader>
                        <h3>{txtTower.main.skilltower}&nbsp;DrumMania</h3>
                    </BodyHeader>
                    <BodyContent>
                        <ItemRow setVertical={true}>
                            <TowerListImg list={props.towerDM} />
                        </ItemRow>
                    </BodyContent>
                </ItemCol>
            </ItemRow>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>{txtTower.main.sptower}</h3>
                </BodyHeader>
                <BodyContent>
                    <ItemRow setVertical={true}>
                        <TowerListImg list={props.towerSP} />
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
}

export default TowerListPresenter