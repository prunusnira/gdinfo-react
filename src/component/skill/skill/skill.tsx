import React, { useEffect, useState } from 'react'
import {Redirect, useParams} from 'react-router-dom'
import axios from 'axios'
import txtSkill from './txtskill'
import CommonData from '../../common/commonData'
import * as time from '../../common/time'
import scrShot from '../../common/scrshot'
import { GDVer, skillPageVersion } from '../../common/version'
import ProfileData from '../../user/profile/profileData'
import { observer } from 'mobx-react'
import store from '../../../mobx/store'
import { skillTableColor } from '../../common/skillcolor'
import { getPatternImg300, getPatternImg600 } from '../../common/pattern'
import SkillItemData from './skillItem/skillItemData'
import MusicFetchData from './skillItem/musicFetchData'
import SkillPresenter from './skillpresenter/skillPresenter'

interface MatchProps {
    order: string,
    ptype: string,
    userid: string,
    gtype: string,
    page: string
}

const SkillContainer: React.FC<{share: boolean}> = observer(share => {
    const [statLeftTitle, setStatLeftTitle] = useState('')
    const [statLeft, setStatLeft] = useState('')
    const [statMidTitle, setStatMidTitle] = useState('')
    const [statMid, setStatMid] = useState('')
    const [statRightTitle, setStatRightTitle] = useState('')
    const [statRight, setStatRight] = useState('')

    const [skillSum1, setSkillSum1] = useState(0)
    const [skillSum2, setSkillSum2] = useState(0)
    const [skillTable1, setSkillTable1] = useState(Array<SkillItemData>())
    const [skillTable2, setSkillTable2] = useState(Array<SkillItemData>())
    const [user, setUser] = useState(new ProfileData())

    const [visibleLarge, setVisibleLarge] = useState(false)
    const [visibleLeft, setVisibleLeft] = useState(false)
    const [visibleRight, setVisibleRight] = useState(false)
    const [allpage, setAllPage] = useState(0)
    const [menuVisible, setMenuVisible] = useState(false)
    const [ownAccount, setOwnAccount] = useState(false)

    // ptype 0에서 상단 필터 조절 시 url을 바꾸기 위해 사용되는 항목
    const [switchVerState, setSwitchVer] = useState(false)
    const [switchRankState, setSwitchRank] = useState(false)
    const [switchNameState, setSwitchName] = useState(false)
    const [switchOrderState, setSwitchOrder] = useState(false)

    const [nextVer, setNextVer] = useState('')
    const [nextRank, setNextRank] = useState('')
    const [nextName, setNextName] = useState('')
    const [nextOrder, setNextOrder] = useState('')
    const [updateTime, setUpdateTime] = useState('')

    const [queryLv, setQueryLv] = useState('')
    const [queryRank, setQueryRank] = useState('')
    const [queryVer, setQueryVer] = useState('')
    const [queryHot, setQueryHot] = useState('')

    const [tableTxtGType, setTableTxtGType] = useState('')
    const [tableTxtDesc, setTableTxtDesc] = useState('')

    const [pageType, setPageType] = useState('')

    const {order, ptype, userid, gtype, page} = useParams<MatchProps>()

    const {language, loginUser} = store
    const lang = language.lang

    // 문제점: useEffect가 너무 무겁다
    useEffect(() => {
        /**
         * 페이지를 열 때 수행해야 하는 것들
         * 1. id 값으로 사용자 정보를 가져온다
         * 2. 지정된 옵션값에 따라 스킬 테이블 값을 불러온다
         * 3. 나머지 값에 따라 메뉴 등을 변경한다
         */

        // Query String에서 값 가져오기
        const getParameters = new URLSearchParams(window.location.search)
        setQueryLv(getParameters.get("lv")!!)
        setQueryRank(getParameters.get("rank")!!)
        setQueryVer(getParameters.get("ver")!!)
        setQueryHot(getParameters.get("hot")!!)

        // id 값에서 사용자정보 불러오기
        setUserInfo()
        
        // 스킬표 데이터를 가져와서 설정
        setSkillTableData()
        
        // 스킬표 visibility 설정
        setSkillTableVisibility()

        // ptype 0에서 선택 스위치 리셋
        resetSwitch()
    }, [window.location.href])
    // URL이 변경되면 새로 useEffect를 호출하여 내용을 갱신
    // (react-router-dom을 위한 설정)

    useEffect(() => {
        // 변경된 문자 업데이트를 위한 별도의 effect
        setTitleText()
        setUpperTableText()
    }, [user, skillSum1, skillSum2])

    const setUserInfo = () => {
        // 페이지를 연 사용자가 로그인 한 본인과 동일한지 확인
        if(userid === loginUser.user.id.toString()) {
            setOwnAccount(true)
        }

        if(ptype === '1000') {
            setUser(new ProfileData())
        }
        else {
            // 서버에서 사용자 정보를 가져옴
            axios.post(`${CommonData.dataUrl}getuserid/${userid}`)
            .then((res) => {
                const json = JSON.parse(res.data.mydata) as ProfileData
                setUser(json)
            })
        }
    }

    // 스킬표 상단 테이블의 글자 데이터
    const setUpperTableText = () => {
        if(gtype === 'gf') {
            setStatLeftTitle('GF Skill')
            setStatLeft(user.gskill.toFixed(2))
        }
        else if(gtype === 'dm') {
            setStatLeftTitle('DM Skill')
            setStatLeft(user.dskill.toFixed(2))
        }
        setStatRightTitle('Updated at')
        setStatRight(time.unixTimeConverter(parseInt(user.updatetime)))
        
        switch(parseInt(ptype)) {
            case 3:
            case 5:
            case 7:
            case 9:
            case 11:
                setStatMidTitle('')
                setStatMid('')
                break;
            case 2:
            case 4:
            case 6:
            case 8:
            case 10:
            case 12:
            case 1000:
                setStatMidTitle('Hot')
                setStatMid((skillSum1/100).toFixed(2))
                setStatRightTitle('Other')
                setStatRight((skillSum2/100).toFixed(2))
                break
        }
        switch(parseInt(ptype)) {
            case 0:
                setStatMidTitle('Order')
                switch(order) {
                    case "skillasc":
                        setStatMid((txtSkill.order.skillasc as any)[lang])
                        break
                    case "skilldesc":
                        setStatMid((txtSkill.order.skilldesc as any)[lang])
                        break
                    case "titleasc":
                        setStatMid((txtSkill.order.titleasc as any)[lang])
                        break
                    case "titledesc":
                        setStatMid((txtSkill.order.titledesc as any)[lang])
                        break
                    case "verasc":
                        setStatMid((txtSkill.order.verasc as any)[lang])
                        break
                    case "verdesc":
                        setStatMid((txtSkill.order.verdesc as any)[lang])
                        break
                    case "rateasc":
                        setStatMid((txtSkill.order.rateasc as any)[lang])
                        break
                    case "ratedesc":
                        setStatMid((txtSkill.order.ratedesc as any)[lang])
                        break
                    case "playtime":
                        setStatMid((txtSkill.order.playdesc as any)[lang])
                        break
                }
                break
            case 1:
                if(queryHot === 'h') {
                    setStatMidTitle('Hot')
                }
                else if(queryHot === 'o') {
                    setStatMidTitle('Other')
                }
                break
            case 3:
                if(gtype === 'gf') {
                    setStatLeftTitle('GF Skill')
                    setStatLeft(user.gskilltb.toFixed(2))
                }
                else if(gtype === 'dm') {
                    setStatLeftTitle('DM Skill')
                    setStatLeft(user.dskilltb.toFixed(2))
                }
                break
            case 5:
                if(gtype === 'gf') {
                    setStatLeftTitle('GF Skill')
                    setStatLeft(user.gskilltbre.toFixed(2))
                }
                else if(gtype === 'dm') {
                    setStatLeftTitle('DM Skill')
                    setStatLeft(user.dskilltbre.toFixed(2))
                }
                break
            case 7:
                if(gtype === 'gf') {
                    setStatLeftTitle('GF Skill')
                    setStatLeft(user.gskillmx.toFixed(2))
                }
                else if(gtype === 'dm') {
                    setStatLeftTitle('DM Skill')
                    setStatLeft(user.dskillmx.toFixed(2))
                }
                break
            case 9:
                if(gtype === 'gf') {
                    setStatLeftTitle('GF Skill')
                    setStatLeft(user.gskillex.toFixed(2))
                }
                else if(gtype === 'dm') {
                    setStatLeftTitle('DM Skill')
                    setStatLeft(user.dskillex.toFixed(2))
                }
                break
            case 11:
                if(gtype === 'gf') {
                    setStatLeftTitle('GF Skill')
                    setStatLeft(user.gskillnx.toFixed(2))
                }
                else if(gtype === 'dm') {
                    setStatLeftTitle('DM Skill')
                    setStatLeft(user.dskillnx.toFixed(2))
                }
                break
            case 4:
                if(gtype === 'gf') {
                    setStatLeftTitle('GF Skill')
                    setStatLeft(user.gskilltb.toFixed(2))
                }
                else if(gtype === 'dm') {
                    setStatLeftTitle('DM Skill')
                    setStatLeft(user.dskilltb.toFixed(2))
                }
                break
            case 6:
                if(gtype === 'gf') {
                    setStatLeftTitle('GF Skill')
                    setStatLeft(user.gskilltbre.toFixed(2))
                }
                else if(gtype === 'dm') {
                    setStatLeftTitle('DM Skill')
                    setStatLeft(user.dskilltbre.toFixed(2))
                }
                break
            case 8:
                if(gtype === 'gf') {
                    setStatLeftTitle('GF Skill')
                    setStatLeft(user.gskillmx.toFixed(2))
                }
                else if(gtype === 'dm') {
                    setStatLeftTitle('DM Skill')
                    setStatLeft(user.dskillmx.toFixed(2))
                }
                break
            case 10:
                if(gtype === 'gf') {
                    setStatLeftTitle('GF Skill')
                    setStatLeft(user.gskillex.toFixed(2))
                }
                else if(gtype === 'dm') {
                    setStatLeftTitle('DM Skill')
                    setStatLeft(user.dskillex.toFixed(2))
                }
                break
            case 12:
                if(gtype === 'gf') {
                    setStatLeftTitle('GF Skill')
                    setStatLeft(user.gskillnx.toFixed(2))
                }
                else if(gtype === 'dm') {
                    setStatLeftTitle('DM Skill')
                    setStatLeft(user.dskillnx.toFixed(2))
                }
                break
            case 1000:
                setStatLeftTitle('Total')
                setStatLeft(((skillSum1+skillSum2)/100).toFixed(2))
                break
            default:
                break
        }
    }

    // 스킬표 타이틀 글자 설정
    const setTitleText = () => {
        if(gtype === 'gf') setTableTxtGType('GuitarFreaks')
        else if(gtype === 'dm') setTableTxtGType('DrumMania')

        if(parseInt(ptype) === 1000) setTableTxtDesc((txtSkill.exc as any)[lang])
        else setTableTxtDesc('Skill by ')
    }

    // ptype에 따른 스킬표 visibility 설정
    const setSkillTableVisibility = () => {
        switch(parseInt(ptype)) {
            case 0:
            case 1:
            case 3:
            case 5:
            case 7:
            case 9:
            case 11:
                setVisibleLarge(true)
                setVisibleLeft(false)
                setVisibleRight(false)
                break;
            case 2:
            case 4:
            case 6:
            case 8:
            case 10:
            case 12:
            case 1000:
                setVisibleLarge(false)
                setVisibleLeft(true)
                setVisibleRight(true)
                break;
            default:
                break;
        }
    }

    const setSkillTableData = () => {
        axios.post(`${CommonData.dataUrl}${generateURL()}`)
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
                    let obj = generateSkillItem(cur, i)

                    sum1 += Math.floor(getRate(parseInt(ptype), cur)*cur.level*20/10000)

                    skillList1.push(obj);
                }
            }

            const hskill = JSON.parse(json.hskill) as MusicFetchData[]
            if(hskill.length > 0) {
                for(let i = 0; i < hskill.length; i++) {
                    const cur = hskill[i];
                    let obj = generateSkillItem(cur, i)

                    sum1 += Math.floor(getRate(parseInt(ptype), cur)*cur.level*20/10000)

                    skillList1.push(obj);
                }
            }

            const oskill = JSON.parse(json.oskill) as MusicFetchData[]
            if(oskill.length > 0) {
                for(let i = 0; i < oskill.length; i++) {
                    const cur = oskill[i];
                    let obj = generateSkillItem(cur, i)

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

    const getRate = (ptype: number, cur: MusicFetchData) => {
        // rate 선택
        let rate = 0
        switch(ptype) {
            case 3: case 4:
                rate = cur.ratetb
                break
            case 5: case 6:
                rate = cur.ratetbre
                break
            case 7: case 8:
                rate = cur.ratemx
                break
            case 9: case 10:
                rate = cur.rateex
                break
            case 11: case 12:
                rate = cur.ratenx
                break
            case 0: case 1: case 2: default:
                rate = cur.rate
                break
        }
        return rate
    }

    // 스킬 데이터를 가져오기 위한 데이터 URL을 생성하는 함수
    const generateURL = () => {
        const getparams = new URLSearchParams(window.location.search)
        let baseUrl = ''
        let extvar = ''

        const hot = getparams.get('hot')
        const lv = getparams.get('lv')
        const rank = getparams.get('rank')
        const ver = getparams.get('ver')

        if(parseInt(ptype) === 1000) {
            baseUrl = `exc/${gtype}`
        }
        else {
            baseUrl = `skill/${ptype}/${userid}/${gtype}/${page}/${order}`
            if(lv != null) {
                if(extvar === '') extvar = `?lv=${lv}`
                else extvar += `&lv=${lv}`
            }
            if(rank != null) {
                if(extvar === '') extvar = `?rank=${rank}`
                else extvar += `&rank=${rank}`
            }
            if(ver != null) {
                if(extvar === '') extvar = `?ver=${ver}`
                else extvar += `&ver=${ver}`
            }
            if(hot != null) {
                if(extvar === '') extvar = `?hot=${hot}`
                else extvar += `&hot=${hot}`
            }
        }

        return baseUrl+extvar;
    }

    const getRankImg = (rank: string): string => {
        let img = process.env.PUBLIC_URL;
    
        switch(rank) {
        case "E":
            img += "/general-img/rank/rank_e.png";
            break;
        case "D":
            img += "/general-img/rank/rank_d.png";
            break;
        case "C":
            img += "/general-img/rank/rank_c.png";
            break;
        case "B":
            img += "/general-img/rank/rank_b.png";
            break;
        case "A":
            img += "/general-img/rank/rank_a.png";
            break;
        case "S":
            img += "/general-img/rank/rank_s.png";
            break;
        case "SS":
        case "EXC":
            img += "/general-img/rank/rank_ss.png";
            break;
        default:
            break;
        }
    
        return img;
    }

    const generateSkillItem = (data: MusicFetchData, idx: number) => {
        let rate = data.rate
        switch(parseInt(ptype)) {
            case 3:
            case 4:
                rate = data.ratetb
                break
            case 5:
            case 6:
                rate = data.ratetbre
                break
            case 7:
            case 8:
                rate = data.ratemx
                break
            case 9:
            case 10:
                rate = data.rateex
                break
            case 11:
            case 12:
                rate = data.ratenx
                break
        }

        const meterData = data.meter.split('');
        const media1200 = window.matchMedia("(min-width: 1200px)")
        let meter = ''
        for(let k = 0; k < meterData.length; k++) {
            if(meterData[k] === "0") {
                if(media1200.matches) {
                    meter += "<div style='width:0.5vw; max-width:6px; background-color:#7598ff; float:left'>&nbsp;</div>";
                }
                else {
                    meter += "<div style='width:0.25vw; max-width:6px; background-color:#7598ff; float:left'>&nbsp;</div>";
                }
            }
            else if(meterData[k] === "1") {
                if(media1200.matches) {
                    meter += "<div style='width:0.5vw; max-width:6px; background-color:#feff00; float:left'>&nbsp;</div>";
                }
                else {
                    meter += "<div style='width:0.25vw; max-width:6px; background-color:#feff00; float:left'>&nbsp;</div>";
                }

            }
            else {
                if(media1200.matches) {
                    meter += "<div style='width:0.5vw; max-width:6px; background-color:#848484; float:left'>&nbsp;</div>";
                }
                else {
                    meter += "<div style='width:0.25vw; max-width:6px; background-color:#848484; float:left'>&nbsp;</div>";
                }
            }
        }

        let img300 = ''
        let img600 = ''
        if(data.checkfc === "Y") {
            if(data.rank !== "EXC") {
                img300 = process.env.PUBLIC_URL+"/general-img/rank/fc_300.png";
                img600 = process.env.PUBLIC_URL+"/general-img/rank/fc_600.png";
            }
            else {
                img300 = process.env.PUBLIC_URL+"/general-img/rank/exc_300.png";
                img600 = process.env.PUBLIC_URL+"/general-img/rank/exc_600.png";
            }
        }
        else {
            if(data.playtime > 0) {
                img300 = process.env.PUBLIC_URL+"/general-img/rank/cleared_300.png";
                img600 = process.env.PUBLIC_URL+"/general-img/rank/cleared_600.png";
            }
            else {
                img300 = process.env.PUBLIC_URL+"/general-img/rank/notplayed_600.png";
                img600 = process.env.PUBLIC_URL+"/general-img/rank/notplayed_600.png";
            }
        }

        let color = {}
        const bg = skillTableColor(rate*data.level*2/1000);
        if(bg.startsWith("#")) {
            color = {
                width: "100% !important",
                height: "100% !important",
                backgroundColor: bg,
                verticalAlign:"middle"
            };
        }
        else {
            color = {
                width: "100% !important",
                height: "100% !important",
                background: bg,
                verticalAlign:"middle"
            };
        }

        const item: SkillItemData = {
            num: (parseInt(page)-1)*30+idx+1,
            iconUrl: `${CommonData.jacketUrl}${data.musicid}.jpg`,
            musicTitle: data.mname,
            musicLink: `/music/${data.musicid}/${userid}`,
            pattern300: getPatternImg300(data.patterncode),
            pattern600: getPatternImg600(data.patterncode),
            level: (data.level/100).toFixed(2),
            rank: getRankImg(data.rank),
            rate: (rate/100).toFixed(2),
            skill: (Math.floor(rate*data.level*20/10000)/100).toFixed(2),
            meter: meter,
            version: GDVer[data.version-1].sv,
            clearImg300: img300,
            clearImg600: img600,
            tableColor: color
        }

        return item
    }

    // 스킬테이블 토글 메뉴 부르기
    const showTableMenu = () => {
        setMenuVisible(!menuVisible)
    }

    const createSnapshot = (userid: string, gtype: string) => {
        axios.post(`${CommonData.dataUrl}skill/snapshot/create/${userid}/${gtype}`)
        .then((res) => {
            alert((txtSkill.snapshot.created as any)[lang]);
        });
    }

    const switchVer = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSwitchVer(true)
        setNextVer(e.currentTarget.value)
    }

    const switchRank = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSwitchRank(true)
        setNextRank(e.target.value)
    }

    const switchName = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSwitchName(true)
        setNextName(e.target.value)
    }

    const switchOrder = (type: number) => {
        const currentOrder = order
        let next = currentOrder;
        if(type === 0) {
            if(currentOrder === "titleasc") next = "titledesc";
            else next = "titleasc";
        }
        if(type === 1) {
            if(currentOrder === "verasc") next = "verdesc";
            else next = "verasc";
        }

        setSwitchOrder(true)
        setNextOrder(next)
    }

    const resetSwitch = () => {
        setSwitchVer(false)
        setSwitchRank(false)
        setSwitchName(false)
        setSwitchOrder(false)
    }

    if(switchVerState) {
        const exturl = new URLSearchParams(window.location.search)
        exturl.set("ver", nextVer.toString());
        return <Redirect to={`/skill/0/${userid}/${gtype}/${page}/${order}?${exturl.toString()}`} />
    }
    if(switchRankState) {
        const exturl = new URLSearchParams(window.location.search)
        exturl.set("rank", nextRank);
        return <Redirect to={`/skill/0/${userid}/${gtype}/${page}/${order}?${exturl.toString()}`} />
    }
    if(switchNameState) {
        const exturl = new URLSearchParams(window.location.search)
        exturl.set("name", nextName);
        return <Redirect to={`/skill/0/${userid}/${gtype}/${page}/${order}?${exturl.toString()}`} />
    }
    if(switchOrderState) {
        return <Redirect to={`/skill/0/${userid}/${gtype}/${page}/${nextOrder}${window.location.search}`} />
    }
    else {
        return (
            <SkillPresenter
                // share table
                share={share.share}

                // url query
                ptype={ptype}
                userid={userid}
                gtype={gtype}
                page={page}
                order={order}
            
                // data
                lang={lang}
            
                // 스킬표 상단 타이틀
                tableTxtGType={tableTxtGType}
                tableTxtDesc={tableTxtDesc}
                skillPageVersion={skillPageVersion}
            
                // 스킬표 상단 데이터
                statLeftTitle={statLeftTitle}
                statLeft={statLeft}
                statMidTitle={statMidTitle}
                statMid={statMid}
                statRightTitle={statRightTitle}
                statRight={statRight}
                updateTime={updateTime}
            
                // states
                ownAccount={ownAccount}
                menuVisible={menuVisible}
            
                visibleLarge={visibleLarge}
                visibleLeft={visibleLeft}
                visibleRight={visibleRight}
                allpage={allpage}
            
                user={user}
                skillTable1={skillTable1}
                skillTable2={skillTable2}
            
                // methods
                createSnapshot={createSnapshot}
                showTableMenu={showTableMenu}
                scrShot={scrShot}
            
                // methods for ptype 0 menus
                switchVer={switchVer}
                switchRank={switchRank}
                switchName={switchName}
                switchOrder={switchOrder}
            />
        )
    }
})

export default SkillContainer