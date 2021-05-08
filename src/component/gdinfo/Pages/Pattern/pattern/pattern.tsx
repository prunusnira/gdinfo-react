import React, {useEffect, useState} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import axios from 'axios';
import txtPattern from './txtpattern';
import Pager from '../../Common/pager';
import PatternListItem from './ptListItem';
import CommonData from '../../Common/commonData';
import { PatternMem, PatternData, EachDiffLine, EachDiff } from './patternData';
import store from '../../../../../mobx/store';
import { observer } from 'mobx-react';
import { BodyContent, BodyHeader, Button, Container, ItemCol, ItemRow } from '../../../../../styled/styledCommon';

interface MatchProps {
    order: string,
    ver: string,
    page: string
}

interface State {
    list: Array<PatternData>,
    allpage: number,

    // redirect by switch
    switchhot: boolean,
    switchoth: boolean,
    switchver: boolean,
    switchorder: boolean,
    nextver: number,
    nextorder: string
}

const PatternList = observer(() => {
    const [list, setList] = useState(Array<PatternData>())
    const [allPage, setAllPage] = useState(0)

    const [switchHot, setSwitchHot] = useState(false)
    const [switchOther, setSwitchOther] = useState(false)
    const [switchVer, setSwitchVer] = useState(false)
    const [switchOrder, setSwitchOrder] = useState(false)

    const [nextVer, setNextVer] = useState(0)
    const [nextOrder, setNextOrder] = useState('')

    const {language, loginStatus, loginUser} = store
    const lang = language.lang

    const {order, ver, page} = useParams<MatchProps>()

    useEffect(() => {
        resetSwitch()
        loadPatternList()
    }, [order, ver, page, window.location.search])

    const loadPatternList = () => {
        axios.post(`${CommonData.dataUrl}ptrank/${ver}/${order}/${page}${window.location.search}`)
        .then((res) => {
            const json = res.data;
            const ptlist = new Array<PatternData>();
            const musiclist = JSON.parse(json.musiclist);

            for(let i = 0; i < musiclist.length; i++) {
                const obj = new PatternMem();
                const music = musiclist[i];

                //src
                obj.jacket = CommonData.jacketUrl+music.id+".jpg";
                
                //href
                if(loginStatus.isSigned) {
                    obj.link = '/music/'+music.id+'/'+loginUser.user.id;
                }
                else {
                    obj.link = '#no_div';
                }
                
                obj.name = music.name;
                obj.removed = parseInt(music.removed);

                obj.difflist = new Array<EachDiff>();

                for(let j = 0; j < 4; j++) {
                    const d = new EachDiffLine();
                    if(j === 0) {
                        d.diff = "BASIC";
                        if(music.gbsc !== 0) {
                            d.glink = '/ptrank/'+music.id+'/1/1';
                            d.glv = (music.gbsc/100).toFixed(2);
                        }
                        else {
                            d.glink = '#no_div';
                            d.glv = '';
                        }
                        if(music.bbsc !== 0) {
                            d.blink = '/ptrank/'+music.id+'/5/1';
                            d.blv = (music.bbsc/100).toFixed(2);
                        }
                        else {
                            d.blink = '#no_div';
                            d.blv = '';
                        }
                        if(music.dbsc !== 0) {
                            d.dlink = '/ptrank/'+music.id+'/9/1';
                            d.dlv = (music.dbsc/100).toFixed(2);
                        }
                        else {
                            d.dlink = '#no_div';
                            d.dlv = '';
                        }
                    }
                    else if(j === 1) {
                        d.diff = "ADVANCED";
                        if(music.gadv !== 0) {
                            d.glink = '/ptrank/'+music.id+'/2/1';
                            d.glv = (music.gadv/100).toFixed(2);
                        }
                        else {
                            d.glink = '#no_div';
                            d.glv = '';
                        }
                        if(music.badv !== 0) {
                            d.blink = '/ptrank/'+music.id+'/6/1';
                            d.blv = (music.badv/100).toFixed(2);
                        }
                        else {
                            d.blink = '#no_div';
                            d.blv = '';
                        }
                        if(music.dadv !== 0) {
                            d.dlink = '/ptrank/'+music.id+'/10/1';
                            d.dlv = (music.dadv/100).toFixed(2);
                        }
                        else {
                            d.dlink = '#no_div';
                            d.dlv = '';
                        }
                    }
                    else if(j === 2) {
                        d.diff = "EXTREME";
                        if(music.gext !== 0) {
                            d.glink = '/ptrank/'+music.id+'/3/1';
                            d.glv = (music.gext/100).toFixed(2);
                        }
                        else {
                            d.glink = '#no_div';
                            d.glv = '';
                        }
                        if(music.bext !== 0) {
                            d.blink = '/ptrank/'+music.id+'/7/1';
                            d.blv = (music.bext/100).toFixed(2);
                        }
                        else {
                            d.blink = '#no_div';
                            d.blv = '';
                        }
                        if(music.dext !== 0) {
                            d.dlink = '/ptrank/'+music.id+'/11/1';
                            d.dlv = (music.dext/100).toFixed(2);
                        }
                        else {
                            d.dlink = '#no_div';
                            d.dlv = '';
                        }
                    }
                    else if(j === 3) {
                        d.diff = "MASTER";
                        if(music.gmas !== 0) {
                            d.glink = '/ptrank/'+music.id+'/4/1';
                            d.glv = (music.gmas/100).toFixed(2);
                        }
                        else {
                            d.glink = '#no_div';
                            d.glv = '';
                        }
                        if(music.bmas !== 0) {
                            d.blink = '/ptrank/'+music.id+'/8/1';
                            d.blv = (music.bmas/100).toFixed(2);
                        }
                        else {
                            d.blink = '#no_div';
                            d.blv = '';
                        }
                        if(music.dmas !== 0) {
                            d.dlink = '/ptrank/'+music.id+'/12/1';
                            d.dlv = (music.dmas/100).toFixed(2);
                        }
                        else {
                            d.dlink = '#no_div';
                            d.dlv = '';
                        }
                    }
                    obj.difflist.push(d);
                }
                ptlist.push(obj);
            }

            setList(ptlist)
            setAllPage(json.pages)
        });
    }

    /* Switch */
    const switchHotMethod = () => {
        setSwitchHot(true)
    }

    const switchOtherMethod = () => {
        setSwitchOther(true)
    }

    const switchVerMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value !== "--") {
            setSwitchVer(true)
            setNextVer(parseInt(e.target.value))
        }
    }

    const switchOrderMethod = (type: number) => {
        const currentOrder = order;
        let next = currentOrder;
        if(type === 0) {
            if(currentOrder === "titleasc") next = "titledesc";
            else next = "titleasc";
        }
        if(type === 1) {
            if(currentOrder === "verasc") next = "verdesc";
            else next = "verasc";
        }
        setSwitchOther(true)
        setNextVer(parseInt(ver))
        setNextOrder(next)
    }

    const resetSwitch = () => {
        setSwitchHot(false)
        setSwitchOther(false)
        setSwitchVer(false)
        setSwitchOrder(false)
        setNextVer(0)
        setNextOrder('')
    }

    if(switchHot) {
        return <Redirect to={"/pattern/00/"+order+"/1?hot=h"}/>
    }
    if(switchOther) {
        return <Redirect to={"/pattern/00/"+order+"/1?hot=o"}/>
    }
    if(switchVer) {
        return <Redirect to={"/pattern/"+nextVer+"/"+order+"/1"}/>
    }
    if(switchOrder) {
        return <Redirect to={"/pattern/"+nextVer+"/"+nextOrder+"/1"+window.location.search}/>
    }
    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Pattern List</h3>
                </BodyHeader>
                <BodyContent>
                    <span>
                        {(txtPattern.desc1 as any)[lang]}<br/>
                        {(txtPattern.desc2 as any)[lang]}
                    </span>
                </BodyContent>
            </ItemRow>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Search Options</h3>
                </BodyHeader>
                <BodyContent>
                    <ItemRow>
                        <ItemCol size={5}>
                            <ItemRow>Hot/Other</ItemRow>
                            <ItemRow>
                                <Button onClick={() => switchHotMethod()}>Hot</Button>
                                <Button onClick={() => switchOtherMethod()}>Other</Button>
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
                    <ItemRow setVertical={true}>
                        <ItemRow>Order</ItemRow>
                        <ItemRow>
                            <Button onClick={() => switchOrderMethod(0)}>
                                {(txtPattern.filter.btn.title as any)[lang]} ▲/▼
                            </Button>
                            <Button onClick={() => switchOrderMethod(1)}>
                                {(txtPattern.filter.btn.version as any)[lang]} ▲/▼
                            </Button>
                        </ItemRow>
                    </ItemRow>
                </BodyContent>
            </ItemRow>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h4>{(txtPattern.ptinfo as any)[lang]}</h4>
                </BodyHeader>
                <BodyContent>
                    <PatternListItem list={list}/>
                    <ItemRow keepDirHor={true}>
                        <Pager cpage={parseInt(page)}
                                allpage={allPage}
                                baseUrl={`/pattern/${ver}/${order}/`}
                                afterUrl={window.location.search} />
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
})

export default PatternList