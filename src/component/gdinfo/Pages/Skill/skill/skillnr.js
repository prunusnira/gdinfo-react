import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {GDVer} from '../../Common/version';
import {getPatternImg600} from '../../Common/pattern';
import {skillTableColor} from '../../Common/skillcolor';
import Pager from '../../Common/pager';
import SkillTable from './skillTable';
import SkillMenu from './skillMenu';
import txtSkill from './txtskill';
import LData from '../../Common/language';
import commonData from '../../Common/commonData';
import './skill.css';
import '../../Common/table.css';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Button
} from 'reactstrap';

const lang = LData.lang;

class SkillNR extends Component {
    // 기본 props 정리
    /**
     * this.props.match.params
     * 1. ptype
     * 2. userid
     * 3. gtype
     * 4. page
     * 5. order
     */
    constructor(props) {
        super(props);

        const search = props.location.search;
        const getparams = new URLSearchParams(search);

        this.state = {
            statLeftTitle: "",
            statLeft: "",
            statMidTitle: "",
            statMid: "",
            statRightTitle: "",
            statRight: "",
            sum1: 0,
            sum2: 0,
            skillTable1: [],
            skillTable2: [],
            user: {},
            query: {
                lv: getparams.get("lv"),
                rank: getparams.get("rank"),
                ver: getparams.get("ver"),
                hot: getparams.get("hot"),
                rival: getparams.get("rival")
            },
            visibleLarge: "none",
            visibleLeft: "none",
            visibleRight: "none",
            allpage: 0,
            pageType: "",
            menuVisible: "none"
        }
    }
    componentDidMount() {
        this.skillTableImport(this.props);
        this.updatePType(this.props);

        const urlprop = this.props.match.params;
        switch(parseInt(urlprop.ptype)) {
            case 0:
            case 1:
            case 3:
            case 4:
            case 7:
                this.setState({
                    visibleLarge: "block"
                });
                break;
            case 2:
            case 5:
            case 6:
            case 8:
            case 1000:
                this.setState({
                    visibleLeft: "block",
                    visibleRight: "block"
                });
                break;
            default:
                break;
        }
    }

    componentWillReceiveProps(nextProps) {
        const urlprop = nextProps.match.params;

        this.skillTableImport(nextProps);
        this.updatePType(nextProps);

        switch(parseInt(urlprop.ptype)) {
            case 0:
            case 1:
            case 3:
            case 4:
            case 7:
                this.setState({
                    visibleLarge: "block",
                    visibleLeft: "none",
                    visibleRight: "none"
                });
                break;
            case 2:
            case 5:
            case 6:
            case 8:
            case 1000:
                this.setState({
                    visibleLarge: "none",
                    visibleLeft: "block",
                    visibleRight: "block"
                });
                break;
            default:
                break;
        }
    }

