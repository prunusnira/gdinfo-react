import React, {Component, Fragment} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import {connect} from 'react-redux';
import {LoginInfo} from '../../../Redux/action';
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
import CommonData from '../../Common/commonData';
import ProfileData from './profileData';
import { StoreState } from '../../../Redux/reducer';
import ProfileBoard from './profileBoard';

interface IMatchProps {
    id: string
}

interface Props {
    userinfo: LoginInfo,
    login: boolean
}

interface State {
    profileData: ProfileData,
    self: boolean,
    isCommentOpen: string,
    isCountOpen: string,
    CommentCommit: boolean,
    CountCommit: boolean,
    comment: string,
    opencnt: string
}

class Profile extends Component<RouteComponentProps<IMatchProps> & Props, State> {
    lang = LData.lang;
    commentInput = React.createRef<HTMLInputElement>();

    constructor(props: RouteComponentProps<IMatchProps> & Props) {
        super(props);
        this.updateOpenValue = this.updateOpenValue.bind(this);
    }

    state: State = {
        profileData: new ProfileData(),
        self: false,
        isCommentOpen: "none",
        isCountOpen: "none",
        CommentCommit: false,
        CountCommit: false,
        comment: "",
        opencnt: "N"
    };

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
	
	submitOpen(id: string, open: string) {
        axios.get(CommonData.dataUrl+"setopencount", {
            params: {
                open: open,
                id: parseInt(id)
            }
        })
        .then((res) => {
            this.closeOpen();
        });
    }

