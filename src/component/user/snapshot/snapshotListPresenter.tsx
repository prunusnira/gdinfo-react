import React from 'react'
import SnapshotItem from './snapshotItem';
import txtSnapshot from './txtsnapshot';
import { BodyContent, BodyHeader, Container, ItemCol, ItemRow } from '../../../styled/styledCommon';

interface Props {
    lang: string,
    gempty: boolean,
    dempty: boolean,
    id: string,
    glist: Array<string>,
    dlist: Array<string>,
}

const SnapshotListPresenter = (props: Props) => {
    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Snapshot List</h3>
                </BodyHeader>
                <BodyContent id="snaplist">
                    <ItemRow setVertical={true}>
                        {(txtSnapshot.desc1 as any)[props.lang]}<br/>
                        <b style={{color:"coral"}}>{(txtSnapshot.desc2 as any)[props.lang]}</b><br/>
                        {(txtSnapshot.desc3 as any)[props.lang]}<br/><br/>
                    </ItemRow>
                    <ItemRow>
                        <ItemCol size={5} isFlatUnderLg={true}>
                            <BodyHeader>
                                <h3>GuitarFreaks</h3>
                            </BodyHeader>
                            <BodyContent>
                                {
                                    (function() {
                                        if(props.gempty) {
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
                                        if(props.dempty) {
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