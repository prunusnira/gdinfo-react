import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import txtMusic from './txtmusic';
import LData from '../../Common/language';

import {
    Row,
    Col
} from 'reactstrap';
import MusicData from './musicData';

interface Props {
    list: Array<MusicData>
}

class MusicItem extends Component<Props> {
    lang = LData.lang;

    render() {
        return (
            <Fragment>
            {
                this.props.list.map((music, i) => {
                    return (
                        <Row className="table-border-bottom">
                            {/* 난이도 표시 */}
                            <Col xs="2">
                                <div className='vert-cent-o'>
                                    <div className='vert-cent-m'>
                                        <div className='vert-cent-i'>
                                            <Link className='innerhref' to={music.ranklink}>
                                                {music.diff}<br/>{music.lv}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs="10">
                                {/* 윗줄 */}
                                <Row>
                                    <Col sm="6">
                                        {/* 클리어 횟수 */}
                                        <Row>
                                            <Col xs="6" className="text-right">
                                                {(txtMusic.count as any)[this.lang]}
                                            </Col>
                                            <Col xs="6" className="text-left">
                                                <span>
                                                    {music.cleartime} / {music.playtime}
                                                </span>
                                            </Col>
                                        </Row>
                                        {/* 콤보 */}
                                        <Row>
                                            <Col xs="6" className="text-right">
                                                {(txtMusic.combo as any)[this.lang]}
                                            </Col>
                                            <Col xs="6" className="text-left">
                                                <span>
                                                    {music.combo}
                                                </span>
                                            </Col>
                                        </Row>
                                        {/* 점수 */}
                                        <Row>
                                            <Col xs="6" className="text-right">
                                                {(txtMusic.score as any)[this.lang]}
                                            </Col>
                                            <Col xs="6" className="text-left">
                                                <span>
                                                    {music.score}
                                                </span>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm="6">
                                        {/* 달성률 */}
                                        <Row>
                                            <Col xs="6" className="text-right">
                                                {(txtMusic.rate as any)[this.lang]}
                                            </Col>
                                            <Col xs="6" className="text-left">
                                                <span>
                                                    {music.rate}%
                                                </span>
                                            </Col>
                                        </Row>
                                        {/* 스킬 */}
                                        <Row>
                                            <Col xs="6" className="text-right">
                                                {(txtMusic.skill as any)[this.lang]}
                                            </Col>
                                            <Col xs="6" className="text-left">
                                                <span>
                                                    {music.skill}
                                                </span>
                                            </Col>
                                        </Row>
                                        {/* 랭크 */}
                                        <Row>
                                            <Col xs="6" className="text-right">
                                                {(txtMusic.rank as any)[this.lang]}
                                            </Col>
                                            <Col xs="6" className="text-left">
                                                <img className='skillrank-img' src={music.rank} />
                                                <span dangerouslySetInnerHTML={{__html: music.fc}}></span>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                {/* 아랫줄 */}
                                <Row className="text-center">
                                    {/* 클리어미터 */}
                                    <Col xs="12">
                                        Clear Meter<br/>
                                        <span dangerouslySetInnerHTML={{__html: music.clearmeter}}></span>
                                    </Col>
                                </Row>
                                <Row className="text-center">
                                    {/* 구작 달성률 */}
                                    <Col xs="12">
                                        {(txtMusic.rate as any)[this.lang]} (OLD)<br/>
                                        EX: {music.rateex}% / MX: {music.ratemx}% / TBRE: {music.ratetbre}% / TB: {music.ratetb}%
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    )
                })
            }
            </Fragment>
        )
    }
}

export default MusicItem;