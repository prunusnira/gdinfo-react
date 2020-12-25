import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
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

class SkillTableNR extends Component<Props> {
    render() {
        const list = this.props.list;
        return (
            <Fragment>
            {
                list.map((v, i) => {
                    return (
                        <div className="div-table-row skilltable" style={{borderBottom: "1px solid black"}}>
                            {/* 스킬색상 부분 */}
                            <div className="div-table-cell" style={v.skillcolor}>
                                {/* 번호 */}
                                <span style={{fontSize:"110%",
                                    textShadow:
                                        "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
                                }}>{v.num}</span>
                            </div>
                            <div className="div-table-cell text-center" style={{padding:"5px !important", margin:"0px !important"}}>
                                {/* 재킷 및 패턴 */}
                                <img alt="jacket-img" style={{width:"75px"}} src={v.jacketurl}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = process.env.PUBLIC_URL+"/general-img/empty.jpg";
                                    }} />
                                <br/>
                                <span>{v.version}</span>
                            </div>
                            {/* 패턴 정보 및 리절트 */}
                            <div className='div-table-cell' style={{verticalAlign:"middle"}}>
                                {/* 음악 정보 */}
                                <Row className="zerogap">
                                    <Col xs="12" className="text-left zerogap" style={{width:"100%"}}>
                                        <div style={{display:"table", tableLayout:"fixed", width:"100%", whiteSpace: "nowrap"}}>
                                            <Link className='innerhref' to={v.musiclink} style={{fontSize: "125%", display:"table-cell", overflowX:"hidden", textOverflow:"ellipsis"}}>
                                                {v.musicname}
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                                {/* 버전 난이도 */}
                                <Row className="zerogap">
                                    <Col xs="6" className="zerogap">
                                        <img alt="pattern-img" style={{width:"42px"}} src={v.pattern300} />
                                        &nbsp;
                                        <span style={{fontWeight: "bold"}}>{v.level}</span>
                                    </Col>
                                    <Col xs="6" className="zerogap rate">
                                        {v.rate}%
                                    </Col>
                                </Row>
                                {/* 기록정보 */}
                                <Row className="zerogap">
                                    <Col xs="6" className="zerogap">
                                        <img alt="rank" className='skillrank-img' src={v.rankimg} />
                                        <span dangerouslySetInnerHTML={{__html:"<img style='height:25px' src='"+v.fcimg300+"' />"}}></span>
                                    </Col>
                                    <Col xs="6" className="zerogap skill">
                                        {v.skill.toFixed(2)}
                                    </Col>
                                </Row>
                                {/* 스킬미터 */}
                                <Row className="zerogap">
                                    <Col xs="12" className="text-left zerogap" dangerouslySetInnerHTML={{__html: v.meter}}></Col>
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

export default SkillTableNR;