export class TowerClearData {
    tower: string = "";
    floors: Array<TowerFloorData> = new Array<TowerFloorData>();
    cont: string = "";
}

export class TowerFloorData {
    floor: string = "";
    clear: string = "";
}

export class FloorClearData {
    src: string = "";
    name: string = "";
}