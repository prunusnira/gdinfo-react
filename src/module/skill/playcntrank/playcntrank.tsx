import React from 'react'
import { useParams } from 'react-router-dom'
import PlaycountRankingPresenter from './playcntrankPresenter'
import usePlaycntData from './usePlaycntData'

const PlaycountRanking = () => {
    const {page} = useParams()
    const {list, allPage} = usePlaycntData(page)

    return (
        <PlaycountRankingPresenter
            list={list}
            page={page}
            allPage={allPage} />
    )
}

export default PlaycountRanking