import React, {Component} from 'react';
import LData from '../../../js/language';
import txtPlayCount from './txtplaycount';
import CountTable from './countTable';
import axios from 'axios';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    Button
} from 'reactstrap';

const lang = LData.lang;
const URL = "http://test.gitadora.info:8080/d/";

class PlayCount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plist: [],
            glist: [],
            dlist: [],
            mlist: [],
            dataReady: false,
            username: "",
            towertitle: "",
            display0: "none",
            display1: "block",
            display2: "none",
            display3: "none"
        }
    }

    getPatternImg600(ptcode) {
        switch(ptcode) {
            case 1:
                return process.env.PUBLIC_URL+"/general-img/diff/basg_600.png";
            case 2:
                return process.env.PUBLIC_URL+"/general-img/diff/advg_600.png";
            case 3:
                return process.env.PUBLIC_URL+"/general-img/diff/extg_600.png";
            case 4:
                return process.env.PUBLIC_URL+"/general-img/diff/masg_600.png";
            case 5:
                return process.env.PUBLIC_URL+"/general-img/diff/basb_600.png";
            case 6:
                return process.env.PUBLIC_URL+"/general-img/diff/advb_600.png";
            case 7:
                return process.env.PUBLIC_URL+"/general-img/diff/extb_600.png";
            case 8:
                return process.env.PUBLIC_URL+"/general-img/diff/masb_600.png";
            case 9:
                return process.env.PUBLIC_URL+"/general-img/diff/basd_600.png";
            case 10:
                return process.env.PUBLIC_URL+"/general-img/diff/advd_600.png";
            case 11:
                return process.env.PUBLIC_URL+"/general-img/diff/extd_600.png";
            case 12:
                return process.env.PUBLIC_URL+"/general-img/diff/masd_600.png";
            default:
                return "";
        }
    }

    componentDidMount() {
        axios.post(URL+"getuserid/"+this.props.match.params.id)
        .then((res) => {
            this.setState({
                username: res.data.mydata.name,
                towertitle: res.data.mydata.titletower
            });
        });
        axios.post(URL+"mybest/"+this.props.match.params.id)
        .then((res) => {
            const json = res.data;

            const plist = [];
            const glist = [];
            const dlist = [];
            const mlist = [];

            for(var i = 0; i < json.mybestp.length; i++) {
                var mypdata = {
                    key: 'p'+i,
                    number: i+1,
                    jacket: 'https://gitadora.info/img/music/'+json.mybestp[i].id+'.jpg',
                    name: json.mybestp[i].name,
                    pattern: "",
                    count: json.mybestp[i].playtime,
                    countstr: txtPlayCount.table.time[lang]
                };
                mypdata.pattern = this.getPatternImg600(json.mybestp[i].patterncode);
                plist.push(mypdata);
            }

            for(var i = 0; i < json.mybestpg.length; i++) {
                var mygdata = {
                    key: 'g'+i,
                    number: i+1,
                    jacket: 'https://gitadora.info/img/music/'+json.mybestpg[i].id+'.jpg',
                    name: json.mybestpg[i].name,
                    pattern: "",
                    count: json.mybestpg[i].playtime,
                    countstr: txtPlayCount.table.time[lang]
                };
                mygdata.pattern = this.getPatternImg600(json.mybestpg[i].patterncode);
                glist.push(mygdata);
            }
            
            for(var i = 0; i < json.mybestpd.length; i++) {
                var myddata = {
                    key: 'd'+i,
                    number: i+1,
                    jacket: 'https://gitadora.info/img/music/'+json.mybestpd[i].id+'.jpg',
                    name: json.mybestpd[i].name,
                    pattern: "",
                    count: json.mybestpd[i].playtime,
                    countstr: txtPlayCount.table.time[lang]
                };
                myddata.pattern = this.getPatternImg600(json.mybestpd[i].patterncode);
                dlist.push(myddata);
            }
            
            for(var i = 0; i < json.mybestm.length; i++) {
                var mymdata = {
                    key: 'm'+i,
                    number: i+1,
                    jacket: 'https://gitadora.info/img/music/'+json.mybestm[i].id+'.jpg',
                    name: json.mybestm[i].name,
                    pattern: "",
                    count: json.mybestm[i].playtime,
                    countstr: txtPlayCount.table.time[lang]
                };
                mlist.push(mymdata);
            }

            this.setState({
                plist: plist,
                glist: glist,
                dlist: dlist,
                mlist: mlist,
                dataReady: true,
                display0: "block",
                display1: "none",
                display2: "none",
                display3: "none"
            });
        });
    }

    scrShot() {

    }

    changeDiv(num) {
        switch(num) {
            case 0:
                this.setState({
                    display0: "block",
                    display1: "none",
                    display2: "none",
                    display3: "none"
                });
                break;
            case 1:
                this.setState({
                    display0: "none",
                    display1: "block",
                    display2: "none",
                    display3: "none"
                });
                break;
            case 2:
                this.setState({
                    display0: "none",
                    display1: "none",
                    display2: "block",
                    display3: "none"
                });
                break;
            case 3:
                this.setState({
                    display0: "none",
                    display1: "none",
                    display2: "none",
                    display3: "block"
                });
                break;
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Play Count</h3>
                            </CardHeader>
                            <CardBody className="text-center">
                                <Col xs="12">
                                    <Button style={{width:"100%"}} onClick={() => this.scrShot('#scrshot', '${id}_mybest.jpg')}>
                                        {txtPlayCount.button.scrshot[lang]}
                                    </Button>
                                </Col>
                                <Col xs="12">
                                    {txtPlayCount.desc_1[lang]}
                                    <font color="red">{txtPlayCount.desc_2[lang]}</font>
                                    {txtPlayCount.desc_3[lang]}
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row id="scrshot">
                    <Col xs="12">
                        <Card>
                            <CardHeader className="text-center" id="userinfo">
                                <h4>Most Played List</h4>
                                <span>Player: <img style={{width:"30px"}} src={process.env.PUBLIC_URL+"/general-img/title/"+this.state.towertitle+".png"} />{this.state.username}</span>
                            </CardHeader>
                            <CardBody>
                                <CardTitle>
                                    <Row>
                                        <Col xs="12" className="btn-group btn-group-justified" role='group'>
                                            <Button style={{width:"100%"}} onClick={() => this.changeDiv(0)}>
                                                {txtPlayCount.button.pt[lang]}
                                            </Button>
                                            <Button style={{width:"100%"}} onClick={() => this.changeDiv(1)}>
                                                {txtPlayCount.button.music[lang]}
                                            </Button>
                                        </Col>
                                        <Col xs="12" className="btn-group btn-group-justified" role='group'>
                                            <Button style={{width:"100%"}} onClick={() => this.changeDiv(2)}>
                                                {txtPlayCount.button.gf[lang]}
                                            </Button>
                                            <Button style={{width:"100%"}} onClick={() => this.changeDiv(3)}>
                                                {txtPlayCount.button.dm[lang]}
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardTitle>
                                <CardText>
                                    <Row>
                                        <Col xs="12" style={{display:this.state.display0}}>
                                            <CountTable data={this.state.plist}></CountTable> {/*AllPattern*/}
                                        </Col>
                                        <Col xs="12" style={{display:this.state.display1}}>
                                            <CountTable data={this.state.mlist}></CountTable> {/*GF*/}
                                        </Col>
                                        <Col xs="12" style={{display:this.state.display2}}>
                                            <CountTable data={this.state.glist}></CountTable> {/*DM*/}
                                        </Col>
                                        <Col xs="12" style={{display:this.state.display3}}>
                                            <CountTable data={this.state.dlist}></CountTable> {/*Music*/}
                                        </Col>
                                    </Row>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default PlayCount;