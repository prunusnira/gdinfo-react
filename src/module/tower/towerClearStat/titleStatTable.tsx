import React from 'react'
import { ItemCol } from '@/styled/styledCommon'
import { FloorClearData } from './towerClearData'

interface Props {
    list: Array<FloorClearData>
}

const TitleStatTable = (props: Props) => {
    return (
        <>
            {
                props.list.map((t, i) => {
                    return (
                        <ItemCol
                            size={3.3}
                            key={`fc${i}`}
                            isFlatUnderLg={true}>
                            <img alt="towertitle" className="towertitle50" src={t.src} />
                            <span>{t.name}</span>
                        </ItemCol>
                    )
                })
            }
        </>
    )
}

export default TitleStatTable;