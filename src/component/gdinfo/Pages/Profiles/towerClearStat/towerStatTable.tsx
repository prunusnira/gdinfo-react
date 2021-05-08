import React from 'react';
import { BodyContent, BodyHeader, ItemRow } from '../../../../../styled/styledCommon';

import { TowerClearData } from './towerClearData';

interface Props {
    list: Array<TowerClearData>
}

const TowerStatTable = (props: Props) => {
    return (
        <>
            {
                props.list.map(t => {
                    return (
                        <ItemRow  setVertical={true}>
                            <BodyHeader>
                                {t.tower}
                            </BodyHeader>
                            <BodyContent>
                            {
                                t.floors.map(x => {
                                    return (
                                        <ItemRow>
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