import React, {Component} from 'react';
import txtTerms from './txtterms';
import LData from '../Common/language';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';

const lang = LData.lang;

class Terms extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Terms and Conditions</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" style={{padding:"5px"}}>
                                        <h4>{txtTerms.title[lang]}</h4>
                                    </Col>
                                    <Col xs="12" style={{padding:"5px"}}>
                                        <h4>{txtTerms.s1t[lang]}</h4>
                                        <span>{txtTerms.s1c[lang]}</span>
                                    </Col>
                                    <Col xs="12" style={{padding:"5px"}}>
                                        <h4>{txtTerms.s2t[lang]}</h4>
                                        <span>{txtTerms.s2c1[lang]}</span><br/>
                                        <span>{txtTerms.s2c2[lang]}</span><br/>
                                        <span>{txtTerms.s2c3[lang]}</span><br/>
                                        <span>{txtTerms.s2c4[lang]}</span>
                                    </Col>
                                    <Col xs="12" style={{padding:"5px"}}>
                                        <h4>{txtTerms.s3t[lang]}</h4>
                                        <span>{txtTerms.s3c1[lang]}</span><br/>
                                        <span>{txtTerms.s3c2[lang]}</span>
                                    </Col>
                                    <Col xs="12" style={{padding:"5px"}}>
                                        <h4>{txtTerms.s4t[lang]}</h4>
                                        <span>{txtTerms.s4c1[lang]}</span><br/>
                                        <span>{txtTerms.s4c2[lang]}</span><br/>
                                        <span>{txtTerms.s4c3[lang]}</span>
                                    </Col>
                                    <Col xs="12" style={{padding:"5px"}}>
                                        <h4>{txtTerms.s5t[lang]}</h4>
                                        <span>{txtTerms.s5c[lang]}</span>
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

export default Terms;