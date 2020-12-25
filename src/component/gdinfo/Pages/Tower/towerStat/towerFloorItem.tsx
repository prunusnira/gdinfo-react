import React, {Component, Fragment} from 'react';

import {
    Row,
    Col
} from 'reactstrap';
import { FloorItemData } from './towerStatData';

interface Props {
    list: Array<FloorItemData>
}

class TowerFloorItem extends Component<Props> {
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
                                                            return <span style={{color:"red"}}>{fl.score}</span>
                                                        }
                                                        else if(fl.score < fl.condScore) {
                                                            return <span style={{color:"blue"}}>{fl.score}</span>
                                                        }
                                                        else {
                                                            return <span>{fl.score}</span>
                                                        }
                                                    })()
                                                }</span> / {fl.condScore}<br/>
                                                Rate <span>{
                                                    (function() {
                                                        if(fl.rate > fl.condRate) {
                                                            return <span style={{color:"red"}}>{fl.rate}</span>
                                                        }
                                                        else if(fl.rate < fl.condRate) {
                                                            return <span style={{color:"blue"}}>{fl.rate}</span>
                                                        }
                                                        else {
                                                            return <span>{fl.rate}</span>
                                                        }
                                                    })()
                                                }</span>% / {fl.condRate}%<br/>
                                                Combo <span>{
                                                    (function() {
                                                        if(fl.combo > fl.condCombo) {
                                                            return <span style={{color:"red"}}>{fl.combo}</span>
                                                        }
                                                        else if(fl.combo < fl.condCombo) {
                                                            return <span style={{color:"blue"}}>{fl.combo}</span>
                                                        }
                                                        else {
                                                            return <span>{fl.combo}</span>
                                                        }
                                                    })()
                                                }</span> / {fl.condCombo}
                                            </span>
                                        </Col>
                                    </Row>
                                    <Row style={{paddingBottom:"10px"}} id='description'>
                                        <Col xs="4" className="text-right">
                                            <img alt="towerbottom" src={process.env.PUBLIC_URL+"/general-img/tower/rightbottom.png"} />
                                        </Col>
                                        <Col xs="8" className="text-left">
                                            <span dangerouslySetInnerHTML={{__html: fl.description}}></span>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs="2">
                                    <img alt="towerclear" style={{width:"50px"}} src={fl.clear} /><br/>
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