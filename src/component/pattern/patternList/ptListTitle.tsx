import React from "react"
import { BodyContent, BodyHeader, ItemRow } from "@/styled/styledCommon"
import store from "@/mobx/store";

import txtPatternKo from '@/lang/pattern/pattern/txtPattern-ko';
import txtPatternJp from '@/lang/pattern/pattern/txtPattern-jp';
import txtPatternEn from '@/lang/pattern/pattern/txtPattern-en';

const PTListTitle = () => {
    const lang = store.language.lang
    
    const txtPattern =
        lang === 'ko' ? txtPatternKo :
            lang === 'jp' ? txtPatternJp : txtPatternEn

    return (
        <ItemRow setVertical={true}>
            <BodyHeader>
                <h3>Pattern List</h3>
            </BodyHeader>
            <BodyContent>
                <span>
                    {txtPattern.desc1}<br/>
                    {txtPattern.desc2}
                </span>
            </BodyContent>
        </ItemRow>
    )
}

export default PTListTitle