import React from 'react'
import {Link} from 'react-router-dom'
import '../skill.css'
import '@/component/common/table.css'
import SkillItemData from '../skillItem/skillItemData'

import {
    Row,
    Col
} from 'reactstrap'

const SkillTableNR: React.FC<{list: Array<SkillItemData>}> = list => {
    return (
        <>
        {
            list.list.map((v, i) => {
                return (
                    <div key={`j${i}`} className="div-table-row skilltable" style={{borderBottom: "1px solid black"}}>
                        {/* 스킬색상 부분 */}
                        <div className="div-table-cell" style={v.tableColor}>
                            {/* 번호 */}
                            <span style={{fontSize:"110%",
                                textShadow:
                                    "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
                            }}>{v.num}</span>
                        </div>
                        <div className="div-table-cell text-center" style={{padding:"5px !important", margin:"0px !important"}}>
                            {/* 재킷 및 패턴 */}
                            <img alt={`jacket-img${i}`} style={{width:"75px"}} src={v.iconUrl}
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = `${process.env.PUBLIC_URL}/general-img/empty.jpg`
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
                                        <Link className='innerhref' to={v.musicLink} style={{fontSize: "125%", display:"table-cell", overflowX:"hidden", textOverflow:"ellipsis"}}>
                                            {v.musicTitle}
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
                                <Col xs="6" className="zerogap">
                                    {v.rate}%
                                </Col>
                            </Row>
                            {/* 기록정보 */}
                            <Row className="zerogap">
                                <Col xs="6" className="zerogap">
                                    {
                                        (() => {
                                            if(v.rank !== '') {
                                                return <img alt="rank" className='skillrank-img' src={v.rank} />
                                            }
                                        })()
                                    }
                                    <span dangerouslySetInnerHTML={{__html:"<img style='height:25px' src='"+v.clearImg300+"' />"}}></span>
                                </Col>
                                <Col xs="6" className="zerogap">
                                    {v.skill}
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
        </>
    )
}

export default SkillTableNR;