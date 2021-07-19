import axios from "axios"
import { useEffect, useState } from "react"
import CommonData from "../../common/commonData"
import { skillTableColor } from "../../common/skillcolor"
import PTRankData from "./ptrankData"
import store from "../../../mobx/store"

import TxtCommonKo from '../../../lang/common/txtCommon-ko'
import TxtCommonJp from '../../../lang/common/txtCommon-jp'
import TxtCommonEn from '../../../lang/common/txtCommon-en'

type RankDataReturn = [Array<PTRankData>, number]

const usePTRankData = (
    mid: string,
    ptcode: string,
    page: string,
    urlparams: URLSearchParams,
    isLoaded: boolean,
    setLoaded: (b: boolean) => void,
): RankDataReturn => {
    const [list, setList] = useState(Array<PTRankData>())
    const [allPage, setAllPage] = useState(0)

    useEffect(() => {
        loadRankData()
    }, [urlparams.get('ver'), page])

    useEffect(() => {
        if(isLoaded) {
            loadRankData()
            setLoaded(false)
        }
    }, [isLoaded])

    const lang = store.language.lang
    
    const TxtCommon =
        lang === 'ko' ? TxtCommonKo :
            lang === 'jp' ? TxtCommonJp : TxtCommonEn

    const loadRankData = () => {
        axios.post(`${CommonData.dataUrl}ptrank/${mid}/${ptcode}/${page}/${urlparams.get('ver') === null ? CommonData.currentVersion : urlparams.get('ver')}`)
        .then((res) => {
            const json = res.data;

            const music = JSON.parse(json.music)
            const list = JSON.parse(json.list)
            const users = JSON.parse(json.users)
				
            let lv = 0;
            let userskill = 0;
            switch(parseInt(ptcode)) {
            case 1: lv = music.gbsc; break;
            case 2: lv = music.gadv; break;
            case 3: lv = music.gext; break;
            case 4: lv = music.gmas; break;
            case 5: lv = music.bbsc; break;
            case 6: lv = music.badv; break;
            case 7: lv = music.bext; break;
            case 8: lv = music.bmas; break;
            case 9: lv = music.dbsc; break;
            case 10: lv = music.dadv; break;
            case 11: lv = music.dext; break;
            case 12: lv = music.dmas; break;
            default: lv = 0;
            }

            const ranklist = new Array<PTRankData>()
            for(let i = 0; i < list.length; i++) {
                const cur = list[i]
                const user = users[i]
                const obj = new PTRankData()

                const rate = cur.rate
                obj.rate = rate/100
                const skill = obj.rate*lv*20/10000
                obj.skill = skill.toFixed(2)
                const tableColor = skillTableColor(skill*100)
                if(tableColor.startsWith("#")) {
                    obj.ratecolor = {width:"10px", backgroundColor: tableColor}
                }
                else {
                    obj.ratecolor = {width:"10px", background: tableColor}
                }

                if(parseInt(ptcode) < 9) {
                    switch(urlparams.get('ver')) {
                        case '24': userskill = user.gskilltb; break;
                        case '25': userskill = user.gskilltbre; break;
                        case '26': userskill = user.gskillmx; break;
                        case '27': userskill = user.gskillex; break;
                        case '28': userskill = user.gskillnx; break;
                        case '29': default: userskill = user.gskill; break;
                    }
                }
                else {
                    switch(urlparams.get('ver')) {
                        case '24': userskill = user.dskilltb; break;
                        case '25': userskill = user.dskilltbre; break;
                        case '26': userskill = user.dskillmx; break;
                        case '27': userskill = user.dskillex; break;
                        case '28': userskill = user.dskillnx; break;
                        case '29': default: userskill = user.dskill; break;
                    }
                }

                const tableColor2 = skillTableColor(userskill*2)
                if(tableColor2.startsWith("#")) {
                    obj.skillcolor = {width:"10px", backgroundColor: tableColor2}
                }
                else {
                    obj.skillcolor = {width:"10px", background: tableColor2}
                }
                

                obj.index = (parseInt(page)-1)*30+i+1

                if(user.titletower !== '') {
                    obj.towertitle = user.titletower
                }
                else {
                    obj.towertitle = ''
                }

                obj.profile = `/music/${mid}/${cur.userid}`
                obj.name = cur.name

                if(user.opencount === 'N') {
                    obj.towertitle = ''
                    obj.profile = `#none`
                    obj.name = TxtCommon.emptyname
                }

                switch(cur.rank) {
                case "E":
                    obj.rank = `${process.env.PUBLIC_URL}/general-img/rank/rank_e.png`
                    break
                case "D":
                    obj.rank = `${process.env.PUBLIC_URL}/general-img/rank/rank_d.png`
                    break
                case "C":
                    obj.rank = `${process.env.PUBLIC_URL}/general-img/rank/rank_c.png`
                    break
                case "B":
                    obj.rank = `${process.env.PUBLIC_URL}/general-img/rank/rank_b.png`
                    break
                case "A":
                    obj.rank = `${process.env.PUBLIC_URL}/general-img/rank/rank_a.png`
                    break
                case "S":
                    obj.rank = `${process.env.PUBLIC_URL}/general-img/rank/rank_s.png`
                    break
                case "SS":
                case "EXC":
                    obj.rank = `${process.env.PUBLIC_URL}/general-img/rank/rank_ss.png`
                    break
                }

                if(cur.checkfc === 'Y') {
                    obj.fc = true
                }

                if(cur.rank === 'EXC') {
                    obj.exc = true
                }

                ranklist.push(obj)
            }

            setList(ranklist)
            setAllPage(json.pages)
        })
    }

    return [list, allPage]
}

export default usePTRankData