import { useEffect, useState } from "react"
import { getUserFromId } from "@/api/getUserData"
import store from "@/mobx/store"
import ProfileData from "./profileData"

type ProfileReturn = [ProfileData, boolean]

const useProfileLoader = (
    id: string,
    setComment: (s: string) => void,
    setOpenUserInfo: (s: string) => void,
): ProfileReturn => {
    const [profileData, setProfileData] = useState(new ProfileData())
    const [isOwnAccount, setOwnAccount] = useState(false)
    
    useEffect(() => {
        checkOwnAccount()
        getUserData()
    }, [])

    const {loginUser} = store

    const checkOwnAccount = () => {
        if(parseInt(loginUser.user.id) === parseInt(id)) {
            setOwnAccount(true)
        }
    }

    const getUserData = () => {
        getUserFromId(id)
        .then((data) => {
            const json = JSON.parse(data.mydata);
            setProfileData(json)
            setComment(json.comment)
            setOpenUserInfo(json.opencount)
        });
    }

    return [profileData, isOwnAccount]
}

export default useProfileLoader