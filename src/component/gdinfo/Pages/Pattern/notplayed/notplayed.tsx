import React, {Component} from 'react';
import {Link, Redirect, RouteComponentProps} from 'react-router-dom';
import axios from 'axios';
import NpItem from './npItem';
import commonData from '../../Common/commonData';
import txtNp from './txtNotplayed';
import {getPatternImg600} from '../../Common/pattern';
import {GDVer} from '../../Common/version';
import LData from '../../Common/language';
import Pager from '../../Common/pager';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button
} from 'reactstrap';
import NPData from './NPData';

interface IMatchProps {
    gtype: string,
    userid: string,
    vertype: string,
    page: string
}

interface State {
    list: Array<NPData>,
    empty: boolean,
    gtype: string,
    allpage: number,
    switchlv: boolean,
    lv: number,
    switchver: boolean,
    ver: string,
    switchhot: boolean,
    switchoth: boolean,
    switchclear: boolean
}

class NotPlayed extends Component<RouteComponentProps<IMatchProps>, State> {
    lang = LData.lang;

    constructor(props: RouteComponentProps<IMatchProps>) {
        super(props);

        this.state = {
            list: [],
            empty: false,
            gtype: "",
            allpage: 0,

            // 선택적
            switchlv: false,
            lv: 0,
            switchver: false,
            ver: "00",
            switchhot: false,
            switchoth: false,
            switchclear: false
        }

        this.switchLv = this.switchLv.bind(this);
        this.switchVer = this.switchVer.bind(this);
    }
    
    componentDidMount() {
        this.loadNPData(this.props);
    }

    componentWillReceiveProps(nextProps: RouteComponentProps<IMatchProps>) {
        // redirect 해제
        this.setState({
            switchlv: false,
            switchver: false,
            switchhot: false,
            switchoth: false,
            switchclear: false
        });

        this.loadNPData(nextProps);
    }

    loadNPData(props: RouteComponentProps<IMatchProps>) {
        const urlprop = props.match.params;
        const search = props.location.search;
        const params = new URLSearchParams(search);

        const lv = params.get("lv");
        const order = params.get("order");
        const ver = params.get("ver");
        const hot = params.get("hot");

        const nplist = new Array<NPData>();

        let isEmpty = false;
        let ajaxurl = commonData.commonDataURL+"notplayed/"+
            urlprop.gtype+"/"+urlprop.userid+"/"+
            urlprop.vertype+"/"+urlprop.page;

        if(search !== null) {
            ajaxurl += search;
        }

        axios.post(ajaxurl)
        .then((res) => {
            const json = res.data;
            for(let i = 0; i < json.music.length; i++) {
                const obj = new NPData();
                const cur = json.music[i];

                obj.imgsrc = commonData.commonImageURL+"music/"+cur.id+".jpg";
                obj.link = '/music/'+cur.id+'/'+urlprop.userid;
                obj.name = cur.name;
                obj.pattern = getPatternImg600(cur.ptcode);
                obj.lv = (cur.lv/100).toFixed(2);
                obj.ver = GDVer[cur.version-1].sv;

                nplist.push(obj);
            }

            if(json === null || json.length === 0) {
                isEmpty = true;
            }

            const baseurl = '/notplayed/'+urlprop.gtype+'/'+
                        urlprop.userid+'/'+urlprop.vertype+'/';
            let extvar = "";
            if(lv !== null) {
                if(extvar === "") extvar += "?lv="+lv;
                else extvar += "&lv="+lv;
            }
            if(order !== null) {
                if(extvar === "") extvar += "?order="+order;
                else extvar += "&order="+order;
            }
            if(ver !== null) {
                if(extvar === "") extvar += "?ver="+ver;
                else extvar += "&ver="+ver;
            }
            if(hot !== null) {
                if(extvar === "") extvar += "?hot="+hot;
                else extvar += "&hot="+hot;
            }

            let type = "";
            if(urlprop.gtype === "gf") type = "GuitarFreaks";
            else type = "DrumMania";

            this.setState({
                list: nplist,
                empty: isEmpty,
                gtype: type,
                allpage: json.pages
            });
        });
    }

    switchLv(e: React.ChangeEvent<HTMLSelectElement>) {
        if(e.target.value !== "--") {
            this.setState({
                switchver: true,
                lv: parseInt(e.target.value)
            });
        }
    }

    switchVer(e: React.ChangeEvent<HTMLSelectElement>) {
        if(e.target.value !== "--") {
            this.setState({
                switchver: true,
                ver: e.target.value
            });
        }
    }

    switchHot() {
        this.setState({
            switchhot: true
        });
    }

    switchOther() {
        this.setState({
            switchoth: true
        });
    }

    switchClear() {
        this.setState({
            switchhot: false,
            switchoth: false,
            switchclear: true
        });
    }

