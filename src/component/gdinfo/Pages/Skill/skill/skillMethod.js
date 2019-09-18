import commonData from '../../Common/commonData';
import {GDVer} from '../../Common/version';
import {getPatternImg600} from '../../Common/pattern';
import {skillTableColor} from '../../Common/skillcolor';

export const generalTable = (prop, cur, i, side) => {
    generateTable(prop, cur, i, 1, 2, side);
}

export const generateTable = (prop, cur, i, page, ptype, side) => {
    const urlprop = prop.match.params;
    var obj = {};
    obj.num = (page-1)*30+i+1;
    obj.jacketurl = commonData.commonImageURL+"music/"+cur.musicid+".jpg";
    obj.musiclink = "/music/"+cur.musicid+"/"+urlprop.id;
    obj.musicname = cur.mname;
    obj.level = (cur.level/100).toFixed(2);
    obj.version = GDVer[cur.version-1].sv;
    obj.meter = "";//"graph"+ptype+i;
    obj.rankimg = getRankImg(cur.rank);
    obj.skill1 = 0;
    obj.skill2 = 0;
    obj.pattern = getPatternImg600(cur.patterncode);

    if(cur.checkfc === "Y") {
        if(cur.rank !== "EXC") {
            obj.fcimg = process.env.PUBLIC_URL+"/general-img/rank/fc_600.png";
            }
        else {
            obj.fcimg = process.env.PUBLIC_URL+"/general-img/rank/exc_600.png";
        }
    }
    else {
        if(cur.playtime > 0) {
            obj.fcimg = process.env.PUBLIC_URL+"/general-img/rank/cleared_600.png";
        }
        else {
            obj.fcimg = process.env.PUBLIC_URL+"/general-img/rank/notplayed_600.png";
        }
        if(cur.combo === 0) {
            obj.fcimg = "";
        }
    }

    var rate = cur.rate;
    if(ptype === 4 || ptype === 6) rate = cur.ratetb;
    else if(ptype === 3 || ptype === 5) rate = cur.ratetbre;
    else if(ptype === 7 || ptype === 8) rate = cur.ratemx;

    obj.rate = (rate/100).toFixed(2);
    obj.skill = Math.floor(rate*cur.level*20/10000)/100;
    if(side === 0 || side === 1) {
        obj.skill1 += obj.skill;
    }
    else if(side === 2) {
        obj.skill2 += obj.skill;
    }
    obj.skill = obj.skill.toFixed(2);
    
    const bg = skillTableColor(rate*cur.level*2/1000);
    if(bg.startsWith("#")) {
        obj.skillcolor = {
            width: "100% !important",
            height: "100% !important",
            backgroundColor: bg,
            verticalAlign:"middle"
        };
    }
    else {
        obj.skillcolor = {
            width: "100% !important",
            height: "100% !important",
            background: bg,
            verticalAlign:"middle"
        };
    }

    const meter = cur.meter.split('');
    for(let k = 0; k < meter.length; k++) {
        if(meter[k] === "0") {
            if(side === 1 || side === 2) {
                const media = window.matchMedia("(max-width: 768px)");
                if(media.matches) {
                    obj.meter += "<div style='width:0.5vw; max-width:9px; background-color:#81BEF7; float:left'>&nbsp;</div>";
                }
                else {
                    obj.meter += "<div style='width:0.25vw; max-width:9px; background-color:#81BEF7; float:left'>&nbsp;</div>";
                }
                
            }
            else {
                obj.meter += "<div style='width:0.5vw; max-width:9px; background-color:#81BEF7; float:left'>&nbsp;</div>";
            }
        }
        else if(meter[k] === "1") {
            if(side === 1 || side === 2) {
                const media = window.matchMedia("(max-width: 768px)");
                if(media.matches) {
                    obj.meter += "<div style='width:0.5vw; max-width:9px; background-color:#F3F781; float:left'>&nbsp;</div>";
                }
                else {
                    obj.meter += "<div style='width:0.25vw; max-width:9px; background-color:#F3F781; float:left'>&nbsp;</div>";
                }
            }
            else {
                obj.meter += "<div style='width:0.5vw; max-width:9px; background-color:#F3F781; float:left'>&nbsp;</div>";
            }
            
        }
        else {
            if(side === 1 || side === 2) {
                const media = window.matchMedia("(max-width: 768px)");
                if(media.matches) {
                    obj.meter += "<div style='width:0.5vw; max-width:9px; background-color:#848484; float:left'>&nbsp;</div>";
                }
                else {
                    obj.meter += "<div style='width:0.25vw; max-width:9px; background-color:#848484; float:left'>&nbsp;</div>";
                }
                
            }
            else {
                obj.meter += "<div style='width:0.5vw; max-width:9px; background-color:#848484; float:left'>&nbsp;</div>";
            }
        }
    }

    return obj;
}

export const getRankImg = (rank) => {
    let img = process.env.PUBLIC_URL;

    switch(rank) {
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
}

export const updatePType = (props, self) => {
    const search = props.location.search;
    const getparams = new URLSearchParams(search);
    const ptype = getparams.get("ptype");

    let pageType = "";
    switch(ptype) {
        case 3:
            pageType = "Tri-Boost Re:EVOLVE Top 100";
            break;
        case 4:
            pageType = "Tri-Boost Top 100";
            break;
        case 5:
            pageType = "Tri-Boost Re:EVOLVE";
            break;
        case 6:
            pageType = "Tri-Boost";
            break;
        case 7:
            pageType = "Matixx Top 100";
            break;
        case 8:
            pageType = "Matixx";
            break;
        default:
            pageType = "EXCHAIN";
            break;
    }
    
    self.setState({
        pageType: pageType
    });
}

export const generateURL = (props) => {
    const urlprops = props.match.params;
    
    const search = props.location.search;
    const getparams = new URLSearchParams(search);
    let baseUrl = "";
    let extvar = "";
    
    const hot = getparams.get("hot");
    const lv = getparams.get("lv");
    const rank = getparams.get("rank");
    const ver = getparams.get("ver");
    const rival = getparams.get("rival");

    if(parseInt(urlprops.ptype) === 1000) {
        baseUrl = "exc/"+urlprops.gtype;
    }
    else {
        baseUrl = 'skill/'+urlprops.ptype+'/'+
                    urlprops.userid+'/'+urlprops.gtype+'/'+
                    urlprops.page+'/'+urlprops.order;
        if(lv != null) {
            if(extvar === "") extvar += "?lv="+lv;
            else extvar += "&lv="+lv;
        }
        if(rank != null) {
            if(extvar === "") extvar += "?rank="+rank;
            else extvar += "&rank="+rank;
        }
        if(ver != null) {
            if(extvar === "") extvar += "?ver="+ver;
            else extvar += "&ver="+ver;
        }
        if(hot != null) {
            if(extvar === "") extvar += "?hot="+hot;
            else extvar += "&hot="+hot;
        }
        if(rival != null) {
            if(extvar === "") extvar += "?rival="+rival;
            else extvar += "&rival="+rival;
        }
    }
    
    return baseUrl+extvar;
}