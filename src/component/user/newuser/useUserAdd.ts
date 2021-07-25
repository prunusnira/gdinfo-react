import { apiNewUser } from "@/api/updateUserData"
import store from "@/mobx/store"
import LoginInfo from "../loginInfo"

const useUserAdd = (
    updateUserInfo: (info: LoginInfo, isSignIn: boolean, isNewUser: boolean) => void,
    setMoveToIndex: (b: boolean) => void
) => {
    const {loginUser} = store

    const addNewUser = () => {
        const params = new URLSearchParams()
        params.append("token", loginUser.user.token)
        apiNewUser(params)
        .then((data) => {
            const json = JSON.parse(data.loginData)
            switch(json.stat) {
                case "login":
                    const loginData: LoginInfo = {
                        id: json.id,
                        token: json.token
                    }
                    updateUserInfo(loginData, true, false)
                    setMoveToIndex(true)
                    break;
                case "error":
                default:
                    setMoveToIndex(true)
                    break;
            }
        })
    }

    return addNewUser
}

export default useUserAdd