import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import PatternRankPresenter from './patternRankPresenter';

import usePTRankData from './usePTRankData';
import useMusicData from './useMusicData';

interface MatchProps {
    ptcode: string,
    mid: string,
    page: string
}

const PatternRank = () => {
    const [isLoaded, setLoaded] = useState(false)
    const {ptcode, mid, page} = useParams<MatchProps>()
    const urlparams = new URLSearchParams(window.location.search)

    const [pattern, level, mname, composer] = useMusicData(ptcode, mid, setLoaded)
    const [list, allPage] = usePTRankData(mid, ptcode, page, urlparams, isLoaded, setLoaded)

    return (
        <PatternRankPresenter
            mid={mid}
            pattern={pattern}
            level={level}
            mname={mname}
            composer={composer}
            ptcode={ptcode}
            list={list}
            page={page}
            allPage={allPage}/>
    )
}

export default PatternRank;