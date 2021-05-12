import { makeAutoObservable } from "mobx";

class storeIsSigned {
    public isSigned = false
    public setSignStatus(s: boolean) {
        this.isSigned = s
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new storeIsSigned()