import TitleType from "./data/titleType"
import UserSkillData from "./userSkillData"

export class TowerStatData {
    index: number = 0
    topid: string = ""
    btnid: string = ""
    opbtn: string = ""
    skillfrom: number = 0
    floor: number = 0
    floorclear: string = ""
    titlechangable: string = ""
    titlechange: TitleType = {type: 0, title: '', display: ''}
    btnchangable: boolean = false
    floorid: string = ""
    clearnotice: string = ""
    floorlist: Array<FloorItemData> = new Array<FloorItemData>()
}

export class FloorItemData {
    jacket: string = ""
    name: string = ""
    pattern: string = ""
    lv: string = ""
    condRate: number = 0
    condFc: boolean = false
    rate: number = 0
    fc: boolean = false
    description: string = ""
    clear: string = ""
    title: TitleType | null = null
}

export class FloorBaseData {
    floor: number = 0
    musicid: number = 0
    mname: string = ""
    ptcode: number = 0
    level: number = 0
    score: number = 0
    rate: number = 0
    fc: boolean = false
    combo: number = 0
    description: string = ""
}

export class FloorClearData {
    clear: boolean = false
    rate: number = 0
}

export class TowerManage {
    name: string = ""
    skill: number = 0
    levels: number = 0
}

export class TowerData {
    tower: FloorBaseData = new FloorBaseData()
    skill: UserSkillData = new UserSkillData()
    clear: boolean = false
}