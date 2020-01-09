import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import SingleSkillColorChanger from '../../Common/skillcolor';
import LData from '../../Common/language';
import txtSrank from './txtskillrank';

import {
    Row,
    Col
} from 'reactstrap';
import SRankData from './srankData';

interface Props {
    rank: Array<SRankData>,
    gtype: string
}

class SRItem extends Component<Props> {
    lang = LData.lang;

    render() {
        const rank = this.props.rank;
        return (
            <Fragment>
            {
                rank.map((r, i) => {
                    return (
                    <Row className="div-table-row">
                            <div className='div-table-cell'>
                                {r.index}
                            </div>
                            <div className='div-table-cell'>
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
                                                {(txtSrank.table.uptime as any)[this.lang]} {r.time}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs="5">
                                        <Row>
                                            <Col xs="3">G</Col>
                                            <Col xs="9" className="text-left blackandwhite">
                                                <Link className='skill' to={r.glink}>
                                                    <SingleSkillColorChanger
                                                        skill={parseFloat(r.gskill)}
                                                        link="" />
                                                </Link>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="3">D</Col>
                                            <Col xs="9" className="text-left blackandwhite">
                                                <Link className='skill' to={r.dlink}>
                                                    <SingleSkillColorChanger
                                                        skill={parseFloat(r.dskill)}
                                                        link="" />
                                                </Link>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="3">A</Col>
                                            <Col xs="9" className="text-left blackandwhite">
                                                <SingleSkillColorChanger
                                                    skill={parseFloat(r.allskill)}
                                                    link="" />
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