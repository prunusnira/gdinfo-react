export type PatternData = {
    mid: number;
    jacket: string;
    link: string;
    name: string;
    removed: number;
    difflist: Array<EachDiff>;
};

export type EachDiff = {
    diff: string;
    glink: string;
    glv: string;
    blink: string;
    blv: string;
    dlink: string;
    dlv: string;
};
