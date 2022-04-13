import React from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'
import PlaycountRankingPresenter from './playcntrankPresenter'
import usePlaycntData from './usePlaycntData'

interface MatchProps {
    page: string
}

const PlaycountRanking = observer(() => {
    const {page} = useParams<MatchProps>()
    const [list, allPage] = usePlaycntData(page)

    return (
        <PlaycountRankingPresenter
            list={list}
            page={page}
            allPage={allPage} />
    )
})

export default PlaycountRanking