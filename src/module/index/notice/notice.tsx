import txtIndex from "@/lang/index/txtIndex-ko";
import useNotice from "@/module/notice/useNotice";
import React, { useEffect } from "react";
import { IndexContent, IndexRow } from "../index.style";
import IndexNoticeItem from "./noticeItem";

const IndexNotice = () => {
    const { list } = useNotice(0);
    return (
        <IndexContent>
            <IndexRow>{txtIndex.notice2.desc}</IndexRow>
            <IndexRow>{`more >>`}</IndexRow>
            <IndexContent>
                {list.map((x, i) => (
                    <IndexNoticeItem key={`notice${i}`} item={x} />
                ))}
            </IndexContent>
        </IndexContent>
    );
};

export default IndexNotice;
