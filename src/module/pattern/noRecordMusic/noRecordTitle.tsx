import React from "react";
import store from "@/mobx/store";

import txtNoRecordKo from "@/lang/pattern/noRecord/txtNoRecord-ko";
import txtNoRecordJp from "@/lang/pattern/noRecord/txtNoRecord-jp";
import txtNoRecordEn from "@/lang/pattern/noRecord/txtNoRecord-en";

const NoRecordTitle = () => {
    const lang = store.language.lang;

    const txtNoRecord =
        lang === "ko" ? txtNoRecordKo : lang === "jp" ? txtNoRecordJp : txtNoRecordEn;

    return <span>{txtNoRecord.desc}</span>;
};

export default NoRecordTitle;
