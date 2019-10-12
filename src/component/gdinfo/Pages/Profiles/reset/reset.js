import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import txtReset from './txtreset';
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

class ProfileReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            userid: 0
        };

        this.resetData = this.resetData.bind(this);
    }

    resetData() {
        const url = commonData.commonDataURL+"resetdata";

        const data = new URLSearchParams();
        data.append("id", this.props.userinfo.id);

        const config = {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        };

        axios.post(url, data/*, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }*/)
        .then((res) => {
            this.setState({
                redirect: true
            });
        })
        .catch((err) => {
            console.error(err);
        });
    }

    render() {
        const self = this;

        if(this.state.redirect) {
            return <Redirect to="/profile" />
        }
        if(!this.props.login) {
            return <Redirect to="/error/500" />
        }
        else {
            return (
                <Container>
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardHeader>
                                    <h3>Data Reset</h3>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col xs="12">
                                            <Card>
                                                <CardHeader>
                                                    <h3>{txtReset.title[lang]}</h3>
                                                </CardHeader>
                                                <CardBody>
                                                    <p>{txtReset.desc1[lang]}</p>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Card>
                                                <CardHeader>
                                                    <h3>{txtReset.desc2t[lang]}</h3>
                                                </CardHeader>
                                                <CardBody>
                                                    <p>{txtReset.desc2s[lang]}</p>
                                                    <p>{txtReset.desc3[lang]}</p>
                                                    <p>{txtReset.desc4[lang]}</p>
                                                    <p>{txtReset.desc5[lang]}</p>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                    
                                    <Row>
                                        <Col xs="6">
                                            <Button onClick={() => self.resetData()} style={{width:"100%"}}>YES</Button>
                                        </Col>
                                        <Col xs="6">
                                            <Button tag={Link} to="/index" style={{width:"100%"}}>NO</Button>
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
        setUserinfo: () => {
            dispatch(action.setLogout())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileReset);