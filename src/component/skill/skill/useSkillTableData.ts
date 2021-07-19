import axios from "axios"
import { useEffect, useState } from "react"
import CommonData from "../../common/commonData"
import MusicFetchData from "./skillItem/musicFetchData"
import SkillItemData from "./skillItem/skillItemData"
import { generateSkillItem, generateURL, getRate } from "./skillMethods"

type TableDataReturn = [
    Array<SkillItemData>, Array<SkillItemData>,
    number, number,
    number, string
]

const useSkillTableData = (
    order: string,
    ptype: string,
    userid: string,
    gtype: string,
    page: string,
): TableDataReturn => {
    const [skillSum1, setSkillSum1] = useState(0)
    const [skillSum2, setSkillSum2] = useState(0)
    const [skillTable1, setSkillTable1] = useState(Array<SkillItemData>())
    const [skillTable2, setSkillTable2] = useState(Array<SkillItemData>())
    const [allpage, setAllPage] = useState(0)
    const [updateTime, setUpdateTime] = useState('')

    useEffect(() => {
        setSkillTableData()
    }, [window.location.href])
    
    const setSkillTableData = () => {
        axios.post(`${CommonData.dataUrl}${generateURL(order, ptype, userid, gtype, page)}`)
        .then((res) => {
            const json = res.data
            let sum1 = 0
            let sum2 = 0
            const skillList1: SkillItemData[] = []
            const skillList2: SkillItemData[] = []

            const skill = JSON.parse(json.skill) as MusicFetchData[]
            if(skill.length > 0) {
                for(let i = 0; i < skill.length; i++) {
                    const cur = skill[i];
                    let obj = generateSkillItem(cur, i, ptype, page, userid)

                    sum1 += Math.floor(getRate(parseInt(ptype), cur)*cur.level*20/10000)

                    skillList1.push(obj);
                }
            }

            const hskill = JSON.parse(json.hskill) as MusicFetchData[]
            if(hskill.length > 0) {
                for(let i = 0; i < hskill.length; i++) {
                    const cur = hskill[i];
                    let obj = generateSkillItem(cur, i, ptype, page, userid)

                    sum1 += Math.floor(getRate(parseInt(ptype), cur)*cur.level*20/10000)

                    skillList1.push(obj);
                }
            }

            const oskill = JSON.parse(json.oskill) as MusicFetchData[]
            if(oskill.length > 0) {
                for(let i = 0; i < oskill.length; i++) {
                    const cur = oskill[i];
                    let obj = generateSkillItem(cur, i, ptype, page, userid)

                    sum2 += Math.floor(getRate(parseInt(ptype), cur)*cur.level*20/10000)

                    skillList2.push(obj);
                }
            }
            
            const user = JSON.parse(json.user);
            const updtime = new Date(user.updatetime);
            const time = updtime.getFullYear() + "/" + (updtime.getMonth()+1) + "/" +
                updtime.getDate() + " " + updtime.getHours() + ":" + updtime.getMinutes();
            
            setSkillTable1(skillList1)
            setSkillTable2(skillList2)
            setUpdateTime(time)
            setAllPage(json.pages)
            setSkillSum1(sum1)
            setSkillSum2(sum2)
        })
    }

    return [
        skillTable1, skillTable2,
        skillSum1, skillSum2,
        allpage, updateTime
    ]
}

export default useSkillTableData