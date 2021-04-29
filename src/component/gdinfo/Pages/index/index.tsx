import React, {Component, Fragment} from 'react';
import {Timeline} from 'react-twitter-widgets';
import UserLoginInfo from './userLoginInfo';
import LData from '../Common/language';
import txtIndex from './txtIndex';

import {
    Row,
    Col,
    Container,
    Card,
    CardHeader,
    CardBody,
    ButtonGroup,
    Button,
    CardText,
    CardTitle
} from 'reactstrap';

import { StoreState } from '../../Redux/reducer';
import { connect } from 'react-redux';
import { LoginInfo } from '../../Redux/action';
import './index.css';

interface Props {
    login: boolean,
    userinfo: LoginInfo
}

class IndexPage extends Component<Props> {
    lang = LData.lang;

    render() {
        const self = this;
        return (
            <Container>
                <Row>
                    <Col lg="4" xs="12">
                        <Card id="self" style={{fontSize:'90%'}}>
                            <CardHeader>
                                <h3>{(txtIndex.self.title as any)[this.lang]}</h3>
                            </CardHeader>
                            <CardBody className='text-center' id="selfBody">
                                <UserLoginInfo />
                            </CardBody>
                        </Card>
                        <Card className="d-none d-lg-block" style={{fontSize:'90%'}}>
                            <CardHeader>
                                <h3>{(txtIndex.notice as any)[this.lang]}</h3>
                            </CardHeader>
                            <CardBody>
                                <Timeline
                                    dataSource={{
                                        sourceType: 'profile',
                                        screenName: '_nira_one'
                                    }}
                                    options={{
                                        height: '400'
                                    }}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="8" xs="12">
                        <Card style={{fontSize:'90%'}}>
                            <CardHeader>
                                <h3>Skill Navigator</h3>
                            </CardHeader>
                            <CardBody>
                                {/* 바로가기 */}
                                <Row>
                                    <Col xs="12" className="text-center">
                                    {
                                        (function() {
                                            if(self.props.login) {
                                                return (
                                                    <Fragment>
                                                        <ButtonGroup>
                                                            <Button href="/profile">Profile</Button>
                                                            <Button href="/myskill/gf">GF Skill</Button>
                                                            <Button href="/myskill/dm">DM Skill</Button>
                                                            <Button href="/mybest">My Best</Button>
                                                            <Button href="/tower/index">Tower</Button>
                                                        </ButtonGroup>
                                                    </Fragment>
                                                );
                                            }
                                            else {
                                                return null;
                                            }
                                        })()
                                    }
                                    </Col>
                                </Row>
                                
                                {/* 기본 설명 */}
                                <Row className="partition">
                                    <Col xs="12">
                                        <h4>{(txtIndex.about.title as any)[this.lang]}</h4>
                                    </Col>
                                    <Col xs="12">
                                        {(txtIndex.about.cont as any)[this.lang]}
                                    </Col>
                                </Row>
                                
                                {/* 사용법 */}
                                <Row className="partition">
                                    <Col xs="12">
                                        <h4>{(txtIndex.howto.title as any)[this.lang]}</h4>
                                    </Col>
                                    <Col xs="12">
                                        {(txtIndex.howto.desc as any)[this.lang]}
                                    </Col>
                                </Row>

                                <Card style={{border:'solid 1px white'}}>
                                    <CardHeader>
                                        {(txtIndex.howto.script as any)[this.lang]}
                                    </CardHeader>
                                    <CardBody>
                                    <CardText className="text-center">
                                        {
                                            (function() {
                                                if(self.props.login) {
                                                    return (txtIndex.howto.addrLogin as any)[self.lang]
                                                }
                                                else {
                                                    return <b style={{color:'yellow'}}>★{(txtIndex.howto.addrNoLogin as any)[self.lang]}</b>
                                                }
                                            })()
                                        }
                                        </CardText>
                                        <CardTitle>
                                            {(txtIndex.howto.cardt1 as any)[this.lang]} (HIGH-VOLTAGE)
                                        </CardTitle>
                                        <CardText>
                                            {
                                                (function() {
                                                    if(self.props.login) {
                                                        return <b>javascript:$.getScript('https://sindata.nira.one/$/update?token={self.props.userinfo.token}');</b>;
                                                    }
                                                    else {
                                                        return <b>Please login first</b>;
                                                    }
                                                })()
                                            }
                                        </CardText>
                                        <CardTitle>
                                            {(txtIndex.howto.cardt2 as any)[this.lang]} (NEXTAGE, EXCHAIN, MATIXX, Tri-Boost Re:Evolve)
                                        </CardTitle>
                                        <CardText>
                                            {
                                                (function() {
                                                    if(self.props.login) {
                                                        return <b>javascript:$.getScript('https://sindata.nira.one/$/updateOld?token={self.props.userinfo.token}');</b>;
                                                    }
                                                    else {
                                                        return <b>Please login first</b>;
                                                    }
                                                })()
                                            }
                                        </CardText>
                                    </CardBody>
                                </Card>
                                
                                <Row className="partition">
                                    <Col xs="12">
                                        {(txtIndex.howto.desc2 as any)[this.lang]}
                                    </Col>
                                    <Col xs="12">
                                        ({(txtIndex.howto.desc3 as any)[this.lang]})
                                    </Col>
                                </Row>
                                
                                <Row className="partition">
                                    <Col xs="12">
                                        <img alt="favo" className="howto-img"
                                            src={process.env.PUBLIC_URL+"/general-img/howto/howto1-register.png"} />
                                    </Col>
                                    <Col xs="12">
                                        ※{(txtIndex.howto.desc4 as any)[this.lang]}
                                    </Col>
                                </Row>
                                
                                <Row className="partition">
                                    <Col xs="12">
                                        <img alt="favo" className="howto-img2"
                                            src={process.env.PUBLIC_URL+"/general-img/howto/howto2-browser.png"} />
                                    </Col>
                                    <Col xs="12">
                                        ※{(txtIndex.howto.desc4 as any)[this.lang]}
                                    </Col>
                                    <Col xs="12">
                                        ※{(txtIndex.howto.browser as any)[this.lang]}
                                    </Col>
                                    <Col xs="12">
                                        Google Chrome (For all OS)
                                    </Col>
                                </Row>

                                <Row className="partition">
                                    <Col xs="6">
                                        <img alt="favo" className="howto-img2"
                                            src={process.env.PUBLIC_URL+"/general-img/howto/howto3-k.png"} />
                                    </Col>
                                    <Col xs="6">
                                        <img alt="favo" className="howto-img2"
                                            src={process.env.PUBLIC_URL+"/general-img/howto/howto3-j.png"} />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className="d-block d-lg-none">
                    <Col xs="12">
                        <Card style={{fontSize:'90%'}}>
                            <CardHeader>
                                <h3>{(txtIndex.notice as any)[this.lang]}</h3>
                            </CardHeader>
                            <CardBody>
                                <Timeline
                                    dataSource={{
                                        sourceType: 'profile',
                                        screenName: '_nira_one'
                                    }}
                                    options={{
                                        height: '400'
                                    }}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    };
}

const mapStateToProps = (state: StoreState) => {
    return {
        userinfo: state.loginReducer.userinfo,
        login: state.loginReducer.login
    }
};

export default connect(mapStateToProps)(IndexPage);