import React from 'react'
import {Link} from 'react-router-dom'
import { Icon, ItemCol, ItemRow } from '../../../styled/styledCommon'
import PlaycntRankData from './playcntrankData'

interface Props {
    list: Array<PlaycntRankData>
}

const PlayCntRankItem = (props: Props) => {
    return (
        <>
        {
            props.list.map(v => {
                return (
                    <ItemRow
                        style={{paddingTop:"3px", paddingBottom:"3px"}}
                        keepDirHor={true}>
                        <ItemCol size={1}>
                            {v.index}
                        </ItemCol>
                        <ItemCol size={9}>
                            <ItemRow>
                                <ItemCol size={5} isFlatUnderLg={true} className="text-left">
                                    {
                                        (function() {
                                            if(v.towertitle !== "") {
                                                return (
                                                    <Icon
                                                        alt="titletower"
                                                        src={`${process.env.PUBLIC_URL}/general-img/title/${v.towertitle}.png`} />
                                                )
                                            }
                                        })()
                                    }
                                    <span id="towertitle" v-html="list.towertitle"></span>
                                    <Link className="innerhref" to={v.prlink}>{v.name}</Link>
                                </ItemCol>
                                <ItemCol size={5} isFlatUnderLg={true} className="text-right">
                                    <ItemRow keepDirHor={true}>
                                        <ItemCol size={2}></ItemCol>
                                        <ItemCol size={2}>G<br/>{v.gfcnt}</ItemCol>
                                        <ItemCol size={1}>+</ItemCol>
                                        <ItemCol size={2}>D<br/>{v.dmcnt}</ItemCol>
                                        <ItemCol size={1}>=</ItemCol>
                                        <ItemCol size={2}>A<br/>{v.allcnt}</ItemCol>
                                    </ItemRow>
                                </ItemCol>
                            </ItemRow>
                        </ItemCol>
                    </ItemRow>
                )
            })
        }
        </>
        
    )
}

export default PlayCntRankItem;