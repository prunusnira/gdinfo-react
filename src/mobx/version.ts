import { makeAutoObservable } from "mobx";

class storeVersion {
    public version = -1
    public setVersion(version: number) {
        this.version = version
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new storeVersion()