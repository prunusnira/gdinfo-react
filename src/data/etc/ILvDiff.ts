export interface ILvDiff {
    mid: number;
    title: string;
    ptcode: number;
    lv: number;
    lvold: number;
}

export interface ILvDiffIO {
    lvdiff: ILvDiff[];
}