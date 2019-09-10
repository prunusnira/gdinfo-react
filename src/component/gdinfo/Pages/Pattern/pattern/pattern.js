import React, {Component} from 'react';
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
    CardBody
} from 'reactstrap';
import commonData from '../../Common/commonData';

const lang = LData.lang;

class PatternList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: []
        }
    }

    componentDidMount() {
        this.loadPatternList(this.props);
    }

    componentWillReceiveProps(nextProps) {
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

                //html
                switch(music.removed) {
                case 1:
                    obj.removed = "<br/><span style='color:red'><b>(removed TB)</b></span>";
                    break;
                case 2:
                    obj.removed = "<br/><span style='color:red'><b>(removed TBRE)</b></span>";
                    break;
                case 3:
                    obj.removed = "<br/><span style='color:red'><b>(removed MX)</b></span>";
                    break;
                case 4:
                    obj.removed = "<br/><span style='color:red'><b>(removed EXC)</b></span>";
                    break;
                default:
                    obj.removed = "";
                    break;
                }

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
                            d.glv = ''
                        }
                        if(music.bbsc !== 0) {
                            d.blink = '/ptrank/'+music.id+'/5/1';
                            d.blv = (music.bbsc/100).toFixed(2);
                        }
                        else {
                            d.blink = '#no_div';
                            d.blv = ''
                        }
                        if(music.dbsc !== 0) {
                            d.dlink = '/ptrank/'+music.id+'/9/1';
                            d.dlv = (music.dbsc/100).toFixed(2);
                        }
                        else {
                            d.dlink = '#no_div';
                            d.dlv = ''
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
                            d.glv = ''
                        }
                        if(music.badv !== 0) {
                            d.blink = '/ptrank/'+music.id+'/6/1';
                            d.blv = (music.badv/100).toFixed(2);
                        }
                        else {
                            d.blink = '#no_div';
                            d.blv = ''
                        }
                        if(music.dadv !== 0) {
                            d.dlink = '/ptrank/'+music.id+'/10/1';
                            d.dlv = (music.dadv/100).toFixed(2);
                        }
                        else {
                            d.dlink = '#no_div';
                            d.dlv = ''
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
                            d.glv = ''
                        }
                        if(music.bext !== 0) {
                            d.blink = '/ptrank/'+music.id+'/7/1';
                            d.blv = (music.bext/100).toFixed(2);
                        }
                        else {
                            d.blink = '#no_div';
                            d.blv = ''
                        }
                        if(music.dext !== 0) {
                            d.dlink = '/ptrank/'+music.id+'/11/1';
                            d.dlv = (music.dext/100).toFixed(2);
                        }
                        else {
                            d.dlink = '#no_div';
                            d.dlv = ''
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
                            d.glv = ''
                        }
                        if(music.bmas !== 0) {
                            d.blink = '/ptrank/'+music.id+'/8/1';
                            d.blv = (music.bmas/100).toFixed(2);
                        }
                        else {
                            d.blink = '#no_div';
                            d.blv = ''
                        }
                        if(music.dmas !== 0) {
                            d.dlink = '/ptrank/'+music.id+'/12/1';
                            d.dlv = (music.dmas/100).toFixed(2);
                        }
                        else {
                            d.dlink = '#no_div';
                            d.dlv = ''
                        }
                    }
                    obj.difflist.push(d);
                }
                ptlist.push(obj);
            }

            this.setState({
                list:ptlist
            });
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
                                <h3>Pattern List</h3>
                            </CardHeader>
                            <CardBody>
                                <span>{txtPattern.desc[lang]}</span>
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
                                {/*<Filter />*/}
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
                                    <Pager />
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