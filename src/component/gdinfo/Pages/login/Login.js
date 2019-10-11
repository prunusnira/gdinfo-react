import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {sha256} from 'js-sha256';
import LData from '../Common/language';
import GoogleLogin from 'react-google-login';
import * as action from '../../Redux/actions/index';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';
import commonData from '../Common/commonData';

const lang = LData.lang;
const text = LData.text;

class Login extends Component {
    state = {
        newuser: false,
        token: ""
    }

    updateUserinfo(info) {
        this.props.setUserinfo(info);
    }

    responseGoogle = (res) => {
        const token = res.getBasicProfile().getEmail().split("@")[0];
        const hash = sha256(token);
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
                        newuser: true
                    });
                    break;
                case "prohibit":
                    break;
            }
        };
        xhr.send('token=' + hash);
    }

    responseFail = (e) => {
        console.log(e);
    }

    render() {
        const self = this;
        if(self.state.newuser) {
            return (
                <Redirect to={{
                    pathname: "/newuser",
                    state: { token: self.state.token }
                }} />
            )
        }
        else {
            return (
                <Container>
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardHeader>
                                    <h3>{text.login.title[lang]}</h3>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col xs="12">
                                            <span>{text.login.google[lang]}</span>
                                        </Col>
                                        <Col xs="12">
                                            <GoogleLogin
                                                theme="dark"
                                                clientId={commonData.googleLoginClientId}
                                                buttonText="Login with Google"
                                                onSuccess={this.responseGoogle}
                                                onFailure={this.responseFail}
                                                cookiePolicy={'single_host_origin'} />
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
    }
}

// connect - 4개의 파라미터(All optional)
// connect를 이용하여 store와 연결해줌
// 특정 컴포넌트 클래스의 props를 store에 연결시켜주는 함수를 리턴
// (이렇게 리턴된 것은 기존 컴포넌트를 수정한 것이 아닌 새로운 컴포넌트이다.)

// 1. mapStateToProps (state[, ownProps])
// store의 state를 props에 매핑
// ownProps가 명시된경우 이를 사용해서 함수 내부에서 컴포넌트의 props에 접근 가능
const mapStateToProps = (state) => {
    return {
        userinfo: state.tokenReducer.userinfo,
        login: state.tokenReducer.login
    }
};

// 2. mapDistpatchToProps (dispatch[, ownProps])
// 컴포넌트의 함수형 props를 실행했을 때 개발자가 지정한 action을 dispatch함
// 여기서 ownProps를 설정하면 props.function으로 action을 dispatch 할 수 있음
const mapDispatchToProps = (dispatch) => {
    return {
        setUserinfo: (userinfo) => {
            dispatch(action.setLogin(userinfo))
        }
    }
}

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;