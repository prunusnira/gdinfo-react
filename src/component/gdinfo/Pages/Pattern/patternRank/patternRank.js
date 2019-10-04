import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import PatternRankRow from './ptRankRow';
import Pager from '../../Common/pager';
import LData from '../../Common/language';
import txtPTRank from './txtptrank';
import commonData from '../../Common/commonData';
import {skillTableColor} from '../../Common/skillcolor';
import {getPatternImg600} from '../../Common/pattern';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button
} from 'reactstrap';

const lang = LData.lang;

class PatternRank extends Component {
    constructor(props) {
        super(props);

        const urlprop = props.match.params;
        let pt = "";
        switch(urlprop.ptcode) {
            case 1:
                pt = "BSC-G";
                break;
            case 2:
                pt = "ADV-G";
                break;
            case 3:
                pt = "EXT-G";
                break;
            case 4:
                pt = "MAS-G";
                break;
            case 5:
                pt = "BSC-B";
                break;
            case 6:
                pt = "ADV-B";
                break;
            case 7:
                pt = "EXT-B";
                break;
            case 8:
                pt = "MAS-B";
                break;
            case 9:
                pt = "BSC-D";
                break;
            case 10:
                pt = "ADV-D";
                break;
            case 11:
                pt = "EXT-D";
                break;
            case 12:
                pt = "MAS-D";
                break;
            default:
                break;
        }

        this.state = {
            list: [],
            version: commonData.currentVersion,
            pattern: pt,
            level: 0,
            mname: "",
            composer: "",
            allpage: 0
        }
    }

    componentDidMount() {
        this.loadMusicData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.loadMusicData(nextProps);
    }

    loadMusicData(prop) {
        const mid = prop.match.params.mid;
        
        const search = new URLSearchParams(prop.location.search);
        const ver = search.get("ver") === null ? commonData.currentVersion : parseInt(search.get("ver"));

        axios.post(commonData.commonDataURL+"getmusic/"+mid)
        .then((res) => {
            const json = res.data;
            const ptcode = prop.match.params.ptcode;

            const pattern = getPatternImg600(parseInt(ptcode));
            let level = 0;
            switch(parseInt(ptcode)) {
            case 1:
                level = (json.music.gbsc/100).toFixed(2);
                break;
            case 2:
                level = (json.music.gadv/100).toFixed(2);
                break;
            case 3:
                level = (json.music.gext/100).toFixed(2);
                break;
            case 4:
                level = (json.music.gmas/100).toFixed(2);
                break;
            case 5:
                level = (json.music.bbsc/100).toFixed(2);
                break;
            case 6:
                level = (json.music.badv/100).toFixed(2);
                break;
            case 7:
                level = (json.music.bext/100).toFixed(2);
                break;
            case 8:
                level = (json.music.bmas/100).toFixed(2);
                break;
            case 9:
                level = (json.music.dbsc/100).toFixed(2);
                break;
            case 10:
                level = (json.music.dadv/100).toFixed(2);
                break;
            case 11:
                level = (json.music.dext/100).toFixed(2);
                break;
            case 12:
                level = (json.music.dmas/100).toFixed(2);
                break;
            default: level = 0; break;
            }

            const mname = json.music.name;
            const composer = json.music.composer;

            this.setState({
                pattern: pattern,
                mname: mname,
                level: level,
                composer: composer,
                version: ver
            });

            this.loadRankData(prop);
        });
    }

