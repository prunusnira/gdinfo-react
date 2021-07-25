import React from 'react'
import {Link} from 'react-router-dom'
import store from '@/mobx/store'
import { observer } from 'mobx-react'
import { Button, ItemCol, ItemRow } from '@/styled/styledCommon'

import txtSnapshotKo from '@/lang/user/snapshot/txtSnapshot-ko'
import txtSnapshotJp from '@/lang/user/snapshot/txtSnapshot-jp'
import txtSnapshotEn from '@/lang/user/snapshot/txtSnapshot-en'

interface Props {
    date: Array<string>,
    id: string,
    gtype: string
}

const SnapshotItem = observer((props: Props) => {
    const lang = store.language.lang

    const txtSnapshot =
        lang === 'ko' ? txtSnapshotKo :
            lang === 'jp' ? txtSnapshotJp : txtSnapshotEn

    return(
        <>
            {
                props.date.map(d => {
                    return (
                        <ItemRow keepDirHor={true}>
                            <ItemCol size={4}>
                                {d}
                            </ItemCol>
                            <ItemCol size={6} className="btn-group">
                                <Link to={`/skill/snapshot/view/nr/${props.id}/${d}/${props.gtype}`}>
                                    <Button>{txtSnapshot.btnN}</Button>
                                </Link>
                                <Link to={`/skill/snapshot/view/sh/${props.id}/${d}/${props.gtype}`}>
                                    <Button>{txtSnapshot.btnS}</Button>
                                <Link to={`/file/snapshot/${props.id}/${d}_${props.gtype}.json`}>
                                </Link>
                                    <Button>{txtSnapshot.btnD}</Button>
                                </Link>
                            </ItemCol>
                        </ItemRow>
                    )
                })
            }
        </>
    )
})

export default SnapshotItem;