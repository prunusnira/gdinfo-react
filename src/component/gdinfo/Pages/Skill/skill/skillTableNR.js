import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import './skill.css';
import '../../Common/table.css';
import commonData from '../../Common/commonData';

import {
    Row,
    Col
} from 'reactstrap';

class SkillTableNR extends Component {
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
                                <span style={{fontSize:"150%",
                                    textShadow:
                                        "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
                                }}>{v.num}</span>
                            </div>
                            <div className="div-table-cell text-center" style={{padding:"5px !important", margin:"0px !important"}}>
                                {/* 재킷 및 패턴 */}
                                <img alt="jacket-img" style={{width:"85px"}} src={v.jacketurl}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src=commonData.commonImageURL+"music/empty.jpg";
                                    }} /><br/>
                                <img alt="pattern-img" style={{width:"85px"}} src={v.pattern} /><br/>
                                <span>{v.level}</span><br/>
                                <span>{v.version}</span>
                            </div>
                            {/* 패턴 정보 및 리절트 */}
                            <div className='div-table-cell' style={{verticalAlign:"middle"}}>
                                {/* 음악 정보 */}
                                <Row>
                                    <Col xs="12" className='text-left' style={{width:"100%"}}>
                                        <div style={{display:"table", tableLayout:"fixed", width:"100%", whiteSpace: "nowrap"}}>
                                            <Link className='innerhref' to={v.musiclink} style={{fontSize: "125%", display:"table-cell", overflowX:"hidden", textOverflow:"ellipsis"}}>
                                                {v.musicname}
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                                {/* 스킬미터 */}
                                <Row>
                                    <Col xs="12" className='text-left' dangerouslySetInnerHTML={{__html: v.meter}}></Col>
                                </Row>
                                {/* 기록정보 */}
                                <Row>
                                    <Col xs="12" className='text-left'>
                                        <span>
                                            <img alt="rank" className='skillrank-img' src={v.rankimg} />
                                            <span dangerouslySetInnerHTML={{__html:"<img style='height:25px' src='"+v.fcimg+"' />"}}></span>
                                        </span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" className='text-left'>
                                        {v.rate}% / {v.skill}
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

export default SkillTableNR;