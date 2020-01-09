import React, {Component} from 'react';
import SnapshotItem from './snapshotItem';
import axios from 'axios';
import txtSnapshot from './txtsnapshot';
import LData from '../../Common/language';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';
import commonData from '../../Common/commonData';
import { RouteComponentProps } from 'react-router-dom';

interface IMatchProps {
    id: string
}

interface Props {

}

interface State {
    glist: Array<string>,
    dlist: Array<string>,
    gempty: boolean,
    dempty: boolean
}

class SnapshotList extends Component<RouteComponentProps<IMatchProps> & Props, State> {
    lang = LData.lang;

    state: State = {
        glist: [],
        dlist: [],
        gempty: true,
        dempty: true
    }
    
    componentDidMount() {
        axios.post(commonData.commonDataURL+"skill/snapshot/list/"+this.props.match.params.id)
        .then((res) => {
            const json = res.data;
            const list = json.list;

            const gflist = [];
            const dmlist = [];
            let gempty = true;
            let dempty = true;

            // '.'과 '_'으로 split
            for(let i = 0; i < list.length; i++) {
                const c = list[i].split('.')[0].split('_');
                if(c[1] === "gf") gflist.push(c[0]);
                else if(c[1] === "dm") dmlist.push(c[0]);
            }

            gflist.sort(function(a, b) {
                if(a > b) return 1;
                else if(b > a) return -1;
                else return 0;
            });

            dmlist.sort(function(a, b) {
                if(a > b) return 1;
                else if(b > a) return -1;
                else return 0;
            });

            if(gflist.length > 0) {
                gempty = false;
            }

            if(dmlist.length > 0) {
                dempty = false;
            }

            this.setState({
                glist: gflist,
                dlist: dmlist,
                gempty: gempty,
                dempty: dempty
            });
        });
    }

    render() {
        const self = this;

        return (
            <Container fluid={true}>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Snapshot List</h3>
                            </CardHeader>
                            <CardBody id="snaplist">
                                <Row>
                                    <Col xs="12">
                                        {(txtSnapshot.desc1 as any)[this.lang]}<br/>
                                        <b style={{color:"coral"}}>{(txtSnapshot.desc2 as any)[this.lang]}</b><br/>
                                        {(txtSnapshot.desc3 as any)[this.lang]}<br/><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <Card>
                                            <CardHeader>
                                                <h3>GuitarFreaks</h3>
                                            </CardHeader>
                                            <CardBody>
                                                {
                                                    (function() {
                                                        if(self.state.gempty) {
                                                            return (<h3>LIST IS EMPTY</h3>)
                                                        }
                                                        else {
                                                            return (<SnapshotItem id={self.props.match.params.id} date={self.state.glist} gtype="gf" />)
                                                        }
                                                    })()
                                                }
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col sm="6">
                                        <Card>
                                            <CardHeader>
                                                <h3>DrumMania</h3>
                                            </CardHeader>
                                            <CardBody>
                                                {
                                                    (function() {
                                                        if(self.state.dempty) {
                                                            return (<h3>LIST IS EMPTY</h3>)
                                                        }
                                                        else {
                                                            return (<SnapshotItem id={self.props.match.params.id} date={self.state.dlist} gtype="dm" />)
                                                        }
                                                    })()
                                                }
                                            </CardBody>
                                        </Card>
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

export default SnapshotList;