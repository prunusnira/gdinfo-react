import React from 'react';
import {Link} from 'react-router-dom';
import MusicDataType from './musicData';
import store from '../../../mobx/store';
import { ItemCol, ItemRow } from '../../../styled/styledCommon';

import txtMusicKo from '../../../lang/pattern/music/txtmusic-ko';
import txtMusicJp from '../../../lang/pattern/music/txtmusic-ko';
import txtMusicEn from '../../../lang/pattern/music/txtmusic-ko';

interface Props {
    list: Array<MusicDataType>
    type: number
}

const MusicItem = (props: Props) => {
    const lang = store.language.lang

    const txtMusic =
        lang === 'ko' ? txtMusicKo :
            lang === 'jp' ? txtMusicJp : txtMusicEn
    
    return (
        <>
        {
            props.list.map((music, i) => {
                if((props.type === 0 && (i === 0 || i === 1 || i === 2 || i === 3)) ||
                    (props.type === 1 && (i === 4 || i === 5 || i === 6 || i === 7)) ||
                    (props.type === 2 && (i === 8 || i === 9 || i === 10 || i === 11))
                ) {
                    return (
                        <ItemRow className="table-border-bottom" key={`${i}`}>
                            {/* 난이도 표시 */}
                            <ItemCol size={1}>
                                <Link className='innerhref' to={music.ranklink}>
                                    {music.diff}<br/>{music.lv}
                                </Link>
                            </ItemCol>
                            <ItemCol size={9}>
                                {/* 윗줄 */}
                                <ItemRow keepDirHor={true}>
                                    <ItemCol size={5}>
                                        {/* 클리어 횟수 */}
                                        <ItemRow keepDirHor={true}>
                                            <ItemCol size={5} className="text-right">
                                                {txtMusic.count}
                                            </ItemCol>
                                            <ItemCol size={5} className="text-left">
                                                <span>
                                                    {music.cleartime} / {music.playtime}
                                                </span>
                                            </ItemCol>
                                        </ItemRow>
                                        {/* 콤보 */}
                                        <ItemRow keepDirHor={true}>
                                            <ItemCol size={5} className="text-right">
                                                {txtMusic.combo}
                                            </ItemCol>
                                            <ItemCol size={5} className="text-left">
                                                <span>
                                                    {music.combo}
                                                </span>
                                            </ItemCol>
                                        </ItemRow>
                                        {/* 점수 */}
                                        <ItemRow keepDirHor={true}>
                                            <ItemCol size={5} className="text-right">
                                                {txtMusic.score}
                                            </ItemCol>
                                            <ItemCol size={5} className="text-left">
                                                <span>
                                                    {music.score}
                                                </span>
                                            </ItemCol>
                                        </ItemRow>
                                    </ItemCol>
                                    <ItemCol size={5}>
                                        {/* 달성률 */}
                                        <ItemRow keepDirHor={true}>
                                            <ItemCol size={5} className="text-right">
                                                {txtMusic.rate}
                                            </ItemCol>
                                            <ItemCol size={5} className="text-left">
                                                <span>
                                                    {music.rate}%
                                                </span>
                                            </ItemCol>
                                        </ItemRow>
                                        {/* 스킬 */}
                                        <ItemRow keepDirHor={true}>
                                            <ItemCol size={5} className="text-right">
                                                {txtMusic.skill}
                                            </ItemCol>
                                            <ItemCol size={5} className="text-left">
                                                <span>
                                                    {music.skill}
                                                </span>
                                            </ItemCol>
                                        </ItemRow>
                                        {/* 랭크 */}
                                        <ItemRow keepDirHor={true}>
                                            <ItemCol size={5} className="text-right">
                                                {txtMusic.rank}
                                            </ItemCol>
                                            <ItemCol size={5} className="text-left">
                                                <img alt="rankimg" className='skillrank-img' src={music.rank} />
                                                <span dangerouslySetInnerHTML={{__html: music.fc}}></span>
                                            </ItemCol>
                                        </ItemRow>
                                    </ItemCol>
                                </ItemRow>
                                {/* 아랫줄 */}
                                <ItemRow className="text-center" keepDirHor={true}>
                                    {/* 클리어미터 */}
                                    Clear Meter&nbsp;
                                    <span dangerouslySetInnerHTML={{__html: music.clearmeter}}></span>
                                </ItemRow>
                                <ItemRow className="text-center">
                                    {/* 구작 달성률 */}
                                    {txtMusic.rate} (OLD)<br/>
                                    NX: {music.ratenx}% / EX: {music.rateex}% / MX: {music.ratemx}% / TBRE: {music.ratetbre}% / TB: {music.ratetb}%
                                </ItemRow>
                            </ItemCol>
                        </ItemRow>
                    )
                }
            })
        }
        </>
    )
}

export default MusicItem;