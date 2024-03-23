import React from "react";
import txtPatternKo from "@/lang/pattern/pattern/txtPattern-ko";
import txtPatternJp from "@/lang/pattern/pattern/txtPattern-jp";
import txtPatternEn from "@/lang/pattern/pattern/txtPattern-en";
import { PTListBody, PTListTitleDiv } from "./ptList.style";
import {useAtomValue} from "jotai/index";
import {atomLanguage} from "@/jotai/language";

const PTListTitle = () => {
    const lang = useAtomValue(atomLanguage)

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
