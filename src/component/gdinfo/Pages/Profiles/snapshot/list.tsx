import React, {useEffect, useState} from 'react';
import SnapshotItem from './snapshotItem';
import axios from 'axios';
import txtSnapshot from './txtsnapshot';

import CommonData from '../../Common/commonData';
import { useParams } from 'react-router-dom';
import store from '../../../../../mobx/store';
import { BodyContent, BodyHeader, Container, ItemCol, ItemRow } from '../../../../../styled/styledCommon';

interface MatchProps {
    id: string
}

const SnapshotList = () => {
    const [glist, setGList] = useState(Array<string>())
    const [dlist, setDList] = useState(Array<string>())
    const [gempty, setGEmpty] = useState(true)
    const [dempty, setDEmpty] = useState(true)

    const {id} = useParams<MatchProps>()

    const lang = store.language.lang
    
    useEffect(() => {
        axios.post(`${CommonData.dataUrl}skill/snapshot/list/${id}`)
        .then((res) => {
            const json = res.data;
            const list = JSON.parse(json.list);

            const gflist = [];
            const dmlist = [];
            let gempty = true;
            let dempty = true;

            // '.'과 '_'으로 split
            for(let i = 0; i < list.length; i++) {
                const c = list[i].split('.')[0].split('_');
                if(c[1] === "gf") gflist.push(c[0]);
                else if(c[1] === "dm") dmlist.push(c[0]);
            }

            gflist.sort(function(a, b) {
                if(a > b) return 1;
                else if(b > a) return -1;
                else return 0;
            });

            dmlist.sort(function(a, b) {
                if(a > b) return 1;
                else if(b > a) return -1;
                else return 0;
            });

            if(gflist.length > 0) {
                gempty = false;
            }

            if(dmlist.length > 0) {
                dempty = false;
            }

            setGList(gflist)
            setDList(dmlist)
            setGEmpty(gempty)
            setDEmpty(dempty)
        })
    }, [])

    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Snapshot List</h3>
                </BodyHeader>
                <BodyContent id="snaplist">
                    <ItemRow>
                        {(txtSnapshot.desc1 as any)[lang]}<br/>
                        <b style={{color:"coral"}}>{(txtSnapshot.desc2 as any)[lang]}</b><br/>
                        {(txtSnapshot.desc3 as any)[lang]}<br/><br/>
                    </ItemRow>
                    <ItemRow>
                        <ItemCol size={5} isFlatUnderLg={true}>
                            <BodyHeader>
                                <h3>GuitarFreaks</h3>
                            </BodyHeader>
                            <BodyContent>
                                {
                                    (function() {
                                        if(gempty) {
                                            return (<h3>LIST IS EMPTY</h3>)
                                        }
                                        else {
                                            return (<SnapshotItem id={id} date={glist} gtype="gf" />)
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
                                        if(dempty) {
                                            return (<h3>LIST IS EMPTY</h3>)
                                        }
                                        else {
                                            return (<SnapshotItem id={id} date={dlist} gtype="dm" />)
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

export default SnapshotList;