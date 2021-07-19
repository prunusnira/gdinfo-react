import { useState } from "react"
import store from "../../../mobx/store"
import LoginInfo from "../../common/loginInfo"

type UserInfoReturn = [
    boolean, string,
    (info: LoginInfo, isSignIn: boolean, isNewUser: boolean) => void,
]

const useUserInfo = (): UserInfoReturn => {
    const [newUser, setNewUser] = useState(false)
    const [token, setToken] = useState('')

    const {loginUser, loginStatus} = store
    
    const updateUserInfo = (info: LoginInfo, isSignIn: boolean, isNewUser: boolean) => {
        loginUser.setUserData(info)
        loginStatus.setSignStatus(isSignIn)
        setNewUser(isNewUser)
        setToken(info.token)
    }

    return [newUser, token, updateUserInfo]
}

export default useUserInfo