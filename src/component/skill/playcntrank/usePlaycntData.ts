import { useEffect, useState } from "react"
import PlaycntRankData from "./playcntrankData"
import store from '@/mobx/store'
import { getPlayCountRank } from "@/api/getSkillData"

import TxtCommonKo from '@/lang/common/txtCommon-ko'
import TxtCommonJp from '@/lang/common/txtCommon-jp'
import TxtCommonEn from '@/lang/common/txtCommon-en'

type PlaycntDataReturn = [Array<PlaycntRankData>, number]

const usePlaycntData = (page: string): PlaycntDataReturn => {
    const [list, setList] = useState(Array<PlaycntRankData>())
    const [allPage, setAllPage] = useState(0)
    
    useEffect(() => {
        updateData()
    }, [page])

    const lang = store.language.lang
    
    const TxtCommon =
        lang === 'ko' ? TxtCommonKo :
            lang === 'jp' ? TxtCommonJp : TxtCommonEn

    const updateData = () => {
        getPlayCountRank(page)
        .then((json) => {
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
                    obj.name = TxtCommon.emptyname
                }

                list.push(obj)
            }

            setList(list)
            setAllPage(json.pages)
        })
    }

    return [list, allPage]
}

export default usePlaycntData