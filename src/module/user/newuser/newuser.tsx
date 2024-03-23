import { atomLanguage } from '@/jotai/language';
import txtNewuserEn from '@/lang/user/newuser/txtNewUser-en';
import txtNewuserJp from '@/lang/user/newuser/txtNewUser-jp';
import txtNewuserKo from '@/lang/user/newuser/txtNewUser-ko';
import Error404 from '@/module/error/404';
import Error500 from '@/module/error/500';
import useUserInfo from '@/module/user/login/useUserInfo';
import { useAtomValue } from 'jotai';
import React from 'react';
import { Navigate } from 'react-router-dom';
import NewUserPresenter from './newuserPresenter';
import useUserAdd from './useUserAdd';
import useUserCheck from './useUserCheck';
import useUserDrop from './useUserDrop';

const NewUser = () => {
    const { updateUserInfo } = useUserInfo();
    const [moveToIndex, isValidAccess, isNewUserMode, setMoveToIndex] = useUserCheck();
    const addNewUser = useUserAdd(updateUserInfo, setMoveToIndex);
    const dropUser = useUserDrop(setMoveToIndex);
    const lang = useAtomValue(atomLanguage);
    const txtNewuser = lang === 'ko' ? txtNewuserKo : lang === 'jp' ? txtNewuserJp : txtNewuserEn;

    if (moveToIndex) {
        return <Navigate replace to={'/index'} />;
    }
    if (isValidAccess) {
        alert(txtNewuser.existAccess);
        return <Error500 />;
    }
    if (isNewUserMode) {
        return <NewUserPresenter addNewUser={addNewUser} dropUser={dropUser} />;
    }
    alert(txtNewuser.invalidAccess);
    return <Error404 />;
};

export default NewUser;
