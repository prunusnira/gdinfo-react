import { useEffect, useState } from "react"
import { getSearchResult } from "@/api/getSearchResult"
import RecentData from "@/component/recent/recentData"

const useUserSearch = (
    type: string,
    page: string,
    value: string,
    setAllPage: (p:number) => void,
) => {
    const [userlist, setUserlist] = useState(Array<RecentData>())
    
    useEffect(() => {
        if(type !== 'music') getUserList()
    }, [])

    const getUserList = () => {
        getSearchResult(type, value, page)
        .then((json) => {
            const userList = JSON.parse(json.userList)
            const userlistDisp = []
            if(JSON.parse(json.resultexist) === "yes") {
                for(let i = 0; i < userList.length; i++) {
                    const cur = userList[i]
                    const obj: RecentData = {
                        id: 0,
                        titletower: '',
                        name: '',
                        gskill: 0,
                        dskill: 0,
                        updatetime: '',
                        uptimelong: 0,
                        glink: '',
                        dlink: '',
                        opencount: '',
                    }
                    if(cur.titletower !== '') {
                        obj.titletower = cur.titletower
                    }
                    else {
                        obj.titletower = ''
                    }
                    obj.id = cur.id
                    obj.name = cur.name
                    obj.gskill = cur.gskill
                    obj.dskill = cur.dskill
                    obj.glink = `/skill/2/${cur.id}/gf/1/1`
                    obj.dlink = `/skill/2/${cur.id}/dm/1/1`
                    obj.uptimelong = cur.updatetime
                    
                    userlistDisp.push(obj)
                }

                setUserlist(userlistDisp)
                setAllPage(parseInt(json.pages))
            }
        });
    }

    return userlist
}

export default useUserSearch