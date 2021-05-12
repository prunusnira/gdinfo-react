import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import CommonData from '../../common/commonData'
import {getPatternImg600} from '../../common/pattern'
import {GDVer} from '../../common/version'
import NPData from './NPData'
import store from '../../../mobx/store'
import NoRecordPresenter from './noRecordPresenter'

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

    useEffect(() => {
        resetSwitch()
        loadNPData()
    }, [window.location.href])

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

    return (
        <NoRecordPresenter
            switchLv={switchLv}
            switchVer={switchVer}
            switchHot={switchHot}
            switchOther={switchOther}
            switchClear={switchClear}
            
            lv={lv}
            ver={ver}
            allPage={allPage}
            list={list}
            
            gtype={gtype}
            userid={userid}
            vertype={vertype}
            page={page}
            
            switchLvMethod={switchLvMethod}
            switchVerMethod={switchVerMethod}
            switchHotMethod={switchHotMethod}
            switchOtherMethod={switchOtherMethod}
            switchClearMethod={switchClearMethod} />
    )
}

export default NoRecordMusicList;