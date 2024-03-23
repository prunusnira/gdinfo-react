export interface IRecent {
    id: number,
    titletower: string,
    name: string,
    gskill: number,
    dskill: number,
    updatetime: string,
    uptimelong: number,
    opencount: string
}

export interface IRecentIO {
    recent: IRecent[];
}