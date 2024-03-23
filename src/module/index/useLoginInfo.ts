import { getUserFromToken } from '@/api/getUserData';
import { IProfile } from '@/data/user/IProfile';
import { atomLoginUser } from '@/jotai/loginUser';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';

const useLoginInfo = () => {
    const [profile, setProfile] = useState<IProfile>();
    const loginUser = useAtomValue(atomLoginUser);

    const getUserLogin = async () => {
        const token = loginUser?.token;
        if (token) {
            return getUserFromToken(token)
        }
        return undefined;
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['index', 'login'],
        queryFn: getUserLogin,
    });

    useEffect(() => {
        if(data) {
            setProfile(JSON.parse(data.mydata));
        }
    }, [data])

    return { profile, isLoading, isError };
};

export default useLoginInfo;