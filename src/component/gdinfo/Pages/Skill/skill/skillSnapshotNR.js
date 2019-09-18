import React, {Component} from 'react';
import axios from 'axios';
import txtSkill from './txtskill';
import SkillTableNR from './skillTableNR';
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

class SkillSnapshotNR extends Component {
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
                        rank: "EXC",
                        checkfc: "Y",
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
                        rank: "EXC",
                        checkfc: "Y",
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
                                <h3>Skill Table</h3>
                            </CardHeader>
                            <CardBody id="scrshotdiv">
                                {/*<span id='gtype' th:attr='data-gtype=${gtype}'></span>*/}
                                <Col xs="12" className="text-center">
                                    <h4>Screenshot</h4>
                                </Col>
                                <Col xs="12" style={{width:"100%"}} className="btn-group">
                                    <Button style={{width:"100%"}} href="#no_div"
                                        onClick={() => scrShot("scrTable", urlprop.id+"_"+urlprop.gtype+"_all_"+urlprop.time+".jpg")}>
                                        {txtSkill.scrshot[lang]}
                                    </Button>
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Card id='scrTable'>
                    <CardHeader>
                        <Row id="targetInfo">
                            <Col xs="12" className="text-center">
                                <h4><b>Snapshot Of {gtypeLong}<br/>
                                    <span>Skill by <span id="nameTop"></span></span>
                                </b></h4>
                            </Col>
                            <Col xs="6" style={{textAlign:"center"}}>
                                <b>Made by GITADORA.info</b>
                            </Col>
                            <Col xs="6" style={{textAlign:"center"}}>
                                Saved Date: <span id="timeTop"></span>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row className="skillupper blackandwhite text-center" id="statusBar">
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
                            <Col sm="6" id="halfTableLeft">
                                <Row>
                                    <Col xs="12" className="text-center">
                                        <h2><b>HOT</b></h2>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <div className='div-table'
                                            style={{paddingBottom:"100px"}}>
                                            <SkillTableNR list={self.state.skillTable1} />
                                        </div>
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
                                    <Col xs="12">
                                        <div class='div-table'>
                                            <SkillTableNR list={self.state.skillTable2} />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        )
    }
}

export default SkillSnapshotNR;