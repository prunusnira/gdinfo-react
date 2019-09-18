import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as action from '../../../Redux/actions/index';
import ProfileButton from './profileButton';
import axios from 'axios';
import txtProfile from './txtprofile';
import LData from '../../Common/language';
import ProfileRecent from './profileRecent';
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
    constructor(props) {
        super(props);

        this.commentInput = React.createRef();

        this.state = {
            profileData: null,
            self: false,
            isCommentOpen: "none",
            isCountOpen: "none",
            CommentCommit: false,
            CountCommit: false,
            comment: "",
            opencnt: "N"
        };
    }

    // function for count
    setOpenCount() {
        this.setState({
            isCountOpen: "block"
        });
	}
	
	closeOpen() {
		this.setState({
            isCountOpen: "none"
        });
	}
	
	submitOpen(id, open) {
        axios.get(commonData.commonDataURL+"setopencount", {
            params: {
                open: open,
                id: parseInt(id)
            }
        })
        .then((res) => {
            this.closeOpen();
        });
    }

    updateOpenValue(val) {
        this.setState({
            opencnt: val
        });
    }
	
	// Functions for comment
	setComment() {
		this.setState({
            isCommentOpen: "block"
        });
	}
	
	closeComment() {
		this.setState({
            isCommentOpen: "none"
        });
	}
	
	submitComment(id, comment) {
        axios.get(commonData.commonDataURL+"setcomment", {
            params: {
                val: comment,
                id: id
            }
        })
        .then((res) => {
            this.closeComment();
            this.setState({
                comment: comment
            });
        });
    }
    
    countUpdate() {
		axios.post(commonData.commonDataURL+"profile/countupdate/"+this.props.userinfo.id)
        .then((data) => {
            window.location.reload();
        });
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if(this.props.userinfo.id === parseInt(id)) {
            this.setState({
                self: true
            });
        }

        axios.post(commonData.commonDataURL+"getuserid/"+id)
        .then((res) => {
            this.setState({
                profileData: res.data,
                comment: res.data.mydata.comment,
                opencnt: res.data.mydata.opencount
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
            const selfUser = this.state.self;
            const urlprop = this.props.match.params;
            const self = this;

            // upper table
            const title = (userinfo.mydata.title === "") ? "No Title" : userinfo.mydata.title;
            const name = (userinfo.mydata.name === "") ? "(No Name)" : userinfo.mydata.name;
            const towertitle = userinfo.mydata.titletower;
            const commentTitle = txtProfile.table1.comment[lang];
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
                        style={{display:this.state.isCountOpen}}>
                        <div>
                            <br/><br/><br/><br/>
                            <h3 style={{color: "black"}}>
                                {txtProfile.button.setopencount[lang]}
                            </h3>
                            <div class='div-table'>
                                <div class='div-table-row'>
                                    <div class='div-table-cell'>
                                        <label id="opencntLabelYes" style={{color:"black"}}>
                                            {(function() {
                                                if(self.state.opencnt === "Y") {
                                                    return <input type='radio' name='opencount' value='Y' checked />
                                                }
                                                else {
                                                    return <input type='radio' name='opencount' value='Y'
                                                    onChange={() => self.updateOpenValue("Y")} />
                                                }
                                            })()}
                                            YES
                                        </label>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label id="opencntLabelNo" style={{color:"black"}}>
                                            {(function() {
                                                if(self.state.opencnt === "N") {
                                                    return <input type='radio' name='opencount' value='N' checked />
                                                }
                                                else {
                                                    return <input type='radio' name='opencount' value='N'
                                                        onChange={() => self.updateOpenValue("N")} />
                                                }
                                            })()}
                                            NO
                                        </label>
                                    </div>
                                </div>
                                <div class='div-table-row'>
                                    <div class='div-table-cell'>
                                        <Button onClick={() => this.submitOpen(id, self.state.opencnt)}>Apply</Button>
                                        <Button onClick={() => this.closeOpen()}>Cancel</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="commentset" className="crawler" style={{display:this.state.isCommentOpen}}>
                        <div>
                            <br/><br/><br/><br/>
                            <h3 style={{color:"black"}}>
                                {txtProfile.button.changecomment[lang]}
                            </h3>
                            <div class="div-table">
                                <div class="div-table-row">
                                    <div class="div-table-cell">
                                        <label style={{color:'black'}} for="newcomment">
                                            {txtProfile.changecomment.desc[lang]}<br/>
                                            {txtProfile.changecomment.desc2[lang]}<br/>
                                        </label>
                                        <input ref={this.commentInput}
                                            class="form-control" type="text"
                                            name="newcomment" id="commentInput" />
                                    </div>
                                </div>
                                <div class="div-table-row">
                                    <div class="div-table-cell">
                                        <Button onClick={() => this.submitComment(id, self.commentInput.current.value)}>Apply</Button>
                                        <Button onClick={() => this.closeComment()}>Cancel</Button>
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
                                                                if(selfUser) {
                                                                    return (
                                                                        <Button onClick={() => self.setComment()}>
                                                                            {txtProfile.button.changecomment[lang]}
                                                                        </Button>
                                                                    )
                                                                }
                                                            })()
                                                        }
                                                    </Col>
                                                    <Col xs="12" id="comment" class="col-12">{self.state.comment}</Col>
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
                                                    <Col xs="4" className="text-right">EX</Col>
                                                    <Col xs="8" className="text-center">
                                                        <SingleSkillColorChanger
                                                            link={"/skill/2/"+urlprop.id+"/gf/1/skilldesc"}
                                                            skill={gskill} />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="4" className="text-right">MX</Col>
                                                    <Col xs="8" className="text-center">
                                                        <SingleSkillColorChanger
                                                            link={"/skill/8/"+urlprop.id+"/gf/1/1"}
                                                            skill={gskillmx} />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="4" className="text-right">RE</Col>
                                                    <Col xs="8" className="text-center">
                                                        <SingleSkillColorChanger
                                                            link={"/skill/5/"+urlprop.id+"/gf/1/1"}
                                                            skill={gskilltbre} />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="4" className="text-right">TB</Col>
                                                    <Col xs="8" className="text-center">
                                                        <SingleSkillColorChanger
                                                            link={"/skill/6/"+urlprop.id+"/gf/1/1"}
                                                            skill={gskilltb} />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs="6" className="text-center">
                                                <Row>
                                                    <Col xs="4" className="text-right">EX</Col>
                                                    <Col xs="8" className="text-center">
                                                        <SingleSkillColorChanger
                                                            link={"/skill/2/"+urlprop.id+"/dm/1/skilldesc"}
                                                            skill={dskill} />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="4" className="text-right">MX</Col>
                                                    <Col xs="8" className="text-center">
                                                        <SingleSkillColorChanger
                                                            link={"/skill/8/"+urlprop.id+"/dm/1/1"}
                                                            skill={dskillmx} />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="4" className="text-right">RE</Col>
                                                    <Col xs="8" className="text-center">
                                                        <SingleSkillColorChanger
                                                            link={"/skill/5/"+urlprop.id+"/dm/1/1"}
                                                            skill={dskilltbre} />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="4" className="text-right">TB</Col>
                                                    <Col xs="8" className="text-center">
                                                        <SingleSkillColorChanger
                                                            link={"/skill/6/"+urlprop.id+"/dm/1/1"}
                                                            skill={dskilltb} />
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
                                                            if(selfUser) {
                                                                return (
                                                                    <Fragment>
                                                                        <Button onClick={() => self.countUpdate()}>
                                                                            {txtProfile.button.countupdate[lang]}
                                                                        </Button>
                                                                        <Button onClick={() => self.setOpenCount()}>
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
                                                            if(selfUser) {
                                                                return (
                                                                    <Button type="submit" tag={Link} to={"/reset"}>
                                                                        {txtProfile.button.reset[lang]}
                                                                    </Button>
                                                                )
                                                            }
                                                        })()
                                                    }
                                                </Row>
                                            </Col>
                                            <Col sm="4">
                                                <img alt="board" style={{width:100+'%'}}
                                                    src={commonData.commonMainURL+"board/"+id+".png"}
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