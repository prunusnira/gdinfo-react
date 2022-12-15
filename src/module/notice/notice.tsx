import ContentLayout from "@/component/content/standardContent";
import store from "@/mobx/store";
import { observer } from "mobx-react";
import React, { useEffect } from "react";

import txtNoticeKo from "@/lang/notice/txtNotice-ko";
import txtNoticeJp from "@/lang/notice/txtNotice-jp";
import txtNoticeEn from "@/lang/notice/txtNotice-en";
import CommonLayout from "@/component/layout/commonLayout";
import useNotice from "./useNotice";
import { useParams } from "react-router-dom";
import NoticeItem from "./noticeItem";

interface MatchProps {
    page: string;
}

const NoticePage = observer(() => {
    const { language } = store;
    const lang = language.lang;

    const txtNotice =
        lang === "ko" ? txtNoticeKo : lang === "jp" ? txtNoticeJp : txtNoticeEn;

    const { page } = useParams<MatchProps>();
    const { list } = useNotice(parseInt(page));

    useEffect(() => {
        console.log(list);
    }, [list]);

    return (
        <CommonLayout>
            <ContentLayout title={txtNotice.title}>
                {list.map((x, i) => (
                    <NoticeItem
                        key={`notice${i}`}
                        num={x.id}
                        title={
                            lang === "ko"
                                ? x.titleK
                                : lang === "jp"
                                ? x.titleJ
                                : x.titleE
                        }
                        content={
                            lang === "ko"
                                ? x.contentK
                                : lang === "jp"
                                ? x.contentJ
                                : x.contentE
                        }
                        date={x.time}
                    />
                ))}
            </ContentLayout>
        </CommonLayout>
    );
});

export default NoticePage;
