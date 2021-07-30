import React from 'react'
import { ItemCol, ItemRow } from '@/styled/styledCommon'
import CommonData from '@/component/common/commonData'
import NPData from './NPData'

interface Props {
    list: Array<NPData>
}

const NpItem = (props: Props) => {
    return (
        <>
            {
                props.list.map((np, i) => {
                    return (
                        <ItemCol size={5} isFlatUnderLg={true} key={i}>
                            <div className='div-table' id="playlist">
                                <div className='div-table-row'>
                                    <div className='div-table-cell listimg'>
                                        <img alt="jacket-img"
                                            style={{width:"75px", height:"75px"}}
                                            src={np.imgsrc}
                                            onError={(e)=>{
                                                e.currentTarget.src=`${CommonData.jacketUrl}empty.jpg`
                                            }} />
                                        <img alt="pattern"
                                            style={{width:"75px"}}
                                            src={np.pattern} />
                                    </div>
                                    <div className='div-table-cell'>
                                        <ItemRow setVertical={true} style={{textAlign: 'left'}}>
                                            <a className='innerhref'
                                                style={{fontSize:"125%"}}
                                                href={np.link}>
                                                {np.name}
                                            </a>
                                            <span>{np.lv} / {np.ver}</span>
                                        </ItemRow>
                                    </div>
                                </div>
                            </div>
                        </ItemCol>
                    )
                })
            }
        </>
    )
}

export default NpItem;