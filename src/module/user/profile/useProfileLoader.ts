import { getUserFromId } from '@/api/getUserData';
import { IProfile } from '@/data/user/IProfile';
import { atomLoginUser } from '@/jotai/loginUser';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';

const useProfileLoader = ({
                              id,
                              setComment,
                              setOpenUserInfo,
                          }:
                              {
                                  id?: string,
                                  setComment: (s: string) => void,
                                  setOpenUserInfo: (s: string) => void,
                              },
) => {
    const [profileData, setProfileData] = useState<IProfile>();
    const [isOwnAccount, setOwnAccount] = useState(false);
    const loginUser = useAtomValue(atomLoginUser);

    const checkOwnAccount = () => {
        if (loginUser && id && parseInt(loginUser.id, 10) === parseInt(id, 10)) {
            setOwnAccount(true);
        }
    };

    const getUserData = () => {
        if (id) {
            return getUserFromId(id);
        }
        return undefined;
    };

    const { data, isLoading } = useQuery({
        queryKey: ['profile', 'userdata'],
        queryFn: getUserData,
    });

    useEffect(() => {
        checkOwnAccount();
    }, []);

    useEffect(() => {
        if (data) {
            const json = JSON.parse(data.mydata);
            setProfileData(json);
            setComment(json.comment);
            setOpenUserInfo(json.opencount);
        }
    }, [data]);

    return { profileData, isOwnAccount, isLoading };
};

export default useProfileLoader;