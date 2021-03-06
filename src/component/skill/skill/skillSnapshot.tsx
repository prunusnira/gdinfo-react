import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { getPatternImg300, getPatternImg600 } from '../../common/pattern';
import scrShot from '../../common/scrshot';

import { skillTableColor } from '../../common/skillcolor';
import CommonData from '../../common/commonData';
import { useParams } from 'react-router-dom';
import SkillItemData from './skillItem/skillItemData';
import store from '../../../mobx/store';
import { observer } from 'mobx-react';
import { GDVer } from '../../common/version';
import { BodyContent, BodyHeader, Button, Container, ItemCol, ItemRow } from '../../../styled/styledCommon';
import txtSkill from './txtskill';
import { Row } from 'reactstrap';
import SkillTableSH from './skillpresenter/skillTableSH';
import SkillTableNR from './skillpresenter/skillTableNR';
import SnapshotData from './skillItem/snapshotData';

interface MatchProps {
    sharestr: string,
    id: string,
    date: string,
    gtype: string,
    time: string
}

const SkillSnapshot = observer(() => {
    const [share, setShare] = useState(false)
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
    
    const [username, setUserName] = useState('')
    
    const lang = store.language.lang;

    const {sharestr, id, date, gtype, time} = useParams<MatchProps>()

    useEffect(() => {
        if(sharestr === 'sh') setShare(true)
        loadSnapshotData()
        loadUserInfo()
    }, [])

    useEffect(() => {

    }, [username])

    const loadUserInfo = () => {
        axios.post(`${CommonData.dataUrl}getuserid/${id}`)
        .then((res) => {
            const json = res.data.mydata
            setUserName(json.name)
        });
    }

    const loadSnapshotData = () => {
        let sum1 = 0;
        let sum2 = 0;
        const hotList = new Array<SkillItemData>();
        const otherList = new Array<SkillItemData>();

        axios.post(`${CommonData.dataUrl}skill/snapshot/load/${id}/${date}/${gtype}`)
        .then((res) => {
            const json = res.data;

            let hsize = json.hot.length;
            if(json.hot.length > 25) hsize = 25;
            
            let osize = json.oth.length;
            if(json.oth.length > 25) osize = 25;
            
            if(json.hot.length > 0) {
                for(let i = 0; i < hsize; i++) {
                    const cur = json.hot[i] as SnapshotData
                    const newData = createTableItem(cur, i)

                    sum1 += cur.skill
                    hotList.push(newData)
                }
            }
            if(json.oth.length > 0) {
                for(let i = 0; i < osize; i++) {
                    const cur = json.oth[i] as SnapshotData
                    const newData = createTableItem(cur, i)
                    
                    sum2 += cur.skill
                    otherList.push(newData)
                }
            }

            setSkillTable1(hotList)
            setSkillTable2(otherList)
            setStatLeftTitle('Total')
            setStatMidTitle('Hot')
            setStatRightTitle('Other')
            setStatLeft((sum1+sum2).toFixed(2))
            setStatMid(sum1.toFixed(2))
            setStatRight(sum2.toFixed(2))
        });
    }

    const createTableItem = (cur: SnapshotData, i: number) => {
        const meterData = cur.meter.split('');
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
        if(cur.fc === "Y") {
            if(cur.rank !== "EXC") {
                img300 = process.env.PUBLIC_URL+"/general-img/rank/fc_300.png";
                img600 = process.env.PUBLIC_URL+"/general-img/rank/fc_600.png";
            }
            else {
                img300 = process.env.PUBLIC_URL+"/general-img/rank/exc_300.png";
                img600 = process.env.PUBLIC_URL+"/general-img/rank/exc_600.png";
            }
        }
        else {
            img300 = process.env.PUBLIC_URL+"/general-img/rank/cleared_300.png";
            img600 = process.env.PUBLIC_URL+"/general-img/rank/cleared_600.png";
        }

        let color = {}
        const bg = skillTableColor(cur.skill*100);
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

        const newData: SkillItemData = {
            num: i+1,
            iconUrl: `${CommonData.jacketUrl}${cur.mid}.jpg`,
            musicTitle: cur.mname,
            musicLink: `/music/${cur.mid}/${id}`,
            pattern300: getPatternImg300(cur.ptcode),
            pattern600: getPatternImg600(cur.ptcode),
            level: (cur.lv/100).toFixed(2),
            rank: getRankImg(cur.rank),
            rate: (cur.rate/100).toFixed(2),
            skill: cur.skill.toFixed(2),
            meter: meter,
            version: GDVer[cur.version-1].sv,
            clearImg300: img300,
            clearImg600: img600,
            tableColor: color
        }

        return newData
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

    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Skill Table</h3>
                </BodyHeader>
                <BodyContent id="scrshotdiv">
                    {/*<span id='gtype' th:attr='data-gtype=${gtype}'></span>*/}
                    <ItemRow className="text-center">
                        <h4>Screenshot</h4>
                    </ItemRow>
                    <ItemRow style={{width:"100%"}} className="btn-group">
                        <Button style={{width:"100%"}}
                            onClick={() => scrShot("scrTable", id+"_"+gtype+"_all_"+time+".jpg")}>
                            {(txtSkill.scrshot as any)[lang]}
                        </Button>
                    </ItemRow>
                </BodyContent>
            </ItemRow>
            <ItemRow id='scrTable' setVertical={true}>
                <BodyHeader id="targetInfo">
                    <ItemRow>
                        <h4><b>Snapshot Of {gtype === 'gf'?'GuitarFreaks':'DrumMania'}<br/>
                            <span>Skill by {username}</span>
                        </b></h4>
                    </ItemRow>
                    <ItemRow>
                        <ItemCol size={5} style={{textAlign:"center"}}>
                            <b>Made by SIN</b>
                        </ItemCol>
                        <ItemCol size={5} style={{textAlign:"center"}}>
                            Saved Date: {date}
                        </ItemCol>
                    </ItemRow>
                </BodyHeader>
                <BodyContent>
                    <ItemRow
                        className="skillupper blackandwhite"
                        style={{justifyContent: 'center'}}
                        keepDirHor={true}>
                        <ItemCol size={3} style={{justifyContent: 'center', textAlign: 'center'}}>
                            {statLeftTitle}<br/>{statLeft}
                        </ItemCol>
                        <ItemCol size={3} style={{justifyContent: 'center', textAlign: 'center'}}>
                            {statMidTitle}<br/>{statMid}
                        </ItemCol>
                        <ItemCol size={3} style={{justifyContent: 'center', textAlign: 'center'}}>
                            {statRightTitle}<br/>{statRight}
                        </ItemCol>
                    </ItemRow>
                    <ItemRow id="targetTable">
                        <ItemRow setVertical={share ? true:false}>
                            <ItemCol
                                size={share ? 10:5}
                                isFlatUnderLg={true} id="halfTableLeft"
                                style={{paddingBottom:"100px"}}>
                                <ItemRow>
                                    <h2><b>HOT</b></h2>
                                </ItemRow>
                                <ItemRow
                                    className='div-table'
                                    style={{display:'block'}}>
                                    <Row>
                                    {
                                        share ?
                                        <SkillTableSH list={skillTable1} />
                                        :
                                        <SkillTableNR list={skillTable1} />
                                    }
                                    </Row>
                                </ItemRow>
                            </ItemCol>
                            <ItemCol
                                size={share ? 10:5}
                                isFlatUnderLg={true} id="halfTableRight">
                                <ItemRow>
                                    <h2><b>OTHER</b></h2>
                                </ItemRow>
                                <ItemRow
                                    className='div-table'
                                    style={{display:'block'}}>
                                    <Row>
                                    {
                                        share ?
                                        <SkillTableSH list={skillTable2} />
                                        :
                                        <SkillTableNR list={skillTable2} />
                                    }
                                    </Row>
                                </ItemRow>
                            </ItemCol>
                        </ItemRow>
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
})

export default SkillSnapshot;