import React, {Component, Fragment} from 'react';
import TowerFloorItem from './towerFloorItem';

import {
    Row,
    Col
} from 'reactstrap';

class TowerStatList extends Component {
    render() {
        return (
            <Fragment>
            {
                this.props.list.map((tl, i) => {
                    return (
                        <Row>
                            <Col xs="12">
                                <Row>
                                    <Col xs="2" id={tl.btnid}
                                        style={{fontSize:"125%"}}>
                                        <a class='innerhref' style={{width:"100%", height:"auto"}}
                                            href='#no_div' id={tl.topid} onClick={tl.divopen}>
                                            {tl.opbtn}
                                        </a>
                                    </Col>
                                    <Col xs="5">
                                        <a class='innerhref' style={{width:"100%", height:"auto"}}
                                            href='#no_div' id={tl.topid} onClick={tl.divopen}>
                                            Floor {tl.floor}
                                        </a>
                                    </Col>
                                    <Col xs="2">
                                        <img style={{width:"50px"}} src={tl.floorclear} />
                                    </Col>
                                    <Col xs="3">
                                        {tl.titlechangable}<br/>
                                        <span v-html="tl.btnchangable"></span>
                                    </Col>
                                </Row>
                                <div style={{display:"none"}} id={tl.floorid}>
                                    <Row>
                                        <Col xs="12">
                                            <span style='padding:10px;'>
                                                {tl.clearnotice}
                                            </span>
                                        </Col>
                                    </Row>
                                    <TowerFloorItem list={tl.floorlist} />
                                </div>
                            </Col>
                        </Row>
                    )
                })
            }
            </Fragment>
        )
    }
}

export default TowerStatList;