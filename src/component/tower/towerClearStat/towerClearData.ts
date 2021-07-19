export type TowerClearData = {
    tower: string,
    floors: Array<TowerFloorData>,
    cont: string,
}

export type TowerFloorData = {
    floor: string,
    clear: string,
}

export type FloorClearData = {
    src: string,
    name: string,
}