import { getUserFromId } from '@/api/getUserData';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const useUserData = (userid?: string) => {
    const [userName, setUserName] = useState('');
    const [profileLink, setProfLink] = useState('');
    const [titleTower, setTitleTower] = useState('');

    const getUser = async () => {
        if (userid) {
            return getUserFromId(userid);
        }
        return undefined;
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['common, userdata', 'id', userid],
        queryFn: getUser,
    });

    useEffect(() => {
        if (data) {
            const json = JSON.parse(data.mydata);
            setUserName(json.name);
            setProfLink(`/profile/${userid}`);
            setTitleTower(json.titletower);
        }
    }, [data]);

    return {
        userName,
        profileLink,
        titleTower,
        isUserLoading: isLoading,
        isUserError: isError,
    };
};

export default useUserData;
