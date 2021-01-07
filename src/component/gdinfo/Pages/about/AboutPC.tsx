import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import txtAbout from './txtabout';
import LData from '../Common/language';
import './about.css';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardText,
    CardTitle,
    CardBody,
    Button
} from 'reactstrap';
import { StoreState } from '../../Redux/reducer';
import { connect } from 'react-redux';
import { LoginInfo } from '../../Redux/action';

interface Props {
    userinfo: LoginInfo,
    login: boolean
}

class AboutPC extends Component<Props> {
    lang = LData.lang;

    render() {
        const self = this;
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Device Type</h3>
                            </CardHeader>
                            <CardBody className="btn-group">
                                <Button style={{width:100+'%'}} tag={Link} to="/aboutpc">
                                    {(txtAbout.device.pc as any)[this.lang]}
                                </Button>
                                <Button style={{width:100+'%'}} tag={Link} to="/aboutmo">
                                    {(txtAbout.device.mo as any)[this.lang]}
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row id="howtopc">
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>{(txtAbout.pc.title as any)[this.lang]}</h3>
                            </CardHeader>
                            <CardBody>
                                <Col xs="12" className="about-part">
                                    <h5>
                                        {(txtAbout.pc.step1.title as any)[this.lang]}
                                    </h5>
                                    <span>
                                        {(txtAbout.pc.step1.desc as any)[this.lang]}
                                    </span>
                                </Col>
                                <Col xs="12" className="about-part">
                                    <h5>
                                        {(txtAbout.pc.step2.title as any)[this.lang]}
                                    </h5>
                                    <span>
                                        {(txtAbout.pc.step2.desc as any)[this.lang]}
                                    </span>
                                </Col>
                                <Col xs="12" className="about-part">
                                    <Card style={{border:'solid 1px white'}}>
                                        <CardHeader>
                                            {(txtAbout.pc.step2.addr1desc as any)[this.lang]}
                                        </CardHeader>
                                        <CardBody>
                                            <CardText className="text-center">
                                            {
                                                (function() {
                                                    if(self.props.login) {
                                                        return (
                                                            <b>{(txtAbout.pc.step2.addrLogin as any)[self.lang]}</b>
                                                        )
                                                    }
                                                    else {
                                                        return (
                                                            <b>{(txtAbout.pc.step2.addrNoLogin as any)[self.lang]}</b>
                                                        )
                                                    }
                                                })()
                                            }
                                            </CardText>
                                            <CardTitle>
                                                {(txtAbout.pc.step2.cardt1 as any)[this.lang]}
                                            </CardTitle>
                                            <CardText>
                                                {
                                                    (function() {
                                                        if(self.props.login) {
                                                            return <b>javascript:$.getScript('https://sindata.nira.one/$/update?token={self.props.userinfo.token}');</b>;
                                                        }
                                                        else {
                                                            return <b>javascript:$.getScript('https://sindata.nira.one/$/update');</b>;
                                                        }
                                                    })()
                                                }
                                            </CardText>
                                            <CardTitle>
                                                {(txtAbout.pc.step2.cardt2 as any)[this.lang]}
                                            </CardTitle>
                                            <CardText>
                                                {
                                                    (function() {
                                                        if(self.props.login) {
                                                            return <b>javascript:$.getScript('https://sindata.nira.one/$/updateOld?token={self.props.userinfo.token}');</b>;
                                                        }
                                                        else {
                                                            return <b>javascript:$.getScript('https://sindata.nira.one/$/updateOld');</b>;
                                                        }
                                                    })()
                                                }
                                            </CardText>
                                            <CardText>
                                                {(txtAbout.pc.step2.copy as any)[this.lang]}
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col xs="12" className="about-part">
                                    <h5>
                                        {(txtAbout.pc.step3.title as any)[this.lang]}
                                    </h5>
                                </Col>
                            
                                <Col xs="12" className="about-part">
                                    {(txtAbout.pc.step3.s1_1 as any)[this.lang]}
                                    <a className="innerhref" href="https://chrome.google.com">Google Chrome</a>
                                    {(txtAbout.pc.step3.s1_2 as any)[this.lang]}<br/>
                                    <b style={{color:"red"}}>{(txtAbout.pc.step3.s1_3 as any)[this.lang]}</b><br/>
                                    <img alt="aboutimg" className="about-img" src={require("./img/s1.png")} />
                                </Col>
                    
                                <Col xs="12" className="about-part">
                                    {(txtAbout.pc.step3.s2_1 as any)[this.lang]}
                                    <a className='innerhref' href='https://p.eagate.573.jp/'>eAmusement</a>
                                    {(txtAbout.pc.step3.s2_2 as any)[this.lang]}<br/>
                                    <img alt="aboutimg" className="about-img" src={require("./img/s2.png")} />
                                </Col>
                    
                                <Col xs="12" className="about-part">
                                    <span>{(txtAbout.pc.step3.s3 as any)[this.lang]}</span><br/>
                                    <img alt="aboutimg" className="about-img" src={require("./img/s3.png")} />
                                </Col>
                    
                                <Col xs="12" className="about-part">
                                    <span>{(txtAbout.pc.step3.s4 as any)[this.lang]}</span><br/>
                                    <img alt="aboutimg" className="about-img" src={require("./img/s4.png")} />
                                </Col>
                    
                                <Col xs="12" className="about-part">
                                    {(txtAbout.pc.step3.s5 as any)[this.lang]}<br/>
                                    <img alt="aboutimg" className="about-img" src={require("./img/s5.png")} />
                                </Col>
                                
                                <Col xs="12" className="about-part">
                                    {(txtAbout.pc.step3.s6_1 as any)[this.lang]}
                                    <a className='innerhref' href='https://p.eagate.573.jp/game/gfdm/gitadora_nextage/p/index.html'>
                                        {(txtAbout.pc.step3.s6_2 as any)[this.lang]}
                                    </a>
                                    {(txtAbout.pc.step3.s6_3 as any)[this.lang]}
                                </Col>
                                
                                <Col xs="12" className="about-part">
                                    <span>{(txtAbout.pc.step3.s7 as any)[this.lang]}</span><br/>
                                    <img alt="aboutimg" className="about-img" src={require("./img/s8.png")} />
                                </Col>
                                
                                <Col xs="12" className="about-part">
                                    <span>{(txtAbout.pc.step3.s8 as any)[this.lang]}</span><br/>
                                    <img alt="aboutimg" className="about-img" src={require("./img/s9.png")} />
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state: StoreState) => {
    return {
        userinfo: state.loginReducer.userinfo,
        login: state.loginReducer.login
    }
};

export default connect(mapStateToProps)(AboutPC);