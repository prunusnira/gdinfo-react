import React from "react"
import { ItemContent, ItemDate, ItemNum, ItemTitle, ItemTop, NoticeItemWrapper } from "./noticeItem.style"

type Props = {
    num: number;
    title: string;
    date: string;
    content: string;
}

const NoticeItem = (props: Props) => {
    return <NoticeItemWrapper>
        <ItemTop>
            <ItemNum>{props.num}</ItemNum>
            <ItemTitle>{props.title}</ItemTitle>
            <ItemDate>{props.date}</ItemDate>
        </ItemTop>
        <ItemContent>{props.content}</ItemContent>
    </NoticeItemWrapper>
}

export default NoticeItem