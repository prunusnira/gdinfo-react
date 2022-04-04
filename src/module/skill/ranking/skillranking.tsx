import React from 'react'
import {useParams} from 'react-router-dom'
import { observer } from 'mobx-react'
import SkillRankingPresenter from './skillRankingPresenter'
import useSkillRankingData from './useSkillRankingData'

interface MatchProps {
    gtype: string,
    page: string
}

const SkillRanking  = observer(() => {
    const {gtype, page} = useParams<MatchProps>()
    const [rankList, allPage] = useSkillRankingData(gtype, page)

    return (
        <SkillRankingPresenter
            gtype={gtype}
            rankList={rankList}
            page={page}
            allPage={allPage} />
    )
})

export default SkillRanking