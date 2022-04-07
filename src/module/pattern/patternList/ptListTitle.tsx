import React from "react";
import store from "@/mobx/store";

import txtPatternKo from "@/lang/pattern/pattern/txtPattern-ko";
import txtPatternJp from "@/lang/pattern/pattern/txtPattern-jp";
import txtPatternEn from "@/lang/pattern/pattern/txtPattern-en";
import { PTListBody, PTListTitleDiv } from "./ptList.style";

const PTListTitle = () => {
    const lang = store.language.lang;

    const txtPattern = lang === "ko" ? txtPatternKo : lang === "jp" ? txtPatternJp : txtPatternEn;

    return (
        <>
            <PTListTitleDiv>
                <h4>Pattern List</h4>
            </PTListTitleDiv>
            <PTListBody>
                {txtPattern.desc1}
                <br />
                {txtPattern.desc2}
            </PTListBody>
        </>
    );
};

export default PTListTitle;
