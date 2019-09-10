import React, {Component} from 'react';
import AboutHead from './AboutHead';
import txtAbout2 from './txtabout2';
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

class About2 extends Component {
    render() {
        const urlkj = (lang === "jp") ? "j" : "k";
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
                                <h3>
                                    {txtAbout2.ftitle[lang]}
                                </h3>
                            </CardHeader>
                            <CardBody>
                                <Col xs="12" className="about-part">
                                    <div className="about-part">
                                        <img alt="aboutimg" style={{maxWidth:100+'%'}} src={require("./img/about2/filter1"+urlkj+".jpg")} />
                                    </div>
                                    <span>
                                        {txtAbout2.fd1[lang]}
                                    </span><br/><br/>
                                    <div>
                                        <img alt="aboutimg" style={{maxWidth:100+'%'}} src={require("./img/about2/filter2"+urlkj+".jpg")} />
                                    </div><br/><br/>
                                    <span>
                                        {txtAbout2.fd2[lang]}
                                    </span>
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>
                                    {txtAbout2.rtitle[lang]}
                                </h3>
                            </CardHeader>
                            <CardBody>
                                <h3>
                                    {txtAbout2.rd1.title[lang]}
                                </h3>
                                <span>
                                    {txtAbout2.rd1.s1[lang]}
                                </span>
                                <span>
                                    {txtAbout2.rd1.s2[lang]}
                                </span>
                                <div>
                                    <img alt="aboutimg" style={{maxWidth:100+'%'}} src={require("./img/about3/add1"+urlkj+".jpg")} />    
                                </div><br/><br/>
                                <span>
                                    {txtAbout2.rd1.s3[lang]}
                                </span>
                                <div>
                                    <img alt="aboutimg" style={{maxWidth:100+'%'}} src={require("./img/about3/add2"+urlkj+".jpg")} />
                                </div><br/><br/>
                                <span>
                                    {txtAbout2.rd1.s4[lang]}
                                </span>
                                <div>
                                    <img alt="aboutimg" style={{maxWidth:100+'%'}} src={require("./img/about3/add3"+urlkj+".jpg")} />
                                </div><br/><br/>
                                <span>
                                    {txtAbout2.rd1.s5[lang]}
                                </span>
                                <div>
                                    <img alt="aboutimg" style={{maxWidth:100+'%'}} src={require("./img/about3/list"+urlkj+".jpg")} />
                                </div><br/><br/>
                                <h3>
                                    {txtAbout2.rd2.title[lang]}
                                </h3>
                                <span>
                                    {txtAbout2.rd2.s1[lang]}
                                </span><br/>
                                <span>
                                    {txtAbout2.rd2.s2[lang]}
                                </span><br/>
                                <span>
                                    {txtAbout2.rd2.s3[lang]}
                                </span><br/>
                                <span>
                                    {txtAbout2.rd2.s4[lang]}
                                </span><br/>
                                <div>
                                    <img alt="aboutimg" style={{maxWidth:100+'%'}} src={require("./img/about3/sel"+urlkj+".jpg")} />
                                </div><br/><br/>
                                <div>
                                    <img alt="aboutimg" style={{maxWidth:100+'%'}} src={require("./img/about3/result"+urlkj+".jpg")} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default About2;