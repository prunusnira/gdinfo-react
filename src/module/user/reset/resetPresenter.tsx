import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/styled/styledCommon";
import store from "@/mobx/store";

import txtResetKo from "@/lang/user/reset/txtReset-ko";
import txtResetJp from "@/lang/user/reset/txtReset-jp";
import txtResetEn from "@/lang/user/reset/txtReset-en";
import CommonLayout from "@/component/layout/commonLayout";
import ContentLayout from "@/component/content/standardContent";

interface Props {
    resetData: () => void;
}

const ResetPresenter = (props: Props) => {
    const lang = store.language.lang;
    const txtReset = lang === "ko" ? txtResetKo : lang === "jp" ? txtResetJp : txtResetEn;

    return (
        <CommonLayout>
            <ContentLayout title={"Data Reset"}>
                <ContentLayout title={txtReset.title}>{txtReset.desc1}</ContentLayout>
                <ContentLayout title={txtReset.desc2t}>
                    <p>{txtReset.desc2s}</p>
                    <p>{txtReset.desc3}</p>
                    <p>{txtReset.desc4}</p>
                    <p>{txtReset.desc5}</p>

                    <Button onClick={props.resetData} style={{ width: "100%" }}>
                        YES
                    </Button>

                    <Link to="/index">
                        <Button style={{ width: "100%" }}>NO</Button>
                    </Link>
                </ContentLayout>
            </ContentLayout>
        </CommonLayout>
    );
};

export default ResetPresenter;
