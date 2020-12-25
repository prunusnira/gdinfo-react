import React, {Component, Fragment} from 'react';
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
    CardBody,
    ButtonGroup,
    Button
} from 'reactstrap';

import commonData from '../Common/commonData';
import RecentData from './recentData';
import { StoreState } from '../../Redux/reducer';
import { connect } from 'react-redux';
import { LoginInfo } from '../../Redux/action';

interface Props {
    login: boolean,
    userinfo: LoginInfo
}

interface State {
    recentUserList: Array<RecentData>
}

class Recent extends Component<Props, State> {
    lang = LData.lang;

    state = {
        recentUserList: []
    };

    componentDidMount() {
        axios.post(commonData.commonDataURL+"recent")
        .then((resp) => {
            // response
            const data = resp.data;
            const array = JSON.parse(data.recent);

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
                    <Col xs="12" className="text-center">
                    {/* 바로가기 버튼들 */}
                    {
                        (function() {
                            if(self.props.login) {
                                return (
                                    <Fragment>
                                        <ButtonGroup>
                                            <Button href="/profile">Profile</Button>
                                            <Button href="/myskill/gf">GF Skill</Button>
                                            <Button href="/myskill/dm">DM Skill</Button>
                                            <Button href="/mybest">My Best</Button>
                                            <Button href="/tower/index">Tower</Button>
                                        </ButtonGroup>
                                    </Fragment>
                                );
                            }
                            else {
                                return null;
                            }
                        })()
                    }
                    </Col>
                </Row>
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
                                        screenName: '_nira_one'
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
                                        screenName: '_nira_one'
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

const mapStateToProps = (state: StoreState) => {
    return {
        userinfo: state.loginReducer.userinfo,
        login: state.loginReducer.login
    }
};

export default connect(mapStateToProps)(Recent);