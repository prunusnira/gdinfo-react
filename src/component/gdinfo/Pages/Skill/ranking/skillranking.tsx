import React, {Component, useEffect, useState} from 'react';
import {Link, RouteComponentProps, useParams} from 'react-router-dom';
import axios from 'axios';
import SRItem from './rankingItem';
import txtSrank from './txtskillrank';
import Pager from '../../Common/pager';

import CommonData from '../../Common/commonData';
import SRankData from './srankData';
import TxtCommon from '../../Common/txtCommon';
import { observer } from 'mobx-react';
import store from '../../../../../mobx/store';
import { BodyContent, BodyHeader, Button, Container, ItemRow } from '../../../../../styled/styledCommon';

interface MatchProps {
    gtype: string,
    page: string
}

const SkillRanking  = observer(() => {
    const [rankList, setRankList] = useState(Array<SRankData>())
    const [allPage, setAllPage] = useState(0)

    const {gtype, page} = useParams<MatchProps>()
    const lang = store.language.lang

    useEffect(() => {
        updateRankList()
    }, [gtype, page])

    const updateRankList = () => {
        axios.post(CommonData.dataUrl+"rank/"+gtype+"/"+page)
        .then((res) => {
            const json = res.data
            const list = new Array<SRankData>()
            const userList = JSON.parse(json.allUserList)

            for(let i = 0; i < userList.length; i++) {
                const obj = new SRankData()
                const cur = userList[i]
                obj.index = i+30*(parseInt(page)-1)+1
                obj.profilerank = '/profile/'+cur.id

                if(cur.titletower !== '')
                    obj.towertitle = `/general-img/title/${cur.titletower}.png`
                else
                    obj.towertitle = ''

                obj.username = cur.name+" ⓟ";

                const date = new Date().getTime() - cur.uptimelong
                const day = Math.floor(date/1000/60/60/24)

                if(day > 0) {
                    obj.time = day+(TxtCommon.other.days as any)[lang]
                }
                else {
                    obj.time = Math.floor(date/1000/60/60)+(TxtCommon.other.hrs as any)[lang]+
                        " "+Math.floor(date/1000/60%60)+(TxtCommon.other.mins as any)[lang];
                }
                obj.gskill = cur.gskill.toFixed(2)
                obj.glink = "/skill/2/"+cur.id+"/gf/1/1"
                obj.dskill = cur.dskill.toFixed(2)
                obj.dlink = "/skill/2/"+cur.id+"/dm/1/1"
                obj.allskill = (cur.gskill+cur.dskill).toFixed(2)

                list.push(obj);
            }

            setRankList(list)
            setAllPage(json.pages)
        });
    }

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
                    <ItemRow className="btn-group">
                        <Link to='/rank/gf/1' style={{width:"100%"}}>
                            <Button style={{width:"100%"}}>GF Rank</Button>
                        </Link>
                        <Link to='/rank/dm/1' style={{width:"100%"}}>
                            <Button style={{width:"100%"}}>DM Rank</Button>
                        </Link>
                        <Link to='/rank/all/1' style={{width:"100%"}}>
                            <Button style={{width:"100%"}}>Total Rank</Button>
                        </Link>
                    </ItemRow>
                </BodyContent>
            </ItemRow>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    {
                        (function() {
                            switch(gtype) {
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
                            <SRItem gtype={gtype} rank={rankList} />
                        </div>
                    </ItemRow>
                    <ItemRow className="text-center">
                        <Pager cpage={parseInt(page)} allpage={allPage}
                            baseUrl={`/rank/${gtype}/`}
                            afterUrl="" />
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
})

export default SkillRanking;