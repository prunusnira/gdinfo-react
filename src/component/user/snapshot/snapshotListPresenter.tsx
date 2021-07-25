import React from 'react'
import SnapshotItem from './snapshotItem'
import { BodyContent, BodyHeader, Container, ItemCol, ItemRow } from '@/styled/styledCommon'
import store from '@/mobx/store'

import txtSnapshotKo from '@/lang/user/snapshot/txtSnapshot-ko'
import txtSnapshotJp from '@/lang/user/snapshot/txtSnapshot-jp'
import txtSnapshotEn from '@/lang/user/snapshot/txtSnapshot-en'

interface Props {
    id: string,
    glist: Array<string>,
    dlist: Array<string>,
}

const SnapshotListPresenter = (props: Props) => {
    const lang = store.language.lang
    const txtSnapshot =
        lang === 'ko' ? txtSnapshotKo :
            lang === 'jp' ? txtSnapshotJp : txtSnapshotEn

    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Snapshot List</h3>
                </BodyHeader>
                <BodyContent id="snaplist">
                    <ItemRow setVertical={true}>
                        {txtSnapshot.desc1}<br/>
                        <b style={{color:"coral"}}>{txtSnapshot.desc2}</b><br/>
                        {txtSnapshot.desc3}<br/><br/>
                    </ItemRow>
                    <ItemRow>
                        <ItemCol size={5} isFlatUnderLg={true}>
                            <BodyHeader>
                                <h3>GuitarFreaks</h3>
                            </BodyHeader>
                            <BodyContent>
                                {
                                    (function() {
                                        if(props.glist.length === 0) {
                                            return (<h3>LIST IS EMPTY</h3>)
                                        }
                                        else {
                                            return (<SnapshotItem id={props.id} date={props.glist} gtype="gf" />)
                                        }
                                    })()
                                }
                            </BodyContent>
                        </ItemCol>
                        <ItemCol size={5} isFlatUnderLg={true}>
                            <BodyHeader>
                                <h3>DrumMania</h3>
                            </BodyHeader>
                            <BodyContent>
                                {
                                    (function() {
                                        if(props.dlist.length === 0) {
                                            return (<h3>LIST IS EMPTY</h3>)
                                        }
                                        else {
                                            return (<SnapshotItem id={props.id} date={props.dlist} gtype="dm" />)
                                        }
                                    })()
                                }
                            </BodyContent>
                        </ItemCol>
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
}

export default SnapshotListPresenter