import { useEffect, useState } from "react"
import { getRecentUser } from "@/api/getUserData"
import RecentData from "./recentData"

const useRecent = () => {
    const [recentUserList, setUserList] = useState(Array<RecentData>())

    useEffect(() => {
        getRecentUser()
        .then((data) => {
            const array = JSON.parse(data.recent)
            setUserList(array)
        });
    }, [])

    return recentUserList
}

export default useRecent