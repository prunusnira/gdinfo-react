import React, {Component} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import MusicItem from './musicItem';
import axios from 'axios';
import {GDVer} from '../../Common/version';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';
import commonData from '../../Common/commonData';
import MusicData from './musicData';

interface IMatchProps {
    userid: string,
    mid: string
}

interface State {
    glist: Array<MusicData>,
    blist: Array<MusicData>,
    dlist: Array<MusicData>,
    musicimg: string,
    musicname: string,
    composer: string,
    version: string,
    proflink: string,
    playername: string
}

class Music extends Component<RouteComponentProps<IMatchProps>, State> {
    state: State = {
        glist: [],
        blist: [],
        dlist: [],
        musicname: "",
        composer: "",
        version: "",
        musicimg: "",
        playername: "",
        proflink: ""
    }

    componentDidMount() {
        this.loadMusicInfo(this.props);
        this.loadPlayerName(this.props);
        this.loadPatternInfo(this.props);
    }

    loadPlayerName(prop: RouteComponentProps<IMatchProps>) {
        axios.post(commonData.commonDataURL+"getuserid/"+prop.match.params.userid)
        .then((res) => {
            const json = res.data.mydata;
            this.setState({
                playername: json.name,
                proflink: "/profile/"+prop.match.params.userid
            });
        });
    }

    loadMusicInfo(prop: RouteComponentProps<IMatchProps>) {
        axios.post(commonData.commonDataURL+"getmusic/"+prop.match.params.mid)
        .then((res) => {
            const json = res.data.music;
            this.setState({
                musicname: json.name,
                composer: json.composer,
                version: GDVer[json.version - 1].full,
                musicimg: commonData.commonImageURL+"music/"+prop.match.params.mid+".jpg"
            });
        });
    }