    loadRankData(prop) {
        const urlprop = prop.match.params;
        const mid = urlprop.mid;
        const ptcode = urlprop.ptcode;
        const page = urlprop.page;
        let version = this.state.version;
        if(version === 0) version = commonData.currentVersion;
        axios.post(commonData.commonDataURL+"ptdetail/"+
                mid+"/"+ptcode+"/"+page+"/"+version)
        .then((res) => {
            const json = res.data;
				
            let lv = 0;
            let userskill = 0;
            switch(parseInt(ptcode)) {
            case 1: lv = json.music.gbsc; break;
            case 2: lv = json.music.gadv; break;
            case 3: lv = json.music.gext; break;
            case 4: lv = json.music.gmas; break;
            case 5: lv = json.music.bbsc; break;
            case 6: lv = json.music.badv; break;
            case 7: lv = json.music.bext; break;
            case 8: lv = json.music.bmas; break;
            case 9: lv = json.music.dbsc; break;
            case 10: lv = json.music.dadv; break;
            case 11: lv = json.music.dext; break;
            case 12: lv = json.music.dmas; break;
            default: lv = 0;
            }

            const ranklist = [];
            for(let i = 0; i < json.list.length; i++) {
                const cur = json.list[i];
                const user = json.users[i];
                const obj = {};

                const rate = cur.rate;
                obj.rate = (rate/100).toFixed(2);
                const skill = obj.rate*lv*20/10000;
                obj.skill = skill.toFixed(2);
                const tableColor = skillTableColor(skill*100);
                if(tableColor.startsWith("#")) {
                    obj.ratecolor = {width:"10px", backgroundColor: tableColor};
                }
                else {
                    obj.ratecolor = {width:"10px", background: tableColor};
                }

                if(ptcode < 9) {
                    switch(version) {
                        case 24: userskill = user.gskilltb; break;
                        case 25: userskill = user.gskilltbre; break;
                        case 26: userskill = user.gskillmx; break;
                        case 27: userskill = user.gskill; break;
                    }
                }
                else {
                    switch(version) {
                        case 24: userskill = user.dskilltb; break;
                        case 25: userskill = user.dskilltbre; break;
                        case 26: userskill = user.dskillmx; break;
                        case 27: userskill = user.dskill; break;
                    }
                }

                const tableColor2 = skillTableColor(userskill*2);
                if(tableColor2.startsWith("#")) {
                    obj.skillcolor = {width:"10px", backgroundColor: tableColor2};
                }
                else {
                    obj.skillcolor = {width:"10px", background: tableColor2};
                }
                

                obj.index = (page-1)*30+i+1;

                if(user.titletower != '') {
                    obj.towertitle = "<img class='towertitle35' src='/img/title/"+user.titletower+".png' />";
                }
                else {
                    obj.towertitle = '';
                }

                obj.profile = '/music/'+mid+'/'+cur.userid;
                obj.name = cur.name;

                switch(cur.rank) {
                case "E":
                    obj.rank = process.env.PUBLIC_URL+"/general-img/rank/rank_e.png";
                    break;
                case "D":
                    obj.rank = process.env.PUBLIC_URL+"/general-img/rank/rank_d.png";
                    break;
                case "C":
                    obj.rank = process.env.PUBLIC_URL+"/general-img/rank/rank_c.png";
                    break;
                case "B":
                    obj.rank = process.env.PUBLIC_URL+"/general-img/rank/rank_b.png";
                    break;
                case "A":
                    obj.rank = process.env.PUBLIC_URL+"/general-img/rank/rank_a.png";
                    break;
                case "S":
                    obj.rank = process.env.PUBLIC_URL+"/general-img/rank/rank_s.png";
                    break;
                case "SS":
                case "EXC":
                    obj.rank = process.env.PUBLIC_URL+"/general-img/rank/rank_ss.png";
                    break;
                }
                
                if(cur.checkfc == "Y" && cur.rank != "EXC") {
                    obj.fc = "<img class='fc-img' src='"+process.env.PUBLIC_URL+"/general-img/rank/fc_300.png' />";
                }
                else if(cur.checkfc == "Y" && cur.rank == "EXC") {
                    obj.fc = "<img class='fc-img' src='"+process.env.PUBLIC_URL+"/general-img/rank/exc_300.png' />";
                }
                else {
                    obj.fc = "<img class='fc-img' src='"+process.env.PUBLIC_URL+"/general-img/rank/cleared_300.png' />";
                }

                ranklist.push(obj);
            }

            this.setState({
                list: ranklist,
                allpage: json.pages
            });
        });
    }

    render() {
        const self = this;
        const urlprop = this.props.match.params;
        const search = this.props.location.search;
        const params = new URLSearchParams(search);

        const mid = urlprop.mid;
        const ptcode = urlprop.ptcode;
        const pattern = self.state.pattern;
        const level = self.state.level;
        const mname = self.state.mname;
        const composer = self.state.composer;

        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>{txtPTRank.title[lang]}</h3>
                            </CardHeader>
                            <CardBody className="text-center">
                                <span>{txtPTRank.desc[lang]}</span>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>{txtPTRank.table.ptinfo[lang]}</h3>
                            </CardHeader>
                            <CardBody>
                                <Row id="upper">
                                    <Col sm="4" className="text-center"> 
                                        <img alt="jacket-img" src={commonData.commonImageURL+"music/"+mid+".jpg"}
                                            onError={(e) => {
                                                e.target.src=commonData.commonImageURL+"music/empty.jpg"}}
                                            style={{width:"75%", maxWidth: "100px"}} /><br/>
                                        <img alt="pattern" src={pattern}
                                            style={{width:"75%", maxWidth: "100px"}} /><br/>
                                        <span>{level}</span>
                                    </Col>
                                    <Col sm="8" className="text-center">
                                        <Row style={{padding:"10px"}}>
                                            <Col xs="12">
                                                <span style={{fontSize:"125%"}}>{mname}</span><br/>
                                                <span>{composer}</span>
                                            </Col>
                                        </Row>
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
                                <Row>
                                    <Col xs="4">
                                        <h3>{txtPTRank.table.ranking[lang]}</h3>
                                    </Col>
                                    <Col xs="8" className="text-right btn-group">
                                        <Button tag={Link} to={"/ptrank/"+mid+"/"+ptcode+"/1?ver=28"} className="rank28">NX</Button>
                                        <Button tag={Link} to={"/ptrank/"+mid+"/"+ptcode+"/1?ver=27"} className="rank27">EX</Button>
                                        <Button tag={Link} to={"/ptrank/"+mid+"/"+ptcode+"/1?ver=26"} className="rank26">MX</Button>
                                        <Button tag={Link} to={"/ptrank/"+mid+"/"+ptcode+"/1?ver=25"} className="rank25">RE</Button>
                                        <Button tag={Link} to={"/ptrank/"+mid+"/"+ptcode+"/1?ver=24"} className="rank24">TB</Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                        <div class='div-table table-border-outer' id="ranktable">
                                            <PatternRankRow list={self.state.list} />
                                        </div>
                                        <div id="empty"></div>
                                    </Col>
                                    <Col xs="12" className="text-center" id="pager">
                                        <Pager cpage={urlprop.page}
                                            allpage={self.state.allpage}
                                            baseUrl={"/ptrank/"+urlprop.mid+"/"+urlprop.ptcode+"/"}
                                            afterUrl={search} />
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

export default PatternRank;