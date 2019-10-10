import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Pager from '../../Common/pager';
import SkillTableSH from './skillTableSH';
import txtSkill from './txtskill';
import LData from '../../Common/language';
import commonData from '../../Common/commonData';
import * as time from '../../Common/time';
import * as skillMethod from './skillMethod';
import './skill.css';
import '../../Common/table.css';
import scrShot from '../../Common/scrshot';
import { skillPageVersion } from '../../Common/version';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button
} from 'reactstrap';

const lang = LData.lang;

class SkillSH extends Component {
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
            menuVisible: "none"
        }
    }

    componentDidMount() {
        this.skillTableImport(this.props);
        skillMethod.updatePType(this.props, this);

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
        skillMethod.updatePType(nextProps, this);

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

            const user = {};
            // LEFT
            if(parseInt(urlprop.ptype) !== 1000) {
                if(urlprop.gtype === "gf") {
                    statLeftTitle = "GF Skill";
                    statLeft = json.gskill;
                }
                else if(urlprop.gtype === "dm") {
                    statLeftTitle = "DM Skill";
                    statLeft = json.dskill;
                }

                user.name = json.name;
                user.title = json.titletower;
            }

            // MIDDLE & RIGHT
            switch(parseInt(urlprop.ptype)) {
                case 0:
                case 3:
                case 4:
                case 7:
                case 9:
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
                    statRight = time.unixTimeConverter(json.updatetime);
                    break;
                case 2:
                case 5:
                case 6:
                case 8:
                case 10:
                    statMidTitle = "Hot Skill";
                    statRightTitle = "Other Skill";
                    statMid = this.state.sum1.toFixed(2);
					statRight = this.state.sum2.toFixed(2);
                    break;
                case 1:
                    if(state.hot === "h") {
                        statMidTitle = "Hot Total";
                    }
                    else if(state.hot === "o") {
                        statMidTitle = "Other Total";
                    }
                    statRightTitle = "Recent Update";
                    statRight = time.unixTimeConverter(json.updatetime);
                    statMid = this.state.sum1.toFixed(2);
                    break;
                case 1000:
                    statLeftTitle = "Total Skill";
                    statMidTitle = "Hot Skill";
                    statRightTitle = "Other Skill";
                    statMid = this.state.sum1.toFixed(2);
                    statRight = this.state.sum2.toFixed(2);
                    statLeft = (this.state.sum1 + this.state.sum2).toFixed(2);
                    break;
                default:
                    break;
            }

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

    skillTableImport(props) {
        const urlprops = props.match.params;
        const ajaxurl = commonData.commonDataURL+skillMethod.generateURL(props);
        axios.post(ajaxurl)
        .then((res) => {
            const json = res.data;
            let sum1 = 0;
            let sum2 = 0;
            const skillList1 = [];
            const skillList2 = [];

            if(json.skill.length > 0) {
                for(let i = 0; i < json.skill.length; i++) {
                    const cur = json.skill[i];
                    let obj = skillMethod.generateTable(props, cur, i, json.page, urlprops.ptype, 0);

                    sum1 += obj.skill1;

                    skillList1.push(obj);
                }
            }
            if(json.hskill.length > 0) {
                for(let i = 0; i < json.hskill.length; i++) {
                    const cur = json.hskill[i];
                    let obj = skillMethod.generateTable(props, cur, i, json.page, urlprops.ptype, 1);

                    sum1 += obj.skill1;

                    skillList1.push(obj);
                }
            }
            if(json.oskill.length > 0) {
                for(let i = 0; i < json.oskill.length; i++) {
                    const cur = json.oskill[i];
                    let obj = skillMethod.generateTable(props, cur, i, json.page, urlprops.ptype, 2);

                    sum2 += obj.skill2;

                    skillList2.push(obj);
                }
            }

            const updtime = json !== null ? new Date(json.updatetime) : new Date();

            const time = updtime.getFullYear() + "/" + (updtime.getMonth()+1) + "/" +
                updtime.getDate() + " " + updtime.getHours() + ":" + updtime.getMinutes();
            
            this.setState({
                skillTable1: skillList1,
                skillTable2: skillList2,
                allpage: json.pages,
                sum1: sum1,
                sum2: sum2,
                updatetime: time
            });
            
            this.userInfoImport(props);
        });
    }
    
    render () {
        const self = this;
        const urlprop = this.props.match.params;
        const search = this.props.location.search;

        const pagetype = skillPageVersion(parseInt(urlprop.ptype));
        
        let desc = "";
        if(parseInt(urlprop.ptype) === 1000) desc = txtSkill.exc[lang];
        else desc = "Skill by ";

        let user = "";
        if(parseInt(urlprop.ptype) !== 1000) user = self.state.user.name; // (대충 사용자 이름 들어간다는 코멘트)
        // 유저 이름과 image 추가되어야 함
        
        let gtype = "";
        let gtypeShort = "";
        if(urlprop.gtype === "gf") {
            gtype = "GuitarFreaks";
            gtypeShort = "GF";
        }
        else {
            gtype = "DrumMania";
            gtypeShort = "DM";
        }
        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Skill {txtSkill.scrtitle[lang]}</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                        {txtSkill.scrdesc[lang]}
                                    </Col>
                                    <Col xs="12" className="btn-group" id="prevlink">
                                        <Button tag={Link} to={"/skill/"+urlprop.ptype+"/"+urlprop.userid+"/"+
                                            urlprop.gtype+"/"+urlprop.page+"/"+urlprop.order+search} style={{width:"100%"}}>
                                            {txtSkill.scrback[lang]}
                                        </Button>
                                        <Button style={{width:"100%"}} href="#no_div" onClick={() => scrShot("scrTable", urlprop.userid+'_'+urlprop.gtype+'_all_'+urlprop.page+'_'+time.getTimeScr()+'.jpg')}>
                                            {txtSkill.scrshot[lang]}
                                        </Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card id='scrTable'>
                            <CardHeader>
                                <Row id="targetInfo">
                                    <Col xs="12" className="text-center">
                                        <h4><b>GITADORA {pagetype}<br/>
                                        {gtype} {desc} <Link className="innerhref" to={"/profile/"+urlprop.userid}>{user}</Link></b></h4>
                                        <b>Made by GITADORA.info</b>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row className="blackandwhite text-center skillupper" id="statusBar">
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
                                <Row id="targetTable">
                                    <Col xs="12" id="fullTable" style={{display:self.state.visibleLarge}}>
                                        <Row>
                                            <SkillTableSH list={self.state.skillTable1} />
                                        </Row>
                                    </Col>
                                    <Col xs="12" className="scrhalf" id='halfTableLeft'
                                            style={{display:self.state.visibleLeft}}>
                                        <Row>
                                            <Col xs="12" className="text-center">
                                                <h4><b><span>{gtypeShort} </span>HOT SKILLS by <span id="nameTop1"></span></b></h4>
                                                Made by GITADORA.Info
                                            </Col>
                                        </Row>
                                        <Row>
                                            <SkillTableSH list={self.state.skillTable1} />
                                        </Row>
                                    </Col>
                                    <Col xs="12" className="scrhalf" id='halfTableRight'
                                            style={{display:self.state.visibleRight}}>
                                        <Row>
                                            <Col xs="12" className="text-center">
                                                <h4><b><span>{gtypeShort} </span>OTHER SKILLS by <span id="nameTop2"></span></b></h4>
                                                Made by GITADORA.Info
                                            </Col>
                                        </Row>
                                        <Row>
                                            <SkillTableSH list={self.state.skillTable2} />
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <div id="skillEmpty" class="col-12 text-center"></div>
                </Row> 
                <Row className="text-center">
                    <Pager />
                </Row>
            </Container>
        )
    }
}

export default SkillSH;