import React, {useEffect, useState} from 'react';
import txtPlayCount from './txtplaycount';
import CountTable from './countTable';
import axios from 'axios';
import {getPatternImg600} from '../../Common/pattern';
import scrShot from '../../Common/scrshot';

import CommonData from '../../Common/commonData';
import { useParams } from 'react-router-dom';
import PlaycountData from './playcountData';
import { observer } from 'mobx-react';
import { BodyContent, BodyHeader, Button, Container, ItemCol, ItemRow } from '../../../../../styled/styledCommon';
import store from '../../../../../mobx/store';

interface MatchProps {
    id: string
}

const PlayCount = observer(() => {
    const [plist, setPList] = useState(Array<PlaycountData>())
    const [glist, setGList] = useState(Array<PlaycountData>())
    const [dlist, setDList] = useState(Array<PlaycountData>())
    const [mlist, setMList] = useState(Array<PlaycountData>())

    const [userName, setUserName] = useState('')
    const [towerTitle, setTowerTitle] = useState('')

    const [display0, setDisplay0] = useState('none')
    const [display1, setDisplay1] = useState('block')
    const [display2, setDisplay2] = useState('none')
    const [display3, setDisplay3] = useState('none')

    const {id} = useParams<MatchProps>()

    const lang = store.language.lang

    useEffect(() => {
        axios.post(`${CommonData.dataUrl}getuserid/${id}`)
        .then((res) => {
            const json = JSON.parse(res.data.mydata)
            setUserName(json.name)
            setTowerTitle(json.titletower)
        });
        axios.post(`${CommonData.dataUrl}mybest/${id}`)
        .then((res) => {
            const json = res.data;

            const mybestp = JSON.parse(json.mybestp);
            const mybestpg = JSON.parse(json.mybestpg);
            const mybestpd = JSON.parse(json.mybestpd);
            const mybestm = JSON.parse(json.mybestm);

            const plist = [];
            const glist = [];
            const dlist = [];
            const mlist = [];

            for(let i = 0; i < mybestp.length; i++) {
                const mypdata: PlaycountData = {
                    key: `p${i}`,
                    number: i+1,
                    jacket: `${CommonData.jacketUrl}${mybestp[i].id}.jpg`,
                    name: mybestp[i].name,
                    pattern: '',
                    count: mybestp[i].playtime
                };
                mypdata.pattern = getPatternImg600(mybestp[i].patterncode);
                plist.push(mypdata);
            }

            for(let i = 0; i < mybestpg.length; i++) {
                const mygdata: PlaycountData = {
                    key: `g${i}`,
                    number: i+1,
                    jacket: `${CommonData.jacketUrl}${mybestpg[i].id}.jpg`,
                    name: mybestpg[i].name,
                    pattern: '',
                    count: mybestpg[i].playtime
                };
                mygdata.pattern = getPatternImg600(mybestpg[i].patterncode);
                glist.push(mygdata);
            }
            
            for(let i = 0; i < mybestpd.length; i++) {
                const myddata: PlaycountData = {
                    key: `d${i}`,
                    number: i+1,
                    jacket: `${CommonData.jacketUrl}${mybestpd[i].id}.jpg`,
                    name: mybestpd[i].name,
                    pattern: '',
                    count: mybestpd[i].playtime
                };
                myddata.pattern = getPatternImg600(mybestpd[i].patterncode);
                dlist.push(myddata);
            }
            
            for(let i = 0; i < mybestm.length; i++) {
                const mymdata: PlaycountData = {
                    key: `m${i}`,
                    number: i+1,
                    jacket: `${CommonData.jacketUrl}${mybestm[i].id}.jpg`,
                    name: mybestm[i].name,
                    pattern: '',
                    count: mybestm[i].playtime
                };
                mlist.push(mymdata);
            }

            setPList(plist)
            setGList(glist)
            setDList(dlist)
            setMList(mlist)
            setDisplay0('block')
            setDisplay1('none')
            setDisplay2('none')
            setDisplay3('none')
        })
    }, [])

    const changeDiv = (num: number) => {
        switch(num) {
            case 0:
                setDisplay0('block')
                setDisplay1('none')
                setDisplay2('none')
                setDisplay3('none')
                break;
            case 1:
                setDisplay0('none')
                setDisplay1('block')
                setDisplay2('none')
                setDisplay3('none')
                break;
            case 2:
                setDisplay0('none')
                setDisplay1('none')
                setDisplay2('block')
                setDisplay3('none')
                break;
            case 3:
                setDisplay0('none')
                setDisplay1('none')
                setDisplay2('none')
                setDisplay3('block')
                break;
            default:
                break;
        }
    }

    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Play Count</h3>
                </BodyHeader>
                <BodyContent className="text-center">
                    <ItemRow>
                        <Button style={{width:"100%"}} onClick={() => scrShot("scrshot", `${id}_mybest.jpg`)}>
                            {(txtPlayCount.button.scrshot as any)[lang]}
                        </Button>
                    </ItemRow>
                    <ItemRow>
                        {(txtPlayCount.desc_1 as any)[lang]}
                        <span style={{color:"red"}}>
                            {(txtPlayCount.desc_2 as any)[lang]}
                        </span>
                        {(txtPlayCount.desc_3 as any)[lang]}
                    </ItemRow>
                </BodyContent>
            </ItemRow>
            <ItemRow id="scrshot" setVertical={true}>
                <BodyHeader className="text-center" id="userinfo">
                    <h4>Most Played List</h4>
                    <span>Player:&nbsp;
                        <img
                            alt="titletower"
                            style={{width:"30px"}}
                            src={`${process.env.PUBLIC_URL}/general-img/title/${towerTitle}.png`} />
                        {userName}
                    </span>
                </BodyHeader>
                <BodyContent>
                    <ItemRow>
                        <ItemCol size={5} isFlatUnderLg={true}>
                            <Button style={{width:"100%"}} onClick={() => changeDiv(0)}>
                                {(txtPlayCount.button.pt as any)[lang]}
                            </Button>
                        </ItemCol>
                        <ItemCol size={5} isFlatUnderLg={true}>
                            <Button style={{width:"100%"}} onClick={() => changeDiv(1)}>
                                {(txtPlayCount.button.music as any)[lang]}
                            </Button>
                        </ItemCol>
                        <ItemCol size={5} isFlatUnderLg={true}>
                            <Button style={{width:"100%"}} onClick={() => changeDiv(2)}>
                                {(txtPlayCount.button.gf as any)[lang]}
                            </Button>
                        </ItemCol>
                        <ItemCol size={5} isFlatUnderLg={true}>
                            <Button style={{width:"100%"}} onClick={() => changeDiv(3)}>
                                {(txtPlayCount.button.dm as any)[lang]}
                            </Button>
                        </ItemCol>
                    </ItemRow>
                    <ItemRow style={{display:display0}}>
                        <CountTable data={plist}></CountTable> {/*AllPattern*/}
                    </ItemRow>
                    <ItemRow style={{display:display1}}>
                        <CountTable data={mlist}></CountTable> {/*GF*/}
                    </ItemRow>
                    <ItemRow style={{display:display2}}>
                        <CountTable data={glist}></CountTable> {/*DM*/}
                    </ItemRow>
                    <ItemRow style={{display:display3}}>
                        <CountTable data={dlist}></CountTable> {/*Music*/}
                    </ItemRow>
                </BodyContent>
            </ItemRow>
        </Container>
    )
})

export default PlayCount;