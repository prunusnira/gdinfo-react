import TitleType from "./data/titleType"
import UserSkillData from "./userSkillData"

export type TowerStatData = {
    index: number,
    topid: string,
    btnid: string,
    opbtn: string,
    skillfrom: number,
    floor: number,
    floorclear: string,
    titlechangable: string,
    titlechange: TitleType,
    btnchangable: boolean,
    floorid: string,
    clearnotice: string,
    floorlist: Array<FloorItemData>,
}

export type FloorItemData = {
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
    title: TitleType,
}

export type FloorBaseData = {
    floor: number,
    musicid: number,
    mname: string,
    ptcode: number,
    level: number,
    score: number,
    rate: number,
    fc: boolean,
    combo: number,
    description: string,
}

export type FloorClearData = {
    clear: boolean,
    rate: number,
}

export type TowerManage = {
    name: string,
    skill: number,
    levels: number,
}

export type TowerData = {
    tower: FloorBaseData,
    skill: UserSkillData,
    clear: boolean,
}