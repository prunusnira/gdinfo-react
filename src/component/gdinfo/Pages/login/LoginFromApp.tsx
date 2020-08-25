import React, {Component} from 'react';
import axios from 'axios';
import {Redirect, RouteComponentProps, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import LData from '../Common/language';
import {actionCreator, LoginInfo} from '../../Redux/action';
import txtLogin from './txtLogin';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button
} from 'reactstrap';
import commonData from '../Common/commonData';
import { StoreState } from '../../Redux/reducer';
import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import ProfileData from '../Profiles/profile/profileData';

interface Props {
    Actions: typeof actionCreator
}

interface IMatchProps {
    uid: string
}

interface State {
    failed: boolean,
    token: string,
    logindone: boolean
}

class LoginFromApp extends Component<RouteComponentProps<IMatchProps> & Props, State> {
    lang = LData.lang;

    state: State = {
        failed: false,
        token: this.props.match.params.uid,
        logindone: false
    }

    componentDidMount() {
        // 존재하는 token인지 확인
        this.checkUserTokenExist(this.state.token);
    }

    updateUserinfo(info: LoginInfo) {
        this.props.Actions.setLogin(info);
    }

    checkUserTokenExist(token: string) {
        axios.post(commonData.commonDataURL+"getuser/"+token)
        .then((res) => {
            if(res.data.mydata == null) {
                // 로그인 되어있지 않은 상태
                this.setState({
                    failed: true
                });
            }
            else {
                // 로그인 되어있는 상태
                this.loginFromApp(this.props.match.params.uid);
            }
        });
    }

    loginFromApp = (hash: string) => {
        const self = this;
        
        const xhr = new XMLHttpRequest();
        xhr.open('POST', commonData.commonMainURL+"loginseq");
        xhr.setRequestHeader('Content-Type',
                'application/x-www-form-urlencoded');
        xhr.onload = function() {
            const rtn = xhr.responseText;
            const json = JSON.parse(rtn);

            switch(json.loginData.stat) {
                case "login":
                    self.updateUserinfo(json.loginData);
                    window.location.href="/index";
                    break;
                case "newuser":
                    self.setState({
                        token: json.loginData.token,
                        failed: true
                    });
                    break;
                case "prohibit":
                    break;
            }
        };
        xhr.send('token=' + hash);
    }

    responseFail = (e: any) => {
        console.log(e);
    }

    render() {
        if(this.state.logindone) {
            // redirect home
            return (
                <Redirect to={{
                    pathname: "/"
                }} />
            )
        }
        else if(this.state.failed) {
            return (
                <Container fluid={true}>
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardHeader>
                                    <h3>{(txtLogin.titleAppFail as any)[this.lang]}</h3>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col xs="12">
                                            <h4>{(txtLogin.contentAppFailTitle as any)[this.lang]}</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <span dangerouslySetInnerHTML={{__html: (txtLogin.contentAppFail as any)[this.lang]}}></span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Button tag={Link} to="/">
                                                Home
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <div style={{display: 'none'}}>
                        <form action='/loginseq' id='register' method='post'>
                            <input type='text' id='token' name='token' />
                        </form>
                    </div>
                </Container>
            )
        }
        else {
            return (
                <Container>
                    <Row>
                        <Col xs="12">
                            <h3>
                                Please wait for sequence is done
                            </h3>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

// connect - 4개의 파라미터(All optional)
// connect를 이용하여 store와 연결해줌
// 특정 컴포넌트 클래스의 props를 store에 연결시켜주는 함수를 리턴
// (이렇게 리턴된 것은 기존 컴포넌트를 수정한 것이 아닌 새로운 컴포넌트이다.)

// 1. mapStateToProps (state[, ownProps])
// store의 state를 props에 매핑
// ownProps가 명시된경우 이를 사용해서 함수 내부에서 컴포넌트의 props에 접근 가능
const mapStateToProps = (state: StoreState) => {
    return {
        userinfo: state.loginReducer.userinfo,
        login: state.loginReducer.login
    }
};

// 2. mapDistpatchToProps (dispatch[, ownProps])
// 컴포넌트의 함수형 props를 실행했을 때 개발자가 지정한 action을 dispatch함
// 여기서 ownProps를 설정하면 props.function으로 action을 dispatch 할 수 있음
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    Actions: bindActionCreators(actionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginFromApp);