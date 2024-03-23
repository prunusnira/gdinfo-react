import { getRecentUser } from '@/api/getUserData';
import { IRecent } from '@/data/etc/IRecent';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const useRecent = () => {
    const [
        recentUserList,
        setUserList,
    ] = useState(Array<IRecent>());

    const { data, isLoading, isError } = useQuery({
        queryKey: ['recent'],
        queryFn: getRecentUser,
    });

    useEffect(() => {
        if (data) {
            setUserList(JSON.parse(data.recent));
        }
    }, [data]);

    return { recentUserList, isLoading, isError };
};

export default useRecent;