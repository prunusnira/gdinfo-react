import { getUserFromToken } from "@/api/getUserData"
import store from "@/mobx/store"
import { useEffect, useState } from "react"
import ProfileData from "../user/profile/profileData"

export type LoginInfoReturn = [boolean, ProfileData]

const useLoginInfo = (): LoginInfoReturn => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(new ProfileData())

    useEffect(() => {
        const token = store.loginUser.user.token;
        if(token !== "") {
            getUserFromToken(token)
            .then((data) => {
                setData(JSON.parse(data.mydata))
                setLoading(true)
            })
        }
    }, [])

    return [loading, data]
}

export default useLoginInfo