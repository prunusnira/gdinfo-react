import React, {Component, Fragment} from 'react';
import ProfileButton from './ProfileButton';
import axios from 'axios';
import txtProfile from './txtprofile';
import LData from '../../js/language';
import ProfileGraph from './ProfileGraph';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button
} from 'reactstrap';

const URL = "https://gitadora.info/d/";
const lang = LData.lang;

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        userinfo: null,
        self: false,
        isCommentOpen: false,
        isCountOpen: false,
        CommentCommit: false,
        CountCommit: false
    };

    copyToClipboard(element) {
        let temp = document.createElement("input");
        temp.textContent = element;
		document.body.appendChild(temp);
		temp.select();
		document.execCommand("copy");
		temp.remove();
    }

    // function for count
    setOpenCount() {
        this.setState({
            isCountOpen: true
        });
	}
	
	closeOpen() {
		this.setState({
            isCountOpen: false
        });
	}
	
	submitOpen(id) {
		//var open = $("input[name='opencount']:checked").val();
		//location.href = "/d/setopencount?open="+open+"&id="+id;
	}
	
	// Functions for comment
	setComment() {
		this.setState({
            isCommentOpen: true
        });
	}
	
	closeComment() {
		this.setState({
            isCommentOpen: false
        });
	}
	
	submitComment(id) {
		//var comment = $("input[name='newcomment']").val();
		//location.href = "/d/setcomment?val="+comment+"&id="+id;
	}

    componentDidMount() {
        const id = this.props.match.params.id;
        const token = axios.post(URL+"gettoken")
        .then((res) => {
            return res.data
        });
        if(id == null) {
            // 현재 토큰 상태를 확인한 후 토큰이 있으면 내 프로필로
            // 토큰이 없으면 에러페이지로
            axios.post(URL+"gettoken")
            .then((res) => {
            });
        }
        else {
            axios.post(URL+"getuserid/"+id)
            .then((res) => {
                this.setState({
                    userinfo: res.data
                });
                if(token == this.state.userinfo.token) {
                    this.setState({
                        self: true
                    });
                }
            });
        }
    }

    render() {
        const id = this.props.match.params.id;

        if(this.state.userinfo == null) {
            // show loading
            return (
                <h1>LOADING</h1>
            )
        }
        else {
            const userinfo = this.state.userinfo;

            // upper table
            const title = (userinfo.mydata.title === "") ? "No Title" : userinfo.mydata.title;
            const name = (userinfo.mydata.name === "") ? "(No Name)" : userinfo.mydata.name;
            const towertitle = userinfo.mydata.titletower;
            const commentTitle = txtProfile.table1.comment[lang];
            const comment = userinfo.mydata.comment;
            const gskill = userinfo.mydata.gskill;
            const gskillmx = userinfo.mydata.gskillmx;
            const gskilltbre = userinfo.mydata.gskilltbre;
            const gskilltb = userinfo.mydata.gskilltb;
            const dskill = userinfo.mydata.dskill;
            const dskillmx = userinfo.mydata.dskillmx;
            const dskilltbre = userinfo.mydata.dskilltbre;
            const dskilltb = userinfo.mydata.dskilltb;

            // lower table
            const tableHeader = txtProfile.detail[lang];
            const thSkill = txtProfile.detailed.s[lang];
            const tdGskill = gskill + " (" + userinfo.mydata.gskillall + ")";
            const tdDskill = dskill + " (" + userinfo.mydata.dskillall + ")";
            const thClear = txtProfile.detailed.clv[lang];
            const tdGclear = userinfo.mydata.gclearlv+" ("+userinfo.mydata.gclearnum+")";
            const tdDclear = userinfo.mydata.dclearlv+" ("+userinfo.mydata.dclearnum+")";
            const thFc = txtProfile.detailed.flv[lang];
            const tdGfc = userinfo.mydata.gfclv+" ("+userinfo.mydata.gfcnum+")";
            const tdDfc = userinfo.mydata.dfclv+" ("+userinfo.mydata.dfcnum+")";
            const thExc = txtProfile.detailed.elv[lang];
            const tdGexc = userinfo.mydata.gexclv+" ("+userinfo.mydata.gexcnum+")";
            const tdDexc = userinfo.mydata.dexclv+" ("+userinfo.mydata.dexcnum+")";
            const thCount = txtProfile.detailed.count[lang];
            const thTotalCnt = userinfo.mydata.countgf + userinfo.mydata.countdm;
            const tdGcnt = userinfo.mydata.countgf;
            const tdDcnt = userinfo.mydata.countdm;
            const countdesc = txtProfile.detailed.countdesc[lang];

            return (
                <Fragment>
                    <div id="opencount" className="crawler"
                        style={{display:this.state.isCountOpen ? 'block' : 'none'}}>
                        <div>
                            <br/><br/><br/><br/>
                            <h3>{txtProfile.button.setopencount[lang]}</h3>
                            <div class='div-table'>
                                <div class='div-table-row'>
                                    <div class='div-table-cell'>
                                        <label id="opencntLabelYes"></label>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label id="opencntLabelNo"></label>
                                    </div>
                                </div>
                                <div class='div-table-row'>
                                    <div class='div-table-cell'>
                                        <Button onClick={() => this.submitOpen(id)}>Apply</Button>
                                        <Button onClick={this.closeOpen}>Cancel</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="commentset" className="crawler" style={{display:"none"}}>
                        <div>
                            <br/><br/><br/><br/>
                            <h3>{txtProfile.button.changecomment[lang]}</h3>
                            <div class="div-table">
                                <div class="div-table-row">
                                    <div class="div-table-cell">
                                        <label style={{color:'black'}} for="newcomment">
                                            {txtProfile.changecomment.desc[lang]}
                                        </label>
                                        <input class="form-control" type="text" name="newcomment"/>
                                    </div>
                                </div>
                                <div class="div-table-row">
                                    <div class="div-table-cell">
                                        <Button onClick={() => this.submitComment(id)}>Apply</Button>
                                        <Button onClick={this.closeComment}>Cancel</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <Container>
                        <Row>
                            <Col xs="12">
                                <Card>
                                    <CardHeader>
                                        <h3>Profile</h3>
                                    </CardHeader>
                                    <CardBody className="text-center">
                                        <span>
                                            {txtProfile.addr[lang]}<br/>
                                            <a className="innerhref" href="#no_div" onClick={this.copyToClipboard("https://gitadora.info/profile/"+id)}>https://gitadora.info/profile/{id}</a>
                                        </span>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <Card>
                                    <CardHeader>
                                        <h3>{txtProfile.userinfo.title[lang]}</h3>
                                    </CardHeader>
                                    <CardBody className="text-center" id="profilescr">
                                        <Row>
                                            <Col xs="6">
                                                <Row className="text-center">
                                                    <Col xs="12" id="usertitle">({title})</Col>
                                                    <Col xs="12" id="username">
                                                        <span id="usertowertitle">
                                                            {
                                                                (function() {
                                                                    if(towertitle != "") {
                                                                        return (<img className="towertitle50" src={process.env.PUBLIC_URL+"/general-img/title/"+towertitle+".png"} />)
                                                                    }
                                                                })()
                                                            }
                                                        </span>
                                                        <span className="title">{name}</span>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs="6">
                                                <Row className="text-center">
                                                    <Col xs="12">{commentTitle}</Col>
                                                    <Col xs="12" id="comment" class="col-12">{comment}</Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <hr class="col-12"/>
                                        <Row>
                                            <Col xs="6" className="text-center">GF</Col>
                                            <Col xs="6" className="text-center">DM</Col>
                                        </Row>
                                        <Row>
                                            <Col xs="6" className="text-center">
                                                <div className="text-center" style={{maxWidth: "500px", height: "250px"}} id="gskillgraph">
                                                    <ProfileGraph skill={gskill} />
                                                </div>
                                            </Col>
                                            <Col xs="6" className="text-center">
                                                <div className="text-center" style={{maxWidth: "500px", height: "250px"}} id="dskillgraph">
                                                    <ProfileGraph skill={dskill} />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="6" className="text-center">
                                                <div id="grecentgraph">
                                                </div>
                                            </Col>
                                            <Col xs="6" className="text-center">
                                                <div id="drecentgraph">
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row class="blackandwhite prof-oldver">
                                            <Col xs="3" className="text-center">MX</Col>
                                            <Col xs="3" className="text-center dskill" id="gskillmx">{gskillmx}</Col>
                                            <Col xs="3" className="text-center">MX</Col>
                                            <Col xs="3" className="text-center dskill" id="dskillmx">{dskillmx}</Col>
                                        </Row>
                                        <Row class="blackandwhite prof-oldver">
                                            <Col xs="3" className="text-center">TBRE</Col>
                                            <Col xs="3" className="text-center dskill" id="gskilltbre">{gskilltbre}</Col>
                                            <Col xs="3" className="text-center">TBRE</Col>
                                            <Col xs="3" className="text-center dskill" id="dskilltbre">{dskilltbre}</Col>
                                        </Row>
                                        <Row class="blackandwhite prof-oldver">
                                            <Col xs="3" className="text-center">TB</Col>
                                            <Col xs="3" className="text-center dskill" id="gskilltb">{gskilltb}</Col>
                                            <Col xs="3" className="text-center">TB</Col>
                                            <Col xs="3" className="text-center dskill" id="dskilltb">{dskilltb}</Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row className="text-center" id="btnGroups">
                            <ProfileButton self={this.state.self} />
                        </Row>
                        
                        <Row id="targetTable">
                            <Col xs="12">
                                <Card>
                                    <CardHeader>
                                        <h3>{tableHeader}</h3>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col sm="8">
                                                <table className="table prof-table text-center" style={{width:100+'%'}}>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>GuitarFreaks</th>
                                                        <th>DrumMania</th>
                                                    </tr>
                                                    <tr>
                                                        <th>{thSkill}</th>
                                                        <td id="tableGskill">{tdGskill}</td>
                                                        <td id="tableDskill">{tdDskill}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>{thClear}</th>
                                                        <td id="tableGclear">{tdGclear}</td>
                                                        <td id="tableDclear">{tdDclear}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>{thFc}</th>
                                                        <td id="tableGfc">{tdGfc}</td>
                                                        <td id="tableDfc">{tdDfc}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>{thExc}</th>
                                                        <td id="tableGexc">{tdGexc}</td>
                                                        <td id="tableDexc">{tdDexc}</td>
                                                    </tr>
                                                    <tr>
                                                        <th id="tableAcnt">{thCount}<br/>{thTotalCnt}</th>
                                                        <td id="tableGcnt">{tdGcnt}</td>
                                                        <td id="tableDcnt">{tdDcnt}</td>
                                                    </tr>
                                                </table>
                                                <Row id="countupdate" v-html="countupdate"></Row>
                                                <span className="prof-table" v-html='countdesc'></span><br/>
                                                <Row id="reset" v-html="reset"></Row>
                                            </Col>
                                            <Col sm="4">
                                                <img style={{width:100+'%'}}
                                                        src={"https://gitadora.info/board/"+id+".png"}
                                                        onError="this.src='/img/music/empty.jpg'" />
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Fragment>
            )
        }
    }
}

export default Profile;