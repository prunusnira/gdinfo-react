import { atomLoginUser } from '@/jotai/loginUser';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { Navigate } from 'react-router-dom';

const NotPlayedLoginCheck = () => {
    const loginUser = useAtomValue(atomLoginUser);

    if (loginUser) {
        return <Navigate replace to={`/notplayed/gf/${loginUser.id}/0/1`} />;
    }
    return <Navigate replace to={'/login'} />;
};

export default NotPlayedLoginCheck;
