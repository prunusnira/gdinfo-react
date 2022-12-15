import { getNotice } from "@/api/getNotice";
import { useEffect, useState } from "react";
import NoticeType from "./noticeType";

const useNotice = (page: number) => {
    const [list, setList] = useState(Array<NoticeType>());

    useEffect(() => {
        notice(page);
    }, []);

    const notice = (page: number) => {
        getNotice(page).then((json) => {
            const notice = JSON.parse(json.notice) as Array<NoticeType>;
            setList(notice);
        });
    };

    return { list };
};

export default useNotice;
