import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import txtPattern from './txtpattern';
//import Filter from '../../Common/filter';
import Pager from '../../Common/pager';
import PatternListItem from './ptListItem';
import LData from '../../Common/language';
import {connect} from 'react-redux';
import * as action from '../../../Redux/actions/index';

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

class PatternList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            allpage: 0,

            // redirect by switch
            switchhot: false,
            switchoth: false,
            switchver: false,
            switchorder: false,
            nextver: 0,
            nextorder: ""
        }

        this.switchVer = this.switchVer.bind(this);
    }

    componentDidMount() {
        this.loadPatternList(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.resetSwitch();
        this.loadPatternList(nextProps);
    }

    loadPatternList(props) {
        const urlprop = props.match.params;
        const search = props.location.search;
        const params = new URLSearchParams(search);

        const ver = urlprop.ver;
        const order = urlprop.order;
        const page = urlprop.page;

        axios.post(commonData.commonDataURL+"ptrank/"+ver+"/"+order+"/"+page+search)
        .then((res) => {
            const json = res.data;
            // 유저 로그인 판별
            let id = -1;
            if(json.user != null) id = json.user.id;

            const ptlist = [];

            for(let i = 0; i < json.musiclist.length; i++) {
                const obj = {};
                const music = json.musiclist[i];

                //src
                obj.jacket = commonData.commonImageURL+"music/"+music.id+".jpg";
                
                //href
                if(props.login) {
                    obj.link = '/music/'+music.id+'/'+props.userinfo.id;
                }
                else {
                    obj.link = '#no_div';
                }
                
                obj.name = music.name;
                obj.removed = music.removed;

                obj.difflist = [];

                for(let j = 0; j < 4; j++) {
                    const d = {};
                    if(j === 0) {
                        d.diff = "BASIC";
                        if(music.gbsc !== 0) {
                            d.glink = '/ptrank/'+music.id+'/1/1';
                            d.glv = (music.gbsc/100).toFixed(2);
                        }
                        else {
                            d.glink = '#no_div';
                            d.glv = '';
                        }
                        if(music.bbsc !== 0) {
                            d.blink = '/ptrank/'+music.id+'/5/1';
                            d.blv = (music.bbsc/100).toFixed(2);
                        }
                        else {
                            d.blink = '#no_div';
                            d.blv = '';
                        }
                        if(music.dbsc !== 0) {
                            d.dlink = '/ptrank/'+music.id+'/9/1';
                            d.dlv = (music.dbsc/100).toFixed(2);
                        }
                        else {
                            d.dlink = '#no_div';
                            d.dlv = '';
                        }
                    }
                    else if(j === 1) {
                        d.diff = "ADVANCED";
                        if(music.gadv !== 0) {
                            d.glink = '/ptrank/'+music.id+'/2/1';
                            d.glv = (music.gadv/100).toFixed(2);
                        }
                        else {
                            d.glink = '#no_div';
                            d.glv = '';
                        }
                        if(music.badv !== 0) {
                            d.blink = '/ptrank/'+music.id+'/6/1';
                            d.blv = (music.badv/100).toFixed(2);
                        }
                        else {
                            d.blink = '#no_div';
                            d.blv = '';
                        }
                        if(music.dadv !== 0) {
                            d.dlink = '/ptrank/'+music.id+'/10/1';
                            d.dlv = (music.dadv/100).toFixed(2);
                        }
                        else {
                            d.dlink = '#no_div';
                            d.dlv = '';
                        }
                    }
                    else if(j === 2) {
                        d.diff = "EXTREME";
                        if(music.gext !== 0) {
                            d.glink = '/ptrank/'+music.id+'/3/1';
                            d.glv = (music.gext/100).toFixed(2);
                        }
                        else {
                            d.glink = '#no_div';
                            d.glv = '';
                        }
                        if(music.bext !== 0) {
                            d.blink = '/ptrank/'+music.id+'/7/1';
                            d.blv = (music.bext/100).toFixed(2);
                        }
                        else {
                            d.blink = '#no_div';
                            d.blv = '';
                        }
                        if(music.dext !== 0) {
                            d.dlink = '/ptrank/'+music.id+'/11/1';
                            d.dlv = (music.dext/100).toFixed(2);
                        }
                        else {
                            d.dlink = '#no_div';
                            d.dlv = '';
                        }
                    }
                    else if(j === 3) {
                        d.diff = "MASTER";
                        if(music.gmas !== 0) {
                            d.glink = '/ptrank/'+music.id+'/4/1';
                            d.glv = (music.gmas/100).toFixed(2);
                        }
                        else {
                            d.glink = '#no_div';
                            d.glv = '';
                        }
                        if(music.bmas !== 0) {
                            d.blink = '/ptrank/'+music.id+'/8/1';
                            d.blv = (music.bmas/100).toFixed(2);
                        }
                        else {
                            d.blink = '#no_div';
                            d.blv = '';
                        }
                        if(music.dmas !== 0) {
                            d.dlink = '/ptrank/'+music.id+'/12/1';
                            d.dlv = (music.dmas/100).toFixed(2);
                        }
                        else {
                            d.dlink = '#no_div';
                            d.dlv = '';
                        }
                    }
                    obj.difflist.push(d);
                }
                ptlist.push(obj);
            }

            this.setState({
                list:ptlist,
                allpage: json.pages
            });
        });
    }

    /* Switch */
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

    switchVer(e) {
        if(e.target.value !== "--") {
            this.setState({
                switchver: true,
                nextver: e.target.value
            });
        }
    }

    switchOrder(type) {
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
            nextver: this.props.match.params.ver,
            nextorder: next
        });
    }

    resetSwitch() {
        this.setState({
            switchhot: false,
            switchoth: false,
            switchver: false,
            switchorder: false,
            nextver: 0,
            nextorder: ""
        });
    }

    render() {
        const self = this;
        const urlprop = this.props.match.params;
        
        const search = this.props.location.search;
        const order = this.props.match.params.order;

        if(this.state.switchhot) {
            return <Redirect to={"/pattern/00/"+order+"/1?hot=h"}/>
        }
        if(this.state.switchoth) {
            return <Redirect to={"/pattern/00/"+order+"/1?hot=o"}/>
        }
        if(this.state.switchver) {
            return <Redirect to={"/pattern/"+this.state.nextver+"/"+order+"/1"+search}/>
        }
        if(this.state.switchorder) {
            return <Redirect to={"/pattern/"+this.state.nextver+"/"+this.state.nextorder+"/1"+search}/>
        }
        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Pattern List</h3>
                            </CardHeader>
                            <CardBody>
                                <span>{txtPattern.desc1[lang]}<br/>{txtPattern.desc2[lang]}</span>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Search Options</h3>
                            </CardHeader>
                            <CardBody>
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
                                    <Col xs="12">
                                        <Row><Col xs="12" className="text-center">
                                            Order
                                        </Col></Row>
                                        <Row><Col xs="12" className="btn-group">
                                            <Button onClick={() => self.switchOrder(0)}>{txtPattern.filter.btn.title[lang]} ▲/▼</Button>
                                            <Button onClick={() => self.switchOrder(1)}>{txtPattern.filter.btn.version[lang]} ▲/▼</Button>
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
                                <h4>{txtPattern.ptinfo[lang]}</h4>
                            </CardHeader>
                            <CardBody>
                                <PatternListItem list={self.state.list}/>
                                <Row>
                                    <Pager cpage={urlprop.page}
                                            allpage={self.state.allpage}
                                            baseUrl={"/pattern/"+urlprop.ver+
                                                "/"+urlprop.order+"/"}
                                            afterUrl={self.props.location.search} />
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userinfo: state.tokenReducer.userinfo,
        login: state.tokenReducer.login
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUserinfo: () => {
            dispatch(action.setLogout())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PatternList);