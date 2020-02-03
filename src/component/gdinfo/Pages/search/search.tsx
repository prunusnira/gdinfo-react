import React, {Component} from 'react';
import axios from 'axios';
import Pager from '../Common/pager';
import txtSearch from './txtsearch';
import LData from '../Common/language';
import RecentTableDiv from '../recent/recentTableDiv';
import PatternListItem from '../Pattern/pattern/ptListItem';
import {connect} from 'react-redux';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';
import commonData from '../Common/commonData';
import { RouteComponentProps } from 'react-router-dom';
import RecentData from '../recent/recentData';
import { StoreState } from '../../Redux/reducer';
import { PatternMem, PatternData, EachDiffLine } from '../Pattern/pattern/patternData';
import { LoginInfo } from '../../Redux/action';

interface IMatchProps {
    type: string,
    page: string,
    value: string
}

interface Props {
    login: boolean,
    userinfo: LoginInfo
}

interface State {
    userlist: Array<RecentData>,
    musiclist: Array<PatternData>,
    allpage: number
}

class RecentUser implements RecentData {
    id: number = 0;
    titletower: string = "";
    name: string = "";
    gskill: number = 0;
    dskill: number = 0;
    updatetime: string = "";
    uptimelong: number = 0;
    link: string = "";
    glink: string = "";
    dlink: string = "";
}

class SearchResult extends Component<RouteComponentProps<IMatchProps> & Props, State> {
    lang = LData.lang;

    state: State = {
        userlist: [],
        musiclist: [],
        allpage: 0
    }

    componentDidMount() {
        const urlprop = this.props.match.params;
        if(urlprop.type === "music") {
            this.getMusicList(urlprop);
        }
        else {
            this.getUserList(urlprop);
        }
    }

    componentWillReceiveProps(nextProps: RouteComponentProps<IMatchProps> & Props) {
        const urlprop = nextProps.match.params;
        if(urlprop.type === "music") {
            this.getMusicList(urlprop);
        }
        else {
            this.getUserList(urlprop);
        }
    }

    getUserList(prop: any) {
        axios.post(commonData.commonDataURL+"search/"+prop.type+"/"+prop.value+"/"+prop.page)
        .then((res) => {
            const json = res.data;
            const userlist = [];
            if(json.resultexist == "yes") {
                for(let i = 0; i < json.userList.length; i++) {
                    const cur = json.userList[i];
                    const obj = new RecentUser();
                    if(cur.titletower != '') {
                        obj.titletower = cur.titletower;
                    }
                    else {
                        obj.titletower = '';
                    }
                    obj.id = cur.id;
                    obj.name = cur.name;
                    obj.gskill = cur.gskill;
                    obj.dskill = cur.dskill;
                    obj.glink = "/skill/2/"+cur.id+"/gf/1/1";
                    obj.dlink = "/skill/2/"+cur.id+"/dm/1/1";
                    obj.uptimelong = cur.updatetime;
                    
                    userlist.push(obj);
                }

                this.setState({
                    userlist: userlist,
                    allpage: json.pages
                });
            }
        });
    }

