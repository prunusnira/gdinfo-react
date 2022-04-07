import { makeAutoObservable } from "mobx";

class storeDark {
    public dark = false;
    changeDark = (d: boolean) => {
        console.log(this.dark);
        this.dark = d;
    };

    constructor() {
        makeAutoObservable(this);
    }
}

export default new storeDark();
