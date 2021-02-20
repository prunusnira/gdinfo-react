import React, {Component} from 'react';
import LData from '../../Common/language';
import txtPlayCount from './txtplaycount';
import CountTable from './countTable';
import axios from 'axios';
import {getPatternImg600} from '../../Common/pattern';
import scrShot from '../../Common/scrshot';

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
import CommonData from '../../Common/commonData';
import { RouteComponentProps } from 'react-router-dom';
import PlaycountData from './playcountData';
import { CountBtnType1, CountBtnType2 } from './countBtnOnTop';

interface IMatchProps {
    id: string
}

interface Props {

}

interface State {
    plist: Array<PlaycountData>,
    glist: Array<PlaycountData>,
    dlist: Array<PlaycountData>,
    mlist: Array<PlaycountData>,
    dataReady: boolean,
    username: string,
    towertitle: string,
    display0: string,
    display1: string,
    display2: string,
    display3: string
}

class PlayCount extends Component<RouteComponentProps<IMatchProps> & Props, State> {
    lang = LData.lang;

    constructor(props: RouteComponentProps<IMatchProps> & Props) {
        super(props);
        this.changeDiv = this.changeDiv.bind(this);
    }

    state: State = {
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

    componentDidMount() {
        axios.post(CommonData.dataUrl+"getuserid/"+this.props.match.params.id)
        .then((res) => {
            this.setState({
                username: res.data.mydata.name,
                towertitle: res.data.mydata.titletower
            });
        });
        axios.post(CommonData.dataUrl+"mybest/"+this.props.match.params.id)
        .then((res) => {
            const json = res.data;

            const mybestp = JSON.parse(json.mybestp);
            const mybestpg = JSON.parse(json.mybestpg);
            const mybestpd = JSON.parse(json.mybestpd);
            const mybestm = JSON.parse(json.mybestm);

            const plist = [];
            const glist = [];
            const dlist = [];
            const mlist = [];

            for(let i = 0; i < mybestp.length; i++) {
                const mypdata: PlaycountData = {
                    key: 'p'+i,
                    number: i+1,
                    jacket: CommonData.jacketUrl+mybestp[i].id+'.jpg',
                    name: mybestp[i].name,
                    pattern: "",
                    count: mybestp[i].playtime
                };
                mypdata.pattern = getPatternImg600(mybestp[i].patterncode);
                plist.push(mypdata);
            }

            for(let i = 0; i < mybestpg.length; i++) {
                const mygdata: PlaycountData = {
                    key: 'g'+i,
                    number: i+1,
                    jacket: CommonData.jacketUrl+mybestpg[i].id+'.jpg',
                    name: mybestpg[i].name,
                    pattern: "",
                    count: mybestpg[i].playtime
                };
                mygdata.pattern = getPatternImg600(mybestpg[i].patterncode);
                glist.push(mygdata);
            }
            
            for(let i = 0; i < mybestpd.length; i++) {
                const myddata: PlaycountData = {
                    key: 'd'+i,
                    number: i+1,
                    jacket: CommonData.jacketUrl+mybestpd[i].id+'.jpg',
                    name: mybestpd[i].name,
                    pattern: "",
                    count: mybestpd[i].playtime
                };
                myddata.pattern = getPatternImg600(mybestpd[i].patterncode);
                dlist.push(myddata);
            }
            
            for(let i = 0; i < mybestm.length; i++) {
                const mymdata: PlaycountData = {
                    key: 'm'+i,
                    number: i+1,
                    jacket: CommonData.jacketUrl+mybestm[i].id+'.jpg',
                    name: mybestm[i].name,
                    pattern: "",
                    count: mybestm[i].playtime
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

    changeDiv(num: number) {
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
            default:
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
                                    <Button style={{width:"100%"}} onClick={() => scrShot("scrshot", this.props.match.params.id+"_mybest.jpg")}>
                                        {(txtPlayCount.button.scrshot as any)[this.lang]}
                                    </Button>
                                </Col>
                                <Col xs="12">
                                    {(txtPlayCount.desc_1 as any)[this.lang]}
                                    <span style={{color:"red"}}>
                                        {(txtPlayCount.desc_2 as any)[this.lang]}
                                    </span>
                                    {(txtPlayCount.desc_3 as any)[this.lang]}
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
                                <span>Player: <img alt="titletower" style={{width:"30px"}} src={process.env.PUBLIC_URL+"/general-img/title/"+this.state.towertitle+".png"} />{this.state.username}</span>
                            </CardHeader>
                            <CardBody>
                                <CardTitle>
                                    {/* under large size */}
                                    <Row className="d-block d-lg-none">
                                        <Col xs="12" className="btn-group btn-group-justified" role='group'>
                                            <CountBtnType1 changeDiv={this.changeDiv} />
                                        </Col>
                                        <Col xs="12" className="btn-group btn-group-justified" role='group'>
                                            <CountBtnType2 changeDiv={this.changeDiv} />
                                        </Col>
                                    </Row>
                                    {/* from large size */}
                                    <Row className="d-none d-lg-block">
                                        <Col xs="12" className="btn-group btn-group-justified" role='group'>
                                            <CountBtnType1 changeDiv={this.changeDiv} />
                                            <CountBtnType2 changeDiv={this.changeDiv} />
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