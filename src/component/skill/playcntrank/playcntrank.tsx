import React, {useEffect, useState} from 'react'
import axios from 'axios'
import txtCntRank from './txtcntrank'
import CommonData from '../../common/commonData'
import PlaycntRankData from './playcntrankData'
import { useParams } from 'react-router-dom'
import store from '../../../mobx/store'
import { observer } from 'mobx-react'
import PlaycountRankingPresenter from './playcntrankPresenter'

interface MatchProps {
    page: string
}

const PlaycountRanking = observer(() => {
    const [list, setList] = useState(Array<PlaycntRankData>())
    const [allPage, setAllPage] = useState(0)

    const {page} = useParams<MatchProps>()

    const lang = store.language.lang

    useEffect(() => {
        updateData()
    }, [page])

    const updateData = () => {
        axios.post(`${CommonData.dataUrl}cntrank/${page}`)
        .then((res) => {
            const json = res.data
            const list = new Array<PlaycntRankData>()
            const rank = JSON.parse(json.rank)

            for(let i = 0; i < rank.length; i++) {
                const cur = rank[i]

                const obj: PlaycntRankData = {
                    index: 30*(parseInt(page) - 1)+i+1,
                    towertitle: cur.titletower,
                    prlink: `/profile/${cur.id}`,
                    name: cur.name,
                    gfcnt: cur.countgf,
                    dmcnt: cur.countdm,
                    allcnt: cur.countgf + cur.countdm
                }

                if(cur.opencount === "N") {
                    obj.towertitle = ''
                    obj.prlink = ""
                    obj.name = (txtCntRank.table.emptyname as any)[lang]
                }

                list.push(obj)
            }

            setList(list)
            setAllPage(json.pages)
        })
    }

    return (
        <PlaycountRankingPresenter
            list={list}
            page={page}
            allPage={allPage} />
    )
})

export default PlaycountRanking