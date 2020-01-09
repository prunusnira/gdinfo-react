import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import PTListItemRow from './ptListItemRow';

import {
    Row,
    Col
} from 'reactstrap';
import commonData from '../../Common/commonData';
import { PatternData } from './patternData';

interface Props {
    list: Array<PatternData>
}

class PTListItem extends Component<Props> {
    render() {
        return (
            <Fragment>
                {
                    this.props.list.map((p, i) => {
                        return (
                            <Row className="table-border-bottom" style={{padding:"10px"}}>
                                <Col sm="4" className="text-center">
                                    {/* 자켓 */}
                                    <img alt="jacket-img"
                                        style={{width:"85px", height:"85px"}}
                                        src={p.jacket}
                                        onError={(e) => {
                                            e.currentTarget.src=commonData.commonImageURL+"music/empty.jpg"}} /><br/>
                                    <span>
                                        <Link className='innerhref' to={p.link}>
                                            {p.name}
                                        </Link>
                                        <span style={{color:"red"}}>
                                            <br/>
                                            {
                                                (function() {
                                                    switch(p.removed) {
                                                        case "1":
                                                            return <b>(removed in TB)</b>
                                                        case "2":
                                                            return <b>(removed in TBRE)</b>
                                                        case "3":
                                                            return <b>(removed in MX)</b>
                                                        case "4":
                                                            return <b>(removed in EX)</b>
                                                        case "5":
                                                            return <b>(removed in NX)</b>
                                                    }
                                                })()
                                            }
                                        </span>
                                    </span>
                                </Col>
                                <Col sm="8">
                                    <div className='div-table' style={{width:"100%"}}>
                                        <div className='div-table-header'>
                                            <div className='div-table-cell'></div>
                                            <div className='div-table-cell'>GUITAR</div>
                                            <div className='div-table-cell'>BASS</div>
                                            <div className='div-table-cell'>DRUM</div>
                                        </div>
                                        {/* component 안에 component 추가 */}
                                        <PTListItemRow list={p.difflist} />
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

export default PTListItem;