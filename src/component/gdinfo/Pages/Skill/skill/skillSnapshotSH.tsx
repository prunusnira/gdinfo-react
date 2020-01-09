import React, {Component} from 'react';
import axios from 'axios';
import txtSkill from './txtskill';
import SkillTableSH from './skillTableSH';
import * as skillMethod from './skillMethod';
import LData from '../../Common/language';
import scrShot from '../../Common/scrshot';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button
} from 'reactstrap';
import commonData from '../../Common/commonData';
import SkillTableData from './skillTableData';
import { RouteComponentProps } from 'react-router-dom';
import SkillDBData from './skillDBData';

interface IMatchProps {
    userid: string,
    date: string,
    gtype: string,
    time: string
}

interface State {
    statLeftTitle: string,
    statLeft: string,
    statMidTitle: string,
    statMid: string,
    statRightTitle: string,
    statRight: string,
    skillTable1: Array<SkillTableData>,
    skillTable2: Array<SkillTableData>,
    sum1: number,
    sum2: number,
    visibleLeft: string,
    visibleRight: string
}

class SkillSnapshotSH extends Component<RouteComponentProps<IMatchProps>, State> {
    lang = LData.lang;

    state: State = {
        statLeftTitle: "",
        statLeft: "",
        statMidTitle: "",
        statMid: '',
        statRightTitle: "",
        statRight: "",
        skillTable1: [],
        skillTable2: [],
        sum1: 0,
        sum2: 0,
        visibleLeft: "block",
        visibleRight: "block"
    }

    componentDidMount() {
        this.loadSnapshotData(this.props);
    }

    loadSnapshotData(prop: RouteComponentProps<IMatchProps>) {
        const urlprop = prop.match.params;

        let sum1 = 0;
        let sum2 = 0;
        const hotList = new Array<SkillTableData>();
        const otherList = new Array<SkillTableData>();

        axios.post(commonData.commonDataURL+"skill/snapshot/load/"+urlprop.userid+"/"+urlprop.date+"/"+urlprop.gtype)
        .then((res) => {
            const json = res.data;

            let hsize = json.hot.length;
            if(json.hot.length > 25) hsize = 25;
            
            let osize = json.oth.length;
            if(json.oth.length > 25) osize = 25;
            
            if(json.hot.length > 0) {
                for(let i = 0; i < hsize; i++) {
                    const cur = json.hot[i];

                    const newData: SkillDBData = {
                        musicid: cur.mid,
                        mname: cur.mname,
                        patterncode: cur.ptcode,
                        version: cur.version,
                        level: cur.lv,
                        rate: cur.rate,
                        ratetb: cur.ratetb,
                        ratetbre: cur.ratetbre,
                        ratemx: cur.ratemx,
                        rateex: cur.rateex,
                        skill: cur.skill,
                        rank: cur.rank,
                        checkfc: cur.fc,
                        meter: cur.meter,
                        playtime: 1,
                        combo: 1
                    };

                    const obj = skillMethod.generalTable(urlprop.userid, newData, i, 1);

                    sum1 += newData.skill;
                    hotList.push(obj);
                }
            }
            if(json.oth.length > 0) {
                for(let i = 0; i < osize; i++) {
                    const cur = json.oth[i];

                    const newData: SkillDBData = {
                        musicid: cur.mid,
                        mname: cur.mname,
                        patterncode: cur.ptcode,
                        version: cur.version,
                        level: cur.lv,
                        rate: cur.rate,
                        ratetb: cur.ratetb,
                        ratetbre: cur.ratetbre,
                        ratemx: cur.ratemx,
                        rateex: cur.rateex,
                        skill: cur.skill,
                        rank: cur.rank,
                        checkfc: cur.fc,
                        meter: cur.meter,
                        playtime: 1,
                        combo: 1
                    };

                    const obj = skillMethod.generalTable(urlprop.userid, newData, i, 2);

                    sum2 += newData.skill;
                    otherList.push(obj);
                }
            }

            this.setState({
                skillTable1: hotList,
                skillTable2: otherList,
                statMid: sum1.toFixed(2),
                statRight: sum2.toFixed(2),
                statLeft: (sum1+sum2).toFixed(2),
                statLeftTitle: "Total Skill",
                statMidTitle: "Hot Skill",
                statRightTitle: "Other Skill"
            });
        });
    }

    render() {
        const self = this;
        const urlprop = this.props.match.params;
        const gtype = urlprop.gtype;

        let gtypeLong = "";
        if(gtype == "gf") gtypeLong = "GuitarFreaks";
        else gtypeLong = "DrumMania";

        return (
            <Container fluid={true}>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Skill {(txtSkill.scrtitle as any)[this.lang]}</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                        {(txtSkill.scrdesc as any)[this.lang]}
                                    </Col>
                                    <Col xs="12" className="btn-group" id="prevlink">
                                        <Button style={{width:"100%"}} href="#no_div" onClick={() => scrShot("scrTable", urlprop.userid+"_"+urlprop.gtype+"_all_"+urlprop.time+".jpg")}>
                                            {(txtSkill.scrshot as any)[this.lang]}
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
                                        <h4><b>Snapshot Of {gtypeLong}<br/>
                                            <span>Skill by <span id="nameTop"></span></span>
                                        </b></h4>
                                        <b>Made by SIN</b>
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
                                    <Col xs="12" className="scrhalf" id='halfTableLeft'
                                            style={{display:self.state.visibleLeft}}>
                                        <Row>
                                            <Col xs="12" className="text-center">
                                                <h4><b><span>{gtypeLong} </span>HOT SKILLS by <span id="nameTop1"></span></b></h4>
                                                Made by Skill Navigator (sin.nira.one)
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
                                                <h4><b><span>{gtypeLong} </span>OTHER SKILLS by <span id="nameTop2"></span></b></h4>
                                                Made by Skill Navigator (sin.nira.one)
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
            </Container>
        )
    }
}

export default SkillSnapshotSH;