    getMusicList(prop: any) {
        const self = this;
        axios.post(commonData.commonDataURL+"search/"+prop.type+"/"+prop.value+"/"+prop.page)
        .then((res) => {
            const json = res.data;
            const ptlist = [];
            if(json.resultexist == "yes") {
                for(let i = 0; i < json.userList.length; i++) {
                    const cur = json.userList[i];
                    const obj = new PatternMem();
                    obj.jacket = commonData.commonImageURL+"music/"+cur.id+".jpg";
                    if(self.props.login)
                        obj.link = "/music/"+cur.id+"/"+self.props.userinfo.id;
                    else
                        obj.link = "#no_div";
                    obj.name = cur.name;
                    obj.removed = parseInt(cur.removed);

                    for(let j = 0; j < 4; j++) {
                        const d = new EachDiffLine();
                        if(j === 0) {
                            d.diff = "BASIC";
                            if(cur.gbsc !== 0) {
                                d.glink = "/ptrank/"+cur.id+"/1/1";
                                d.glv = (cur.gbsc/100).toFixed(2);
                            }
                            else {
                                d.glink = "#no_div";
                                d.glv = "";
                            }
                            if(cur.bbsc !== 0) {
                                d.blink = "/ptrank/"+cur.id+"/5/1";
                                d.blv = (cur.bbsc/100).toFixed(2);
                            }
                            else {
                                d.blink = "#no_div";
                                d.blv = "";
                            }
                            if(cur.dbsc !== 0) {
                                d.dlink = "/ptrank/"+cur.id+"/9/1";
                                d.dlv = (cur.dbsc/100).toFixed(2);
                            }
                            else {
                                d.dlink = "#no_div";
                                d.dlv = "";
                            }
                        }
                        else if(j === 1) {
                            d.diff = "ADVANCED";
                            if(cur.gadv !== 0) {
                                d.glink = "/ptrank/"+cur.id+"/2/1";
                                d.glv = (cur.gadv/100).toFixed(2);
                            }
                            else {
                                d.glink = "#no_div";
                                d.glv = "";
                            }
                            if(cur.badv !== 0) {
                                d.blink = "/ptrank/"+cur.id+"/6/1";
                                d.blv = (cur.badv/100).toFixed(2);
                            }
                            else {
                                d.blink = "#no_div";
                                d.blv = "";
                            }
                            if(cur.dadv !== 0) {
                                d.dlink = "/ptrank/"+cur.id+"/10/1";
                                d.dlv = (cur.dadv/100).toFixed(2);
                            }
                            else {
                                d.dlink = "#no_div";
                                d.dlv = "";
                            }
                        }
                        else if(j === 2) {
                            d.diff = "EXTREME";
                            if(cur.gext !== 0) {
                                d.glink = "/ptrank/"+cur.id+"/3/1";
                                d.glv = (cur.gext/100).toFixed(2);
                            }
                            else {
                                d.glink = "#no_div";
                                d.glv = "";
                            }
                            if(cur.bext !== 0) {
                                d.blink = "/ptrank/"+cur.id+"/7/1";
                                d.blv = (cur.bext/100).toFixed(2);
                            }
                            else {
                                d.blink = "#no_div";
                                d.blv = "";
                            }
                            if(cur.dext !== 0) {
                                d.dlink = "/ptrank/"+cur.id+"/11/1";
                                d.dlv = (cur.dext/100).toFixed(2);
                            }
                            else {
                                d.dlink = "#no_div";
                                d.dlv = "";
                            }
                        }
                        else if(j === 3) {
                            d.diff = "MASTER";
                            if(cur.gmas !== 0) {
                                d.glink = "/ptrank/"+cur.id+"/4/1";
                                d.glv = (cur.gmas/100).toFixed(2);
                            }
                            else {
                                d.glink = "#no_div";
                                d.glv = "";
                            }
                            if(cur.bmas !== 0) {
                                d.blink = "/ptrank/"+cur.id+"/8/1";
                                d.blv = (cur.bmas/100).toFixed(2);
                            }
                            else {
                                d.blink = "#no_div";
                                d.blv = "";
                            }
                            if(cur.dmas !== 0) {
                                d.dlink = "/ptrank/"+cur.id+"/12/1";
                                d.dlv = (cur.dmas/100).toFixed(2);
                            }
                            else {
                                d.dlink = "#no_div";
                                d.dlv = "";
                            }
                        }
                        obj.difflist.push(d);
                    }
                    ptlist.push(obj);
                }

                this.setState({
                    musiclist: ptlist,
                    allpage: json.pages
                });
            }
        });
    }

    render() {
        const self = this;
        const urlprop = this.props.match.params;
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Search</h3>
                                <span>{(txtSearch.desc as any)[this.lang]}</span>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" id='user-result'>
                                        <RecentTableDiv isMain={false} list={self.state.userlist} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" id='music-result'>
                                        <PatternListItem list={self.state.musiclist} />
                                    </Col>
                                </Row>
                                <Pager cpage={parseInt(urlprop.page)} allpage={self.state.allpage}
                                    baseUrl={"/search/"+urlprop.type+"/"+urlprop.value+"/"}
                                    afterUrl={""} />
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

export default connect(mapStateToProps)(SearchResult);