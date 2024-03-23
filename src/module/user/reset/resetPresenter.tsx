import React from "react";
import { Button, ThemedLink } from "@/styled/styledCommon";
import txtResetKo from "@/lang/user/reset/txtReset-ko";
import txtResetJp from "@/lang/user/reset/txtReset-jp";
import txtResetEn from "@/lang/user/reset/txtReset-en";
import CommonLayout from "@/component/layout/commonLayout";
import ContentLayout from "@/component/content/standardContent";
import {useAtomValue} from "jotai/index";
import {atomLanguage} from "@/jotai/language";
import {atomDarkmode} from "@/jotai/darkmode";

interface Props {
    resetData: () => void;
}

const ResetPresenter = (props: Props) => {
    const lang = useAtomValue(atomLanguage)
    const dark = useAtomValue(atomDarkmode)
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

                    <Button onClick={props.resetData}>YES</Button>

                    <ThemedLink dark={dark} to="/index">
                        <Button>NO</Button>
                    </ThemedLink>
                </ContentLayout>
            </ContentLayout>
        </CommonLayout>
    );
}

export default ResetPresenter;
