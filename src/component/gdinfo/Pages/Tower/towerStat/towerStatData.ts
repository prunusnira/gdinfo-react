import UserSkillData from "../../Skill/skill/userSkillData";

export class TowerStatData {
    index: number = 0;
    topid: string = "";
    btnid: string = "";
    opbtn: string = "";
    skillfrom: number = 0;
    floor: number = 0;
    floorclear: string = "";
    titlechangable: string = "";
    titlechange: TitleChange = new TitleChange();
    btnchangable: boolean = false;
    floorid: string = "";
    clearnotice: string = "";
    floorlist: Array<FloorItemData> = new Array<FloorItemData>();
}

export class TitleChange {
    tower: string = "";
    floor: number = 0;
    rate: number = 0;
    allfloors: number = 0;
    btnchangable: boolean = false;
}

export class FloorItemData {
    jacket: string = "";
    name: string = "";
    pattern: string = "";
    lv: string = "";
    condScore: number = 0;
    condRate: number = 0;
    condCombo: number = 0;
    fc: string = "";
    score: number = 0;
    rate: number = 0;
    combo: number = 0;
    description: string = "";
    clear: string = "";
    titlechange: string = "";
}

export class FloorBaseData {
    floor: number = 0;
    musicid: number = 0;
    mname: string = "";
    ptcode: number = 0;
    level: number = 0;
    score: number = 0;
    rate: number = 0;
    fc: boolean = false;
    combo: number = 0;
    description: string = "";
}

export class FloorClearData {
    clear: boolean = false;
    rate: number = 0;
}

export class TowerManage {
    name: string = "";
    skill: number = 0;
    levels: number = 0;
}

export class TowerData {
    tower: FloorBaseData = new FloorBaseData();
    skill: UserSkillData = new UserSkillData();
    clear: boolean = false;
}