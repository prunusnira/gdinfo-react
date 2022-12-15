import txtIndexEn from "@/lang/index/txtIndex-en";
import txtIndexJp from "@/lang/index/txtIndex-jp";
import txtIndexKo from "@/lang/index/txtIndex-ko";
import store from "@/mobx/store";
import { observer } from "mobx-react";
import useNotice from "@/module/notice/useNotice";
import React from "react";
import { IndexContent, IndexRow } from "../index.style";
import IndexNoticeItem from "./noticeItem";
import { Anchor } from "@/styled/styledCommon";

const IndexNotice = observer(() => {
    const { language, dark } = store;
    const lang = language.lang;

    const txtIndex =
        lang === "ko" ? txtIndexKo : lang === "jp" ? txtIndexJp : txtIndexEn;
    const { list } = useNotice(0);
    return (
        <IndexContent>
            <IndexRow>
                {txtIndex.notice2.desc}&nbsp;
                <Anchor href="/notice/1" dark={dark.dark}>{`more >>`}</Anchor>
            </IndexRow>
            <IndexContent>
                {list.map((x, i) => (
                    <IndexNoticeItem key={`notice${i}`} item={x} />
                ))}
            </IndexContent>
        </IndexContent>
    );
});

export default IndexNotice;
