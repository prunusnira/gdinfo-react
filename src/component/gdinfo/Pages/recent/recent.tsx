import React, {Component, Fragment} from 'react';
import axios from 'axios';
import RecentTableDiv from './recentTableDiv';
import LData from '../Common/language';
import txtRecent from './txtRecent';

import {
    Row,
    Col,
    Container,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';

import CommonData from '../Common/commonData';
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
        axios.post(CommonData.dataUrl+"recent")
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
            <Container>
                <Row>
                    <Col xs="12">
                        <Card style={{fontSize:'90%'}}>
                            <CardHeader>
                                <h3>{(txtRecent.recent as any)[this.lang]}</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" className="text-center" style={{paddingBottom:"20px"}}>
                                        {(txtRecent.click as any)[this.lang]}
                                    </Col>
                                    <Col xs="12" id="rec">
                                        <RecentTableDiv isMain={true} list={self.state.recentUserList} />
                                    </Col>
                                </Row>
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