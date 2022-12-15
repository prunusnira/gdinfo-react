import store from "@/mobx/store";
import { unixTimeConverter } from "@/module/common/time";
import NoticeType from "@/module/notice/noticeType";
import { observer } from "mobx-react";
import React from "react";
import { NoticeBar, NoticeTitle, NoticeDate } from "./noticeItem.style";

type Props = {
    item: NoticeType;
};

const IndexNoticeItem = observer((props: Props) => {
    const { language } = store;
    const lang = language.lang;
    return (
        <NoticeBar>
            <NoticeTitle>
                {lang === "ko"
                    ? props.item.titleK
                    : lang === "jp"
                    ? props.item.titleJ
                    : props.item.titleE}
            </NoticeTitle>
            <NoticeDate>{unixTimeConverter(props.item.time)}</NoticeDate>
        </NoticeBar>
    );
});

export default IndexNoticeItem;
