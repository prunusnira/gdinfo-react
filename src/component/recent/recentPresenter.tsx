import React from "react";
import RecentTableDiv from "./recentTableDiv";
import { BodyContent, BodyHeader, Container, ItemRow } from "@/styled/styledCommon";
import store from "@/mobx/store";
import RecentData from "./recentData";

import txtRecentKo from "@/lang/recent/txtRecent-ko";
import txtRecentJp from "@/lang/recent/txtRecent-jp";
import txtRecentEn from "@/lang/recent/txtRecent-en";
import { RecentContainer, RecentRow, RecentTitle, RecentWrapper } from "./recentPresenter.style";

interface Props {
    recentUserList: Array<RecentData>;
}

const RecentPresenter = (props: Props) => {
    const lang = store.language.lang;

    const txtRecent = lang === "ko" ? txtRecentKo : lang === "jp" ? txtRecentJp : txtRecentEn;

    return (
        <RecentContainer>
            <RecentTitle>
                <h4>{txtRecent.recent}</h4>
            </RecentTitle>
            <RecentWrapper>
                <RecentRow>{txtRecent.click}</RecentRow>
                <RecentRow>
                    <RecentTableDiv isMain={true} list={props.recentUserList} />
                </RecentRow>
            </RecentWrapper>
        </RecentContainer>
    );
};

export default RecentPresenter;
