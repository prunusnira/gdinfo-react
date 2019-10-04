import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import SingleSkillColorChanger from '../../Common/skillcolor';

import {
    Row,
    Col
} from 'reactstrap';

class SRItem extends Component {
    render() {
        const rank = this.props.rank;
        return (
            <Fragment>
            {
                rank.map((r, i) => {
                    return (
                    <Row className="div-table-row">
                            <div class='div-table-cell'>
                                {r.index}
                            </div>
                            <div class='div-table-cell'>
                                <Row>
                                    <Col xs="7">
                                        <Row>
                                            <Col xs="12" className="text-left">
                                                <span v-html='rank.towertitle'></span>
                                                <Link href="#no_div" style={{fontSize: "125%"}} className='innerhref' to={r.profilerank}>
                                                    {r.username}
                                                </Link>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" className="text-left">
                                                {r.timeTitle} {r.time}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs="5">
                                        <Row>
                                            <Col xs="3">G</Col>
                                            <Col xs="9" className="text-left blackandwhite">
                                                <a href="#no_div" class='skill' tag={Link} to={r.glink}>
                                                    <SingleSkillColorChanger skill={r.gskill} />
                                                </a>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="3">D</Col>
                                            <Col xs="9" className="text-left blackandwhite">
                                                <a href="#no_div" class='skill' tag={Link} to={r.dlink}>
                                                    <SingleSkillColorChanger skill={r.dskill} />
                                                </a>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="3">A</Col>
                                            <Col xs="9" className="text-left blackandwhite">
                                                <SingleSkillColorChanger skill={r.allskill} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </Row>
                    )
                })
            }
            </Fragment>
        )
    }
}

export default SRItem;