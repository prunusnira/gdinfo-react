import React, {Component, Fragment} from 'react';

import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';
import { TowerClearData } from './towerClearData';

interface Props {
    list: Array<TowerClearData>
}

class TowerStatTable extends Component<Props> {
    render() {
        return (
            <Fragment>
                {
                    this.props.list.map((t, i) => {
                        return (
                            <Row>
                                <Col xs="12">
                                    <Card style={{padding:"10px"}}>
                                        <CardHeader>
                                            {t.tower}
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                {
                                                    t.floors.map((x, i) => {
                                                        return (
                                                            <Col xs="12">
                                                                {x.floor}: {x.clear}
                                                            </Col>
                                                        )
                                                    })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        )
                    })
                }
            </Fragment>
        )
    }
}

export default TowerStatTable;