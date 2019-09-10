import React, {Component} from 'react';
import AboutHead from './AboutHead';
import txtAbout1 from './txtabout1';
import LData from '../Common/language';
import './about.css';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';

const lang = LData.lang;

class About1 extends Component {
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
                                <h3>{txtAbout1.title[lang]}</h3>
                            </CardHeader>
                            <CardBody>
                                <Col xs="12" className="about-part">
                                    <span>1.&nbsp;
                                        {txtAbout1.s1[lang]}
                                    </span>
                                </Col>
                                <Col xs="12" className="about-part">
                                    <span>2.&nbsp;
                                        {txtAbout1.s2[lang]}
                                    </span><br/>
                                    <span id="img1"></span>
                                </Col>
                                <Col xs="12" className="about-part">
                                    <span>3.&nbsp;
                                        {txtAbout1.s3[lang]}
                                    </span><br/>
                                    <span id="img2"></span>
                                </Col>
                                <Col xs="12" className="about-part">
                                    <span>4.&nbsp;
                                        {txtAbout1.s4[lang]}
                                    </span><br/>
                                    <img alt="aboutimg" style={{maxWidth:100+'%'}} src={require("./img/about0/4.png")} />
                                </Col>
                                <Col xs="12" className="about-part">
                                    <span>5.&nbsp;
                                        {txtAbout1.s5[lang]}
                                    </span><br/>
                                    <img alt="aboutimg" style={{maxWidth:100+'%'}} src={require("./img/about0/3.png")} />
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default About1;