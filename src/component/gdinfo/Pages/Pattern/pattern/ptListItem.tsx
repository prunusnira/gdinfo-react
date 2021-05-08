import React from 'react';
import {Link} from 'react-router-dom';
import PTListItemRow from './ptListItemRow';
import { PatternData } from './patternData';
import { ItemCol, ItemRow } from '../../../../../styled/styledCommon';

interface Props {
    list: Array<PatternData>
}

const PTListItem = (props: Props) => {
    return (
        <>
            {
                props.list.map(p => {
                    return (
                        <ItemRow className="table-border-bottom" style={{padding:"10px"}}>
                            <ItemCol
                                size={3}
                                style={{
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                {/* 자켓 */}
                                <img alt="jacket-img"
                                    style={{width:"85px", height:"85px"}}
                                    src={p.jacket}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = process.env.PUBLIC_URL+"/general-img/empty.jpg";
                                    }} /><br/>
                                <Link className='innerhref' to={p.link}>
                                    {p.name}
                                </Link>
                                <span style={{color:"red"}}>
                                    <br/>
                                    {
                                        (function() {
                                            switch(p.removed) {
                                                case 1:
                                                    return <b>(removed in TB)</b>
                                                case 2:
                                                    return <b>(removed in TBRE)</b>
                                                case 3:
                                                    return <b>(removed in MX)</b>
                                                case 4:
                                                    return <b>(removed in EX)</b>
                                                case 5:
                                                    return <b>(removed in NX)</b>
                                            }
                                        })()
                                    }
                                </span>
                            </ItemCol>
                            <ItemCol size={7}>
                                <div className='div-table' style={{width:"100%"}}>
                                    <div className='div-table-header'>
                                        <div className='div-table-cell'></div>
                                        <div className='div-table-cell'>GUITAR</div>
                                        <div className='div-table-cell'>BASS</div>
                                        <div className='div-table-cell'>DRUM</div>
                                    </div>
                                    {/* component 안에 component 추가 */}
                                    <PTListItemRow list={p.difflist} />
                                </div>
                            </ItemCol>
                        </ItemRow>
                    )
                })
            }
        </>
    )
}

export default PTListItem;