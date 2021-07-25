import { makeAutoObservable } from "mobx"
import LoginInfo from "../component/user/loginInfo"

const emptyUser: LoginInfo = {
    token: '',
    id: ''
}

class storeLoginUser {
    public user = emptyUser
    public setUserData(data: LoginInfo) {
        this.user = data
    }
    public setLogout() {
        this.user = emptyUser
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new storeLoginUser()