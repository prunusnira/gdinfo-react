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
                                            <span className='tower-div-span'>
                                                Score <span>{
                                                    (function() {
                                                        if(fl.score > fl.condScore) {
                                                            return <font color="red">{fl.score}</font>
                                                        }
                                                        else if(fl.score < fl.condScore) {
                                                            return <font color="blue">{fl.score}</font>
                                                        }
                                                        else {
                                                            return <font>{fl.score}</font>
                                                        }
                                                    })()
                                                }</span> / {fl.condScore}<br/>
                                                Rate <span>{
                                                    (function() {
                                                        if(fl.rate > fl.condRate) {
                                                            return <font color="red">{fl.rate}</font>
                                                        }
                                                        else if(fl.rate < fl.condRate) {
                                                            return <font color="blue">{fl.rate}</font>
                                                        }
                                                        else {
                                                            return <font>{fl.rate}</font>
                                                        }
                                                    })()
                                                }</span>% / {fl.condRate}%<br/>
                                                Combo <span>{
                                                    (function() {
                                                        if(fl.combo > fl.condCombo) {
                                                            return <font color="red">{fl.combo}</font>
                                                        }
                                                        else if(fl.combo < fl.condCombo) {
                                                            return <font color="blue">{fl.combo}</font>
                                                        }
                                                        else {
                                                            return <font>{fl.combo}</font>
                                                        }
                                                    })()
                                                }</span> / {fl.condCombo}
                                            </span>
                                        </Col>
                                    </Row>
                                    <Row style={{paddingBottom:"10px"}} id='description'>
                                        <Col xs="4" className="text-right">
                                            <img src={process.env.PUBLIC_URL+"/general-img/tower/rightbottom.png"} />
                                        </Col>
                                        <Col xs="8" className="text-left">
                                            <span dangerouslySetInnerHTML={{__html: fl.description}}></span>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs="2">
                                    <img style={{width:"50px"}} src={fl.clear} /><br/>
                                    <span dangerouslySetInnerHTML={{__html: fl.titlechange}}></span>
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