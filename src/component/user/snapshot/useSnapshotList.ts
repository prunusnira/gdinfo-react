import { useEffect, useState } from "react"
import { getSnapshotList } from "@/api/getUserData"

const useSnapshotList = (id: string) => {
    const [glist, setGList] = useState(Array<string>())
    const [dlist, setDList] = useState(Array<string>())

    useEffect(() => {
        snapshotList()
    }, [])

    const snapshotList = () => {
        getSnapshotList(id)
        .then((json) => {
            const list = JSON.parse(json.list)

            const gflist = []
            const dmlist = []
            let gempty = true
            let dempty = true

            // '.'과 '_'으로 split
            for(let i = 0; i < list.length; i++) {
                const c = list[i].split('.')[0].split('_')
                if(c[1] === "gf") gflist.push(c[0])
                else if(c[1] === "dm") dmlist.push(c[0])
            }

            gflist.sort(function(a, b) {
                if(a > b) return 1
                else if(b > a) return -1
                else return 0
            });

            dmlist.sort(function(a, b) {
                if(a > b) return 1
                else if(b > a) return -1
                else return 0
            });

            if(gflist.length > 0) {
                gempty = false
            }

            if(dmlist.length > 0) {
                dempty = false
            }

            setGList(gflist)
            setDList(dmlist)
        })
    }

    return [glist, dlist]
}

export default useSnapshotList