    userInfoImport(props) {
        const urlprop = props.match.params;
        const state = this.state;

        axios.post(commonData.commonDataURL+"getuserid/"+props.match.params.userid)
        .then((res) => {
            const json = res.data.mydata;

            let statLeftTitle = "";
            let statMidTitle = "";
            let statRightTitle = "";

            let statLeft = "";
            let statMid = "";
            let statRight = "";

            // LEFT
            if(urlprop.gtype === "gf") {
                statLeftTitle = "GF Skill";
                statLeft = json.gskill;
            }
            else if(urlprop.gtype === "dm") {
                statLeftTitle = "DM Skill";
                statLeft = json.dskill;
            }

            // MIDDLE & RIGHT
            switch(parseInt(urlprop.ptype)) {
                case 0:
                case 3:
                case 4:
                case 7:
                    statMidTitle = "Order";

                    switch(urlprop.order) {
                    case "skillasc":
                        statMid = txtSkill.order.skillasc[lang];
                        break;
                    case "skilldesc":
                        statMid = txtSkill.order.skilldesc[lang];
                        break;
                    case "titleasc":
                        statMid = txtSkill.order.titleasc[lang];
                        break;
                    case "titledesc":
                        statMid = txtSkill.order.titledesc[lang];
                        break;
                    case "verasc":
                        statMid = txtSkill.order.verasc[lang];
                        break;
                    case "verdesc":
                        statMid = txtSkill.order.verdesc[lang];
                        break;
                    case "rateasc":
                        statMid = txtSkill.order.rateasc[lang];
                        break;
                    case "ratedesc":
                        statMid = txtSkill.order.ratedesc[lang];
                        break;
                    case "playtime":
                        statMid = txtSkill.order.playdesc[lang];
                        break;
                    default:
                        break;
                    }

                    statRightTitle = "Recent Update";
                    statRight = json.updatetime;
                    break;
                case 2:
                case 5:
                case 6:
                case 8:
                    statMidTitle = "Hot Skill";
                    statRightTitle = "Other Skill";
                    statMid = this.state.sum1;
					statRight = this.state.sum2;
                    break;
                case 1:
                    if(state.hot === "h") {
                        statMidTitle = "Hot Total";
                    }
                    else if(state.hot === "o") {
                        statMidTitle = "Other Total";
                    }
                    statRightTitle = "Recent Update";
                    statRight = json.updatetime;
                    statMid = this.state.sum1;
                    break;
                case 1000:
                    break;
                default:
                    break;
            }

            const user = {};
            user.name = json.name;
            user.title = json.titletower;

            this.setState({
                statLeftTitle: statLeftTitle,
                statLeft: statLeft,
                statMidTitle: statMidTitle,
                statMid: statMid,
                statRightTitle: statRightTitle,
                statRight: statRight,
                user: user
            });
        });
    }

