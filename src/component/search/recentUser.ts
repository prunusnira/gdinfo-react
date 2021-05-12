import RecentData from "../recent/recentData";

class RecentUser implements RecentData {
    id: number = 0
    titletower: string = ""
    name: string = ""
    gskill: number = 0
    dskill: number = 0
    updatetime: string = ""
    uptimelong: number = 0
    link: string = ""
    glink: string = ""
    dlink: string = ""
    opencount: string = "Y"
}

export default RecentUser