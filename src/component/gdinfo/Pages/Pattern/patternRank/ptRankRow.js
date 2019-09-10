import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

import {
    Row,
    Col
} from 'reactstrap';

class PatternRankRow extends Component {
    render() {
        return (
            <Fragment>
                {
                    this.props.list.map((pd, i) => {
                        return (
                            <div className='div-table-row table-border-bottom'>
                                <div className='div-table-cell' style={pd.ratecolor}></div>
                                <div className='div-table-cell' style={pd.skillcolor}></div>
                                <div className='div-table-cell'>{pd.index}</div>
                                <div className='div-table-cell'>
                                    <Row>
                                        <Col sm="6" className="text-left" style={{fontSize:"120%"}}>
                                            <span v-html="pd.towertitle"></span>
                                            <Link class='innerhref' to={pd.profile}>
                                                {pd.name} ⓟ
                                            </Link>
                                        </Col>
                                        <Col sm="6" className="text-left">
                                            <img alt="rank" className='skillrank-img' src={pd.rank} />
                                            <span v-html='pd.fc'></span>
                                            / {pd.skill} / {pd.rate}%
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        )
                    })
                }
            </Fragment>
        )
    }
}

export default PatternRankRow;