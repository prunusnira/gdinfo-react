export interface PatternData {
    jacket: string,
    link: string,
    name: string,
    removed: number,
    difflist: Array<EachDiff>
}

export class PatternMem implements PatternData {
    jacket: string = "";
    link: string = "";
    name: string = "";
    removed: number = 0;
    difflist: Array<EachDiff> = new Array<EachDiff>();
}

export interface EachDiff {
    diff: string,
    glink: string,
    glv: string,
    blink: string,
    blv: string,
    dlink: string,
    dlv: string
}

export class EachDiffLine implements EachDiff {
    diff: string = "";
    glink: string = "";
    glv: string = "";
    blink: string = "";
    blv: string = "";
    dlink: string = "";
    dlv: string = "";
}