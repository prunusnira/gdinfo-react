import React from "react";
import RecentTableDiv from "./recentTableDiv";
import store from "@/mobx/store";
import RecentData from "./recentData";

import txtRecentKo from "@/lang/recent/txtRecent-ko";
import txtRecentJp from "@/lang/recent/txtRecent-jp";
import txtRecentEn from "@/lang/recent/txtRecent-en";
import { RecentRow } from "./recentPresenter.style";
import CommonLayout from "@/component/layout/commonLayout";
import ContentLayout from "@/component/content/standardContent";

interface Props {
    recentUserList: Array<RecentData>;
}

const RecentPresenter = (props: Props) => {
    const lang = store.language.lang;

    const txtRecent = lang === "ko" ? txtRecentKo : lang === "jp" ? txtRecentJp : txtRecentEn;

    return (
        <CommonLayout>
            <ContentLayout title={txtRecent.recent}>
                <RecentRow>{txtRecent.click}</RecentRow>
                <RecentRow>
                    <RecentTableDiv isMain={true} list={props.recentUserList} />
                </RecentRow>
            </ContentLayout>
        </CommonLayout>
    );
};

export default RecentPresenter;
