import React, {Component, Fragment} from 'react';
import './skill.css';
import '../../Common/table.css';

import {
    Row,
    Col
} from 'reactstrap';
import SkillTableData from './skillTableData';

interface Props {
    list: Array<SkillTableData>
}

class SkillTableSH extends Component<Props> {
    render() {
        return (
            <Fragment>
            {
                this.props.list.map((skill, i) => {
                    return (
                        <Col xs="4" md="3"
                            className="skillupper">
                            <Row>
                                <Col xs="12" style={{
                                    padding: "0px",
                                    margin: "0px"}}>
                                    <div className="text-center"
                                        style={skill.skillcolor}>
                                        <b style={{
                                            textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"}}>
                                            {skill.num}
                                        </b>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12"
                                    style={{padding: "1px",
                                            margin: "0px",
                                            textAlign: "center",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"}}>
                                    <b style={{wordBreak: "break-all"}}>
                                        {skill.musicname}
                                    </b>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="4"
                                    className="text-center zerogap">
                                    <img className="zerogap"
                                        alt="jacket-img"
                                        style={{width:"40px"}}
                                        src={skill.jacketurl}
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = process.env.PUBLIC_URL+"/general-img/empty.jpg"}} />
                                </Col>
                                <Col xs="8" className="text-center zerogap">
                                    <Row className="zerogap">
                                        <Col xs="12" className="zerogap">
                                            <img alt="patternimg" className="sharediff zerogap" src={skill.pattern300} />
                                            &nbsp;
                                            <span style={{fontWeight: "bold"}}>{skill.level}</span>
                                        </Col>
                                    </Row>
                                    <Row className="zerogap">
                                        <Col xs="12" className="zerogap">
                                            <img alt="rank" className="sharemark zerogap"
                                                src={skill.rankimg} />
                                            <img alt="clearchk" className="sharemark zerogap"
                                                src={skill.fcimg300} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row style={{paddingBottom: "5px"}}>
                                <Col xs="6" className="text-center zerogap rate">
                                    {skill.rate}%
                                </Col>
                                <Col xs="6" className="text-center zerogap skill">
                                    {skill.skill.toFixed(2)}
                                </Col>
                            </Row>
                        </Col>
                    )
                })
            }
            </Fragment>
        )
    }
}

export default SkillTableSH;