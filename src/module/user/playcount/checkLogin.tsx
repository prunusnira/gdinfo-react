import { atomLoginUser } from '@/jotai/loginUser';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { Navigate } from 'react-router-dom';

const PlayCountLoginCheck = () => {
    const loginUser = useAtomValue(atomLoginUser);

    if (loginUser) {
        return <Navigate replace to={`/mybest/${loginUser.id}`} />;
    }
    return <Navigate replace to={'/login'} />;
};

export default PlayCountLoginCheck;
