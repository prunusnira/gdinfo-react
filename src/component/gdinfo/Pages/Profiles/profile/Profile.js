import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as action from '../../../Redux/actions/index';
import ProfileButton from './ProfileButton';
import axios from 'axios';
import txtProfile from './txtprofile';
import LData from '../../Common/language';
import ProfileRecent from './ProfileRecent';
import SingleSkillColorChanger from '../../Common/skillcolor';
import './profile.css';
import '../../../css/overall-b.css';

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

class Profile extends Component {
    state = {
        profileData: null,
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
    
    countUpdate() {
		axios.post('/d/profile/countupdate/'+this.props.id)
        .then((data) => {
            window.location.reload();
        });
    }
    
    reset() {
        axios.post('/reset', {
            params: {
                id: this.props.id
            }
        });
	}

    componentDidMount() {
        const id = this.props.match.params.id;
        if(this.props.userinfo.id === id) {
            this.setState({
                self: true
            });
        }

        axios.post(commonData.commonDataURL+"getuserid/"+id)
        .then((res) => {
            this.setState({
                profileData: res.data
            });
        });
    }

    render() {
        const id = this.props.match.params.id;

        if(this.state.profileData == null) {
            // show loading
            return (
                <h1>LOADING</h1>
            )
        }
        else {
            const userinfo = this.state.profileData;
            const self = this.state.self;

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
                                        <h3>{txtProfile.profile[lang]}</h3>
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
                                                                    if(towertitle !== "") {
                                                                        return (<img alt="titletower" className="towertitle50" src={process.env.PUBLIC_URL+"/general-img/title/"+towertitle+".png"} />)
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
                                                    <Col xs="12">
                                                        {commentTitle}
                                                        {
                                                            (function() {
                                                                if(self) {
                                                                    return (
                                                                        <Button onClick={() => this.setComment()}>
                                                                            {txtProfile.button.changecomment[lang]}
                                                                        </Button>
                                                                    )
                                                                }
                                                            })()
                                                        }
                                                    </Col>
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
                                                <Row>
                                                    <Col xs="3" className="text-right">EX</Col>
                                                    <Col xs="9" className="text-left">
                                                        <a href="#no_div"
                                                            tag={Link} to={"/skill/2/"+this.props.id+"/gf/1/skilldesc"}>
                                                            <SingleSkillColorChanger skill={gskill} />
                                                        </a>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="3" className="text-right">MX</Col>
                                                    <Col xs="9" className="text-left">
                                                        <a href="#no_div"
                                                            tag={Link} to={"/skill/8/"+this.props.id+"/gf/1/1"}>
                                                            <SingleSkillColorChanger skill={gskillmx} />
                                                        </a>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="3" className="text-right">RE</Col>
                                                    <Col xs="9" className="text-left">
                                                        <a href="#no_div"
                                                            tag={Link} to={"/skill/5/"+this.props.id+"/gf/1/1"}>
                                                            <SingleSkillColorChanger skill={gskilltbre} />
                                                        </a>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="3" className="text-right">TB</Col>
                                                    <Col xs="9" className="text-left">
                                                        <a href="#no_div"
                                                            tag={Link} to={"/skill/6/"+this.props.id+"/gf/1/1"}>
                                                            <SingleSkillColorChanger skill={gskilltb} />
                                                        </a>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs="6" className="text-center">
                                                <Row>
                                                    <Col xs="3" className="text-right">EX</Col>
                                                    <Col xs="9" className="text-left">
                                                        <a href="#no_div"
                                                            tag={Link} to={"/skill/2/"+this.props.id+"/dm/1/skilldesc"}>
                                                            <SingleSkillColorChanger skill={dskill} />
                                                        </a>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="3" className="text-right">MX</Col>
                                                    <Col xs="9" className="text-left">
                                                        <a href="#no_div"
                                                            tag={Link} to={"/skill/8/"+this.props.id+"/dm/1/1"}>
                                                            <SingleSkillColorChanger skill={dskillmx} />
                                                        </a>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="3" className="text-right">RE</Col>
                                                    <Col xs="9" className="text-left">
                                                        <a href="#no_div"
                                                            tag={Link} to={"/skill/5/"+this.props.id+"/dm/1/1"}>
                                                            <SingleSkillColorChanger skill={dskilltbre} />
                                                        </a>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="3" className="text-right">TB</Col>
                                                    <Col xs="9" className="text-left">
                                                        <a href="#no_div"
                                                            tag={Link} to={"/skill/6/"+this.props.id+"/dm/1/1"}>
                                                            <SingleSkillColorChanger skill={dskilltb} />
                                                        </a>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="6" className="text-center">
                                                <ProfileRecent type="gf" id={id} />
                                            </Col>
                                            <Col xs="6" className="text-center">
                                                <ProfileRecent type="dm" id={id} />
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row className="text-center" id="btnGroups">
                            <ProfileButton self={this.state.self} id={this.props.match.params.id} />
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
                                                <Row id="countupdate">
                                                    {
                                                        (function() {
                                                            if(self) {
                                                                return (
                                                                    <Fragment>
                                                                        <Button onClick={() => this.countUpdate()}>
                                                                            {txtProfile.button.countupdate[lang]}
                                                                        </Button>
                                                                        <Button onClick={() => this.setOpenCount()}>
                                                                            {txtProfile.button.setopencount[lang]}
                                                                        </Button>
                                                                    </Fragment>
                                                                )
                                                            }
                                                        })()
                                                    }
                                                </Row>
                                                <span className="prof-table" dangerouslySetInnerHTML={{
                                                    __html:txtProfile.detailed.countdesc[lang]
                                                }}>
                                                </span><br/>
                                                <Row id="reset">
                                                    {
                                                        (function() {
                                                            if(self) {
                                                                return (
                                                                    <form onSubmit={() => this.reset()}>
                                                                        <Button type="submit">
                                                                            {txtProfile.button.reset[lang]}
                                                                        </Button>
                                                                    </form>
                                                                )
                                                            }
                                                        })()
                                                    }
                                                </Row>
                                            </Col>
                                            <Col sm="4">
                                                <img alt="board" style={{width:100+'%'}}
                                                        src={"https://gitadora.info/board/"+id+".png"}
                                                        onError={(e) => {
                                                            e.target.src=commonData.commonImageURL+'music/empty.jpg';
                                                         }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);