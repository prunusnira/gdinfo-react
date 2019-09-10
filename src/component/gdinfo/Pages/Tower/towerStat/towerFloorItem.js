import React, {Component, Fragment} from 'react';

import {
    Row,
    Col
} from 'reactstrap';

class TowerFloorItem extends Component {
    render() {
        return (
            <Fragment>
                {
                    this.props.list.map((fl, i) => {
                        return (
                            <Row>
                                <Col xs="2" className="listimg-skill">
                                    <img alt="jacket-img" src={fl.jacket} />
                                </Col>
                                <Col xs="8">
                                    <Row>
                                        <Col xs="8" className="text-center">
                                            <span style={{fontSize:"125%"}}>
                                                {fl.name}
                                            </span><br/>
                                            {fl.pattern} / {fl.lv}
                                        </Col>
                                        <Col xs="4">
                                            <span class='tower-div-span'>
                                                Score <span v-html="fl.score"></span> / {fl.condScore}<br/>
                                                Rate <span v-html="fl.rate"></span>% / {fl.condRate}%<br/>
                                                Combo <span v-html="fl.combo"></span> / {fl.condCombo}
                                            </span>
                                        </Col>
                                    </Row>
                                    <Row style={{paddingBottom:"10px"}} id='description'>
                                        <Col xs="4" className="text-right">
                                            <img src='/img/tower/rightbottom.png' />
                                        </Col>
                                        <Col xs="8" className="text-left">
                                            <span v-html="fl.description"></span>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs="2">
                                    <img style={{width:"50px"}} src={fl.clear} />
                                    <span v-html="fl.titlechange"></span>
                                </Col>
                            </Row>
                        )
                    })
                }
            </Fragment>
        )
    }
}

export default TowerFloorItem;