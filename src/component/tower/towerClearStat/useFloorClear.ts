import { useEffect, useState } from "react"
import { getFloorClearStatus } from "@/api/getTowerData"
import { titlesp } from "@/lang/tower/titletxt"
import store from "@/mobx/store"
import { FloorClearData } from "./towerClearData"

const useFloorClear = (id: string) => {
    const [titleList, setTitleList] = useState(Array<FloorClearData>())
    
    useEffect(() => {
        loadFloorClearData()
    }, [])
    
    const lang = store.language.lang

    const loadFloorClearData = () => {
        getFloorClearStatus(id)
        .then((json) => {
            const floor = JSON.parse(json.floor);
            const titlelist = [];

            for(let i = 0; i < floor.length; i++) {
                const t = (titlesp as any)[floor[i].mid];
                if(t != null) {
                    if(t.type === 0 && t[floor[i].ptcode] != null) {
                        const obj: FloorClearData = {
                            name: '',
                            src: '',
                        }
                        obj.src = process.env.PUBLIC_URL+"/general-img/title/"+t[floor[i].ptcode].value+".png";
                        obj.name = t[floor[i].ptcode][lang];
                        titlelist.push(obj);
                    }
                    else if(t.type === 1) {
                        const obj: FloorClearData = {
                            name: '',
                            src: '',
                        }
                        obj.src = process.env.PUBLIC_URL+"/general-img/title/"+t.value+".png";
                        obj.name = t[lang];
                        titlelist.push(obj);
                    }
                    else if(t.type === 2) {
                        if(t[floor[i].ptcode] != null) {
                            const obj: FloorClearData = {
                                name: '',
                                src: '',
                            }
                            obj.src = process.env.PUBLIC_URL+"/general-img/title/"+t[floor[i].ptcode].value+".png";
                            obj.name = t[floor[i].ptcode][lang];
                            titlelist.push(obj);
                        }
                        const obj2: FloorClearData = {
                            name: '',
                            src: '',
                        }
                        obj2.src = process.env.PUBLIC_URL+"/general-img/title/"+t.value+".png";
                        obj2.name = t[lang];
                        titlelist.push(obj2);
                    }
                }
            }

            setTitleList(titlelist)
        })
    }

    return titleList
}

export default useFloorClear