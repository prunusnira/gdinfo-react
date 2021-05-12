import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {getPatternImg600} from '../../common/pattern';

import CommonData from '../../common/commonData';
import { useParams } from 'react-router-dom';
import PlaycountData from './playcountData';
import { observer } from 'mobx-react';
import store from '../../../mobx/store';
import PlayCountPresenter from './playcountPresenter';

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
        <PlayCountPresenter
            lang={lang}
            userName={userName}
            id={id}
            towerTitle={towerTitle}
            display0={display0}
            display1={display1}
            display2={display2}
            display3={display3}
            plist={plist}
            glist={glist}
            dlist={dlist}
            mlist={mlist}
            changeDiv={changeDiv} />
    )
})

export default PlayCount;