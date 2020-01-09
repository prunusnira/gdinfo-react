import React, {Component, Fragment} from 'react';
import './skill.css';
import '../../Common/table.css';

import {
    Row,
    Col
} from 'reactstrap';
import commonData from '../../Common/commonData';
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
                                <Col xs="6"
                                    style={{padding: "0px", margin: "0px"}}>
                                    <img alt="jacket-img"
                                        style={{width:"100%",
                                            padding: "0px", margin: "0px"}}
                                        src={skill.jacketurl}
                                        onError={(e) => {
                                            e.currentTarget.src=commonData.commonImageURL+"music/empty.jpg"}} /><br/>
                                    <span>Lv. {skill.level}</span>
                                </Col>
                                <Col xs="6" className="text-center"
                                    style={{padding: "0px", margin: "0px"}}>
                                    <img alt="rank" style={{width: "100%",
                                        padding: "0px", margin: "0px"}} src={skill.rankimg} /><br/>
                                    <img alt="clearchk" style={{width: "100%",
                                        padding: "0px", margin: "0px"}} src={skill.fcimg} /><br/>
                                    <img style={{width: "100%",
                                        padding: "0px", margin: "0px"}} src={skill.pattern} />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" className="text-center"
                                    style={{fontSize: "100%",
                                            padding: "0px", margin: "0px"}}>
                                    {skill.rate}%/{skill.skill}
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