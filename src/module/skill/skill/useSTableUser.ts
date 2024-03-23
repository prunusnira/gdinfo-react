import { getUserFromId } from '@/api/getUserData';
import { IProfile } from '@/data/user/IProfile';
import { atomLoginUser } from '@/jotai/loginUser';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';

interface Props {
    userid?: string;
    ptype?: string;
}

const useSTableUser = ({ userid, ptype }: Props) => {
    const [user, setUser] = useState<IProfile>();
    const [ownAccount, setOwnAccount] = useState(false);
    const loginUser = useAtomValue(atomLoginUser);

    const getUser = async () => {
        if(loginUser && userid === loginUser.id.toString()) {
            setOwnAccount(true);
        }

        if (ptype === '1000') {
            setUser(undefined);
        }

        if (userid) {
            return getUserFromId(userid);
        }
        return undefined;
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['common, userdata', 'id', userid, ptype],
        queryFn: getUser,
    });

    useEffect(() => {
        if(data) {
            const json = JSON.parse(data.mydata) as IProfile;
            setUser(json);
        }
    }, [data]);

    return {
        user,
        ownAccount,
        isUserLoading: isLoading,
        isUserError: isError,
    };
};

export default useSTableUser;
