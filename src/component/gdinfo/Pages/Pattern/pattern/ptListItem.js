import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import PTListItemRow from './ptListItemRow';

import {
    Row,
    Col
} from 'reactstrap';

class PTListItem extends Component {
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
                                        onError={(e) => {e.src="/img/music/empty.jpg"}} /><br/>
                                    <span>
                                        <Link className='innerhref' to={p.link}>
                                            {p.name}
                                        </Link>
                                        <span v-html="pt.removed"></span>
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