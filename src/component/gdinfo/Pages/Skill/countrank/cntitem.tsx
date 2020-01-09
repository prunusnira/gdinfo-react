import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

import {
    Row,
    Col
} from 'reactstrap';
import CntrankData from './cntrankData';

interface Props {
    list: Array<CntrankData>
}

class CountRankItem extends Component<Props> {
    render() {
        const list = this.props.list;
        return (
            <Fragment>
                {
                    list.map((v, i) => {
                        return (
                            <Row style={{paddingTop:"3px", paddingBottom:"3px"}}>
                                <Col xs="1">
                                    {v.index}
                                </Col>
                                <Col xs="11">
                                    <Row>
                                        <Col xs="12" md="5" className="text-left">
                                            {
                                                (function() {
                                                    if(v.towertitle !== "") {
                                                        return (
                                                            <img alt="titletower" className="towertitle35" src={v.towertitle} />
                                                        )
                                                    }
                                                })()
                                            }
                                            <span id="towertitle" v-html="list.towertitle"></span>
                                            <Link className="innerhref" to={v.prlink}>{v.name}</Link>
                                        </Col>
                                        <Col xs="12" md="7" className="text-right">
                                            <Row>
                                                <Col xs="3">G<br/>{v.gfcnt}</Col>
                                                <Col xs="1">+</Col>
                                                <Col xs="3">D<br/>{v.dmcnt}</Col>
                                                <Col xs="1">=</Col>
                                                <Col xs="3">A<br/>{v.allcnt}</Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        )
                    })
                }
            </Fragment>
            
        )
    }
}

export default CountRankItem;