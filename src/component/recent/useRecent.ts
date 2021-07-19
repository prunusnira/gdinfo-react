import axios from "axios";
import { useEffect, useState } from "react";
import CommonData from "../common/commonData";
import RecentData from "./recentData";

const useRecent = () => {
    const [recentUserList, setUserList] = useState(Array<RecentData>())

    useEffect(() => {
        axios.post(`${CommonData.dataUrl}recent`)
        .then((resp) => {
            const data = resp.data
            const array = JSON.parse(data.recent)

            setUserList(array)
        });
    }, [])

    return recentUserList
}

export default useRecent