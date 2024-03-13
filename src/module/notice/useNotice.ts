import { getNotice } from "@/api/getNotice";
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import {INotice} from "@/data/INotice";

const useNotice = (page: number) => {
    const [list, setList] = useState(Array<INotice>());

    const getNoticeData = async () => getNotice(page);

    const {data, isLoading, isError} = useQuery({
        queryKey: ['notice'],
        queryFn: getNoticeData,
    })

    useEffect(() => {
        if(data) {
            setList(JSON.parse(data.notice) as Array<INotice>);
        }
    }, [data]);

    return { list, isLoading, isError };
};

export default useNotice;
