import React from 'react'
import {Link} from 'react-router-dom';
import { BodyContent, BodyHeader, Container, ItemRow } from '@/styled/styledCommon';
import MusicItem from './musicItem';
import CommonData from '@/component/common/commonData';
import MusicDataType from './musicData';

interface Props {
    mid: string,
    musicName: string,
    composer: string,
    version: string,
    profLink: string,
    playerName: string,
    patternlist: Array<MusicDataType>,
}

const MusicPresenter = (props: Props) => {
    return (
        <Container>
            <ItemRow setVertical={true}>
                <BodyHeader>
                    <h3>Music</h3>
                </BodyHeader>
                <BodyContent>
                    <div className="div-table">
                        <div className="div-table-row" id="musicinfo">
                            <div className="div-table-cell">
                                <img alt="jacket-img" src={`${CommonData.jacketUrl}${props.mid}.jpg`}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = process.env.PUBLIC_URL+"/general-img/empty.jpg";
                                        }} className='img-fluid' style={{maxWidth:"85px"}} />
                            </div>
                            <div className="div-table-cell">
                                <span style={{fontSize:"150%"}}>{props.musicName}</span><br/>
                                <span style={{fontSize:"120%"}}>{props.composer}</span><br/>
                                <span>{props.version}</span>
                            </div>
                        </div>
                        <div className="div-table-row">
                            <div className="div-table-cell">
                            </div>
                            <div className="div-table-cell" id="userinfo">
                                <span>Player</span>&nbsp;
                                <Link id="player" className='innerhref' to={props.profLink}>
                                    {props.playerName}
                                </Link>
                            </div>
                        </div>
                    </div>
                </BodyContent>
            </ItemRow>
            <ItemRow id="record" setVertical={true}>
                <BodyHeader>
                    <h3>Guitar</h3>
                </BodyHeader>
                <BodyContent>
                    <MusicItem list={props.patternlist} type={0} />
                </BodyContent>
                <BodyHeader>
                    <h3>Bass</h3>
                </BodyHeader>
                <BodyContent>
                    <MusicItem list={props.patternlist} type={1} />
                </BodyContent>
                <BodyHeader>
                    <h3>Drum</h3>
                </BodyHeader>
                <BodyContent>
                    <MusicItem list={props.patternlist} type={2} />
                </BodyContent>
            </ItemRow>
        </Container>
    )
}

export default MusicPresenter