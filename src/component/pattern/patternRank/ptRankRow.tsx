import React from 'react'
import {Link} from 'react-router-dom'
import { Icon, ItemCol, ItemRow } from '@/styled/styledCommon'
import PTRankData from './ptrankData'

interface Props {
    list: Array<PTRankData>
}

const PatternRankRow = (props: Props) => {
    return (
        <>
            {
                props.list.map((pd, i) => {
                    return (
                        <div className='div-table-row table-border-bottom' key={i}>
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
                                        {
                                            pd.fc ?
                                            (
                                                pd.exc ?
                                                <img className='fc-img' src={`${process.env.PUBLIC_URL}/general-img/rank/exc_300.png`} />
                                                :
                                                <img className='fc-img' src={`${process.env.PUBLIC_URL}/general-img/rank/fc_300.png`} />
                                            )
                                            :
                                            <img className='fc-img' src={`${process.env.PUBLIC_URL}/general-img/rank/cleared_300.png`} />
                                        }
                                        / {pd.skill} / {pd.rate.toFixed(2)}%
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