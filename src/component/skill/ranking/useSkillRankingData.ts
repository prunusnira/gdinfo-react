import { useEffect, useState } from "react"
import store from '../../../mobx/store'
import axios from 'axios'
import CommonData from '../../common/commonData'
import SRankData from './srankData'

import TxtCommonKo from '../../../lang/common/txtCommon-ko'
import TxtCommonJp from '../../../lang/common/txtCommon-jp'
import TxtCommonEn from '../../../lang/common/txtCommon-en'

type SRDataReturn = [Array<SRankData>, number]

const useSkillRankingData = (
    gtype: string,
    page: string
): SRDataReturn => {
    const [rankList, setRankList] = useState(Array<SRankData>())
    const [allPage, setAllPage] = useState(0)
    
    const lang = store.language.lang
    
    const TxtCommon =
        lang === 'ko' ? TxtCommonKo :
            lang === 'jp' ? TxtCommonJp : TxtCommonEn

    useEffect(() => {
        updateRankList()
    }, [gtype, page])

    const updateRankList = () => {
        axios.post(`${CommonData.dataUrl}rank/${gtype}/${page}`)
        .then((res) => {
            const json = res.data
            const list = new Array<SRankData>()
            const userList = JSON.parse(json.allUserList)

            for(let i = 0; i < userList.length; i++) {
                const obj: SRankData = {
                    index: 0,
                    userid: 0,
                    profilerank: '',
                    towertitle: '',
                    username: '',
                    time: '',
                    gskill: '',
                    glink: '',
                    dskill: '',
                    dlink: '',
                    allskill: '',
                }
                const cur = userList[i]
                obj.index = i+30*(parseInt(page)-1)+1
                obj.profilerank = '/profile/'+cur.id

                if(cur.titletower !== '')
                    obj.towertitle = `/general-img/title/${cur.titletower}.png`
                else
                    obj.towertitle = ''

                obj.userid = cur.id
                obj.username = `${cur.name} ⓟ`

                const date = new Date().getTime() - cur.uptimelong
                const day = Math.floor(date/1000/60/60/24)

                if(day > 0) {
                    obj.time = day+TxtCommon.other.days
                }
                else {
                    obj.time = Math.floor(date/1000/60/60)+TxtCommon.other.hrs+
                        " "+Math.floor(date/1000/60%60)+TxtCommon.other.mins;
                }
                obj.gskill = cur.gskill.toFixed(2)
                obj.glink = `/skill/2/${cur.id}/gf/1/1`
                obj.dskill = cur.dskill.toFixed(2)
                obj.dlink = `/skill/2/${cur.id}/dm/1/1`
                obj.allskill = (cur.gskill+cur.dskill).toFixed(2)
                
                if(cur.opencount === "N") {
                    obj.towertitle = ''
                    obj.userid = 0
                    obj.username = TxtCommon.emptyname
                    obj.profilerank = '#none'
                    obj.glink = '#none'
                    obj.dlink = '#none'
                }

                list.push(obj)
            }

            setRankList(list)
            setAllPage(json.pages)
        })
    }
    
    return [rankList, allPage]
}

export default useSkillRankingData