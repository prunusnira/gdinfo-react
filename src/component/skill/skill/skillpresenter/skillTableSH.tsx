import React, {Component, Fragment} from 'react';
import '../skill.css';
import '../../../common/table.css';

import {
    Row,
    Col
} from 'reactstrap';
import SkillItemData from '../skillItem/skillItemData';

const SkillTableSH: React.FC<{list: Array<SkillItemData>}> = list => {
    return (
        <>
        {
            list.list.map(v => {
                return (
                    <Col xs="4" md="3" lg="2"
                        className="skillupper">
                        <Row>
                            <Col xs="12" style={{
                                padding: "0px",
                                margin: "0px"}}>
                                <div className="text-center"
                                    style={v.tableColor}>
                                    <b style={{
                                        textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"}}>
                                        {v.num}
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
                                    {v.musicTitle}
                                </b>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="4"
                                className="text-center zerogap">
                                <img className="zerogap"
                                    alt="jacket-img"
                                    style={{width:"40px"}}
                                    src={v.iconUrl}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = process.env.PUBLIC_URL+"/general-img/empty.jpg"}} />
                            </Col>
                            <Col xs="8" className="text-center zerogap">
                                <Row className="zerogap">
                                    <Col xs="12" className="zerogap">
                                        <img alt="patternimg" className="sharediff zerogap" src={v.pattern300} />
                                        &nbsp;
                                        <span style={{fontWeight: "bold"}}>{v.level}</span>
                                    </Col>
                                </Row>
                                <Row className="zerogap">
                                    <Col xs="12" className="zerogap">
                                        <img alt="rank" className="sharemark zerogap"
                                            src={v.rank} />
                                        <img alt="clearchk" className="sharemark zerogap"
                                            src={v.clearImg300} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{paddingBottom: "5px"}}>
                            <Col xs="6" className="text-center zerogap rate">
                                {v.rate}%
                            </Col>
                            <Col xs="6" className="text-center zerogap skill">
                                {v.skill}
                            </Col>
                        </Row>
                    </Col>
                )
            })
        }
        </>
    )
}

export default SkillTableSH;