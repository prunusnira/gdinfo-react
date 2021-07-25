import { useEffect, useState } from "react"
import { getNoRecordData } from "@/api/getMusicData"
import CommonData from "@/component/common/commonData"
import { getPatternImg600 } from "@/component/common/pattern"
import { GDVer } from "@/component/common/version"
import NPData from "./NPData"

type NoRecordDataReturn = [ NPData[], number ]

const useNoRecordData = (
    gtype: string,
    userid: string,
    vertype: string,
    page: string
): NoRecordDataReturn => {
    const [list, setList] = useState(Array<NPData>())
    const [allPage, setAllPage] = useState(0)

    useEffect(() => {
        loadNPData()
    }, [window.location.href])
    
    const loadNPData = () => {
        const params = new URLSearchParams(window.location.search)

        const lv = params.get("lv")
        const order = params.get("order")
        const ver = params.get("ver")
        const hot = params.get("hot")

        const nplist = new Array<NPData>()

        let isEmpty = false
        getNoRecordData(gtype, userid, vertype, page, window.location.search)
        .then((json) => {
            const music = JSON.parse(json.music)

            for(let i = 0; i < music.length; i++) {
                const obj: NPData = {
                    imgsrc: '',
                    link: '',
                    name: '',
                    pattern: '',
                    lv: '',
                    ver: ''
                }
                const cur = music[i]

                obj.imgsrc = `${CommonData.jacketUrl}${cur.id}.jpg`
                obj.link = `/music/${cur.id}/${userid}`
                obj.name = cur.name;
                obj.pattern = getPatternImg600(cur.ptcode)
                obj.lv = (cur.lv/100).toFixed(2)
                obj.ver = GDVer[cur.version-1].sv

                nplist.push(obj)
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
            setAllPage(json.pages)
        })
    }

    return [list, allPage]
}

export default useNoRecordData