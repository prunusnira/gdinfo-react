import { getUserFromToken } from '@/api/getUserData';
import { atomLoginUser } from '@/jotai/loginUser';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';

type CheckReturn = [boolean, boolean, boolean, (b: boolean) => void]

const useUserCheck = (): CheckReturn => {
    const [moveToIndex, setMoveToIndex] = useState(false);
    const [isValidAccess, setValidAccess] = useState(false);
    const [isNewUserMode, setNewUserMode] = useState(true);

    const loginUser = useAtomValue(atomLoginUser);

    const checkParamHasToken = () => {
        if (loginUser) {
            const {token} = loginUser;
            return token !== '';
        }
        return false;
    };

    const checkUserAlreadyExist = () => {
        if (loginUser) {
            const {token} = loginUser;
            getUserFromToken(token)
                .then(d => d)
                .then(d => {
                    if (d.mydata !== 'null') {
                        setValidAccess(false);
                    }
                });
        }
        return false;
    };

    useEffect(() => {
        // params에 token이 있는지 확인
        if (checkParamHasToken()) {
            // 토큰이 이미 DB에 있는지 확인
            checkUserAlreadyExist();
            setNewUserMode(true);
        } else {
            setNewUserMode(false);
        }
    }, []);

    return [moveToIndex, isValidAccess, isNewUserMode, setMoveToIndex];
};

export default useUserCheck;