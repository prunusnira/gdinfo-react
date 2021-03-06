import React from 'react'
import {Link} from 'react-router-dom'
import { BodyContent, BodyHeader, Button, Container, ItemCol, ItemRow } from '../../../styled/styledCommon'
import SkillRankingItem from './rankingItem'
import txtSrank from './txtskillrank'
import Pager from '../../common/pager'
import store from '../../../mobx/store'
import SRankData from './srankData'

interface Props {
    gtype: string,
    rankList: Array<SRankData>,
    page: string,
    allPage: number
}

const SkillRankingPresenter = (props: Props) => {
    const lang = store.language.lang
    
    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Skill Ranking</h3>
                </BodyHeader>
                <BodyContent className="text-center">
                    <ItemRow>
                        {(txtSrank.desc as any)[lang]}
                    </ItemRow>
                    <ItemRow keepDirHor={true}>
                        <ItemCol size={3.3}>
                            <Link to='/rank/gf/1' style={{width:"100%"}}>
                                <Button style={{width:"100%"}}>GF Rank</Button>
                            </Link>
                        </ItemCol>
                        <ItemCol size={3.3}>
                            <Link to='/rank/dm/1' style={{width:"100%"}}>
                                <Button style={{width:"100%"}}>DM Rank</Button>
                            </Link>
                        </ItemCol>
                        <ItemCol size={3.3}>
                            <Link to='/rank/all/1' style={{width:"100%"}}>
                                <Button style={{width:"100%"}}>Total Rank</Button>
                            </Link>
                        </ItemCol>
                    </ItemRow>
                </BodyContent>
            </ItemRow>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    {
                        (function() {
                            switch(props.gtype) {
                                case "gf":
                                    return <h3>GuitarFreaks</h3>
                                case "dm":
                                    return <h3>DrumMania</h3>
                                case "all":
                                    return <h3>Total Skill</h3>
                                default:
                                    return <h3>FAILED TO LOAD</h3>
                            }
                        })()
                    }
                </BodyHeader>
                <BodyContent>
                    <ItemRow style={{paddingBottom:"20px"}}>
                        {(txtSrank.click as any)[lang]}
                    </ItemRow>
                    <ItemRow>
                        <div className="div-table" id="ranktable">
                            <SkillRankingItem gtype={props.gtype} rank={props.rankList} />
                        </div>
                    </ItemRow>
                    <ItemRow className="text-center">
                        <Pager cpage={parseInt(props.page)} allpage={props.allPage}
                            baseUrl={`/rank/${props.gtype}/`}
                            afterUrl="" />
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
}

export default SkillRankingPresenter