import React from "react";
import store from "@/mobx/store";
import { Anchor } from "@/styled/styledCommon";
import { observer } from "mobx-react";

import TxtError500Ko from "@/lang/error/e500-ko";
import TxtError500Jp from "@/lang/error/e500-jp";
import TxtError500En from "@/lang/error/e500-en";
import CommonLayout from "@/component/layout/commonLayout";
import ContentLayout from "@/component/content/standardContent";

const Error500 = observer(() => {
    const lang = store.language.lang;
    const { dark } = store;

    const TxtError500 =
        lang === "ko" ? TxtError500Ko : lang === "jp" ? TxtError500Jp : TxtError500En;

    return (
        <CommonLayout>
            <ContentLayout title={"500 Error"}>
                {TxtError500.e500_1}
                <br />
                <br />
                {TxtError500.e500_2}
                <br />
                {TxtError500.e500_3}
                <br />
                <br />
                {TxtError500.e500_4}
                <br />
                {TxtError500.e500_5}
                <br />
                <br />
                {TxtError500.e500_6}
                <Anchor
                    dark={dark.dark}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://twitter.com/_nira_one"
                >
                    @_nira_one
                </Anchor>
            </ContentLayout>
        </CommonLayout>
    );
});

export default Error500;
