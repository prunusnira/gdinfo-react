import axios from "axios"
import { useEffect, useState } from "react"
import store from "../../../mobx/store"
import CommonData from "../../common/commonData"
import ProfileData from "./profileData"

type ProfileReturn = [
    ProfileData, boolean, string, string,
    (s: string) => void, (s: string) => void,
]

const useProfileLoader = (id: string) => {
    const [profileData, setProfileData] = useState(new ProfileData())
    const [isOwnAccount, setOwnAccount] = useState(false)
    const [openUserInfo, setOpenUserInfo] = useState('N')
    const [comment, setComment] = useState('')
    
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
        axios.post(`${CommonData.dataUrl}getuserid/${id}`)
        .then((res) => {
            const json = JSON.parse(res.data.mydata);
            setProfileData(json)
            setComment(json.comment)
            setOpenUserInfo(json.opencount)
        });
    }

    return [
        profileData, isOwnAccount, openUserInfo, comment,
        setOpenUserInfo, setComment
    ]
}

export default useProfileLoader