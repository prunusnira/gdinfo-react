import { ILoginInfo } from '@/data/user/ILoginInfo';
import { atomLoginUser } from '@/jotai/loginUser';
import { useAtom } from 'jotai';
import { useState } from 'react';

const useUserInfo = () => {
    const [isNewUser, setIsNewUser] = useState(false);
    const [loginUser, setLoginUser] = useAtom(atomLoginUser);

    const updateUserInfo = (info: ILoginInfo, isSignIn: boolean, newUser: boolean) => {
        setLoginUser(info);
        setIsNewUser(newUser);
    };

    return { isNewUser, loginUser, updateUserInfo };
};

export default useUserInfo;
