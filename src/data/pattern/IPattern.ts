import {IEachDiff} from './IEachDiff';

export interface IPattern {
    mid: number;
    jacket: string;
    link: string;
    name: string;
    removed: number;
    difflist: Array<IEachDiff>;
}