import React, {Component} from 'react';
import {Redirect, RouteComponentProps} from 'react-router-dom';
import axios from 'axios';
import txtPattern from './txtpattern';
//import Filter from '../../Common/filter';
import Pager from '../../Common/pager';
import PatternListItem from './ptListItem';
import LData from '../../Common/language';
import {connect} from 'react-redux';
import {LoginInfo} from '../../../Redux/action';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button
} from 'reactstrap';
import CommonData from '../../Common/commonData';
import { PatternMem, PatternData, EachDiffLine, EachDiff } from './patternData';
import { StoreState } from '../../../Redux/reducer';

interface IMatchProps {
    order: string,
    ver: string,
    page: string
}

interface Props {
    login: boolean,
    userinfo: LoginInfo
}

interface State {
    list: Array<PatternData>,
    allpage: number,

    // redirect by switch
    switchhot: boolean,
    switchoth: boolean,
    switchver: boolean,
    switchorder: boolean,
    nextver: number,
    nextorder: string
}

class PatternList extends Component<RouteComponentProps<IMatchProps> & Props, State> {
    lang = LData.lang;

    constructor(props: RouteComponentProps<IMatchProps> & Props) {
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

    componentWillReceiveProps(nextProps: RouteComponentProps<IMatchProps> & Props) {
        this.resetSwitch();
        this.loadPatternList(nextProps);
    }

    loadPatternList(props: RouteComponentProps<IMatchProps> & Props) {
        const urlprop = props.match.params;
        const search = props.location.search;

        const ver = urlprop.ver;
        const order = urlprop.order;
        const page = urlprop.page;

        axios.post(CommonData.dataUrl+"ptrank/"+ver+"/"+order+"/"+page+search)
        .then((res) => {
            const json = res.data;
            const ptlist = new Array<PatternData>();
            const musiclist = JSON.parse(json.musiclist);

            for(let i = 0; i < musiclist.length; i++) {
                const obj = new PatternMem();
                const music = musiclist[i];

                //src
                obj.jacket = CommonData.jacketUrl+music.id+".jpg";
                
                //href
                if(props.login) {
                    obj.link = '/music/'+music.id+'/'+props.userinfo.id;
                }
                else {
                    obj.link = '#no_div';
                }
                
                obj.name = music.name;
                obj.removed = parseInt(music.removed);

                obj.difflist = new Array<EachDiff>();

                for(let j = 0; j < 4; j++) {
                    const d = new EachDiffLine();
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
                list: ptlist,
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

    switchVer(e: React.ChangeEvent<HTMLSelectElement>) {
        if(e.target.value !== "--") {
            this.setState({
                switchver: true,
                nextver: parseInt(e.target.value)
            });
        }
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
            nextver: parseInt(this.props.match.params.ver),
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
            return <Redirect to={"/pattern/"+this.state.nextver+"/"+order+"/1"}/>
        }
        if(this.state.switchorder) {
            return <Redirect to={"/pattern/"+this.state.nextver+"/"+this.state.nextorder+"/1"+search}/>
        }
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Pattern List</h3>
                            </CardHeader>
                            <CardBody>
                                <span>
                                    {(txtPattern.desc1 as any)[this.lang]}<br/>
                                    {(txtPattern.desc2 as any)[this.lang]}
                                </span>
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
                                            <Button onClick={() => self.switchOrder(0)}>
                                                {(txtPattern.filter.btn.title as any)[this.lang]} ▲/▼
                                            </Button>
                                            <Button onClick={() => self.switchOrder(1)}>
                                                {(txtPattern.filter.btn.version as any)[this.lang]} ▲/▼
                                            </Button>
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
                                <h4>{(txtPattern.ptinfo as any)[this.lang]}</h4>
                            </CardHeader>
                            <CardBody>
                                <PatternListItem list={self.state.list}/>
                                <Row>
                                    <Pager cpage={parseInt(urlprop.page)}
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

const mapStateToProps = (state: StoreState) => {
    return {
        userinfo: state.loginReducer.userinfo,
        login: state.loginReducer.login
    }
};

export default connect(mapStateToProps)(PatternList);