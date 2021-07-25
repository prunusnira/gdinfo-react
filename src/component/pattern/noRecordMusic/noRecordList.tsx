import React from 'react'
import {useParams} from 'react-router-dom'
import NoRecordPresenter from './noRecordPresenter'
import NoRecordTitle from './noRecordTitle'
import NoRecordSelector from './noRecordSelector'
import useNoRecordData from './useNoRecordData'
import useNoRecordSelector from './useNoRecordSelector'
import { Container } from '@/styled/styledCommon'

interface MatchProps {
    gtype: string,
    userid: string,
    vertype: string,
    page: string
}

const NoRecordMusicList = () => {
    const {gtype, userid, vertype, page} = useParams<MatchProps>()
    const [list, allPage] = useNoRecordData(gtype, userid, vertype, page)
    const [
        lv, ver,
        switchLv, switchLvMethod,
        switchVer, switchVerMethod,
        switchHot, switchHotMethod,
        switchOther, switchOtherMethod,
        switchClear, switchClearMethod
    ] = useNoRecordSelector()
    
    return (
        <Container>
            <NoRecordTitle />
            <NoRecordSelector
                userid={userid}
                switchLvMethod={switchLvMethod}
                switchVerMethod={switchVerMethod}
                switchHotMethod={switchHotMethod}
                switchOtherMethod={switchOtherMethod}
                switchClearMethod={switchClearMethod} />
            <NoRecordPresenter
                switchLv={switchLv}
                switchVer={switchVer}
                switchHot={switchHot}
                switchOther={switchOther}
                switchClear={switchClear}
                
                lv={lv}
                ver={ver}
                allPage={allPage}
                list={list}
                
                gtype={gtype}
                userid={userid}
                vertype={vertype}
                page={page} />
        </Container>
    )
}

export default NoRecordMusicList