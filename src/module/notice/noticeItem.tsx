import React, { useState } from "react";
import { unixTimeConverter } from "../common/time";
import {
    ItemContent,
    ItemDate,
    ItemNum,
    ItemTitle,
    ItemTop,
    NoticeItemWrapper,
} from "./noticeItem.style";

type Props = {
    num: number;
    title: string;
    date: number;
    content: string;
};

const NoticeItem = (props: Props) => {
    const [open, setOpen] = useState(false);
    const showContent = () => {
        setOpen(!open);
    };

    return (
        <NoticeItemWrapper onClick={showContent}>
            <ItemTop>
                <ItemNum>{props.num}</ItemNum>
                <ItemTitle>{props.title}</ItemTitle>
                <ItemDate>{unixTimeConverter(props.date)}</ItemDate>
            </ItemTop>
            <ItemContent open={open}>{props.content}</ItemContent>
        </NoticeItemWrapper>
    );
};

export default NoticeItem;
