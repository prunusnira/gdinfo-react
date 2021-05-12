import { makeAutoObservable } from "mobx";

class storeLang {
    public lang = ''
    public setLang(lang: string) {
        this.lang = lang
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new storeLang()