    render() {
        const self = this;
        const urlprop = this.props.match.params;
        const search = this.props.location.search;

        if(this.state.switchlv) {
            return <Redirect to={"/notplayed/"+urlprop.gtype+"/"+urlprop.userid+"/"+urlprop.vertype+"/1?lv="+this.state.lv} />
        }
        if(this.state.switchver) {
            return <Redirect to={"/notplayed/"+urlprop.gtype+"/"+urlprop.userid+"/"+urlprop.vertype+"/1?ver="+this.state.ver} />
        }
        if(this.state.switchhot) {
            return <Redirect to={"/notplayed/"+urlprop.gtype+"/"+urlprop.userid+"/"+urlprop.vertype+"/1?hot=h"} />
        }
        if(this.state.switchoth) {
            return <Redirect to={"/notplayed/"+urlprop.gtype+"/"+urlprop.userid+"/"+urlprop.vertype+"/1?hot=o"} />
        }
        if(this.state.switchclear) {
            return <Redirect to={"/notplayed/"+urlprop.gtype+"/"+urlprop.userid+"/"+urlprop.vertype+"/1"} />
        }
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Patterns not played</h3>
                            </CardHeader>
                            <CardBody>
                                <span>{(txtNp.desc as any)[this.lang]}</span>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Option Table</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="6">
                                        <Row><Col xs="12" className="text-center">
                                            Level
                                        </Col></Row>
                                        <Row><Col xs="12">
                                            <select onChange={self.switchLv} className="form-control">
                                                <option value="--">SELECT</option>
                                                <option value="0">All</option>
                                                <option value="1">1.00-1.49</option>
                                                <option value="2">1.50-1.99</option>
                                                <option value="3">2.00-2.49</option>
                                                <option value="4">2.50-2.99</option>
                                                <option value="5">3.00-3.49</option>
                                                <option value="6">3.50-3.99</option>
                                                <option value="7">4.00-4.49</option>
                                                <option value="8">4.50-4.99</option>
                                                <option value="9">5.00-5.49</option>
                                                <option value="10">5.50-5.99</option>
                                                <option value="11">6.00-6.49</option>
                                                <option value="12">6.50-6.99</option>
                                                <option value="13">7.00-7.49</option>
                                                <option value="14">7.50-7.99</option>
                                                <option value="15">8.00-8.49</option>
                                                <option value="16">8.50-8.99</option>
                                                <option value="17">9.00-9.49</option>
                                                <option value="18">9.50-9.99</option>
                                            </select>
                                        </Col></Row>
                                    </Col>
                                    <Col xs="6">
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
                                </Row>
                                <Row>
                                    <Col xs="6">
                                        <Row><Col xs="12" className="text-center">
                                            Hot/Other
                                        </Col></Row>
                                        <Row><Col xs="12" className="btn-group">
                                            <Button onClick={() => self.switchHot()}>Hot</Button>
                                            <Button onClick={() => self.switchOther()}>Other</Button>
                                        </Col></Row>
                                    </Col>
                                    <Col xs="6">
                                        <Row><Col xs="12" className="text-center">
                                            Order
                                        </Col></Row>
                                        <Row><Col xs="12" className="btn-group">
                                            <Button onClick={() => self.switchClear()}>Clear Options</Button>
                                            {/*<Button onClick={() => self.switchOrder(0)}>{txtNp.filter.btn.title[lang]} ▲/▼</Button>
                                            <Button onClick={() => self.switchOrder(1)}>{txtNp.filter.btn.version[lang]} ▲/▼</Button>*/}
                                        </Col></Row>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Select Type</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" className="btn-group">
                                        <Button tag={Link} to={"/notplayed/gf/"+urlprop.userid+"/0/1"+search}
                                                style={{width:"100%"}}>
                                            GF {(txtNp.all as any)[this.lang]}
                                        </Button>
                                        <Button tag={Link} to={"/notplayed/dm/"+urlprop.userid+"/0/1"+search}
                                                style={{width:"100%"}}>
                                            DM {(txtNp.all as any)[this.lang]}
                                        </Button>
                                    </Col>
                                    <Col xs="12" className="btn-group">
                                        <Button tag={Link} to={"/notplayed/gf/"+urlprop.userid+"/1/1"+search}
                                                style={{width:"100%"}}>
                                            GF {(txtNp.ver as any)[this.lang]}
                                        </Button>
                                        <Button tag={Link} to={"/notplayed/dm/"+urlprop.userid+"/1/1"+search}
                                                style={{width:"100%"}}>
                                            DM {(txtNp.ver as any)[this.lang]}
                                        </Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Non Play List</h3>
                                {/* GuitarFreaks or DrumMania */}
                                <span>{self.state.gtype}</span>
                            </CardHeader>
                            <CardBody>
                                <div className='div-table' id="playlist">
                                    <NpItem list={self.state.list} />
                                </div>
                                <div style={{width:"100%", textAlign:"center"}}>
                                    <h3 id="empty"></h3>
                                </div>
                                <Row className="text-center">
                                    <Pager cpage={parseInt(urlprop.page)}
                                            allpage={self.state.allpage}
                                            baseUrl={"/notplayed/"+
                                                urlprop.gtype+"/"+
                                                urlprop.userid+"/"+
                                                urlprop.vertype+"/"}
                                            afterUrl={""+self.props.location.search} />
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default NotPlayed;