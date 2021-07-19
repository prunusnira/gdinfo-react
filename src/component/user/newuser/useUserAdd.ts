import axios from "axios"
import store from "../../../mobx/store"
import CommonData from "../../common/commonData"
import LoginInfo from "../../common/loginInfo"

const useUserAdd = (
    updateUserInfo: (info: LoginInfo, isSignIn: boolean, isNewUser: boolean) => void,
    setMoveToIndex: (b: boolean) => void
) => {
    const {loginUser} = store

    const addNewUser = () => {
        const params = new URLSearchParams()
        params.append("token", loginUser.user.token)
        axios.post(`${CommonData.dataUrl}newuser`, params)
        .then((res) => {
            const json = JSON.parse(res.data.loginData)
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