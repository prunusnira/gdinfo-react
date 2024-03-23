import {IFloorItem} from "@/data/tower/IFloorItem";
import {ITowerTitle} from "@/data/tower/ITowerTitle";

export interface ITowerStat {
    index: number,
    topid: string,
    btnid: string,
    opbtn: string,
    skillfrom: number,
    floor: number,
    floorclear: string,
    titlechangable: string,
    titlechange: ITowerTitle,
    btnchangable: boolean,
    floorid: string,
    clearnotice: string,
    floorlist: Array<IFloorItem>,
}
