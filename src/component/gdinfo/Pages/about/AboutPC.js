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

const lang = LData.lang;

class AboutPC extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Device Type</h3>
                            </CardHeader>
                            <CardBody className="btn-group">
                                <Button style={{width:100+'%'}} tag={Link} to="/aboutpc">
                                    {txtAbout.device.pc[lang]}
                                </Button>
                                <Button style={{width:100+'%'}} tag={Link} to="/aboutmo">
                                    {txtAbout.device.mo[lang]}
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row id="howtopc">
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>{txtAbout.pc.title[lang]}</h3>
                            </CardHeader>
                            <CardBody>
                                <Col xs="12" className="about-part">
                                    <h5>
                                        {txtAbout.pc.step1.title[lang]}
                                    </h5>
                                    <span>
                                        {txtAbout.pc.step1.desc[lang]}
                                    </span>
                                </Col>
                                <Col xs="12" className="about-part">
                                    <h5>
                                        {txtAbout.pc.step2.title[lang]}
                                    </h5>
                                    <span>
                                        {txtAbout.pc.step2.desc[lang]}
                                    </span>
                                </Col>
                                <Col xs="12" className="about-part">
                                    <Card style={{border:'solid 1px white'}}>
                                        <CardHeader>
                                            {txtAbout.pc.step2.addr1desc[lang]}
                                        </CardHeader>
                                        <CardBody>
                                            <CardTitle>
                                                {txtAbout.pc.step2.cardt1[lang]}
                                            </CardTitle>
                                            <CardText>
                                                <b>{txtAbout.pc.step2.addr1}</b>
                                            </CardText>
                                            <CardTitle>
                                                {txtAbout.pc.step2.cardt2[lang]}
                                            </CardTitle>
                                            <CardText>
                                                <b>{txtAbout.pc.step2.addr2}</b>
                                            </CardText>
                                            <CardText>
                                                {txtAbout.pc.step2.copy[lang]}
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col xs="12" className="about-part">
                                    <h5>
                                        {txtAbout.pc.step3.title[lang]}
                                    </h5>
                                </Col>
                            
                                <Col xs="12" className="about-part">
                                    {txtAbout.pc.step3.s1_1[lang]} <a className="innerhref" href="https://chrome.google.com">Google Chrome</a>{txtAbout.pc.step3.s1_2[lang]}<br/>
                                    <b style={{color:"red"}}>{txtAbout.pc.step3.s1_3[lang]}</b><br/>
                                    <img alt="aboutimg" className="about-img" src={require("./img/s1.png")} />
                                </Col>
                    
                                <Col xs="12" className="about-part">
                                    {txtAbout.pc.step3.s2_1[lang]}
                                    <a className='innerhref' href='https://p.eagate.573.jp/'>eAmusement</a>
                                    {txtAbout.pc.step3.s2_2[lang]}<br/>
                                    <img alt="aboutimg" className="about-img" src={require("./img/s2.png")} />
                                </Col>
                    
                                <Col xs="12" className="about-part">
                                    <span>{txtAbout.pc.step3.s3[lang]}</span><br/>
                                    <img alt="aboutimg" className="about-img" src={require("./img/s3.png")} />
                                </Col>
                    
                                <Col xs="12" className="about-part">
                                    <span>{txtAbout.pc.step3.s4[lang]}</span><br/>
                                    <img alt="aboutimg" className="about-img" src={require("./img/s4.png")} />
                                </Col>
                    
                                <Col xs="12" className="about-part">
                                    {txtAbout.pc.step3.s5[lang]}<br/>
                                    <img alt="aboutimg" className="about-img" src={require("./img/s5.png")} />
                                </Col>
                                
                                <Col xs="12" className="about-part">
                                    {txtAbout.pc.step3.s6_1[lang]}
                                    <a className='innerhref' href='https://p.eagate.573.jp/game/gfdm/gitadora_exchain/p/index.html'>{txtAbout.pc.step3.s6_2[lang]}</a>
                                    {txtAbout.pc.step3.s6_3[lang]}
                                </Col>
                                
                                <Col xs="12" className="about-part">
                                    <span>{txtAbout.pc.step3.s7[lang]}</span><br/>
                                    <img alt="aboutimg" className="about-img" src={require("./img/s8.png")} />
                                </Col>
                                
                                <Col xs="12" className="about-part">
                                    <span>{txtAbout.pc.step3.s8[lang]}</span><br/>
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

export default AboutPC;