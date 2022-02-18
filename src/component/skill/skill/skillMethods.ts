import CommonData from "@/component/common/commonData";
import { getPatternImg300, getPatternImg600 } from "@/component/common/pattern";
import { skillTableColor } from "@/component/common/skillcolor";
import { GDVer } from "@/component/common/version";
import MusicFetchData from "./skillItem/musicFetchData";
import SkillItemData from "./skillItem/skillItemData";

// 스킬 데이터를 가져오기 위한 데이터 URL을 생성하는 함수
export const generateURL = (
    order: string,
    ptype: string,
    userid: string,
    gtype: string,
    page: string
) => {
    const getparams = new URLSearchParams(window.location.search);
    let baseUrl = "";
    let extvar = "";

    const hot = getparams.get("hot");
    const lv = getparams.get("lv");
    const rank = getparams.get("rank");
    const ver = getparams.get("ver");

    if (parseInt(ptype) === 1000) {
        baseUrl = `exc/${gtype}`;
    } else {
        baseUrl = `skill/${ptype}/${userid}/${gtype}/${page}/${order}`;
        if (lv != null) {
            if (extvar === "") extvar = `?lv=${lv}`;
            else extvar += `&lv=${lv}`;
        }
        if (rank != null) {
            if (extvar === "") extvar = `?rank=${rank}`;
            else extvar += `&rank=${rank}`;
        }
        if (ver != null) {
            if (extvar === "") extvar = `?ver=${ver}`;
            else extvar += `&ver=${ver}`;
        }
        if (hot != null) {
            if (extvar === "") extvar = `?hot=${hot}`;
            else extvar += `&hot=${hot}`;
        }
    }

    return baseUrl + extvar;
};

export const getRate = (ptype: number, cur: MusicFetchData) => {
    // rate 선택
    let rate = 0;
    switch (ptype) {
        case 3:
        case 4:
            rate = cur.ratetb;
            break;
        case 5:
        case 6:
            rate = cur.ratetbre;
            break;
        case 7:
        case 8:
            rate = cur.ratemx;
            break;
        case 9:
        case 10:
            rate = cur.rateex;
            break;
        case 11:
        case 12:
            rate = cur.ratenx;
            break;
        case 0:
        case 1:
        case 2:
        default:
            rate = cur.rate;
            break;
    }
    return rate;
};

const getRankImg = (rank: string): string => {
    let img = process.env.PUBLIC_URL;

    switch (rank) {
        case "E":
            img += "/general-img/rank/rank_e.png";
            break;
        case "D":
            img += "/general-img/rank/rank_d.png";
            break;
        case "C":
            img += "/general-img/rank/rank_c.png";
            break;
        case "B":
            img += "/general-img/rank/rank_b.png";
            break;
        case "A":
            img += "/general-img/rank/rank_a.png";
            break;
        case "S":
            img += "/general-img/rank/rank_s.png";
            break;
        case "SS":
        case "EXC":
            img += "/general-img/rank/rank_ss.png";
            break;
        default:
            break;
    }

    return img;
};

export const generateSkillItem = (
    data: MusicFetchData,
    idx: number,
    ptype: string,
    page: string,
    userid: string
) => {
    let rate = data.rate;
    switch (parseInt(ptype)) {
        case 3:
        case 4:
            rate = data.ratetb;
            break;
        case 5:
        case 6:
            rate = data.ratetbre;
            break;
        case 7:
        case 8:
            rate = data.ratemx;
            break;
        case 9:
        case 10:
            rate = data.rateex;
            break;
        case 11:
        case 12:
            rate = data.ratenx;
            break;
    }

    const meterData = data.meter.split("");
    const media1200 = window.matchMedia("(min-width: 1200px)");
    let meter = "";
    for (let k = 0; k < meterData.length; k++) {
        if (meterData[k] === "0") {
            if (media1200.matches) {
                meter +=
                    "<div style='width:0.5vw; max-width:6px; background-color:#7598ff; float:left'>&nbsp;</div>";
            } else {
                meter +=
                    "<div style='width:0.25vw; max-width:6px; background-color:#7598ff; float:left'>&nbsp;</div>";
            }
        } else if (meterData[k] === "1") {
            if (media1200.matches) {
                meter +=
                    "<div style='width:0.5vw; max-width:6px; background-color:#feff00; float:left'>&nbsp;</div>";
            } else {
                meter +=
                    "<div style='width:0.25vw; max-width:6px; background-color:#feff00; float:left'>&nbsp;</div>";
            }
        } else {
            if (media1200.matches) {
                meter +=
                    "<div style='width:0.5vw; max-width:6px; background-color:#848484; float:left'>&nbsp;</div>";
            } else {
                meter +=
                    "<div style='width:0.25vw; max-width:6px; background-color:#848484; float:left'>&nbsp;</div>";
            }
        }
    }

    let img300 = "";
    let img600 = "";
    if (data.checkfc === "Y") {
        if (data.rank !== "EXC") {
            img300 = process.env.PUBLIC_URL + "/general-img/rank/fc_300.png";
            img600 = process.env.PUBLIC_URL + "/general-img/rank/fc_600.png";
        } else {
            img300 = process.env.PUBLIC_URL + "/general-img/rank/exc_300.png";
            img600 = process.env.PUBLIC_URL + "/general-img/rank/exc_600.png";
        }
    } else {
        if (data.playtime > 0) {
            img300 = process.env.PUBLIC_URL + "/general-img/rank/cleared_300.png";
            img600 = process.env.PUBLIC_URL + "/general-img/rank/cleared_600.png";
        } else {
            img300 = process.env.PUBLIC_URL + "/general-img/rank/notplayed_600.png";
            img600 = process.env.PUBLIC_URL + "/general-img/rank/notplayed_600.png";
        }
    }

    let color = {};
    const bg = skillTableColor((rate * data.level * 2) / 1000);
    if (bg.startsWith("#")) {
        color = {
            width: "100% !important",
            height: "100% !important",
            backgroundColor: bg,
            verticalAlign: "middle",
        };
    } else {
        color = {
            width: "100% !important",
            height: "100% !important",
            background: bg,
            verticalAlign: "middle",
        };
    }

    const item: SkillItemData = {
        mid: data.musicid,
        num: (parseInt(page) - 1) * 30 + idx + 1,
        iconUrl: `${CommonData.jacketUrl}${data.musicid}.jpg`,
        musicTitle: data.mname,
        musicLink: `/music/${data.musicid}/${userid}`,
        pattern300: getPatternImg300(data.patterncode),
        pattern600: getPatternImg600(data.patterncode),
        level: (data.level / 100).toFixed(2),
        rank: getRankImg(data.rank),
        rate: (rate / 100).toFixed(2),
        skill: (Math.floor((rate * data.level * 20) / 10000) / 100).toFixed(2),
        meter: meter,
        version: GDVer[data.version - 1].sv,
        clearImg300: img300,
        clearImg600: img600,
        tableColor: color,
    };

    return item;
};