    loadPatternInfo(prop: RouteComponentProps<IMatchProps>)  {
        const urlprop = prop.match.params;
        axios.post(commonData.commonDataURL+"music/"+urlprop.mid+"/"+urlprop.userid)
        .then((res) => {
            const json = res.data;
            const music = json.music;
            const glist = [];
            const blist = [];
            const dlist = [];

            for(let i = 1; i <= 12; i++) {
                const obj = new MusicData();
                obj.ranklink = '/ptrank/'+music.id+'/'+i+'/1';

                let skill = null;
                switch(i) {
                    case 1: obj.diff = 'BASIC'; obj.lv = (music.gbsc/100).toFixed(2); skill = json.skill.s1; break;
                    case 2: obj.diff = 'ADVANCED'; obj.lv = (music.gadv/100).toFixed(2); skill = json.skill.s2; break;
                    case 3: obj.diff = 'EXTREME'; obj.lv = (music.gext/100).toFixed(2); skill = json.skill.s3; break;
                    case 4: obj.diff = 'MASTER'; obj.lv = (music.gmas/100).toFixed(2); skill = json.skill.s4; break;
                    case 5: obj.diff = 'BASIC'; obj.lv = (music.bbsc/100).toFixed(2); skill = json.skill.s5; break;
                    case 6: obj.diff = 'ADVANCED'; obj.lv = (music.badv/100).toFixed(2); skill = json.skill.s6; break;
                    case 7: obj.diff = 'EXTREME'; obj.lv = (music.bext/100).toFixed(2); skill = json.skill.s7; break;
                    case 8: obj.diff = 'MASTER'; obj.lv = (music.bmas/100).toFixed(2); skill = json.skill.s8; break;
                    case 9: obj.diff = 'BASIC'; obj.lv = (music.dbsc/100).toFixed(2); skill = json.skill.s9; break;
                    case 10: obj.diff = 'ADVANCED'; obj.lv = (music.dadv/100).toFixed(2); skill = json.skill.s10; break;
                    case 11: obj.diff = 'EXTREME'; obj.lv = (music.dext/100).toFixed(2); skill = json.skill.s11; break;
                    case 12: obj.diff = 'MASTER'; obj.lv = (music.dmas/100).toFixed(2); skill = json.skill.s12; break;
                }

                if(obj.lv != "0.00" && skill != null) {
                    obj.cleartime = skill.cleartime;
                    obj.playtime = skill.playtime;
                    obj.combo = skill.combo;
                    obj.score = skill.score;
                    obj.rate = (skill.rate/100).toFixed(2);
                    obj.skill = (Math.floor(skill.rate*skill.level*20/10000)/100).toFixed(2);
                    
                    switch(skill.rank) {
                        case 'E': obj.rank = process.env.PUBLIC_URL+'/general-img/rank/rank_e.png'; break;
                        case 'D': obj.rank = process.env.PUBLIC_URL+'/general-img/rank/rank_d.png'; break;
                        case 'C': obj.rank = process.env.PUBLIC_URL+'/general-img/rank/rank_c.png'; break;
                        case 'B': obj.rank = process.env.PUBLIC_URL+'/general-img/rank/rank_b.png'; break;
                        case 'A': obj.rank = process.env.PUBLIC_URL+'/general-img/rank/rank_a.png'; break;
                        case 'S': obj.rank = process.env.PUBLIC_URL+'/general-img/rank/rank_s.png'; break;
                        case 'SS':
                        case 'EXC': obj.rank = process.env.PUBLIC_URL+'/general-img/rank/rank_ss.png'; break;
                        default: obj.rank = process.env.PUBLIC_URL+'/general-img/rank/rank_e.png'; break;
                    }

                    if(skill.checkfc == "Y") {
                        if(skill.rank == "EXC")
                            obj.fc = "<img class='skillrank-img' src='"+process.env.PUBLIC_URL+"/general-img/rank/exc.png'>";
                        else
                            obj.fc = "<img class='skillrank-img' src='"+process.env.PUBLIC_URL+"/general-img/rank/fc.png'>";
                    }
                    else {
                        if(skill.playtime > 0) {
                            obj.fc = '';
                        }
                        else {
                            obj.fc = '';
                        }
                    }

                    obj.clearmeter = '';
                    const meter = skill.meter.split('');
                    for(let k = 0; k < meter.length; k++) {
                        if(meter[k] == "0")
                            obj.clearmeter += "<div style='width:0.8vw; max-width:9px; background-color:#81BEF7; float:left'>&nbsp;</div>";
                        else if(meter[k] == "1")
                            obj.clearmeter += "<div style='width:0.8vw; max-width:9px; background-color:#F3F781; float:left'>&nbsp;</div>";
                        else
                            obj.clearmeter += "<div style='width:0.8vw; max-width:9px; background-color:#848484; float:left'>&nbsp;</div>";
                    }
                    
                    obj.rateex = (skill.rateex/100).toFixed(2);
                    obj.ratemx = (skill.ratemx/100).toFixed(2);
                    obj.ratetbre = (skill.ratetbre/100).toFixed(2);
                    obj.ratetb = (skill.ratetb/100).toFixed(2);

                    switch(i) {
                    case 1: case 2: case 3: case 4:
                        glist.push(obj);
                        break;
                    case 5: case 6: case 7: case 8:
                        blist.push(obj);
                        break;
                    case 9: case 10: case 11: case 12:
                        dlist.push(obj);
                        break;
                    }
                }
                else {
                    obj.cleartime = 0;
                    obj.playtime = 0;
                    obj.combo = 0;
                    obj.score = 0;
                    obj.rate = '0.00';
                    obj.skill = '0.00';
                    obj.rank = process.env.PUBLIC_URL+'/general-img/rank/rank_e.png';
                    obj.fc = '';
                    obj.clearmeter = '';
                    obj.rateex = '0.00';
                    obj.ratemx = '0.00';
                    obj.ratetbre = '0.00';
                    obj.ratetb = '0.00';

                    switch(i) {
                    case 1: case 2: case 3: case 4:
                        glist.push(obj);
                        break;
                    case 5: case 6: case 7: case 8:
                        blist.push(obj);
                        break;
                    case 9: case 10: case 11: case 12:
                        dlist.push(obj);
                        break;
                    }
                }
            }

            this.setState({
                glist: glist,
                blist: blist,
                dlist: dlist
            });
        });
    }

    render() {
        const self = this;
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Music</h3>
                            </CardHeader>
                            <CardBody>
                                <div className="div-table">
                                    <div className="div-table-row" id="musicinfo">
                                        <div className="div-table-cell">
                                            <img alt="jacket-img" src={self.state.musicimg}
                                                onError={(e) => {
                                                    e.currentTarget.src = commonData.commonImageURL+"music/empty.jpg";
                                                 }} className='img-fluid' style={{maxWidth:"85px"}} />
                                        </div>
                                        <div className="div-table-cell">
                                            <span style={{fontSize:"150%"}}>{self.state.musicname}</span><br/>
                                            <span style={{fontSize:"120%"}}>{self.state.composer}</span><br/>
                                            <span>{self.state.version}</span>
                                        </div>
                                    </div>
                                    <div className="div-table-row">
                                        <div className="div-table-cell">
                                            <span>Player</span>
                                        </div>
                                        <div className="div-table-cell" id="userinfo">
                                            <span>
                                                <Link id="player" className='innerhref' to={self.state.proflink}>
                                                    {self.state.playername}
                                                </Link>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row id="record">
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Guitar</h3>
                            </CardHeader>
                            <CardBody>
                                <MusicItem list={self.state.glist} />
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <h3>Bass</h3>
                            </CardHeader>
                            <CardBody>
                                <MusicItem list={self.state.blist} />
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <h3>Drum</h3>
                            </CardHeader>
                            <CardBody>
                                <MusicItem list={self.state.dlist} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Music;