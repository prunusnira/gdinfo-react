import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import txtReset from './txtreset';
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

interface Props {
    userinfo: LoginInfo,
    login: boolean
}

interface State {
    redirect: boolean,
    userid: number
}

class ProfileReset extends Component<Props, State> {
    lang = LData.lang;
    constructor(props: Props) {
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

        axios.post(url, data)
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
                <Container fluid={true}>
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
                                                    <h3>{(txtReset.title as any)[this.lang]}</h3>
                                                </CardHeader>
                                                <CardBody>
                                                    <p>{(txtReset.desc1 as any)[this.lang]}</p>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Card>
                                                <CardHeader>
                                                    <h3>{(txtReset.desc2t as any)[this.lang]}</h3>
                                                </CardHeader>
                                                <CardBody>
                                                    <p>{(txtReset.desc2s as any)[this.lang]}</p>
                                                    <p>{(txtReset.desc3 as any)[this.lang]}</p>
                                                    <p>{(txtReset.desc4 as any)[this.lang]}</p>
                                                    <p>{(txtReset.desc5 as any)[this.lang]}</p>
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

const mapStateToProps = (state: StoreState) => {
    return {
        userinfo: state.loginReducer.userinfo,
        login: state.loginReducer.login
    }
};

export default connect(mapStateToProps)(ProfileReset);