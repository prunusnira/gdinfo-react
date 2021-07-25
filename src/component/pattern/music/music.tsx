import React from 'react'
import {useParams} from 'react-router-dom'
import MusicPresenter from './musicPresenter'
import useUserData from '@/component/common/useUserData'
import useMusicInfo from './useMusicInfo'
import usePatternInfo from './usePatternInfo'

interface MatchProps {
    userid: string,
    mid: string
}

const Music = () => {
    const {userid, mid} = useParams<MatchProps>()
    const [playerName, profLink, titleTower] = useUserData(userid)
    const [musicName, composer, version] = useMusicInfo(mid)
    const patternlist = usePatternInfo(mid, userid)

    return (
        <MusicPresenter
            mid={mid}
            musicName={musicName}
            composer={composer}
            version={version}
            profLink={profLink}
            playerName={playerName}
            patternlist={patternlist} />
    )
}

export default Music