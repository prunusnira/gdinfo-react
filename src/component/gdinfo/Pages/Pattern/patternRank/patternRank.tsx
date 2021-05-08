import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import PatternRankRow from './ptRankRow';
import Pager from '../../Common/pager';
import txtPTRank from './txtptrank';
import CommonData from '../../Common/commonData';
import {skillTableColor} from '../../Common/skillcolor';
import {getPatternImg600} from '../../Common/pattern';

import PTRankData from './ptrankData';
import store from '../../../../../mobx/store';
import { BodyContent, BodyHeader, Button, Container, ItemCol, ItemRow } from '../../../../../styled/styledCommon';

interface MatchProps {
    ptcode: string,
    mid: string,
    page: string
}

const PatternRank = () => {
    const [list, setList] = useState(Array<PTRankData>())
    const [pattern, setPattern] = useState('')
    const [level, setLevel] = useState('')
    const [mname, setMName] = useState('')
    const [composer, setComposer] = useState('')
    const [allPage, setAllPage] = useState(0)

    const lang = store.language.lang
    const {ptcode, mid, page} = useParams<MatchProps>()
    const urlparams = new URLSearchParams(window.location.search)

    useEffect(() => {
        // setup Pattern
        setupPattern()
        loadMusicData()
    }, [ptcode])

    useEffect(() => {
        loadRankData()
    }, [urlparams.get('ver'), page])

    const setupPattern = () => {
        switch(ptcode) {
            case "1":
                setPattern("BSC-G")
                break
            case "2":
                setPattern("ADV-G")
                break
            case "3":
                setPattern("EXT-G")
                break
            case "4":
                setPattern("MAS-G")
                break
            case "5":
                setPattern("BSC-B")
                break
            case "6":
                setPattern("ADV-B")
                break
            case "7":
                setPattern("EXT-B")
                break
            case "8":
                setPattern("MAS-B")
                break
            case "9":
                setPattern("BSC-D")
                break
            case "10":
                setPattern("ADV-D")
                break
            case "11":
                setPattern("EXT-D")
                break
            case "12":
                setPattern("MAS-D")
                break
            default:
                break
        }
    }

    const loadMusicData = () => {
        axios.post(`${CommonData.dataUrl}getmusic/${mid}`)
        .then((res) => {
            const json = res.data
            const music = JSON.parse(json.music)

            const pattern = getPatternImg600(parseInt(ptcode))
            let level: string = "";
            switch(parseInt(ptcode)) {
            case 1:
                level = (music.gbsc/100).toFixed(2)
                break
            case 2:
                level = (music.gadv/100).toFixed(2)
                break
            case 3:
                level = (music.gext/100).toFixed(2)
                break
            case 4:
                level = (music.gmas/100).toFixed(2)
                break
            case 5:
                level = (music.bbsc/100).toFixed(2)
                break
            case 6:
                level = (music.badv/100).toFixed(2)
                break
            case 7:
                level = (music.bext/100).toFixed(2)
                break
            case 8:
                level = (music.bmas/100).toFixed(2)
                break
            case 9:
                level = (music.dbsc/100).toFixed(2)
                break
            case 10:
                level = (music.dadv/100).toFixed(2)
                break
            case 11:
                level = (music.dext/100).toFixed(2)
                break
            case 12:
                level = (music.dmas/100).toFixed(2)
                break
            default:
                level = ""
                break
            }

            setPattern(pattern)
            setMName(music.name)
            setComposer(music.composer)
            setLevel(level)

            loadRankData();
        });
    }

    const loadRankData = () => {
        axios.post(`${CommonData.dataUrl}ptdetail/${mid}/${ptcode}/${page}/${urlparams.get('ver') === null ? CommonData.currentVersion : urlparams.get('ver')}`)
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
                        case '29': userskill = user.gskill; break;
                    }
                }
                else {
                    switch(urlparams.get('ver')) {
                        case '24': userskill = user.dskilltb; break;
                        case '25': userskill = user.dskilltbre; break;
                        case '26': userskill = user.dskillmx; break;
                        case '27': userskill = user.dskillex; break;
                        case '28': userskill = user.dskillnx; break;
                        case '29': userskill = user.dskill; break;
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
                
                if(cur.checkfc === "Y" && cur.rank !== "EXC") {
                    obj.fc = "<img class='fc-img' src='"+process.env.PUBLIC_URL+"/general-img/rank/fc_300.png' />"
                }
                else if(cur.checkfc === "Y" && cur.rank === "EXC") {
                    obj.fc = "<img class='fc-img' src='"+process.env.PUBLIC_URL+"/general-img/rank/exc_300.png' />"
                }
                else {
                    obj.fc = "<img class='fc-img' src='"+process.env.PUBLIC_URL+"/general-img/rank/cleared_300.png' />"
                }

                ranklist.push(obj)
            }

            setList(ranklist)
            setAllPage(json.pages)
        });
    }

    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>{(txtPTRank.title as any)[lang]}</h3>
                </BodyHeader>
                <BodyContent className="text-center">
                    <span>{(txtPTRank.desc as any)[lang]}</span>
                </BodyContent>
            </ItemRow>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>{(txtPTRank.table.ptinfo as any)[lang]}</h3>
                </BodyHeader>
                <BodyContent>
                    <ItemRow id="upper">
                        <ItemCol size={3}> 
                            <img alt="jacket-img" src={CommonData.jacketUrl+mid+".jpg"}
                                onError={(e) => {
                                    e.currentTarget.src=CommonData.jacketUrl+"empty.jpg"}}
                                style={{width:"75%", maxWidth: "100px"}} /><br/>
                            <img alt="pattern" src={pattern}
                                style={{width:"75%", maxWidth: "100px"}} /><br/>
                            <span>{level}</span>
                        </ItemCol>
                        <ItemCol size={7}>
                            <ItemRow style={{padding:"10px"}} setVertical={true}>
                                <span style={{fontSize:"125%"}}>{mname}</span><br/>
                                <span>{composer}</span>
                            </ItemRow>
                        </ItemCol>
                    </ItemRow>
                </BodyContent>
            </ItemRow>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <ItemRow keepDirHor={true}>
                        <ItemCol size={3}>
                            <h3>{(txtPTRank.table.ranking as any)[lang]}</h3>
                        </ItemCol>
                        <ItemCol size={7} style={{textAlign: 'right'}}>
                            <Link to={`/ptrank/${mid}/${ptcode}/1?ver=29`}>
                                <Button className="rank29">HV</Button>
                            </Link>
                            <Link to={`/ptrank/${mid}/${ptcode}/1?ver=28`}>
                                <Button className="rank28">NX</Button>
                            </Link>
                            <Link to={`/ptrank/${mid}/${ptcode}/1?ver=27`}>
                                <Button className="rank27">EX</Button>
                            </Link>
                            <Link to={`/ptrank/${mid}/${ptcode}/1?ver=26`}>
                                <Button className="rank26">MX</Button>
                            </Link>
                            <Link to={`/ptrank/${mid}/${ptcode}/1?ver=25`}>
                                <Button className="rank25">RE</Button>
                            </Link>
                            <Link to={`/ptrank/${mid}/${ptcode}/1?ver=24`}>
                                <Button className="rank24">TB</Button>
                            </Link>
                        </ItemCol>
                    </ItemRow>
                </BodyHeader>
                <BodyContent>
                    <ItemRow setVertical={true}>
                        <div className='div-table table-border-outer' id="ranktable">
                            <PatternRankRow list={list} />
                        </div>
                        <div id="empty"></div>
                    </ItemRow>
                    <ItemRow id="pager" keepDirHor={true}>
                        <Pager cpage={parseInt(page)}
                            allpage={allPage}
                            baseUrl={`/ptrank/${mid}/${ptcode}/`}
                            afterUrl={window.location.search} />
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
}

export default PatternRank;