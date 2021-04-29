import React, {Component, Fragment} from 'react';
import {Link, Redirect, RouteComponentProps} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import Pager from '../../Common/pager';
import SkillTableNR from './skillTableNR';
import SkillMenu from './skillMenu';
import txtSkill from './txtskill';
import LData from '../../Common/language';
import CommonData from '../../Common/commonData';
import './skill.css';
import '../../Common/table.css';
import {LoginInfo} from '../../../Redux/action';
import * as time from '../../Common/time';
import * as skillMethod from './skillMethod';
import scrShot from '../../Common/scrshot';
import { skillPageVersion } from '../../Common/version';

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
import ProfileData from '../../Profiles/profile/profileData';
import { StoreState } from '../../../Redux/reducer';
import SkillTableData from './skillTableData';

interface IMatchPrpos {
    order: string,
    ptype: string,
    userid: string,
    gtype: string,
    page: string
}

interface Props {
    userinfo: LoginInfo
}

interface State {
    sum1: number,
    sum2: number,
    menuVisible: string,
    switchver: boolean,
    nextver: string,
    switchrank: boolean,
    nextrank: string,
    switchname: boolean,
    nextname: string,
    switchorder: boolean,
    nextorder: string,
    user: ProfileData,
    self: boolean,
    updatetime: string,
    statLeftTitle: string,
    statLeft: string,
    statMidTitle: string,
    statMid: string,
    statRightTitle: string,
    statRight: string,
    skillTable1: Array<SkillTableData>,
    skillTable2: Array<SkillTableData>,
    allpage: number,
    visibleLarge: string,
    visibleLeft: string,
    visibleRight: string,
    query: any
}

class SkillNR extends Component<RouteComponentProps<IMatchPrpos> & Props, State> {
    lang = LData.lang;

    // 기본 props 정리
    /**
     * this.props.match.params
     * 1. ptype
     * 2. userid
     * 3. gtype
     * 4. page
     * 5. order
     */
    constructor(props: RouteComponentProps<IMatchPrpos> & Props) {
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
            user: new ProfileData(),
            query: {
                lv: getparams.get("lv"),
                rank: getparams.get("rank"),
                ver: getparams.get("ver"),
                hot: getparams.get("hot")
            },
            visibleLarge: "none",
            visibleLeft: "none",
            visibleRight: "none",
            allpage: 0,
            menuVisible: "none",
            self: false,
            
            // switch
            switchver: false,
            switchrank: false,
            switchname: false,
            switchorder: false,
            nextver: "",
            nextrank: "",
            nextname: "",
            nextorder: "",
            updatetime: ""
        }

