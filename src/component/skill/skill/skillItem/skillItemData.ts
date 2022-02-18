type SkillItemData = {
    mid: number;
    num: number;
    iconUrl: string;
    musicTitle: string;
    musicLink: string;
    pattern300: string;
    pattern600: string;
    level: string;
    rank: string;
    rate: string;
    skill: string;
    meter: string;
    version: string;
    clearImg300: string;
    clearImg600: string;
    tableColor: object;
};

export const emptySkillItem = {
    mid: 0,
    num: 0,
    iconUrl: "",
    musicTitle: "",
    musicLink: "",
    pattern300: "",
    pattern600: "",
    level: "",
    rank: "",
    rate: "",
    skill: "",
    meter: "",
    version: "",
    clearImg300: "",
    clearImg600: "",
    tableColor: {},
};

export default SkillItemData;
