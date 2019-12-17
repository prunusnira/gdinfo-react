import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

import {
    Row,
    Col
} from 'reactstrap';

class MusicItem extends Component {
    render() {
        return (
            <Fragment>
            {
                this.props.list.map((music, i) => {
                    return (
                        <Row className="table-border-bottom">
                            {/* 난이도 표시 */}
                            <Col xs="2">
                                <div class='vert-cent-o'>
                                    <div class='vert-cent-m'>
                                        <div class='vert-cent-i'>
                                            <Link class='innerhref' to={music.ranklink}>
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
                                                {music.playcountTitle}
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
                                                {music.comboTitle}
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
                                                {music.scoreTitle}
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
                                                {music.rateTitle}
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
                                                {music.skillTitle}
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
                                                {music.rankTitle}
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
                                        {music.rateTitle} (OLD)<br/>
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