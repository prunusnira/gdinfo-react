import React from 'react';
import {Link} from 'react-router-dom';
import { Icon, ItemCol, ItemRow } from '../../../styled/styledCommon';
import PTRankData from './ptrankData';

interface Props {
    list: Array<PTRankData>
}

const PatternRankRow = (props: Props) => {
    return (
        <>
            {
                props.list.map(pd => {
                    return (
                        <div className='div-table-row table-border-bottom'>
                            <div className='div-table-cell' style={pd.ratecolor}></div>
                            <div className='div-table-cell' style={pd.skillcolor}></div>
                            <div className='div-table-cell'>{pd.index}</div>
                            <div className='div-table-cell'>
                                <ItemRow>
                                    <ItemCol size={5} style={{fontSize:"120%", textAlign: 'left'}}>
                                        {
                                            pd.towertitle !== '' ?
                                            <Icon src={`${process.env.PUBLIC_URL}/general-img/title/${pd.towertitle}.png`} />
                                            :
                                            null
                                        }
                                        <Link className='innerhref' to={pd.profile}>
                                            {pd.name} ⓟ
                                        </Link>
                                    </ItemCol>
                                    <ItemCol size={5} style={{textAlign: 'left'}}>
                                        <img alt="rank" className='skillrank-img' src={pd.rank} />
                                        <span v-html='pd.fc'></span>
                                        / {pd.skill} / {pd.rate}%
                                    </ItemCol>
                                </ItemRow>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default PatternRankRow;