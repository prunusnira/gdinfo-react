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

class Terms extends Component {
    lang = LData.lang;

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Terms and Conditions</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" style={{padding:"5px"}}>
                                        <h4>{(txtTerms.title as any)[this.lang]}</h4>
                                    </Col>
                                    <Col xs="12" style={{padding:"5px"}}>
                                        <h4>{(txtTerms.s1t as any)[this.lang]}</h4>
                                        <span>{(txtTerms.s1c as any)[this.lang]}</span>
                                    </Col>
                                    <Col xs="12" style={{padding:"5px"}}>
                                        <h4>{(txtTerms.s2t as any)[this.lang]}</h4>
                                        <span>{(txtTerms.s2c1 as any)[this.lang]}</span><br/>
                                        <span>{(txtTerms.s2c2 as any)[this.lang]}</span><br/>
                                        <span>{(txtTerms.s2c3 as any)[this.lang]}</span><br/>
                                        <span>{(txtTerms.s2c4 as any)[this.lang]}</span>
                                    </Col>
                                    <Col xs="12" style={{padding:"5px"}}>
                                        <h4>{(txtTerms.s3t as any)[this.lang]}</h4>
                                        <span>{(txtTerms.s3c1 as any)[this.lang]}</span><br/>
                                        <span>{(txtTerms.s3c2 as any)[this.lang]}</span>
                                    </Col>
                                    <Col xs="12" style={{padding:"5px"}}>
                                        <h4>{(txtTerms.s4t as any)[this.lang]}</h4>
                                        <span>{(txtTerms.s4c1 as any)[this.lang]}</span><br/>
                                        <span>{(txtTerms.s4c2 as any)[this.lang]}</span><br/>
                                        <span>{(txtTerms.s4c3 as any)[this.lang]}</span>
                                    </Col>
                                    <Col xs="12" style={{padding:"5px"}}>
                                        <h4>{(txtTerms.s5t as any)[this.lang]}</h4>
                                        <span>{(txtTerms.s5c1 as any)[this.lang]}</span><br/>
                                        <span>{(txtTerms.s5c2 as any)[this.lang]}</span><br/>
                                        <span>{(txtTerms.s5c3 as any)[this.lang]}</span>
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