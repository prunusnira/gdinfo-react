import React from 'react'
import {Link} from 'react-router-dom'
import TowerListImg from './toweritem'
import txtTower from '../txttower'
import TowerListData from './towerlistData'
import store from '../../../mobx/store'
import { BodyContent, BodyHeader, Button, Container, ItemCol, ItemRow } from '../../../styled/styledCommon'

interface Props {
    towerGF: Array<TowerListData>,
    towerDM: Array<TowerListData>,
    towerSP: Array<TowerListData>,
}

const TowerListPresenter = (props: Props) => {
    const lang = store.language.lang

    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>The Tower</h3>
                </BodyHeader>
                <BodyContent>
                    <ItemRow>
                        {(txtTower.main.desc as any)[lang]}
                    </ItemRow>
                    <ItemRow>
                        <Link to={"/tower/howto"}>
                            <Button>
                                {(txtTower.main.howto as any)[lang]}
                            </Button>
                        </Link>
                    </ItemRow>
                </BodyContent>
            </ItemRow>

            <ItemRow id="towerlist">
                <ItemCol size={5} isFlatUnderLg={true}>
                    <BodyHeader>
                        <h3>{(txtTower.main.skilltower as any)[lang]}&nbsp;GuitarFreaks</h3>
                    </BodyHeader>
                    <BodyContent>
                        <ItemRow setVertical={true}>
                            <TowerListImg list={props.towerGF} />
                        </ItemRow>
                    </BodyContent>
                </ItemCol>
                <ItemCol size={5} isFlatUnderLg={true}>
                    <BodyHeader>
                        <h3>{(txtTower.main.skilltower as any)[lang]}&nbsp;DrumMania</h3>
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
                    <h3>{(txtTower.main.sptower as any)[lang]}</h3>
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