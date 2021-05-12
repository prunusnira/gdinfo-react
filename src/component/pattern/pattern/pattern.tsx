import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import CommonData from '../../common/commonData';
import { PatternMem, PatternData, EachDiffLine, EachDiff } from './patternData';
import store from '../../../mobx/store';
import { observer } from 'mobx-react';
import PatternPresenter from './patternPresenter';

interface MatchProps {
    order: string,
    ver: string,
    page: string
}

const PatternList = observer(() => {
    const [list, setList] = useState(Array<PatternData>())
    const [allPage, setAllPage] = useState(0)

    const [switchHot, setSwitchHot] = useState(false)
    const [switchOther, setSwitchOther] = useState(false)
    const [switchVer, setSwitchVer] = useState(false)
    const [switchOrder, setSwitchOrder] = useState(false)

    const [nextVer, setNextVer] = useState('')
    const [nextOrder, setNextOrder] = useState('')

    const {loginStatus, loginUser} = store

    const {order, ver, page} = useParams<MatchProps>()

    useEffect(() => {
        resetSwitch()
        loadPatternList()
    }, [order, ver, page, window.location.search])

    const loadPatternList = () => {
        axios.post(`${CommonData.dataUrl}pattern/${ver}/${order}/${page}${window.location.search}`)
        .then((res) => {
            const json = res.data
            const ptlist = new Array<PatternData>()
            const musiclist = JSON.parse(json.musiclist)

            for(let i = 0; i < musiclist.length; i++) {
                const obj = new PatternMem()
                const music = musiclist[i]

                //src
                obj.jacket = `${CommonData.jacketUrl}${music.id}.jpg`
                
                //href
                if(loginStatus.isSigned) {
                    obj.link = `/music/${music.id}/${loginUser.user.id}`
                }
                else {
                    obj.link = '#no_div'
                }
                
                obj.name = music.name
                obj.removed = parseInt(music.removed)

                obj.difflist = new Array<EachDiff>()

                for(let j = 0; j < 4; j++) {
                    const d = new EachDiffLine()
                    if(j === 0) {
                        d.diff = "BASIC"
                        if(music.gbsc !== 0) {
                            d.glink = `/ptrank/${music.id}/1/1`
                            d.glv = (music.gbsc/100).toFixed(2)
                        }
                        else {
                            d.glink = '#no_div'
                            d.glv = ''
                        }
                        if(music.bbsc !== 0) {
                            d.blink = `/ptrank/${music.id}/5/1`
                            d.blv = (music.bbsc/100).toFixed(2)
                        }
                        else {
                            d.blink = '#no_div'
                            d.blv = ''
                        }
                        if(music.dbsc !== 0) {
                            d.dlink = `/ptrank/${music.id}/9/1`
                            d.dlv = (music.dbsc/100).toFixed(2)
                        }
                        else {
                            d.dlink = '#no_div'
                            d.dlv = ''
                        }
                    }
                    else if(j === 1) {
                        d.diff = "ADVANCED"
                        if(music.gadv !== 0) {
                            d.glink = `/ptrank/${music.id}/2/1`
                            d.glv = (music.gadv/100).toFixed(2)
                        }
                        else {
                            d.glink = '#no_div'
                            d.glv = ''
                        }
                        if(music.badv !== 0) {
                            d.blink = `/ptrank/${music.id}/6/1`
                            d.blv = (music.badv/100).toFixed(2)
                        }
                        else {
                            d.blink = '#no_div'
                            d.blv = ''
                        }
                        if(music.dadv !== 0) {
                            d.dlink = `/ptrank/${music.id}/10/1`
                            d.dlv = (music.dadv/100).toFixed(2)
                        }
                        else {
                            d.dlink = '#no_div'
                            d.dlv = ''
                        }
                    }
                    else if(j === 2) {
                        d.diff = "EXTREME";
                        if(music.gext !== 0) {
                            d.glink = `/ptrank/${music.id}/3/1`
                            d.glv = (music.gext/100).toFixed(2)
                        }
                        else {
                            d.glink = '#no_div'
                            d.glv = ''
                        }
                        if(music.bext !== 0) {
                            d.blink = `/ptrank/${music.id}/7/1`
                            d.blv = (music.bext/100).toFixed(2)
                        }
                        else {
                            d.blink = '#no_div';
                            d.blv = '';
                        }
                        if(music.dext !== 0) {
                            d.dlink = `/ptrank/${music.id}/11/1`
                            d.dlv = (music.dext/100).toFixed(2)
                        }
                        else {
                            d.dlink = '#no_div'
                            d.dlv = ''
                        }
                    }
                    else if(j === 3) {
                        d.diff = "MASTER";
                        if(music.gmas !== 0) {
                            d.glink = `/ptrank/${music.id}/4/1`
                            d.glv = (music.gmas/100).toFixed(2)
                        }
                        else {
                            d.glink = '#no_div'
                            d.glv = ''
                        }
                        if(music.bmas !== 0) {
                            d.blink = `/ptrank/${music.id}/8/1`
                            d.blv = (music.bmas/100).toFixed(2)
                        }
                        else {
                            d.blink = '#no_div'
                            d.blv = ''
                        }
                        if(music.dmas !== 0) {
                            d.dlink = `/ptrank/${music.id}/12/1`
                            d.dlv = (music.dmas/100).toFixed(2)
                        }
                        else {
                            d.dlink = '#no_div'
                            d.dlv = ''
                        }
                    }
                    obj.difflist.push(d)
                }
                ptlist.push(obj)
            }

            setList(ptlist)
            setAllPage(json.pages)
        })
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
            setNextVer(e.target.value)
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
        setNextVer(ver)
        setNextOrder(next)
    }

    const resetSwitch = () => {
        setSwitchHot(false)
        setSwitchOther(false)
        setSwitchVer(false)
        setSwitchOrder(false)
        setNextVer('')
        setNextOrder('')
    }

    return (
        <PatternPresenter
            switchHot={switchHot}
            switchOther={switchOther}
            switchVer={switchVer}
            switchOrder={switchOrder}
            
            switchHotMethod={switchHotMethod}
            switchOtherMethod={switchOtherMethod}
            switchVerMethod={switchVerMethod}
            switchOrderMethod={switchOrderMethod}

            order={order}
            nextVer={nextVer}
            nextOrder={nextOrder}
            
            list={list}
            page={page}
            allPage={allPage}
            ver={ver} />
    )
})

export default PatternList