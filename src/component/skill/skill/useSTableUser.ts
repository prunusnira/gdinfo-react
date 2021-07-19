import axios from "axios"
import { useEffect, useState } from "react"
import store from "../../../mobx/store"
import CommonData from "../../common/commonData"
import ProfileData from "../../user/profile/profileData"

type UserReturn = [ProfileData, boolean]

const useSTableUser = (userid: string, ptype: string): UserReturn => {
    const [user, setUser] = useState(new ProfileData())
    const [ownAccount, setOwnAccount] = useState(false)
    
    // URL이 변경되면 새로 useEffect를 호출하여 내용을 갱신
    // (react-router-dom을 위한 설정)
    useEffect(() => {
        // id 값에서 사용자정보 불러오기
        setUserInfo()
    }, [window.location.href])

    const setUserInfo = () => {
        // 페이지를 연 사용자가 로그인 한 본인과 동일한지 확인
        if(userid === store.loginUser.user.id.toString()) {
            setOwnAccount(true)
        }

        if(ptype === '1000') {
            setUser(new ProfileData())
        }
        else {
            // 서버에서 사용자 정보를 가져옴
            axios.post(`${CommonData.dataUrl}getuserid/${userid}`)
            .then((res) => {
                const json = JSON.parse(res.data.mydata) as ProfileData
                setUser(json)
            })
        }
    }

    return [user, ownAccount]
}

export default useSTableUser