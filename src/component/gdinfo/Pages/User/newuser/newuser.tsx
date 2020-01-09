import React, {Component} from 'react';
import {Redirect, RouteComponentProps} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import txtNewuser from './txtnewuser';
import txtTerms from '../../terms/txtterms';
import LData from '../../Common/language';
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
import commonData from '../../Common/commonData';
import { StoreState } from '../../../Redux/reducer';

interface IMatchProps {

}

interface Props {
    userinfo: LoginInfo,
    login: boolean,
    setUserinfo: (info: LoginInfo) => void
}

interface State {
    moveToAbout: boolean,
    moveToIndex: boolean,
}

class NewUser extends Component<RouteComponentProps<IMatchProps> & Props, State> {
    lang = LData.lang;

    state: State = {
        moveToAbout: false,
        moveToIndex: false
    }

    updateUserinfo(info: LoginInfo) {
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
                <Container fluid={true}>
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardHeader>
                                    <h3>Sign Up</h3>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col xs="12" style={{padding:"5px"}}>
                                            <h4>{(txtNewuser.title as any)[this.lang]}</h4>
                                            <span>{(txtNewuser.desc as any)[this.lang]}</span>
                                        </Col>
                                        <Col xs="12" style={{padding:"5px"}}>
                                            <h4>{(txtTerms.s1t as any)[this.lang]}</h4>
                                            <span>{(txtTerms.s1c as any)[this.lang]}</span>
                                        </Col>
                                        <Col xs="12" style={{padding:"5px"}}>
                                            <h4>{(txtTerms.s2t as any)[this.lang]}</h4>
                                            <span>{(txtTerms.s2c1 as any)[this.lang]}</span><br/>
                                            <span>{(txtTerms.s2c2 as any)[this.lang]}</span><br/>
                                            <span>{(txtTerms.s2c3 as any)[this.lang]}</span><br/>
                                            <span>{(txtTerms.s2c4 as any)[this.lang]}</span>
                                        </Col>
                                        <Col xs="12" style={{padding:"5px"}}>
                                            <h4>{(txtTerms.s3t as any)[this.lang]}</h4>
                                            <span>{(txtTerms.s3c1 as any)[this.lang]}</span><br/>
                                            <span>{(txtTerms.s3c2 as any)[this.lang]}</span>
                                        </Col>
                                        <Col xs="12" style={{padding:"5px"}}>
                                            <h4>{(txtTerms.s4t as any)[this.lang]}</h4>
                                            <span>{(txtTerms.s4c1 as any)[this.lang]}</span><br/>
                                            <span>{(txtTerms.s4c2 as any)[this.lang]}</span><br/>
                                            <span>{(txtTerms.s4c3 as any)[this.lang]}</span>
                                        </Col>
                                        <Col xs="12" style={{padding:"5px"}}>
                                            <h4>{(txtTerms.s5t as any)[this.lang]}</h4>
                                            <span>{(txtTerms.s5c1 as any)[this.lang]}</span><br/>
                                            <span>{(txtTerms.s5c2 as any)[this.lang]}</span><br/>
                                            <span>{(txtTerms.s5c3 as any)[this.lang]}</span>
                                        </Col>
                                        <Col xs="12" className="btn-group">
                                            <Button onClick={() => self.addNewUser()}>
                                                {(txtNewuser.btnsign as any)[this.lang]}
                                            </Button>
                                            <Button onClick={() => self.dropUser()}>
                                                {(txtNewuser.btndecline as any)[this.lang]}
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

const mapStateToProps = (state: StoreState) => {
    return {
        userinfo: state.loginReducer.userinfo,
        login: state.loginReducer.login
    }
};

export default connect(mapStateToProps)(NewUser);