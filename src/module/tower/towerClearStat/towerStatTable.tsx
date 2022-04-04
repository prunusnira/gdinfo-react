import React from 'react'
import { BodyContent, BodyHeader, ItemRow } from '@/styled/styledCommon'
import { TowerClearData } from './towerClearData'

interface Props {
    list: Array<TowerClearData>
}

const TowerStatTable = (props: Props) => {
    return (
        <>
            {
                props.list.map((t, i) => {
                    return (
                        <ItemRow setVertical={true} key={`t${i}`}>
                            <BodyHeader>
                                {t.tower}
                            </BodyHeader>
                            <BodyContent>
                            {
                                t.floors.map((x, j) => {
                                    return (
                                        <ItemRow key={`tf${j}`}>
                                            {x.floor}: {x.clear}
                                        </ItemRow>
                                    )
                                })
                            }
                            </BodyContent>
                        </ItemRow>
                    )
                })
            }
        </>
    )
}

export default TowerStatTable;