import React from "react";
import TxtError404Ko from "@/lang/error/e404-ko";
import TxtError404Jp from "@/lang/error/e404-jp";
import TxtError404En from "@/lang/error/e404-en";
import CommonLayout from "@/component/layout/commonLayout";
import ContentLayout from "@/component/content/standardContent";
import { Anchor } from "@/styled/styledCommon";
import {useAtomValue} from "jotai/index";
import {atomLanguage} from "@/jotai/language";
import {atomDarkmode} from "@/jotai/darkmode";

const Error404 = () => {
    const lang = useAtomValue(atomLanguage)
    const dark = useAtomValue(atomDarkmode)

    const TxtError404 =
        lang === "ko" ? TxtError404Ko : lang === "jp" ? TxtError404Jp : TxtError404En;

    return (
        <CommonLayout>
            <ContentLayout title={"404 Error"}>
                {TxtError404.e404_1}
                <br />
                {TxtError404.e404_2}
                <br />
                <Anchor
                    dark={dark}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://twitter.com/_nira_one"
                >
                    @_nira_one
                </Anchor>
            </ContentLayout>
        </CommonLayout>
    );
}

export default Error404;