        this.switchVer = this.switchVer.bind(this);
        this.switchRank = this.switchRank.bind(this);
        this.switchName = this.switchName.bind(this);
    }

    componentDidMount() {
        this.skillTableImport(this.props);
        skillMethod.updatePType(this.props.location.search, this);

        const urlprop = this.props.match.params;
        switch(parseInt(urlprop.ptype)) {
            case 0:
            case 1:
            case 3:
            case 5:
            case 7:
            case 9:
                this.setState({
                    visibleLarge: "block"
                });
                break;
            case 2:
            case 4:
            case 6:
            case 8:
            case 10:
            case 12:
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

    componentWillReceiveProps(nextProps: RouteComponentProps<IMatchPrpos> & Props) {
        this.resetSwitch();

        const urlprop = nextProps.match.params;

        this.skillTableImport(nextProps);
        skillMethod.updatePType(nextProps.location.search, this);

        switch(parseInt(urlprop.ptype)) {
            case 0:
            case 1:
            case 3:
            case 5:
            case 7:
            case 9:
            case 11:
                this.setState({
                    visibleLarge: "block",
                    visibleLeft: "none",
                    visibleRight: "none"
                });
                break;
            case 2:
            case 4:
            case 6:
            case 8:
            case 10:
            case 12:
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

    userInfoImport(props: RouteComponentProps<IMatchPrpos> & Props) {
        const urlprop = props.match.params;

        let self = false;
        if(urlprop.userid === props.userinfo.id) {
            self = true;
        }

        axios.post(CommonData.dataUrl+"getuserid/"+props.match.params.userid)
        .then((res) => {
            const json = JSON.parse(res.data.mydata);

            let statLeftTitle = "";
            let statMidTitle = "";
            let statRightTitle = "";

            let statLeft = "";
            let statMid = "";
            let statRight = "";

            const user = new ProfileData();
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
                case 5:
                case 7:
                case 9:
                case 11:
                    statMidTitle = "Order";

                    switch(urlprop.order) {
                    case "skillasc":
                        statMid = (txtSkill.order.skillasc as any)[this.lang];
                        break;
                    case "skilldesc":
                        statMid = (txtSkill.order.skilldesc as any)[this.lang];
                        break;
                    case "titleasc":
                        statMid = (txtSkill.order.titleasc as any)[this.lang];
                        break;
                    case "titledesc":
                        statMid = (txtSkill.order.titledesc as any)[this.lang];
                        break;
                    case "verasc":
                        statMid = (txtSkill.order.verasc as any)[this.lang];
                        break;
                    case "verdesc":
                        statMid = (txtSkill.order.verdesc as any)[this.lang];
                        break;
                    case "rateasc":
                        statMid = (txtSkill.order.rateasc as any)[this.lang];
                        break;
                    case "ratedesc":
                        statMid = (txtSkill.order.ratedesc as any)[this.lang];
                        break;
                    case "playtime":
                        statMid = (txtSkill.order.playdesc as any)[this.lang];
                        break;
                    default:
                        break;
                    }

                    statRightTitle = "Recent Update";
                    statRight = time.unixTimeConverter(json.updatetime);
                    break;
                case 2:
                case 4:
                case 6:
                case 8:
                case 10:
                case 12:
                    statMidTitle = "Hot Skill";
                    statRightTitle = "Other Skill";
                    statMid = this.state.sum1.toFixed(2);
					statRight = this.state.sum2.toFixed(2);
                    break;
                case 1:
                    if(this.state.query.hot === "h") {
                        statMidTitle = "Hot Total";
                    }
                    else if(this.state.query.hot === "o") {
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

            const updtime = json !== null ? json.updatetime : new Date().getTime();

            this.setState({
                statLeftTitle: statLeftTitle,
                statLeft: statLeft,
                statMidTitle: statMidTitle,
                statMid: statMid,
                statRightTitle: statRightTitle,
                statRight: statRight,
                user: user,
                self: self,
                updatetime: time.unixTimeConverter(updtime)
            });
        });
    }

    skillTableImport(props: RouteComponentProps<IMatchPrpos> & Props) {
        const urlprops = props.match.params;
        const ajaxurl = CommonData.dataUrl+skillMethod.generateURL(props.location.search,
                                                    urlprops.ptype, urlprops.gtype, urlprops.page, urlprops.order, urlprops.userid);
        axios.post(ajaxurl)
        .then((res) => {
            const json = res.data;
            let sum1 = 0;
            let sum2 = 0;
            const skillList1 = [];
            const skillList2 = [];

            const skill = JSON.parse(json.skill);
            if(skill.length > 0) {
                for(let i = 0; i < skill.length; i++) {
                    const cur = skill[i];
                    let obj = skillMethod.generateTable(urlprops.userid, cur, i, json.page, urlprops.ptype, 0);

                    sum1 += obj.skill1;

                    skillList1.push(obj);
                }
            }

            const hskill = JSON.parse(json.hskill);
            if(hskill.length > 0) {
                for(let i = 0; i < hskill.length; i++) {
                    const cur = hskill[i];
                    let obj = skillMethod.generateTable(urlprops.userid, cur, i, json.page, urlprops.ptype, 1);

                    sum1 += obj.skill1;

                    skillList1.push(obj);
                }
            }

            const oskill = JSON.parse(json.oskill);
            if(oskill.length > 0) {
                for(let i = 0; i < oskill.length; i++) {
                    const cur = oskill[i];
                    let obj = skillMethod.generateTable(urlprops.userid, cur, i, json.page, urlprops.ptype, 2);

                    sum2 += obj.skill2;

                    skillList2.push(obj);
                }
            }
            
            const user = JSON.parse(json.user);
            const updtime = new Date(user.updatetime);
            const time = updtime.getFullYear() + "/" + (updtime.getMonth()+1) + "/" +
                updtime.getDate() + " " + updtime.getHours() + ":" + updtime.getMinutes();
            
            if(skill.length === 0 && hskill.length === 0 && oskill.length === 0) {
        //        isEmpty = true;
            }
            
            this.setState({
                skillTable1: skillList1,
                skillTable2: skillList2,
                updatetime: time,
                allpage: json.pages,
                sum1: sum1,
                sum2: sum2
            });
            
            this.userInfoImport(props);
        });
    }

    showMenu() {
        let visible = this.state.menuVisible;
        if(visible === "none") visible = "block";
        else visible = "none";

        this.setState({
            menuVisible: visible
        });
    }

    createSnapshot(userid: string, gtype: string) {
        axios.post(CommonData.dataUrl+"skill/snapshot/create/"+userid+"/"+gtype)
        .then((res) => {
            alert((txtSkill.snapshot.created as any)[this.lang]);
        });
    }

    switchVer(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            switchver: true,
            nextver: e.currentTarget.value
        });
    }

    switchRank(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            switchrank: true,
            nextrank: e.target.value
        });
    }

    switchName(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            switchname: true,
            nextname: e.target.value
        });
    }

    switchOrder(type: number) {
        const currentOrder = this.props.match.params.order;
        let next = currentOrder;
        if(type === 0) {
            if(currentOrder === "titleasc") next = "titledesc";
            else next = "titleasc";
        }
        if(type === 1) {
            if(currentOrder === "verasc") next = "verdesc";
            else next = "verasc";
        }

        this.setState({
            switchorder: true,
            nextorder: next
        });
    }

    resetSwitch() {
        this.setState({
            switchver: false,
            switchrank: false,
            switchname: false,
            switchorder: false
        });
    }

    render() {
        const self = this;
        const urlprop = this.props.match.params;
        const search = this.props.location.search;

        const pagetype = skillPageVersion(parseInt(urlprop.ptype));

        let gtype = "";
        if(urlprop.gtype === "gf") gtype = "GuitarFreaks";
        else gtype = "DrumMania"
        
        let desc = "";
        if(parseInt(urlprop.ptype) === 1000) desc = (txtSkill.exc as any)[this.lang];
        else desc = "Skill by ";

        let user = "";
        if(parseInt(urlprop.ptype) !== 1000) user = self.state.user.name; // (대충 사용자 이름 들어간다는 코멘트)
        // 유저 이름과 image 추가되어야 함
        
        if(this.state.switchver) {
            const exturl = new URLSearchParams(search)
            exturl.set("ver", this.state.nextver.toString());
            return <Redirect to={"/skill/0/"+urlprop.userid+"/"+urlprop.gtype+"/"+urlprop.page+"/"+urlprop.order+"?"+exturl.toString()} />
        }
        if(this.state.switchrank) {
            const exturl = new URLSearchParams(search)
            exturl.set("rank", this.state.nextrank);
            return <Redirect to={"/skill/0/"+urlprop.userid+"/"+urlprop.gtype+"/"+urlprop.page+"/"+urlprop.order+"?"+exturl.toString()} />
        }
        if(this.state.switchname) {
            const exturl = new URLSearchParams(search)
            exturl.set("name", this.state.nextname);
            return <Redirect to={"/skill/0/"+urlprop.userid+"/"+urlprop.gtype+"/"+urlprop.page+"/"+urlprop.order+"?"+exturl.toString()} />
        }
        if(this.state.switchorder) {
            return <Redirect to={"/skill/0/"+urlprop.userid+"/"+urlprop.gtype+"/"+urlprop.page+"/"+this.state.nextorder+search} />
        }
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
                                    <Button style={{width:"100%"}} tag={Link}
                                        to={"/skillscr/"+urlprop.ptype+"/"+urlprop.userid+"/"+
                                            urlprop.gtype+"/"+urlprop.page+"/"+urlprop.order+search}>
                                        {(txtSkill.scrshotp as any)[this.lang]}
                                    </Button>
                                    <Button style={{width:"100%"}} onClick={() => scrShot("scrTable", urlprop.userid+'_'+urlprop.gtype+'_all_'+urlprop.page+'_'+time.getTimeScr()+'.jpg')}>
                                        {(txtSkill.scrshot as any)[this.lang]}
                                    </Button>
                                </Col>
                                {
                                    // 본인 계정인 경우 snapshot 생성
                                    (function() {
                                        if(self.state.self) {
                                            return (
                                                <Col xs="12">
                                                    <Button style={{width:"100%"}} onClick={() => self.createSnapshot(urlprop.userid, urlprop.gtype)}>
                                                        {(txtSkill.snapshot.button as any)[self.lang]}
                                                    </Button>
                                                </Col>
                                            )
                                        }
                                    })()
                                }
                            </CardBody>
                            <CardBody>
                                <Row>
                                    <Col xs="12" className="text-center">
                                        <a className="innerhref" href="#no_div" onClick={() => self.showMenu()}>
                                            Click to toggle Skill Menu
                                        </a>
                                    </Col>
                                    <Col xs="12" style={{display: self.state.menuVisible}}>
                                        <SkillMenu ptype={urlprop.ptype} id={urlprop.userid} />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {
                    // ptype 0일때만 출현하도록 함
                    (function() {
                        if(parseInt(urlprop.ptype) === 0) {
                            return (
                                <Row>
                                    <Col xs="12">
                                        <Card>
                                            <CardHeader>
                                                <h3>Search Options</h3>
                                            </CardHeader>
                                            <CardBody>
                                                <Row>
                                                    <Col xs="4">
                                                        <Row><Col xs="12" className="text-center">
                                                            Version
                                                        </Col></Row>
                                                        <Row><Col xs="12">
                                                            <select onChange={self.switchVer} className="form-control">
                                                                <option value="--">SELECT</option>
                                                                <option value="00">All</option>
                                                                <option value="01">GF1</option>
                                                                <option value="02">GF2dm1</option>
                                                                <option value="03">GF3dm2</option>
                                                                <option value="04">GF4dm3</option>
                                                                <option value="05">GF5dm4</option>
                                                                <option value="06">GF6dm5</option>
                                                                <option value="07">GF7dm6</option>
                                                                <option value="08">GF8dm7</option>
                                                                <option value="09">GF9dm8</option>
                                                                <option value="10">GF10dm9</option>
                                                                <option value="11">GF11dm10</option>
                                                                <option value="12">ee'mall</option>
                                                                <option value="13">V</option>
                                                                <option value="14">V2</option>
                                                                <option value="15">V3</option>
                                                                <option value="16">V4</option>
                                                                <option value="17">V5</option>
                                                                <option value="18">V6</option>
                                                                <option value="19">XG</option>
                                                                <option value="20">XG2</option>
                                                                <option value="21">XG3</option>
                                                                <option value="22">GD</option>
                                                                <option value="23">GD OD</option>
                                                                <option value="24">GD TB</option>
                                                                <option value="25">GD TBRE</option>
                                                                <option value="26">GD MX</option>
                                                                <option value="27">GD EX</option>
                                                                <option value="28">GD NX</option>
                                                            </select>
                                                        </Col></Row>
                                                    </Col>
                                                    <Col xs="4">
                                                        <Row><Col xs="12" className="text-center">
                                                            Rank
                                                        </Col></Row>
                                                        <Row><Col xs="12">
                                                            <select onChange={self.switchRank} className="form-control">
                                                                <option value="--">SELECT</option>
                                                                <option value="0">ALL</option>
                                                                <option value="9">EXC</option>
                                                                <option value="8">SS</option>
                                                                <option value="7">S</option>
                                                                <option value="6">A</option>
                                                                <option value="5">B</option>
                                                                <option value="4">C</option>
                                                                <option value="3">D</option>
                                                                <option value="2">E</option>
                                                                <option value="1">F</option>
                                                            </select>
                                                        </Col></Row>
                                                    </Col>
                                                    <Col xs="4">
                                                        <Row><Col xs="12" className="text-center">
                                                            Name
                                                        </Col></Row>
                                                        <Row><Col xs="12">
                                                            <select onChange={self.switchName} className="form-control">
                                                                <option value="-">SELECT</option>
                                                                <option value="0">ALL</option>
                                                                <option value="1">Number</option>
                                                                <option value="2">A</option>
                                                                <option value="3">B</option>
                                                                <option value="4">C</option>
                                                                <option value="5">D</option>
                                                                <option value="6">E</option>
                                                                <option value="7">F</option>
                                                                <option value="8">G</option>
                                                                <option value="9">H</option>
                                                                <option value="10">I</option>
                                                                <option value="11">J</option>
                                                                <option value="12">K</option>
                                                                <option value="13">L</option>
                                                                <option value="14">M</option>
                                                                <option value="15">N</option>
                                                                <option value="16">O</option>
                                                                <option value="17">P</option>
                                                                <option value="18">Q</option>
                                                                <option value="19">R</option>
                                                                <option value="20">S</option>
                                                                <option value="21">T</option>
                                                                <option value="22">U</option>
                                                                <option value="23">V</option>
                                                                <option value="24">W</option>
                                                                <option value="25">X</option>
                                                                <option value="26">Y</option>
                                                                <option value="27">Z</option>
                                                                <option value="28">あ</option>
                                                                <option value="29">か</option>
                                                                <option value="30">さ</option>
                                                                <option value="31">た</option>
                                                                <option value="32">な</option>
                                                                <option value="33">は</option>
                                                                <option value="34">ま</option>
                                                                <option value="35">や</option>
                                                                <option value="36">ら</option>
                                                                <option value="37">わ</option>
                                                            </select>
                                                        </Col></Row>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="12">
                                                        <Row><Col xs="12" className="text-center">
                                                            Order
                                                        </Col></Row>
                                                        <Row><Col xs="12" className="btn-group">
                                                            <Button onClick={() => self.switchOrder(0)}>{(txtSkill.filter.btn.title as any)[self.lang]} ▲/▼</Button>
                                                            <Button onClick={() => self.switchOrder(1)}>{(txtSkill.filter.btn.version as any)[self.lang]} ▲/▼</Button>
                                                        </Col></Row>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            )
                        }
                    })()
                }
                <Card id='scrTable'>
                    <CardHeader>
                        <Row id="targetInfo">
                            <Col xs="12" className="text-center">
                                <h4><b>GITADORA {pagetype}<br/>
                                {gtype} {desc} <Link className="innerhref" to={"/profile/"+urlprop.userid}>{user}</Link></b></h4>
                            </Col>
                            <Col xs="6" style={{textAlign:"center"}}>
                                <b>Made by SIN.nira.one</b>
                            </Col>
                            <Col xs="6" style={{textAlign:"center"}}>
                                Update Time: {self.state.updatetime}
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <CardTitle>
                            <Col xs="12" className="skillupper">
                                <Row className="blackandwhite text-center" id="statusBar">
                                        {
                                            (function() {
                                                if(urlprop.ptype === ('3' || '5' || '7' || '9' || '11')) {
                                                    return (
                                                        <Col xs="12">
                                                            <span style={{textAlign:"center"}}>
                                                                * {(txtSkill.oldver as any)[self.lang]}
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
                                    <SkillTableNR list={self.state.skillTable1} />
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
                                            <SkillTableNR list={self.state.skillTable1} />
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
                                            <SkillTableNR list={self.state.skillTable2} />
                                        </Fragment>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <div id="skillEmpty" style={{width:"100%", textAlign:"center"}}></div>
                        <Row className="text-center">
                            <Col xs="12">
                                <Pager
                                    cpage={parseInt(urlprop.page)}
                                    allpage={self.state.allpage}
                                    baseUrl={"/skill/"+urlprop.ptype+"/"+
                                        urlprop.userid+"/"+
                                        urlprop.gtype+"/"}
                                    afterUrl={"/"+urlprop.order+search} />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        )
    }
}

const mapStateToProps = (state: StoreState) => {
    return {
        userinfo: state.loginReducer.userinfo,
        login: state.loginReducer.login
    }
};

export default connect(mapStateToProps)(SkillNR);