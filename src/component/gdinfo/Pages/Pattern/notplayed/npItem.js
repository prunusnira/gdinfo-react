import React, {Component, Fragment} from 'react';

import {
    Row,
    Col
} from 'reactstrap';

class NpItem extends Component {
    render() {
        return (
            <Fragment>
                {
                    this.props.list.map((np, i) => {
                        return (
                            <div class='div-table-row'>
                                <div class='div-table-cell listimg'>
                                    <img alt="jacket-img"
                                        style={{width:"75px", height:"75px"}}
                                        src={np.imgsrc}
                                        onError={(e)=>{
                                            e.target.src="/img/music/empty.jpg";
                                        }} />
                                    <img alt="pattern"
                                        style={{width:"75px"}}
                                        src={np.pattern} />
                                </div>
                                <div class='div-table-cell'>
                                    <Row>
                                        <Col xs="12" className="text-left">
                                            <a className='innerhref'
                                                style={{fontSize:"125%"}}
                                                href={np.link}>
                                                {np.name}
                                            </a><br/>
                                            <span>{np.lv} / {np.ver}</span>
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

export default NpItem;