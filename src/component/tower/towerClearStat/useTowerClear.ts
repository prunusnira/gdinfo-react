import axios from "axios"
import { useEffect, useState } from "react"
import { towerName } from "../../../lang/tower/towername"
import store from "../../../mobx/store"
import CommonData from "../../common/commonData"
import { TowerClearData, TowerFloorData } from "./towerClearData"

import txtTowerStatKo from '../../../lang/tower/towerClearStat/txtTowerStat-ko'
import txtTowerStatJp from '../../../lang/tower/towerClearStat/txtTowerStat-jp'
import txtTowerStatEn from '../../../lang/tower/towerClearStat/txtTowerStat-en'

const useTowerClear = (id: string) => {
    const [towerList, setTowerList] = useState(Array<TowerClearData>())
    
    useEffect(() => {
        loadTowerClearData()
    }, [])
    
    const lang = store.language.lang

    const txtTowerStat =
        lang === 'ko' ? txtTowerStatKo :
            lang === 'jp' ? txtTowerStatJp : txtTowerStatEn

    const loadTowerClearData = () => {
        axios.post(`${CommonData.dataUrl}profile/towerstatus/tower/${id}`)
        .then((res) => {
            const json = res.data
            const list = JSON.parse(json.list)
            const tower = JSON.parse(json.tower)
            const towerlist = new Array<TowerClearData>()

            for(let i = 0; i < list.length; i++) {
                const obj: TowerClearData = {
                    tower: '',
                    cont: '',
                    floors: []
                }
                obj.tower = (towerName as any)[list[i]][lang]
                // Eval을 사용한 트릭
                obj.floors = new Array<TowerFloorData>()
                
                for(let j = 0; j < tower.length; j++) {
                    if(list[i] === tower[j].tower) {
                        const floor = (tower[j].floor+1)+txtTowerStat.floor
                        let clear = ""
                        if(tower[j].clear === "Y") clear = "Cleared"
                        else clear = "Not cleared"
                        obj.floors.push({floor:floor, clear: clear})
                    }
                }
                if(obj.cont === "") obj.cont = txtTowerStat.nodata
                towerlist.push(obj)
            }

            setTowerList(towerlist)
        })
    }

    return towerList
}

export default useTowerClear