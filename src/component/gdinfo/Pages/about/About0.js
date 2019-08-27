import React, {Component} from 'react';
import txtAbout0 from './txtabout0';
import LData from '../../js/language';
import './about.css';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardText,
    CardTitle,
    CardBody
} from 'reactstrap';

const lang = LData.lang;

class About0 extends Component {
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
                        <Card>
                            <CardHeader>
                                <h3>How to update</h3>
                            </CardHeader>
                            <CardBody className="text-center">
                                <span>
                                    {txtAbout0.desc[lang]}
                                </span><br/>
                                <span className="btn-group">
                                    <a className="btn btn-primary" href="/about0">
                                        {txtAbout0.update_au[lang]}
                                    </a>
                                    <a className="btn btn-primary" href="/about1">
                                        {txtAbout0.update_man[lang]}
                                    </a>
                                    <a className="btn btn-primary" href="/about2">
                                        {txtAbout0.filter_rival[lang]}
                                    </a>
                                </span>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Device Type</h3>
                            </CardHeader>
                            <CardBody className="btn-group">
                                <a className="btn btn-primary" style={{width:100+'%'}} href="#no_div" onclick="divSwapPC()">
                                    {txtAbout0.device.pc[lang]}
                                </a>
                                <a className="btn btn-primary" style={{width:100+'%'}} href="#no_div" onclick="divSwapMO()">
                                    {txtAbout0.device.mo[lang]}
                                </a>
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
                                    <img className="about-img" src={require("./img/s1.png")} />
                                </Col>
                    
                                <Col xs="12" className="about-part">
                                    <span dangerouslySetInnerHTML={{__html:txtAbout0.pc.step3.s2[lang]}}></span><br/>
                                    <img className="about-img" src={require("./img/s2.png")} />
                                </Col>
                    
                                <Col xs="12" className="about-part">
                                    <span>{txtAbout0.pc.step3.s3[lang]}</span><br/>
                                    <img className="about-img" src={require("./img/s3.png")} />
                                </Col>
                    
                                <Col xs="12" className="about-part">
                                    <span>{txtAbout0.pc.step3.s4[lang]}</span><br/>
                                    <img className="about-img" src={require("./img/s4.png")} />
                                </Col>
                    
                                <Col xs="12" className="about-part">
                                    <span dangerouslySetInnerHTML={{__html: txtAbout0.pc.step3.s5[lang]}}></span><br/>
                                    <img className="about-img" src={require("./img/s5.png")} />
                                </Col>
                                
                                <Col xs="12" className="about-part">
                                    <span>{txtAbout0.pc.step3.s6[lang]}</span>
                                </Col>
                                
                                <Col xs="12" className="about-part">
                                    <span>{txtAbout0.pc.step3.s7[lang]}</span><br/>
                                    <img className="about-img" src={require("./img/s8.png")} />
                                </Col>
                                
                                <Col xs="12" className="about-part">
                                    <span>{txtAbout0.pc.step3.s8[lang]}</span><br/>
                                    <img className="about-img" src={require("./img/s9.png")} />
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                
                <Row id="howtomobile">
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>{txtAbout0.mobile.title[lang]}</h3>
                            </CardHeader>
                            <CardBody>
                                <Col xs="12" className="about-part">
                                    <h5>
                                        {txtAbout0.mobile.step1.title[lang]}
                                    </h5>
                                    <span>
                                        {txtAbout0.mobile.step1.desc[lang]}
                                    </span>
                                </Col>
                                <Col xs="12" className="about-part">
                                    <Row>
                                        <Col xs="6">
                                            {
                                                function() {
                                                    if(lang == 'jp') {
                                                        return (<img style={{width:100+'%'}} src={require("./img/m0j.jpg")} />)
                                                    }
                                                    else {
                                                        return (<img style={{width:100+'%'}} src={require("./img/m0k.jpg")} />)
                                                    }
                                                }()
                                            }
                                        </Col>
                                        <Col xs="6">
                                            {
                                                function() {
                                                    if(lang == 'jp') {
                                                        return (<img style={{width:100+'%'}} src={require("./img/m0_1j.jpg")} />)
                                                    }
                                                    else {
                                                        return (<img style={{width:100+'%'}} src={require("./img/m0_1k.jpg")} />)
                                                    }
                                                }()
                                            }
                                        </Col>
                                    </Row>
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
                                        {txtAbout0.mobile.step3.title[lang]}
                                    </h5>
                                </Col>
                            
                                <Col xs="12" id="complex" className="about-part">
                                    <span>{txtAbout0.mobile.step3.s1[lang]}</span><br/>
                                    <img className="about-img" src={require("./img/m1.png")} />
                                </Col>
                
                                <Col xs="12" className="about-part">
                                    <span>{txtAbout0.mobile.step3.s2[lang]}</span><br/>
                                    <img className="about-img" src={require("./img/m2.png")} />
                                </Col>
                                
                                <Col xs="12" className="about-part">
                                    <span>{txtAbout0.mobile.step3.s3[lang]}</span><br/>
                                    <Row>
                                        <Col xs="6">
                                            <img style={{width:100+'%'}} src={require("./img/m3.png")} />
                                        </Col>
                                        <Col xs="6">
                                            <img style={{width:100+'%'}} src={require("./img/m4.png")} />
                                        </Col>
                                    </Row>
                                </Col>
                
                                <Col xs="12" className="about-part">
                                    <span>{txtAbout0.mobile.step3.s4[lang]}</span><br/>
                                    <img style={{width:50+'%'}} src={require("./img/m5.png")} />
                                </Col>
                                
                                <Col xs="12" className="about-part">
                                    <span>{txtAbout0.mobile.step3.s5[lang]}</span><br/>
                                    <img style={{width:50+'%'}} src={require("./img/m6.png")} />
                                </Col>
                                
                                <Col xs="12" className="about-part">
                                    <span dangerouslySetInnerHTML= {{__html: txtAbout0.mobile.step3.s6[lang] }}></span><br/>
                                    <img style={{width:50+'%'}} src={require("./img/m7.png")} />
                                </Col>
                                
                                <Col xs="12" className="about-part">
                                    <span>{txtAbout0.mobile.step3.s7[lang]}</span><br/>
                                    <img style={{width:50+'%'}} src={require("./img/m9.png")} />
                                </Col>
                                
                                <Col xs="12" className="about-part">
                                    <span>{txtAbout0.mobile.step3.s8[lang]}</span><br/>
                                    <Row>
                                        <Col xs="6">
                                            <img style={{width:100+'%'}} src={require("./img/m10.png")} />
                                        </Col>
                                        <Col xs="6">
                                            <img style={{width:100+'%'}} src={require("./img/m11.png")} />
                                        </Col>
                                    </Row>
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default About0;