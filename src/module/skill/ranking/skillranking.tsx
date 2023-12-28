import React from 'react'
import {useParams} from 'react-router-dom'
import SkillRankingPresenter from './skillRankingPresenter'
import useSkillRankingData from './useSkillRankingData'

const SkillRanking  = () => {
    const {gtype, page} = useParams()
    const {rankList, allPage} = useSkillRankingData({gtype, page})

    return (
        <SkillRankingPresenter
            gtype={gtype}
            rankList={rankList}
            page={page}
            allPage={allPage} />
    )
}

export default SkillRanking;