import React, {Component} from 'react';
import RecentTableDiv from './RecentTableDiv';
import RecentSelfInfo from './RecentSelfInfo';  
import LData from '../../js/language';

import {
    Row,
    Col,
    Container,
    Card,
    CardHeader,
    CardBody,
    CardText
} from 'reactstrap';

const lang = LData.lang;
const txtIndex = require('./txtindex').default;

class Recent extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <Card id="self" style={{fontSize:90+'%'}}>
                            <CardHeader>
                                <h3>{txtIndex.self.title[lang]}</h3>
                            </CardHeader>
                            <CardBody className='text-center' id="selfBody" v-html="selfInfo">
                                <RecentSelfInfo />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card style={{fontSize:90+'%'}}>
                            <CardHeader>
                                <h3>{txtIndex.recent[lang]}</h3>
                            </CardHeader>
                            <CardBody>
                                <CardText>
                                    <Row>
                                        <Col xs="12" className="text-center" style={{paddingBottom:20+'px'}}>
                                            {txtIndex.click[lang]}
                                        </Col>
                                        <Col xs="12" id="rec">
                                            <RecentTableDiv />
                                        </Col>
                                    </Row>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card style={{fontSize:90+'%'}}>
                            <CardHeader>
                                <h3>{txtIndex.notice[lang]}</h3>
                            </CardHeader>
                            <CardBody>
                                <a class="twitter-timeline" data-dnt="true"
                                    href="https://twitter.com/gitadorainfo"
                                    data-widget-id="731000889108914176">GITADORA Info Twitter</a>
                                {!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs")}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    };
}

export default Recent;