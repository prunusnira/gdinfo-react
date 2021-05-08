import React, {useEffect, useState} from 'react';
import {Link, Redirect, useParams} from 'react-router-dom';
import axios from 'axios';
import NpItem from './npItem';
import CommonData from '../../Common/commonData';
import txtNp from './txtNotplayed';
import {getPatternImg600} from '../../Common/pattern';
import {GDVer} from '../../Common/version';
import Pager from '../../Common/pager';
import NPData from './NPData';
import store from '../../../../../mobx/store';
import { BodyContent, BodyHeader, Button, Container, ItemCol, ItemRow } from '../../../../../styled/styledCommon';

interface MatchProps {
    gtype: string,
    userid: string,
    vertype: string,
    page: string
}

const NoRecordMusicList = () => {
    const [list, setList] = useState(Array<NPData>())
    const [empty, setEmpty] = useState(false)
    const [allPage, setAllPage] = useState(0)
    const [lv, setLv] = useState(0)
    const [ver, setVer] = useState('00')

    const [switchLv, setSwitchLv] = useState(false)
    const [switchVer, setSwitchVer] = useState(false)
    const [switchHot, setSwitchHot] = useState(false)
    const [switchOther, setSwitchOther] = useState(false)
    const [switchClear, setSwitchClear] = useState(false)
    
    const {gtype, userid, vertype, page} = useParams<MatchProps>()
    const lang = store.language.lang

    useEffect(() => {
        resetSwitch()
        loadNPData()
    }, [window.location.search, gtype, userid, vertype, page])

    const resetSwitch = () => {
        setSwitchLv(false)
        setSwitchVer(false)
        setSwitchHot(false)
        setSwitchOther(false)
        setSwitchClear(false)
    }

    const loadNPData = () => {
        const params = new URLSearchParams(window.location.search)

        const lv = params.get("lv")
        const order = params.get("order")
        const ver = params.get("ver")
        const hot = params.get("hot")

        const nplist = new Array<NPData>()

        let isEmpty = false
        axios.post(`${CommonData.dataUrl}notplayed/${gtype}/${userid}/${vertype}/${page}${window.location.search}`)
        .then((res) => {
            const json = res.data
            const music = JSON.parse(json.music)

            for(let i = 0; i < music.length; i++) {
                const obj = new NPData()
                const cur = music[i]

                obj.imgsrc = `${CommonData.jacketUrl}${cur.id}.jpg`
                obj.link = `/music/${cur.id}/${userid}`
                obj.name = cur.name;
                obj.pattern = getPatternImg600(cur.ptcode)
                obj.lv = (cur.lv/100).toFixed(2)
                obj.ver = GDVer[cur.version-1].sv

                nplist.push(obj)
            }

            if(json === null || json.length === 0) {
                isEmpty = true
            }

            const baseurl = `/notplayed/${gtype}/${userid}/${vertype}/`
            let extvar = "";
            if(lv !== null) {
                if(extvar === "") extvar += "?lv="+lv;
                else extvar += "&lv="+lv;
            }
            if(order !== null) {
                if(extvar === "") extvar += "?order="+order;
                else extvar += "&order="+order;
            }
            if(ver !== null) {
                if(extvar === "") extvar += "?ver="+ver;
                else extvar += "&ver="+ver;
            }
            if(hot !== null) {
                if(extvar === "") extvar += "?hot="+hot;
                else extvar += "&hot="+hot;
            }

            let type = "";
            if(gtype === "gf") type = "GuitarFreaks";
            else type = "DrumMania";

            setList(nplist)
            setEmpty(isEmpty)
            setAllPage(json.pages)
        })
    }

    const switchLvMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value !== "--") {
            setSwitchLv(true)
            setLv(parseInt(e.target.value))
        }
    }

    const switchVerMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value !== "--") {
            setSwitchVer(true)
            setVer(e.target.value)
        }
    }

    const switchHotMethod = () => {
        setSwitchHot(true)
    }

    const switchOtherMethod = () => {
        setSwitchOther(true)
    }

    const switchClearMethod = () => {
        setSwitchHot(false)
        setSwitchOther(false)
        setSwitchClear(false)
    }

    if(switchLv) {
        return <Redirect to={`/notplayed/${gtype}/${userid}/${vertype}/1?lv=${lv}`} />
    }
    if(switchVer) {
        return <Redirect to={`/notplayed/${gtype}/${userid}/${vertype}/1?ver=${ver}`} />
    }
    if(switchHot) {
        return <Redirect to={`/notplayed/${gtype}/${userid}/${vertype}/1?hot=h`} />
    }
    if(switchOther) {
        return <Redirect to={`/notplayed/${gtype}/${userid}/${vertype}/1?hot=o`} />
    }
    if(switchClear) {
        return <Redirect to={`/notplayed/${gtype}/${userid}/${vertype}/1`} />
    }
    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Patterns not played</h3>
                </BodyHeader>
                <BodyContent>
                    <span>{(txtNp.desc as any)[lang]}</span>
                </BodyContent>
            </ItemRow>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Option Table</h3>
                </BodyHeader>
                <BodyContent>
                    <ItemRow>
                        <ItemCol size={5}>
                            <ItemRow>Level</ItemRow>
                            <ItemRow>
                                <select onChange={switchLvMethod} className="form-control">
                                    <option value="--">SELECT</option>
                                    <option value="0">All</option>
                                    <option value="1">1.00-1.49</option>
                                    <option value="2">1.50-1.99</option>
                                    <option value="3">2.00-2.49</option>
                                    <option value="4">2.50-2.99</option>
                                    <option value="5">3.00-3.49</option>
                                    <option value="6">3.50-3.99</option>
                                    <option value="7">4.00-4.49</option>
                                    <option value="8">4.50-4.99</option>
                                    <option value="9">5.00-5.49</option>
                                    <option value="10">5.50-5.99</option>
                                    <option value="11">6.00-6.49</option>
                                    <option value="12">6.50-6.99</option>
                                    <option value="13">7.00-7.49</option>
                                    <option value="14">7.50-7.99</option>
                                    <option value="15">8.00-8.49</option>
                                    <option value="16">8.50-8.99</option>
                                    <option value="17">9.00-9.49</option>
                                    <option value="18">9.50-9.99</option>
                                </select>
                            </ItemRow>
                        </ItemCol>
                        <ItemCol size={5}>
                            <ItemRow>Version</ItemRow>
                            <ItemRow>
                                <select onChange={switchVerMethod} className="form-control">
                                    <option value="--">SELECT</option>
                                    <option value="00">All</option>
                                    <option value="01">GF1</option>
                                    <option value="02">GF2dm1</option>
                                    <option value="03">GF3dm2</option>
                                    <option value="04">GF4dm3</option>
                                    <option value="05">GF5dm4</option>
                                    <option value="06">GF6dm5</option>
                                    <option value="07">GF7dm6</option>
                                    <option value="08">GF8dm7</option>
                                    <option value="09">GF9dm8</option>
                                    <option value="10">GF10dm9</option>
                                    <option value="11">GF11dm10</option>
                                    <option value="12">ee'mall</option>
                                    <option value="13">V</option>
                                    <option value="14">V2</option>
                                    <option value="15">V3</option>
                                    <option value="16">V4</option>
                                    <option value="17">V5</option>
                                    <option value="18">V6</option>
                                    <option value="19">XG</option>
                                    <option value="20">XG2</option>
                                    <option value="21">XG3</option>
                                    <option value="22">GD</option>
                                    <option value="23">GD OD</option>
                                    <option value="24">GD TB</option>
                                    <option value="25">GD TBRE</option>
                                    <option value="26">GD MX</option>
                                    <option value="27">GD EX</option>
                                    <option value="28">GD NX</option>
                                </select>
                            </ItemRow>
                        </ItemCol>
                    </ItemRow>
                    <ItemRow>
                        <ItemCol size={5}>
                            <ItemRow>Hot/Other</ItemRow>
                            <ItemRow>
                                <Button onClick={switchHotMethod}>Hot</Button>
                                <Button onClick={switchOtherMethod}>Other</Button>
                            </ItemRow>
                        </ItemCol>
                        <ItemCol size={5}>
                            <ItemRow>Order</ItemRow>
                            <ItemRow>
                                <Button onClick={switchClearMethod}>Clear Options</Button>
                                {/*<Button onClick={() => self.switchOrder(0)}>{txtNp.filter.btn.title[lang]} ▲/▼</Button>
                                <Button onClick={() => self.switchOrder(1)}>{txtNp.filter.btn.version[lang]} ▲/▼</Button>*/}
                            </ItemRow>
                        </ItemCol>
                    </ItemRow>
                </BodyContent>
            </ItemRow>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Select Type</h3>
                </BodyHeader>
                <BodyContent>
                    <ItemRow keepDirHor={true}>
                        <Link
                            style={{width:"100%"}}
                            to={`/notplayed/gf/${userid}/0/1${window.location.search}`}>
                            <Button style={{width:"100%"}}>
                                GF {(txtNp.all as any)[lang]}
                            </Button>
                        </Link>
                        <Link
                            style={{width:"100%"}}
                            to={`/notplayed/dm/${userid}/0/1${window.location.search}`}>
                            <Button style={{width:"100%"}}>
                                DM {(txtNp.all as any)[lang]}
                            </Button>
                        </Link>
                    </ItemRow>
                    <ItemRow keepDirHor={true}>
                        <Link
                            style={{width:"100%"}}
                            to={`/notplayed/gf/${userid}/1/1${window.location.search}`}>
                            <Button style={{width:"100%"}}>
                                GF {(txtNp.ver as any)[lang]}
                            </Button>
                        </Link>
                        <Link
                            style={{width:"100%"}}
                            to={`/notplayed/dm/${userid}/1/1${window.location.search}`}>
                            <Button style={{width:"100%"}}>
                                DM {(txtNp.ver as any)[lang]}
                            </Button>
                        </Link>
                    </ItemRow>
                </BodyContent>
            </ItemRow>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Non Play List</h3>
                    {/* GuitarFreaks or DrumMania */}
                    <span>{gtype === 'gf' ? 'GuitarFreaks' : 'DrumMania'}</span>
                </BodyHeader>
                <BodyContent>
                    <div className='div-table' id="playlist">
                        <NpItem list={list} />
                    </div>
                    <div style={{width:"100%", textAlign:"center"}}>
                        <h3 id="empty"></h3>
                    </div>
                    <ItemRow keepDirHor={true}>
                        <Pager cpage={parseInt(page)}
                                allpage={allPage}
                                baseUrl={`/notplayed/${gtype}/${userid}/${vertype}/`}
                                afterUrl={window.location.search} />
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
}

export default NoRecordMusicList;