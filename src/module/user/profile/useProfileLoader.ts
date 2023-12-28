import { getUserFromId } from '@/api/getUserData';
import { IProfile } from '@/data/IProfile';
import { atomLoginUser } from '@/jotai/loginUser';
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
            getUserFromId(id)
                .then((data) => {
                    const json = JSON.parse(data.mydata);
                    setProfileData(json);
                    setComment(json.comment);
                    setOpenUserInfo(json.opencount);
                });
        }
    };

    useEffect(() => {
        checkOwnAccount();
        getUserData();
    }, []);

    return { profileData, isOwnAccount };
};

export default useProfileLoader;