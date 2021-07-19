import {useEffect, useState} from 'react'
import axios from 'axios'
import CommonData from '../../common/commonData'
import TowerListData from './towerlistData'
import store from '../../../mobx/store'

const useTowerList = () => {
    const [towerGF, setTowerGF] = useState(Array<TowerListData>())
    const [towerDM, setTowerDM] = useState(Array<TowerListData>())
    const [towerSP, setTowerSP] = useState(Array<TowerListData>())

    useEffect(() => {
        loadTowerList();
    }, [])

    const lang = store.language.lang

    const loadTowerList = () => {
        axios.post(`${CommonData.dataUrl}towerlist`)
        .then((res) => {
            const json = res.data
            const towerlist = JSON.parse(json.towerlist)
            const towernum = towerlist.length

            const towergf = new Array<TowerListData>()
            const towerdm = new Array<TowerListData>()
            const towersp = new Array<TowerListData>()

            for(let i = 0; i < towernum; i++) {
                const obj: TowerListData = {
                    img: '',
                    link: '',
                }
                let l = 'ko'
                if(lang === 'en') l = 'ko'
                else if(lang === 'jp') l = 'jp'
                obj.img = `${process.env.PUBLIC_URL}/general-img/tower/${towerlist[i]}_${l}.jpg`
                obj.link = '/tower/stat/'+towerlist[i];

                if(towerlist[i].startsWith("towerGf")) {
                    towergf.push(obj)
                }
                else if(towerlist[i].startsWith("towerDm")) {
                    towerdm.push(obj)
                }
                else if(towerlist[i].startsWith("towerSp")) {
                    towersp.push(obj)
                }
            }
            setTowerGF(towergf)
            setTowerDM(towerdm)
            setTowerSP(towersp)
        })
    }

    return [towerGF, towerDM, towerSP]
}

export default useTowerList