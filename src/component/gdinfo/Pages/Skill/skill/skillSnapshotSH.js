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

const lang = LData.lang;

class SkillSnapshotSH extends Component {
    state = {
        skillTable1: [],
        skillTable2: [],
        sum1: 0,
        sum2: 0
    }

    componentDidMount() {
        this.loadSnapshotData(this.props);
    }

    loadSnapshotData(prop) {
        const urlprop = prop.match.params;

        let sum1 = 0;
        let sum2 = 0;
        const hotList = [];
        const otherList = [];

        axios.post(commonData.commonDataURL+"skill/snapshot/load/"+urlprop.id+"/"+urlprop.date+"/"+urlprop.gtype)
        .then((res) => {
            const json = res.data;

            let hsize = json.hot.length;
            if(json.hot.length > 25) hsize = 25;
            
            let osize = json.oth.length;
            if(json.oth.length > 25) osize = 25;
            
            if(json.hot.length > 0) {
                for(let i = 0; i < hsize; i++) {
                    const cur = json.hot[i];

                    const newData = {
                        musicid: cur.mid,
                        mname: cur.mname,
                        patterncode: cur.ptcode,
                        version: cur.version,
                        level: cur.lv,
                        rate: cur.rate,
                        skill: cur.skill,
                        rank: cur.rank,
                        checkfc: cur.fc,
                        meter: cur.meter,
                        playtime: 1,
                        combo: 1
                    };

                    const obj = skillMethod.generateTable(prop, newData, i, 1);

                    sum1 += newData.skill;
                    hotList.push(obj);
                }
            }
            if(json.oth.length > 0) {
                for(let i = 0; i < osize; i++) {
                    const cur = json.oth[i];

                    const newData = {
                        musicid: cur.mid,
                        mname: cur.mname,
                        patterncode: cur.ptcode,
                        version: cur.version,
                        level: cur.lv,
                        rate: cur.rate,
                        skill: cur.skill,
                        rank: cur.rank,
                        checkfc: cur.fc,
                        meter: cur.meter,
                        playtime: 1,
                        combo: 1
                    };

                    const obj = skillMethod.generateTable(prop, newData, i, 2);

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
                                        <Button style={{width:"100%"}} href="#no_div" onClick={() => scrShot("scrTable", urlprop.userid+"_"+urlprop.gtype+"_all_"+urlprop.time+".jpg")}>
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
                                        <h4><b>Snapshot Of {gtypeLong}<br/>
                                            <span>Skill by <span id="nameTop"></span></span>
                                        </b></h4>
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
                                    <Col xs="12" className="scrhalf" id='halfTableLeft'
                                            style={{display:self.state.visibleLeft}}>
                                        <Row>
                                            <Col xs="12" className="text-center">
                                                <h4><b><span>{gtypeLong} </span>HOT SKILLS by <span id="nameTop1"></span></b></h4>
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
                                                <h4><b><span>{gtypeLong} </span>OTHER SKILLS by <span id="nameTop2"></span></b></h4>
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
            </Container>
        )
    }
}

export default SkillSnapshotSH;