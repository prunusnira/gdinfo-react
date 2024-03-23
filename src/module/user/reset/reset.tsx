import { atomLoginUser } from '@/jotai/loginUser';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { Navigate } from 'react-router-dom';
import ResetPresenter from './resetPresenter';
import useDataReset from './useDataReset';

const ProfileReset = () => {
    const [redirect, resetData] = useDataReset();
    const loginUser = useAtomValue(atomLoginUser);

    if (redirect) {
        return <Navigate replace to="/profile" />;
    }
    if (loginUser) {
        return <Navigate replace to="/login" />;
    }
    return <ResetPresenter resetData={resetData} />;
};

export default ProfileReset;
