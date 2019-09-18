import React, {Component} from 'react';
import axios from 'axios';
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
    CardBody,
    CardText
} from 'reactstrap';
import commonData from '../Common/commonData';

const lang = LData.lang;

class Recent extends Component {
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
            <Container>
                <Row>
                    <Col xs="12">
                        <Card id="self" style={{fontSize:90+'%'}}>
                            <CardHeader>
                                <h3>{txtIndex.self.title[lang]}</h3>
                            </CardHeader>
                            <CardBody className='text-center' id="selfBody">
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
                                            <RecentTableDiv list={self.state.recentUserList} />
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