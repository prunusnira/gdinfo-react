import React from 'react'
import {Link} from 'react-router-dom'
import { BodyContent, BodyHeader, Button, Container, ItemCol, ItemRow } from '../../../styled/styledCommon'
import PatternRankRow from './ptRankRow'
import Pager from '../../common/pager'
import store from '../../../mobx/store';
import CommonData from '../../common/commonData';
import PTRankData from './ptrankData'

import txtPTRankKo from '../../../lang/pattern/patternRank/txtPTRank-ko'
import txtPTRankJp from '../../../lang/pattern/patternRank/txtPTRank-jp'
import txtPTRankEn from '../../../lang/pattern/patternRank/txtPTRank-en'

interface Props {
    mid: string,
    pattern: string,
    level: string,
    mname: string,
    composer: string,
    ptcode: string,
    list: Array<PTRankData>,
    page: string,
    allPage: number,
}

const PatternRankPresenter = (props: Props) => {
    const lang = store.language.lang
    
    const txtPTRank =
        lang === 'ko' ? txtPTRankKo :
            lang === 'jp' ? txtPTRankJp : txtPTRankEn

    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>{txtPTRank.title}</h3>
                </BodyHeader>
                <BodyContent className="text-center">
                    <span>{txtPTRank.desc}</span>
                </BodyContent>
            </ItemRow>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>{txtPTRank.table.ptinfo}</h3>
                </BodyHeader>
                <BodyContent>
                    <ItemRow id="upper">
                        <ItemCol size={3}> 
                            <img alt="jacket-img" src={`${CommonData.jacketUrl}${props.mid}.jpg`}
                                onError={(e) => {
                                    e.currentTarget.src=`${CommonData.jacketUrl}empty.jpg`}}
                                style={{width:"75%", maxWidth: "100px"}} /><br/>
                            <img alt="pattern" src={props.pattern}
                                style={{width:"75%", maxWidth: "100px"}} /><br/>
                            <span>{props.level}</span>
                        </ItemCol>
                        <ItemCol size={7}>
                            <ItemRow style={{padding:"10px"}} setVertical={true}>
                                <span style={{fontSize:"125%"}}>{props.mname}</span><br/>
                                <span>{props.composer}</span>
                            </ItemRow>
                        </ItemCol>
                    </ItemRow>
                </BodyContent>
            </ItemRow>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <ItemRow keepDirHor={true}>
                        <ItemCol size={3}>
                            <h3>{txtPTRank.table.ranking}</h3>
                        </ItemCol>
                        <ItemCol size={7} style={{textAlign: 'right'}}>
                            <Link to={`/ptrank/${props.mid}/${props.ptcode}/1?ver=29`}>
                                <Button className="rank29">HV</Button>
                            </Link>
                            <Link to={`/ptrank/${props.mid}/${props.ptcode}/1?ver=28`}>
                                <Button className="rank28">NX</Button>
                            </Link>
                            <Link to={`/ptrank/${props.mid}/${props.ptcode}/1?ver=27`}>
                                <Button className="rank27">EX</Button>
                            </Link>
                            <Link to={`/ptrank/${props.mid}/${props.ptcode}/1?ver=26`}>
                                <Button className="rank26">MX</Button>
                            </Link>
                            <Link to={`/ptrank/${props.mid}/${props.ptcode}/1?ver=25`}>
                                <Button className="rank25">RE</Button>
                            </Link>
                            <Link to={`/ptrank/${props.mid}/${props.ptcode}/1?ver=24`}>
                                <Button className="rank24">TB</Button>
                            </Link>
                        </ItemCol>
                    </ItemRow>
                </BodyHeader>
                <BodyContent>
                    <ItemRow setVertical={true}>
                        <div className='div-table table-border-outer' id="ranktable">
                            <PatternRankRow list={props.list} />
                        </div>
                        <div id="empty"></div>
                    </ItemRow>
                    <ItemRow id="pager" keepDirHor={true}>
                        <Pager cpage={parseInt(props.page)}
                            allpage={props.allPage}
                            baseUrl={`/ptrank/${props.mid}/${props.ptcode}/`}
                            afterUrl={window.location.search} />
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
}

export default PatternRankPresenter