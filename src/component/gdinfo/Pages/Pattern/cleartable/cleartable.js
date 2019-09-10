import React, {Component} from 'react';
import axios from 'axios';
import ClearTableRow from './tableRow';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';
import commonData from '../../Common/commonData';

class ClearTable extends Component {
    state = {
        glist: [],
        dlist: [],
        username: "",
        profilelink: "",
        titletower: "",
        iconOn: false
    }

    componentDidMount() {
        this.loadUserData(this.props);
        this.loadTableData(this.props, "gf");
        this.loadTableData(this.props, "dm");
    }

    loadUserData(prop) {
        axios.post(commonData.commonDataURL+"getuserid/"+prop.match.params.userid)
        .then((res) => {
            const json = res.data.mydata;
            const icon = (json.titletower !== "") ? true:false;
            this.setState({
                username: json.name,
                profilelink: "/profile"+prop.match.params.userid,
                titletower: json.titletower,
                iconOn: icon
            });
        })
    }

    loadTableData(prop, type) {
        axios.post(commonData.commonDataURL+"cleartable/"+type+"/"+prop.match.params.userid)
        .then((res) => {
            const json = res.data.ctable;
            const gval = [ 0, 0, 0, 0, 0, 0, 0, 0];
            const clearlist = [];

            for(let i = 0; i < 19; i++) {
                const obj = {};
                if(i < 18) {
                    obj.exc = json.patternCount["EXC"][i];
                    obj.ss = json.patternCount["SS"][i];
                    obj.s = json.patternCount["S"][i];
                    obj.a = json.patternCount["A"][i];
                    obj.b = json.patternCount["B"][i];
                    obj.c = json.patternCount["C"][i];
                    obj.f = json.patternCount["F"][i];
                    obj.all = json.totalPatternCount[i];

                    gval[0] += obj.exc;
                    gval[1] += obj.ss;
                    gval[2] += obj.s;
                    gval[3] += obj.a;
                    gval[4] += obj.b;
                    gval[5] += obj.c;
                    gval[6] += obj.f;
                    gval[7] += obj.all;

                    obj.n = obj.all-obj.exc-obj.ss-obj.s-obj.a-obj.b-obj.c-obj.f;

                    switch(i) {
                        case 0: obj.level = '1.00~'; break;
                        case 1: obj.level = '1.50~'; break;
                        case 2: obj.level = '2.00~'; break;
                        case 3: obj.level = '2.50~'; break;
                        case 4: obj.level = '3.00~'; break;
                        case 5: obj.level = '3.50~'; break;
                        case 6: obj.level = '4.00~'; break;
                        case 7: obj.level = '4.50~'; break;
                        case 8: obj.level = '5.00~'; break;
                        case 9: obj.level = '5.50~'; break;
                        case 10: obj.level = '6.00~'; break;
                        case 11: obj.level = '6.50~'; break;
                        case 12: obj.level = '7.00~'; break;
                        case 13: obj.level = '7.50~'; break;
                        case 14: obj.level = '8.00~'; break;
                        case 15: obj.level = '8.50~'; break;
                        case 16: obj.level = '9.00~'; break;
                        case 17: obj.level = '9.50~'; break;
                    }

                    clearlist.push(obj);
                }
                else {
                    obj.level = 'Total';
                    
                    obj.exc = gval[0];
                    obj.ss = gval[1];
                    obj.s = gval[2];
                    obj.a = gval[3];
                    obj.b = gval[4];
                    obj.c = gval[5];
                    obj.f = gval[6];
                    obj.all = gval[7];
                    obj.n = gval[7] - gval[0] - gval[1] - gval[2] - gval[3] - gval[4] - gval[5] - gval[6];
                    
                    clearlist.push(obj);
                }
            }

            if(type === "gf") {
                this.setState({
                    glist: clearlist
                });
            }
            else {
                this.setState({
                    dlist: clearlist
                });
            }
        });
    }

    render() {
        const self = this;
        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Clear Status Table</h3>
                            </CardHeader>
                            <CardBody id="profile" className="text-center">
                                <a href={self.state.profilelink} className='innerhref'
                                    style={{fontSize:"130%"}}>
                                        {
                                            (function() {
                                                if(self.state.iconOn) {
                                                    return <img alt="titletower"
                                                        src={process.env.PUBLIC_URL+"/general-img/title/"+self.state.titletower+".png"} />
                                                }
                                            })()
                                        }
                                    {self.state.username} ⓟ
                                </a>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {/* Rank table for GF */}
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>GuitarFreaks</h3>
                            </CardHeader>
                            <CardBody>
                                <div class="div-table" id="gcleartable">
                                    <div class="div-table-header">
                                        <div class="div-table-cell">Rank</div>
                                        <div class="div-table-cell">EXC</div>
                                        <div class="div-table-cell">SS</div>
                                        <div class="div-table-cell">S</div>
                                        <div class="div-table-cell">A</div>
                                        <div class="div-table-cell">B</div>
                                        <div class="div-table-cell">C</div>
                                        <div class="div-table-cell">Failed</div>
                                        <div class="div-table-cell">NoPlay</div>
                                        <div class="div-table-cell">Total</div>
                                    </div>
                                    <ClearTableRow list={self.state.glist} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {/* Rank table for DM */}
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>DrumMania</h3>
                            </CardHeader>
                            <CardBody>
                                <div class="div-table" id="dcleartable">
                                    <div class="div-table-header">
                                        <div class="div-table-cell">Rank</div>
                                        <div class="div-table-cell">EXC</div>
                                        <div class="div-table-cell">SS</div>
                                        <div class="div-table-cell">S</div>
                                        <div class="div-table-cell">A</div>
                                        <div class="div-table-cell">B</div>
                                        <div class="div-table-cell">C</div>
                                        <div class="div-table-cell">Failed</div>
                                        <div class="div-table-cell">NoPlay</div>
                                        <div class="div-table-cell">Total</div>
                                    </div>
                                    <ClearTableRow list={self.state.dlist} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ClearTable;