import React from "react"
import store from "@/mobx/store"
import { BodyContent, BodyHeader, ItemRow } from "@/styled/styledCommon"

import txtNoRecordKo from '@/lang/pattern/noRecord/txtNoRecord-ko'
import txtNoRecordJp from '@/lang/pattern/noRecord/txtNoRecord-jp'
import txtNoRecordEn from '@/lang/pattern/noRecord/txtNoRecord-en'

const NoRecordTitle = () => {
    const lang = store.language.lang
    
    const txtNoRecord =
        lang === 'ko' ? txtNoRecordKo :
            lang === 'jp' ? txtNoRecordJp : txtNoRecordEn

    return (
        <ItemRow setVertical={true}>
            <BodyHeader>
                <h3>Patterns with no records</h3>
            </BodyHeader>
            <BodyContent>
                <span>{txtNoRecord.desc}</span>
            </BodyContent>
        </ItemRow>
    )
}

export default NoRecordTitle