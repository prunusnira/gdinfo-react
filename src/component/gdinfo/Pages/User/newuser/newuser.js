import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import txtNewuser from './txtnewuser';
import txtTerms from '../../terms/txtterms';
import LData from '../../Common/language';
import * as action from '../../../Redux/actions';

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

class NewUser extends Component {
    state = {
        moveToAbout: false,
        moveToIndex: false
    }

    updateUserinfo(info) {
        this.props.setUserinfo(info);
    }

    addNewUser() {
        const self = this;
        const params = new URLSearchParams();
        params.append("token", this.props.location.state.token);
        axios.post(commonData.commonDataURL+"newuser", params)
        .then((res) => {
            const json = res.data.loginData;
            switch(json.stat) {
                case "login":
                    self.updateUserinfo(json);
                    this.setState({
                        moveToAbout: true
                    });
                    break;
                case "error":
                default:
                    this.setState({
                        moveToIndex: true
                    });
                    break;
            }
        });
    }

    dropUser() {
        axios.post(commonData.commonDataURL+"dropuser")
        .then((res) => {
            this.setState({
                moveToIndex: true
            });
        });
    }

    render() {
        const self = this;
        if(this.state.moveToAbout) {
            return <Redirect to={"/aboutpc"} />
        }
        else if(this.state.moveToIndex) {
            return <Redirect to={"/index"} />
        }
        else {
            return (
                <Container>
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardHeader>
                                    <h3>Sign Up</h3>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col xs="12" style={{padding:"5px"}}>
                                            <h4>{txtNewuser.title[lang]}</h4>
                                            <span>{txtNewuser.desc[lang]}</span>
                                        </Col>
                                        <Col xs="12" style={{padding:"5px"}}>
                                            <h4>{txtTerms.s1t[lang]}</h4>
                                            <span>{txtTerms.s1c[lang]}</span>
                                        </Col>
                                        <Col xs="12" style={{padding:"5px"}}>
                                            <h4>{txtTerms.s2t[lang]}</h4>
                                            <span>{txtTerms.s2c1[lang]}</span><br/>
                                            <span>{txtTerms.s2c2[lang]}</span><br/>
                                            <span>{txtTerms.s2c3[lang]}</span><br/>
                                            <span>{txtTerms.s2c4[lang]}</span>
                                        </Col>
                                        <Col xs="12" style={{padding:"5px"}}>
                                            <h4>{txtTerms.s3t[lang]}</h4>
                                            <span>{txtTerms.s3c1[lang]}</span><br/>
                                            <span>{txtTerms.s3c2[lang]}</span>
                                        </Col>
                                        <Col xs="12" style={{padding:"5px"}}>
                                            <h4>{txtTerms.s4t[lang]}</h4>
                                            <span>{txtTerms.s4c1[lang]}</span><br/>
                                            <span>{txtTerms.s4c2[lang]}</span><br/>
                                            <span>{txtTerms.s4c3[lang]}</span>
                                        </Col>
                                        <Col xs="12" style={{padding:"5px"}}>
                                            <h4>{txtTerms.s5t[lang]}</h4>
                                            <span>{txtTerms.s5c[lang]}</span>
                                        </Col>
                                        <Col xs="12" className="btn-group">
                                            <Button onClick={() => self.addNewUser()}>
                                                {txtNewuser.btnsign[lang]}
                                            </Button>
                                            <Button onClick={() => self.dropUser()}>
                                                {txtNewuser.btndecline[lang]}
                                            </Button>
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
}

const mapStateToProps = (state) => {
    return {
        userinfo: state.tokenReducer.userinfo,
        login: state.tokenReducer.login
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUserinfo: (userinfo) => {
            dispatch(action.setLogin(userinfo))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);