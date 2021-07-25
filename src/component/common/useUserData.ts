import { useEffect, useState } from "react"
import { getUserFromId } from "@/api/getUserData"

const useUserData = (userid: string) => {
    const [userName, setUserName] = useState('')
    const [profileLink, setProfLink] = useState('')
    const [titleTower, setTitleTower] = useState('')
    
    useEffect(() => {
        loadUserData()
    })
    
    const loadUserData = () => {
        getUserFromId(userid)
        .then((data) => {
            const json = JSON.parse(data.mydata)
            setUserName(json.name)
            setProfLink(`/profile/${userid}`)
            setTitleTower(json.titletower)
        })
    }

    return [userName, profileLink, titleTower]
}

export default useUserData