import {ITowerTitle} from "@/data/tower/ITowerTitle";

export type IFloorItem = {
    jacket: string,
    name: string,
    pattern: string,
    lv: string,
    condRate: number,
    condFc: boolean,
    rate: number,
    fc: boolean,
    description: string,
    clear: string,
    title: ITowerTitle,
}