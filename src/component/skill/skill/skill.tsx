import React from 'react'
import {Redirect, useParams} from 'react-router-dom'
import axios from 'axios'
import CommonData from '../../common/commonData'
import scrShot from '../../common/scrshot'
import { observer } from 'mobx-react'
import store from '../../../mobx/store'
import useSkillTableData from './useSkillTableData'
import useSTableUser from './useSTableUser'
import useSkillTableVisibility from './useSkillTableVisibility'
import useSkillTableUpper from './useSkillUpper'
import useSkillSelector from './useSkillSelector'
import SkillPresenter from './skillpresenter/skillPresenter'

import txtSkillKo from "../../../lang/skill/skill/txtSkill-ko"
import txtSkillJp from "../../../lang/skill/skill/txtSkill-jp"
import txtSkillEn from "../../../lang/skill/skill/txtSkill-en"

interface MatchProps {
    order: string,
    ptype: string,
    userid: string,
    gtype: string,
    page: string
}

const SkillContainer: React.FC<{share: boolean}> = observer(share => {
    const {order, ptype, userid, gtype, page} = useParams<MatchProps>()

    const [user, ownAccount] = useSTableUser(userid, ptype)
    const [visibleLarge, visibleLeft, visibleRight] = useSkillTableVisibility(ptype)
    const [
        skillTable1, skillTable2,
        skillSum1, skillSum2,
        allpage, updateTime
    ] = useSkillTableData(order, ptype, userid, gtype, page)

    const [
        tableTxtGType, tableTxtDesc,
        statLeftTitle, statLeft, statMidTitle, statMid, statRightTitle, statRight
    ] = useSkillTableUpper(user, skillSum1, skillSum2, order, ptype, gtype)

    const [
        menuVisible, showTableMenu,
        switchVerState, switchRankState, switchNameState, switchOrderState,
        nextVer, nextRank, nextName, nextOrder,
        switchVer, switchRank, switchName, switchOrder,
    ] = useSkillSelector(order)

    const lang = store.language.lang

    const txtSkill =
        lang === 'ko' ? txtSkillKo :
            lang === 'jp' ? txtSkillJp : txtSkillEn

    const createSnapshot = (userid: string, gtype: string) => {
        axios.post(`${CommonData.dataUrl}skill/snapshot/create/${userid}/${gtype}`)
        .then((res) => {
            alert(txtSkill.snapshot.created)
        })
    }

    if(switchVerState) {
        const exturl = new URLSearchParams(window.location.search)
        exturl.set("ver", nextVer.toString());
        return <Redirect to={`/skill/0/${userid}/${gtype}/${page}/${order}?${exturl.toString()}`} />
    }
    if(switchRankState) {
        const exturl = new URLSearchParams(window.location.search)
        exturl.set("rank", nextRank);
        return <Redirect to={`/skill/0/${userid}/${gtype}/${page}/${order}?${exturl.toString()}`} />
    }
    if(switchNameState) {
        const exturl = new URLSearchParams(window.location.search)
        exturl.set("name", nextName);
        return <Redirect to={`/skill/0/${userid}/${gtype}/${page}/${order}?${exturl.toString()}`} />
    }
    if(switchOrderState) {
        return <Redirect to={`/skill/0/${userid}/${gtype}/${page}/${nextOrder}${window.location.search}`} />
    }
    else {
        return (
            <SkillPresenter
                // share table
                share={share.share}

                // url query
                ptype={ptype}
                userid={userid}
                gtype={gtype}
                page={page}
                order={order}
            
                // data
                lang={lang}
            
                // 스킬표 상단 타이틀
                tableTxtGType={tableTxtGType}
                tableTxtDesc={tableTxtDesc}
            
                // 스킬표 상단 데이터
                statLeftTitle={statLeftTitle}
                statLeft={statLeft}
                statMidTitle={statMidTitle}
                statMid={statMid}
                statRightTitle={statRightTitle}
                statRight={statRight}
                updateTime={updateTime}
            
                // states
                ownAccount={ownAccount}
                menuVisible={menuVisible}
            
                visibleLarge={visibleLarge}
                visibleLeft={visibleLeft}
                visibleRight={visibleRight}
                allpage={allpage}
            
                user={user}
                skillTable1={skillTable1}
                skillTable2={skillTable2}
            
                // methods
                createSnapshot={createSnapshot}
                showTableMenu={showTableMenu}
                scrShot={scrShot}
            
                // methods for ptype 0 menus
                switchVer={switchVer}
                switchRank={switchRank}
                switchName={switchName}
                switchOrder={switchOrder}
            />
        )
    }
})

export default SkillContainer