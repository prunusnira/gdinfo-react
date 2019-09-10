import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AboutHead from './AboutHead';
import txtAbout0 from './txtabout0';
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

class About0PC extends Component {
    copyToClipboard(element) {
        let temp = document.createElement("input");
        temp.textContent = element;
		document.body.appendChild(temp);
		temp.select();
		document.execCommand("copy");
		temp.remove();
    }
    
    render() {
        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <AboutHead />
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Device Type</h3>
                            </CardHeader>
                            <CardBody className="btn-group">
                                <Button style={{width:100+'%'}} tag={Link} to="/about0p">
                                    {txtAbout0.device.pc[lang]}
                                </Button>
                                <Button style={{width:100+'%'}} tag={Link} to="/about0m">
                                    {txtAbout0.device.mo[lang]}
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row id="howtopc">
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>{txtAbout0.pc.title[lang]}</h3>
                            </CardHeader>
                            <CardBody>
                                <Col xs="12" className="about-part">
                                    <h5>
                                        {txtAbout0.pc.step1.title[lang]}
                                    </h5>
                                    <span>
                                        {txtAbout0.pc.step1.desc[lang]}
                                    </span>
                                </Col>
                                <Col xs="12" className="about-part">
                                    <h5>
                                        {txtAbout0.pc.step2.title[lang]}
                                    </h5>
                                    <span>
                                        {txtAbout0.pc.step2.desc[lang]}
                                    </span>
                                </Col>
                                <Col xs="12" className="about-part">
                                    <Card style={{border:'solid 1px white'}}>
                                        <CardHeader>
                                            {txtAbout0.pc.step2.addr1desc[lang]}
                                        </CardHeader>
                                        <CardBody>
                                            <CardTitle>
                                                {txtAbout0.pc.step2.cardt1[lang]}
                                            </CardTitle>
                                            <CardText>
                                                {txtAbout0.pc.step2.addr1}<br/>
                                                {txtAbout0.pc.step2.copy1[lang]}<br/>
                                                <a className="btn btn-primary" href="#no_div" onClick={this.copyToClipboard('avascript:$.getScript(\'https://gitadora.info/$/update\');')}>COPY</a>
                                            </CardText>
                                            <div className="about-part"></div>
                                            <CardTitle>
                                                {txtAbout0.pc.step2.cardt2[lang]}
                                            </CardTitle>
                                            <CardText>
                                                {txtAbout0.pc.step2.addr2}<br/>
                                                {txtAbout0.pc.step2.copy2[lang]}<br/>
                                                <a className="btn btn-primary" href="#no_div" onClick={this.copyToClipboard('avascript:$.getScript(\'https://gitadora.info/$/updateOld\');')}>COPY</a>
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col xs="12" className="about-part">
                                    <h5>
                                        {txtAbout0.pc.step3.title[lang]}
                                    </h5>
                                </Col>
                            
                                <Col xs="12" className="about-part">
                                    <span dangerouslySetInnerHTML={{__html: txtAbout0.pc.step3.s1[lang]}}></span><br/>
                                    <img alt="aboutimg" className="about-img" src={require("./img/s1.png")} />
                                </Col>
                    
                                <Col xs="12" className="about-part">
                                    <span dangerouslySetInnerHTML={{__html:txtAbout0.pc.step3.s2[lang]}}></span><br/>
                                    <img alt="aboutimg" className="about-img" src={require("./img/s2.png")} />
                                </Col>
                    
                                <Col xs="12" className="about-part">
                                    <span>{txtAbout0.pc.step3.s3[lang]}</span><br/>
                                    <img alt="aboutimg" className="about-img" src={require("./img/s3.png")} />
                                </Col>
                    
                                <Col xs="12" className="about-part">
                                    <span>{txtAbout0.pc.step3.s4[lang]}</span><br/>
                                    <img alt="aboutimg" className="about-img" src={require("./img/s4.png")} />
                                </Col>
                    
                                <Col xs="12" className="about-part">
                                    <span dangerouslySetInnerHTML={{__html: txtAbout0.pc.step3.s5[lang]}}></span><br/>
                                    <img alt="aboutimg" className="about-img" src={require("./img/s5.png")} />
                                </Col>
                                
                                <Col xs="12" className="about-part">
                                    <span>{txtAbout0.pc.step3.s6[lang]}</span>
                                </Col>
                                
                                <Col xs="12" className="about-part">
                                    <span>{txtAbout0.pc.step3.s7[lang]}</span><br/>
                                    <img alt="aboutimg" className="about-img" src={require("./img/s8.png")} />
                                </Col>
                                
                                <Col xs="12" className="about-part">
                                    <span>{txtAbout0.pc.step3.s8[lang]}</span><br/>
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

export default About0PC;