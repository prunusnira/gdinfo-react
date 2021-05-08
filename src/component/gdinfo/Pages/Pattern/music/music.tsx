import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import MusicItem from './musicItem';
import axios from 'axios';
import {GDVer} from '../../Common/version';
import CommonData from '../../Common/commonData';
import MusicData from './musicData';
import { BodyContent, BodyHeader, Container, ItemRow } from '../../../../../styled/styledCommon';

interface MatchProps {
    userid: string,
    mid: string
}

const Music = () => {
    const [glist, setGList] = useState(Array<MusicData>())
    const [blist, setBList] = useState(Array<MusicData>())
    const [dlist, setDList] = useState(Array<MusicData>())

    const [musicName, setMusicName] = useState('')
    const [composer, setComposer] = useState('')
    const [version, setVersion] = useState('')
    const [profLink, setProfLink] = useState('')
    const [playerName, setPlayerName] = useState('')

    const {userid, mid} = useParams<MatchProps>()

    useEffect(() => {
        loadMusicInfo()
        loadPlayerName()
        loadPatternInfo()
    }, [])

    const loadPlayerName = () => {
        axios.post(`${CommonData.dataUrl}getuserid/${userid}`)
        .then((res) => {
            const json = JSON.parse(res.data.mydata)
            setPlayerName(json.name)
            setProfLink(`/profile/${userid}`)
        })
    }

    const loadMusicInfo = () => {
        axios.post(`${CommonData.dataUrl}getmusic/${mid}`)
        .then((res) => {
            const json = JSON.parse(res.data.music)
            setMusicName(json.name)
            setComposer(json.composer)
            setVersion(GDVer[json.version - 1].full)
        })
    }

    const loadPatternInfo = () => {
        axios.post(`${CommonData.dataUrl}music/${mid}/${userid}`)
        .then((res) => {
            const json = res.data
            const music = JSON.parse(json.music)
            const glist = Array<MusicData>()
            const blist = Array<MusicData>()
            const dlist = Array<MusicData>()

            for(let i = 1; i <= 12; i++) {
                const obj = new MusicData()
                obj.ranklink = '/ptrank/'+music.id+'/'+i+'/1'

                let skill = null;
                const skillParse = JSON.parse(json.skill)
                switch(i) {
                    case 1: obj.diff = 'BASIC'; obj.lv = (music.gbsc/100).toFixed(2); skill = skillParse.s1; break;
                    case 2: obj.diff = 'ADVANCED'; obj.lv = (music.gadv/100).toFixed(2); skill = skillParse.s2; break;
                    case 3: obj.diff = 'EXTREME'; obj.lv = (music.gext/100).toFixed(2); skill = skillParse.s3; break;
                    case 4: obj.diff = 'MASTER'; obj.lv = (music.gmas/100).toFixed(2); skill = skillParse.s4; break;
                    case 5: obj.diff = 'BASIC'; obj.lv = (music.bbsc/100).toFixed(2); skill = skillParse.s5; break;
                    case 6: obj.diff = 'ADVANCED'; obj.lv = (music.badv/100).toFixed(2); skill = skillParse.s6; break;
                    case 7: obj.diff = 'EXTREME'; obj.lv = (music.bext/100).toFixed(2); skill = skillParse.s7; break;
                    case 8: obj.diff = 'MASTER'; obj.lv = (music.bmas/100).toFixed(2); skill = skillParse.s8; break;
                    case 9: obj.diff = 'BASIC'; obj.lv = (music.dbsc/100).toFixed(2); skill = skillParse.s9; break;
                    case 10: obj.diff = 'ADVANCED'; obj.lv = (music.dadv/100).toFixed(2); skill = skillParse.s10; break;
                    case 11: obj.diff = 'EXTREME'; obj.lv = (music.dext/100).toFixed(2); skill = skillParse.s11; break;
                    case 12: obj.diff = 'MASTER'; obj.lv = (music.dmas/100).toFixed(2); skill = skillParse.s12; break;
                }

                if(obj.lv !== "0.00" && (skill !== undefined && skill !== null)) {
                    obj.cleartime = skill.cleartime
                    obj.playtime = skill.playtime
                    obj.combo = skill.combo
                    obj.score = skill.score
                    obj.rate = (skill.rate/100).toFixed(2)
                    obj.skill = (Math.floor(skill.rate*skill.level*20/10000)/100).toFixed(2)
                    
                    switch(skill.rank) {
                        case 'E': obj.rank = process.env.PUBLIC_URL+'/general-img/rank/rank_e.png'; break;
                        case 'D': obj.rank = process.env.PUBLIC_URL+'/general-img/rank/rank_d.png'; break;
                        case 'C': obj.rank = process.env.PUBLIC_URL+'/general-img/rank/rank_c.png'; break;
                        case 'B': obj.rank = process.env.PUBLIC_URL+'/general-img/rank/rank_b.png'; break;
                        case 'A': obj.rank = process.env.PUBLIC_URL+'/general-img/rank/rank_a.png'; break;
                        case 'S': obj.rank = process.env.PUBLIC_URL+'/general-img/rank/rank_s.png'; break;
                        case 'SS':
                        case 'EXC': obj.rank = process.env.PUBLIC_URL+'/general-img/rank/rank_ss.png'; break;
                        default: obj.rank = process.env.PUBLIC_URL+'/general-img/rank/rank_e.png'; break;
                    }

                    if(skill.checkfc === "Y") {
                        if(skill.rank === "EXC")
                            obj.fc = "<img class='skillrank-img' src='"+process.env.PUBLIC_URL+"/general-img/rank/exc.png'>";
                        else
                            obj.fc = "<img class='skillrank-img' src='"+process.env.PUBLIC_URL+"/general-img/rank/fc.png'>";
                    }
                    else {
                        if(skill.playtime > 0) {
                            obj.fc = ''
                        }
                        else {
                            obj.fc = ''
                        }
                    }

                    obj.clearmeter = ''
                    const meter = skill.meter.split('')
                    for(let k = 0; k < meter.length; k++) {
                        if(meter[k] === "0")
                            obj.clearmeter += "<div style='width:0.8vw; max-width:9px; background-color:#81BEF7; float:left'>&nbsp;</div>"
                        else if(meter[k] === "1")
                            obj.clearmeter += "<div style='width:0.8vw; max-width:9px; background-color:#F3F781; float:left'>&nbsp;</div>"
                        else
                            obj.clearmeter += "<div style='width:0.8vw; max-width:9px; background-color:#848484; float:left'>&nbsp;</div>"
                    }
                    
                    obj.ratenx = (skill.ratenx/100).toFixed(2)
                    obj.rateex = (skill.rateex/100).toFixed(2)
                    obj.ratemx = (skill.ratemx/100).toFixed(2)
                    obj.ratetbre = (skill.ratetbre/100).toFixed(2)
                    obj.ratetb = (skill.ratetb/100).toFixed(2)

                    switch(i) {
                    case 1: case 2: case 3: case 4:
                        glist.push(obj)
                        break
                    case 5: case 6: case 7: case 8:
                        blist.push(obj)
                        break
                    case 9: case 10: case 11: case 12:
                        dlist.push(obj)
                        break
                    }
                }
                else {
                    obj.cleartime = 0
                    obj.playtime = 0
                    obj.combo = 0
                    obj.score = 0
                    obj.rate = '0.00'
                    obj.skill = '0.00'
                    obj.rank = process.env.PUBLIC_URL+'/general-img/rank/rank_e.png'
                    obj.fc = ''
                    obj.clearmeter = ''
                    obj.ratenx = '0.00'
                    obj.rateex = '0.00'
                    obj.ratemx = '0.00'
                    obj.ratetbre = '0.00'
                    obj.ratetb = '0.00'

                    switch(i) {
                    case 1: case 2: case 3: case 4:
                        glist.push(obj)
                        break
                    case 5: case 6: case 7: case 8:
                        blist.push(obj)
                        break
                    case 9: case 10: case 11: case 12:
                        dlist.push(obj)
                        break
                    }
                }
            }

            setGList(glist)
            setBList(blist)
            setDList(dlist)
        })
    }

    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Music</h3>
                </BodyHeader>
                <BodyContent>
                    <div className="div-table">
                        <div className="div-table-row" id="musicinfo">
                            <div className="div-table-cell">
                                <img alt="jacket-img" src={`${CommonData.jacketUrl}${mid}.jpg`}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = process.env.PUBLIC_URL+"/general-img/empty.jpg";
                                        }} className='img-fluid' style={{maxWidth:"85px"}} />
                            </div>
                            <div className="div-table-cell">
                                <span style={{fontSize:"150%"}}>{musicName}</span><br/>
                                <span style={{fontSize:"120%"}}>{composer}</span><br/>
                                <span>{version}</span>
                            </div>
                        </div>
                        <div className="div-table-row">
                            <div className="div-table-cell">
                            </div>
                            <div className="div-table-cell" id="userinfo">
                                <span>Player</span>&nbsp;
                                <Link id="player" className='innerhref' to={profLink}>
                                    {playerName}
                                </Link>
                            </div>
                        </div>
                    </div>
                </BodyContent>
            </ItemRow>
            <ItemRow id="record" setVertical={true}>
                <BodyHeader>
                    <h3>Guitar</h3>
                </BodyHeader>
                <BodyContent>
                    <MusicItem list={glist} />
                </BodyContent>
                <BodyHeader>
                    <h3>Bass</h3>
                </BodyHeader>
                <BodyContent>
                    <MusicItem list={blist} />
                </BodyContent>
                <BodyHeader>
                    <h3>Drum</h3>
                </BodyHeader>
                <BodyContent>
                    <MusicItem list={dlist} />
                </BodyContent>
            </ItemRow>
        </Container>
    )
}

export default Music