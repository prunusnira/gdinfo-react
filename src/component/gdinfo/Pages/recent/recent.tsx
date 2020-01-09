import React, {Component} from 'react';
import axios from 'axios';
import {Timeline} from 'react-twitter-widgets';
import RecentTableDiv from './recentTableDiv';
import RecentSelfInfo from './recentSelfInfo';
import LData from '../Common/language';
import txtIndex from './txtindex';

import {
    Row,
    Col,
    Container,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';

import commonData from '../Common/commonData';
import RecentData from './recentData';

interface State {
    recentUserList: Array<RecentData>
}

class Recent extends Component<{}, State> {
    lang = LData.lang;

    state = {
        recentUserList: []
    };

    componentDidMount() {
        axios.post(commonData.commonDataURL+"recent")
        .then((resp) => {
            // response
            const data = resp.data;
            const array = data.recent;

            this.setState({
                recentUserList: array
            });
        });
    };

    render() {
        const self = this;
        return (
            <Container fluid={true}>
                <Row>
                    <Col lg="4" xs="12">
                        <Card id="self" style={{fontSize:'90%'}}>
                            <CardHeader>
                                <h3>{(txtIndex.self.title as any)[this.lang]}</h3>
                            </CardHeader>
                            <CardBody className='text-center' id="selfBody">
                                <RecentSelfInfo />
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
                                        screenName: 'SIN_Navigator'
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
                                <h3>{(txtIndex.recent as any)[this.lang]}</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" className="text-center" style={{paddingBottom:"20px"}}>
                                        {(txtIndex.click as any)[this.lang]}
                                    </Col>
                                    <Col xs="12" id="rec">
                                        <RecentTableDiv isMain={true} list={self.state.recentUserList} />
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
                                        screenName: 'SIN_Navigator'
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

export default Recent;