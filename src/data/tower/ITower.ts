import {ITowerUserSkill} from "@/data/tower/ITowerUserSkill";
import {IFloorBase} from "@/data/tower/IFloorBase";

export interface ITower {
    tower: IFloorBase,
    skill: ITowerUserSkill,
    clear: boolean,
}