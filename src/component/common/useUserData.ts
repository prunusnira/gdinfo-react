import axios from "axios"
import { useEffect, useState } from "react"
import CommonData from "./commonData"

const useUserData = (userid: string) => {
    const [userName, setUserName] = useState('')
    const [profileLink, setProfLink] = useState('')
    const [titleTower, setTitleTower] = useState('')
    
    useEffect(() => {
        loadUserData()
    })
    
    const loadUserData = () => {
        axios.post(`${CommonData.dataUrl}getuserid/${userid}`)
        .then((res) => {
            const json = JSON.parse(res.data.mydata)
            setUserName(json.name)
            setProfLink(`/profile/${userid}`)
            setTitleTower(json.titletower)
        })
    }

    return [userName, profileLink, titleTower]
}

export default useUserData