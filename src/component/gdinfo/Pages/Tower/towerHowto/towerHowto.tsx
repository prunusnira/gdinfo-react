import React, {Component} from 'react';
import txtTower from '../txttower';
import LData from '../../Common/language';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';

class TowerHowto extends Component {
    lang = LData.lang;

    render() {
        const self = this;

        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>The Tower - How to Update</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" className="about-part">
                                        <span>{(txtTower.howto.step1 as any)[self.lang]}</span>
                                    </Col>
                                    <Col xs="12" className="about-part">
                                        <img alt="towerhowto1" style={{width:"50%"}} src={require("./okiniiri.jpg")} />
                                    </Col>
                                    <Col xs="12" className="about-part">
                                        <span>{(txtTower.howto.step2 as any)[self.lang]}</span>
                                    </Col>
                                    <Col xs="12" className="about-part">
                                        <img alt="towerhowto2" style={{width:"40%"}} src={require("./update.jpg")} />
                                        <img alt="towerhowto3" style={{width:"40%"}} src={require("./update2.jpg")} />
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

export default TowerHowto;