    updateOpenValue(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        console.log(e.currentTarget.value);
        this.setState({
            opencnt: e.currentTarget.value
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
	
	submitComment(id: string, comment: string) {
        axios.get(CommonData.dataUrl+"setcomment", {
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
		axios.post(CommonData.dataUrl+"profile/countupdate/"+this.props.userinfo.id)
        .then((data) => {
            window.location.reload();
        });
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if(parseInt(this.props.userinfo.id) === parseInt(id)) {
            this.setState({
                self: true
            });
        }

        axios.post(CommonData.dataUrl+"getuserid/"+id)
        .then((res) => {
            const json = JSON.parse(res.data.mydata);
            this.setState({
                profileData: json,
                comment: json.comment,
                opencnt: json.opencount
            });
        });
    }

    render() {
        const id = this.props.match.params.id;

        if(this.state.profileData == null) {
            // show loading
            return null;
        }
        else {
            const userinfo = this.state.profileData;
            const selfUser = this.state.self;
            const urlprop = this.props.match.params;
            const self = this;

            // upper table
            const title = (userinfo.title === "") ? "No Title" : userinfo.title;
            const name = (userinfo.name === "") ? "(No Name)" : userinfo.name;
            const towertitle = userinfo.titletower;
            const gskill = userinfo.gskill;
            const gskillnx = userinfo.gskillnx;
            const gskillex = userinfo.gskillex;
            const gskillmx = userinfo.gskillmx;
            const gskilltbre = userinfo.gskilltbre;
            const gskilltb = userinfo.gskilltb;
            const dskill = userinfo.dskill;
            const dskillnx = userinfo.dskillnx;
            const dskillex = userinfo.dskillex;
            const dskillmx = userinfo.dskillmx;
            const dskilltbre = userinfo.dskilltbre;
            const dskilltb = userinfo.dskilltb;

            // lower table
            const tdGskill = gskill + " (" + userinfo.gskillall + ")";
            const tdDskill = dskill + " (" + userinfo.dskillall + ")";
            const tdGclear = userinfo.gclearlv+" ("+userinfo.gclearnum+")";
            const tdDclear = userinfo.dclearlv+" ("+userinfo.dclearnum+")";
            const tdGfc = userinfo.gfclv+" ("+userinfo.gfcnum+")";
            const tdDfc = userinfo.dfclv+" ("+userinfo.dfcnum+")";
            const tdGexc = userinfo.gexclv+" ("+userinfo.gexcnum+")";
            const tdDexc = userinfo.dexclv+" ("+userinfo.dexcnum+")";
            const thTotalCnt = userinfo.countgf + userinfo.countdm;
            const tdGcnt = userinfo.countgf;
            const tdDcnt = userinfo.countdm;

            return (
                <Fragment>
                    <div id="opencount" className="crawler"
                        style={{display:this.state.isCountOpen}}>
                        <div>
                            <br/><br/><br/><br/>
                            <h3 style={{color: "black"}}>
                                {(txtProfile.button.setdataopen as any)[this.lang]}
                            </h3>
                            <div className='div-table'>
                                <div className='div-table-row'>
                                    <div className='div-table-cell'>
                                        <label id="opencntLabelYes" style={{color:"black"}}>
                                            {(function() {
                                                if(self.state.opencnt === "Y") {
                                                    return <input type='radio' name='opencount' value='Y' checked />
                                                }
                                                else {
                                                    return <input type='radio' name='opencount' value='Y'
                                                        onClick={self.updateOpenValue} />
                                                }
                                            })()}
                                            {(txtProfile.dataopen.yes as any)[this.lang]}
                                        </label>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label id="opencntLabelNo" style={{color:"black"}}>
                                            {(function() {
                                                if(self.state.opencnt === "N") {
                                                    return <input type='radio' name='opencount' value='N' checked />
                                                }
                                                else {
                                                    return <input type='radio' name='opencount' value='N'
                                                        onClick={self.updateOpenValue} />
                                                }
                                            })()}
                                            {(txtProfile.dataopen.no as any)[this.lang]}
                                        </label>
                                    </div>
                                </div>
                                <div className='div-table-row'>
                                    <div className='div-table-cell'>
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
                                {(txtProfile.button.changecomment as any)[this.lang]}
                            </h3>
                            <div className="div-table">
                                <div className="div-table-row">
                                    <div className="div-table-cell">
                                        <label style={{color:'black'}} htmlFor="newcomment">
                                            {(txtProfile.changecomment.desc as any)[this.lang]}<br/>
                                        </label>
                                        <input ref={this.commentInput}
                                            className="form-control" type="text"
                                            name="newcomment" id="commentInput" />
                                    </div>
                                </div>
                                <div className="div-table-row">
                                    <div className="div-table-cell">
                                        <Button onClick={() => this.submitComment(id, self.commentInput.current!.value)}>Apply</Button>
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
                                        <h3>{(txtProfile.profile as any)[this.lang]}</h3>
                                    </CardHeader>
                                    <CardBody className="text-center" id="profilescr">
                                        <Row>
                                            <Col xs="12" md="8">
                                                <Row>
                                                    <Col xs="4">
                                                        {(txtProfile.table1.prof as any)[this.lang]}<br/>
                                                    </Col>
                                                    <Col xs="8">
                                                        <Row className="text-left">
                                                            <Col xs="12" id="usertitle">({title})</Col>
                                                            <Col xs="12" id="username">
                                                                <span id="usertowertitle">
                                                                    {
                                                                        (function() {
                                                                            if(towertitle !== "") {
                                                                                return (<img alt="titletower" className="towertitle35" src={process.env.PUBLIC_URL+"/general-img/title/"+towertitle+".png"} />)
                                                                            }
                                                                        })()
                                                                    }
                                                                </span>
                                                                <span className="title">{name}</span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="4">
                                                        {(txtProfile.table1.comment as any)[this.lang]}<br/>
                                                        {
                                                            (function() {
                                                                if(selfUser) {
                                                                    return (
                                                                        <Button size="sm" onClick={() => self.setComment()}>
                                                                            {(txtProfile.button.changecomment as any)[self.lang]}
                                                                        </Button>
                                                                    )
                                                                }
                                                            })()
                                                        }
                                                    </Col>
                                                    <Col xs="8" className="text-left">
                                                        {self.state.comment}
                                                    </Col>
                                                </Row>
                                                <hr className="col-12"/>
                                                <Row>
                                                    <Col xs="12">
                                                        {(txtProfile.click as any)[this.lang]}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="6" className="text-center">GF</Col>
                                                    <Col xs="6" className="text-center">DM</Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="6" className="text-center">
                                                        <Row>
                                                            <Col xs="4" className="text-right">HV</Col>
                                                            <Col xs="8" className="text-center">
                                                                <SingleSkillColorChanger
                                                                    link={"/skill/2/"+urlprop.id+"/gf/1/skilldesc"}
                                                                    skill={gskill} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs="4" className="text-right">NX</Col>
                                                            <Col xs="8" className="text-center">
                                                                <SingleSkillColorChanger
                                                                    link={"/skill/2/"+urlprop.id+"/gf/1/skilldesc"}
                                                                    skill={gskillnx} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs="4" className="text-right">EX</Col>
                                                            <Col xs="8" className="text-center">
                                                                <SingleSkillColorChanger
                                                                    link={"/skill/10/"+urlprop.id+"/gf/1/skilldesc"}
                                                                    skill={gskillex} />
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
                                                            <Col xs="4" className="text-right">HV</Col>
                                                            <Col xs="8" className="text-center">
                                                                <SingleSkillColorChanger
                                                                    link={"/skill/2/"+urlprop.id+"/dm/1/skilldesc"}
                                                                    skill={dskill} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs="4" className="text-right">NX</Col>
                                                            <Col xs="8" className="text-center">
                                                                <SingleSkillColorChanger
                                                                    link={"/skill/2/"+urlprop.id+"/dm/1/skilldesc"}
                                                                    skill={dskillnx} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs="4" className="text-right">EX</Col>
                                                            <Col xs="8" className="text-center">
                                                                <SingleSkillColorChanger
                                                                    link={"/skill/10/"+urlprop.id+"/dm/1/skilldesc"}
                                                                    skill={dskillex} />
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
                                            </Col>
                                            <Col md="4" className="d-none d-md-block">
                                                <ProfileBoard id={id} />
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
                                        <h3>{(txtProfile.detail as any)[this.lang]}</h3>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col xs="12" sm="8" md="12">
                                                <table className="table prof-table text-center" style={{width:100+'%'}}>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>GuitarFreaks</th>
                                                        <th>DrumMania</th>
                                                    </tr>
                                                    <tr>
                                                        <th>{(txtProfile.detailed.s as any)[this.lang]}</th>
                                                        <td id="tableGskill">{tdGskill}</td>
                                                        <td id="tableDskill">{tdDskill}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>{(txtProfile.detailed.clv as any)[this.lang]}</th>
                                                        <td id="tableGclear">{tdGclear}</td>
                                                        <td id="tableDclear">{tdDclear}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>{(txtProfile.detailed.flv as any)[this.lang]}</th>
                                                        <td id="tableGfc">{tdGfc}</td>
                                                        <td id="tableDfc">{tdDfc}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>{(txtProfile.detailed.elv as any)[this.lang]}</th>
                                                        <td id="tableGexc">{tdGexc}</td>
                                                        <td id="tableDexc">{tdDexc}</td>
                                                    </tr>
                                                    {
                                                        (function() {
                                                            if(self.state.opencnt === "N" && !selfUser) {
                                                                return (
                                                                    <tr>
                                                                        <th id="tableAcnt">{(txtProfile.detailed.count as any)[self.lang]}<br/>Closed</th>
                                                                        <td id="tableGcnt">Closed</td>
                                                                        <td id="tableDcnt">Closed</td>
                                                                    </tr>
                                                                )
                                                            }
                                                            else {
                                                                return (
                                                                    <tr>
                                                                        <th id="tableAcnt">{(txtProfile.detailed.count as any)[self.lang]}<br/>{thTotalCnt}</th>
                                                                        <td id="tableGcnt">{tdGcnt}</td>
                                                                        <td id="tableDcnt">{tdDcnt}</td>
                                                                    </tr>
                                                                )
                                                            }
                                                        })()
                                                    }
                                                    
                                                </table>
                                                <Row id="countupdate">
                                                    {
                                                        (function() {
                                                            if(selfUser) {
                                                                return (
                                                                    <Fragment>
                                                                        <Button onClick={() => self.countUpdate()}>
                                                                            {(txtProfile.button.countupdate as any)[self.lang]}
                                                                        </Button>
                                                                        <Button onClick={() => self.setOpenCount()}>
                                                                            {(txtProfile.button.setdataopen as any)[self.lang]}
                                                                        </Button>
                                                                    </Fragment>
                                                                )
                                                            }
                                                        })()
                                                    }
                                                </Row>
                                                <span className="prof-table" dangerouslySetInnerHTML={{
                                                    __html:(txtProfile.detailed.countdesc as any)[this.lang]
                                                }}>
                                                </span><br/>
                                                <Row id="reset">
                                                    {
                                                        (function() {
                                                            if(selfUser) {
                                                                return (
                                                                    <Button type="submit" tag={Link} to={"/reset"}>
                                                                        {(txtProfile.button.reset as any)[self.lang]}
                                                                    </Button>
                                                                )
                                                            }
                                                        })()
                                                    }
                                                </Row>
                                            </Col>
                                            <Col sm="4" className="d-block d-md-none">
                                                <ProfileBoard id={id} />
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

const mapStateToProps = (state: StoreState) => {
    return {
        userinfo: state.loginReducer.userinfo,
        login: state.loginReducer.login
    }
};

export default connect(mapStateToProps)(Profile);