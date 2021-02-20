import React, {Component} from 'react';
import {Redirect, RouteComponentProps} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import txtNewuser from './txtnewuser';
import txtTerms from '../../terms/txtterms';
import LData from '../../Common/language';
import {actionCreator, LoginInfo} from '../../../Redux/action';

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
import { StoreState } from '../../../Redux/reducer';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';

interface Props {
    userinfo: LoginInfo,
    login: boolean,
    setUserinfo: (info: LoginInfo) => void,
    Actions: typeof actionCreator
}

interface State {
    moveToAbout: boolean,
    moveToIndex: boolean,
}

class NewUser extends Component<Props, State> {
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
        const token = this.props.userinfo.token;
        this.props.Actions.setLogout();
        const params = new URLSearchParams();
        params.append("token", token);
        axios.post(CommonData.dataUrl+"newuser", params)
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
        axios.post(CommonData.dataUrl+"dropuser")
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
                                            <h4>{(txtNewuser.title as any)[this.lang]}</h4>
                                            <span>{(txtNewuser.desc as any)[this.lang]}</span>
                                        </Col>
                                        <Col xs="12" className="text-right">
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

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    Actions: bindActionCreators(actionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);