import React from "react";
import txtNoRecordKo from "@/lang/pattern/noRecord/txtNoRecord-ko";
import txtNoRecordJp from "@/lang/pattern/noRecord/txtNoRecord-jp";
import txtNoRecordEn from "@/lang/pattern/noRecord/txtNoRecord-en";
import {useAtomValue} from "jotai/index";
import {atomLanguage} from "@/jotai/language";

const NoRecordTitle = () => {
    const lang = useAtomValue(atomLanguage)

    const txtNoRecord =
        lang === "ko" ? txtNoRecordKo : lang === "jp" ? txtNoRecordJp : txtNoRecordEn;

    return <span>{txtNoRecord.desc}</span>;
};

export default NoRecordTitle;