    generateURL(props) {
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

		if(urlprops.ptype === 1000) {
			baseUrl = "exc/"+urlprops.gtype;//+'/'+stype;

			if(hot != null) {
				extvar = "?hot="+hot;
			}
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

    skillTableImport(props) {
        const urlprops = props.match.params;
        const ajaxurl = commonData.commonDataURL+this.generateURL(props);
        axios.post(ajaxurl)
        .then((res) => {
            const json = res.data;
            let sum1 = 0;
            let sum2 = 0;
            const skillList1 = [];
            const skillList2 = [];
            let rivaldata = [];
            const pages = json.pages;
            let time = "";
            let isEmpty = false;

            if(json.skill.length > 0) {
                //$("#halfTableLeft").hide();
                //$("#halfTableRight").hide();
                for(let i = 0; i < json.skill.length; i++) {
                    const cur = json.skill[i];
                    let obj = this.generateTable(cur, i, json.page, urlprops.ptype, 0);

                    sum1 += obj.skill1;

                    if(json.rivaluser != null) {
                        obj = this.generateTableRival(obj, json.rivaluser, json.rivaldata[i]);
                    }
                    else {
                        obj.rivaldiv = {display:"none"};
                    }

                    skillList1.push(obj);
                }
            }
            if(json.hskill.length > 0) {
                //$("#fullTable").hide();
                for(let i = 0; i < json.hskill.length; i++) {
                    const cur = json.hskill[i];
                    let obj = this.generateTable(cur, i, json.page, urlprops.ptype, 1);

                    sum1 += obj.skill1;

                    if(json.rivaluser != null) {
                        obj = this.generateTableRival(obj, json.rivaluser, json.hrival[i]);
                    }
                    else {
                        obj.rivaldiv = {display:"none"};
                    }

                    skillList1.push(obj);
                }
            }
            if(json.oskill.length > 0) {
                //$("#fullTable").hide();
                for(let i = 0; i < json.oskill.length; i++) {
                    const cur = json.oskill[i];
                    let obj = this.generateTable(cur, i, json.page, urlprops.ptype, 2);

                    sum2 += obj.skill2;

                    if(json.rivaluser != null) {
                        obj = this.generateTableRival(obj, json.rivaluser, json.orival[i]);
                    }
                    else {
                        obj.rivaldiv = {display:"none"};
                    }

                    skillList2.push(obj);
                }
            }
            
            // 대신에 라이벌 데이터를 state로 옮기자
            //updateRivalSelector(json.rival, json.user);
            rivaldata = json.rival;
            //updatePager(json.pages);
            
            //var towertitlesp = document.createElement("span");
            // 칭호 표시
            /*getTowerTitle(json.user.id, function(result) {
                if(result != "") {
                    var timg = document.createElement("img");
                    timg.setAttribute("class", "towertitle35");
                    timg.src = "/img/title/"+result+".png";
                    towertitlesp.appendChild(timg);
                }
            });*/
            
            //$("#nameTop").append(towertitlesp);
            //$("#nameTop").append("<a class='innerhref' href='/profile/"+json.user.id+"'>"+json.user.name+"</a>");

            const updtime = new Date(json.user.updatetime);
            time = updtime.getFullYear() + "/" + (updtime.getMonth()+1) + "/" + updtime.getDate() +
                                    " " + updtime.getHours() + ":" + updtime.getMinutes();
            
            if(json.skill.length === 0 && json.hskill.length === 0 && json.oskill.length === 0) {
                isEmpty = true;
                //$("#skillEmpty").append("<h3>"+txtSkill.tablehead.empty[lang]+"</h3>");
            }
            
            //self.sendSum();
            this.setState({
                skillTable1: skillList1,
                skillTable2: skillList2,
                allpage: json.pages,
                sum1: sum1,
                sum2: sum2
            });
            
            this.userInfoImport(props);
        });
    }

    generateTable(cur, i, page, ptype, side) {
        const urlprop = this.props.match.params;
		var obj = {};
		obj.num = (page-1)*30+i+1;
		obj.jacketurl = commonData.commonImageURL+"music/"+cur.musicid+".jpg";
		obj.musiclink = "/music/"+cur.musicid+"/"+urlprop.id;
		obj.musicname = cur.mname;
		obj.level = (cur.level/100).toFixed(2);
		obj.version = GDVer[cur.version-1].sv;
		obj.meter = "";//"graph"+ptype+i;
		obj.rankimg = this.getRankImg(cur.rank);
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

    updatePType(props) {
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
        
        this.setState({
            pageType: pageType
        });
    }

    setStatMidOrder(order) {
        let mid = "";
        switch(order) {
            case "skillasc":
                mid = txtSkill.order.skillasc[lang];
                break;
            case "skilldesc":
                mid = txtSkill.order.skilldesc[lang];
                break;
            case "titleasc":
                mid = txtSkill.order.titleasc[lang];
                break;
            case "titledesc":
                mid = txtSkill.order.titledesc[lang];
                break;
            case "verasc":
                mid = txtSkill.order.verasc[lang];
                break;
            case "verdesc":
                mid = txtSkill.order.verdesc[lang];
                break;
            case "rateasc":
                mid = txtSkill.order.rateasc[lang];
                break;
            case "ratedesc":
                mid = txtSkill.order.ratedesc[lang];
                break;
            case "playtime":
                mid = txtSkill.order.playdesc[lang];
                break;
            default:
                break;
        }
        return mid;
    }

    showMenu() {
        let visible = this.state.menuVisible;
        if(visible === "none") visible = "block";
        else visible = "none";

        this.setState({
            menuVisible: visible
        });
    }

    getRankImg(rank) {
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

    render() {
        const self = this;
        const urlprop = this.props.match.params;

        let gtype = "";
        if(urlprop.gtype === "gf") gtype = "GuitarFreaks";
        else gtype = "DrumMania"
        
        let desc = "";
        if(urlprop.ptype === 1000) desc = "ALL EXCELLENT Skill";
        else desc = "Skill by ";

        let user = "";
        if(urlprop.ptype !== 1000) user = self.state.user.name; // (대충 사용자 이름 들어간다는 코멘트)
        // 유저 이름과 image 추가되어야 함
        
        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Skill Table</h3>
                            </CardHeader>
                            <CardBody id="scrshotdiv">
                                <Col xs="12" className="text-center">
                                    <h4>Screenshot</h4>
                                </Col>
                                <Col xs="12" className="btn-group">
                                    <Button style={{width:"100%"}} onClick={() => this.checkScr()}>
                                        {txtSkill.scrshotp[lang]}
                                    </Button>
                                    <Button style={{width:"100%"}} onClick={() => this.scrShot('#scrTable', urlprop.id+'_'+urlprop.gtype+'_all_'+urlprop.page+'_'+this.getTimeScr()+'.jpg')}>
                                        {txtSkill.scrshot[lang]}
                                    </Button>
                                </Col>
                                {
                                    // 본인 계정인 경우 snapshot 생성
                                    (function() {
                                        if(self.state.self) {
                                            return (
                                                <Col xs="12">
                                                    <Button style={{width:"100%"}} onClick={() => this.createSnapshot(urlprop.id, urlprop.gtype)}>
                                                        {txtSkill.snapshot.button[lang]}
                                                    </Button>
                                                </Col>
                                            )
                                        }
                                    })()
                                }
                                <Col xs="12" id="rivalSelector">
                                    <span style={{fontSize:"120%"}}>
                                        {txtSkill.rival.select[lang]}
                                    </span>
                                </Col>
                            </CardBody>
                            <CardBody>
                                <Row>
                                    <Col xs="12" className="text-center">
                                        <a href="#no_div" onClick={() => this.showMenu()}>
                                            Click to toggle Skill Menu
                                        </a>
                                    </Col>
                                    <Col xs="12" style={{display: self.state.menuVisible}}>
                                        <SkillMenu id={urlprop.userid} />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Card id='scrTable'>
                    <CardHeader>
                        <Row id="targetInfo">
                            <Col xs="12" className="text-center">
                                <h4><b>GITADORA&nbsp;
                                    <span>{self.state.pageType}</span><br/>
                                    <span>{gtype} {desc} {user}</span>
                                </b></h4>
                            </Col>
                            <Col xs="6" style={{textAlign:"center"}}>
                                <b>Made by GITADORA.info</b>
                            </Col>
                            <Col xs="6" style={{textAlign:"center"}}>
                                Update Time: <span id="timeTop"></span>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <CardTitle>
                            <Col xs="12" className="skillupper">
                                <Row className="blackandwhite text-center" id="statusBar">
                                        {
                                            (function() {
                                                if(self.state.ptype === (3 || 4 || 7)) {
                                                    return (
                                                        <Col xs="12">
                                                            <span style={{textAlign:"center"}}>
                                                                * {txtSkill.oldver[lang]}
                                                            </span>
                                                        </Col>
                                                    )
                                                }
                                            })()
                                        }

                                    <Col xs="4">
                                        {self.state.statLeftTitle}<br/>{self.state.statLeft}
                                    </Col>
                                    <Col xs="4">
                                        {self.state.statMidTitle}<br/>{self.state.statMid}
                                    </Col>
                                    <Col xs="4">
                                        {self.state.statRightTitle}<br/>{self.state.statRight}
                                    </Col>
                                </Row>
                            </Col>
                        </CardTitle>
                    </CardBody>
                    <CardBody>
                        <Row id="targetTable">
                            <Col xs="12" className='div-table' id="fullTable" style={{display:self.state.visibleLarge}}>
                                <Fragment>
                                    <SkillTable list={self.state.skillTable1} />
                                </Fragment>
                            </Col>
                            <Col sm="6" id="halfTableLeft">
                                <Row>
                                    <Col xs="12" className="text-center">
                                        <h2><b>HOT</b></h2>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" className='div-table' style={{paddingBottom:"100px", display:self.state.visibleLeft}}>
                                        <Fragment>
                                            <SkillTable list={self.state.skillTable1} />
                                        </Fragment>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm="6" id="halfTableRight">
                                <Row>
                                    <Col xs="12" className="text-center">
                                        <h2><b>OTHER</b></h2>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" className='div-table' style={{display:self.state.visibleRight}}>
                                        <Fragment>
                                            <SkillTable list={self.state.skillTable2} />
                                        </Fragment>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <div id="skillEmpty" style={{width:"100%", textAlign:"center"}}></div>
                        <Row className="text-center">
                            <Col xs="12">
                                <Pager />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        )
    }
}

export default SkillNR;