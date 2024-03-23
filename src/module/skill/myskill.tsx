import CommonLayout from '@/component/layout/commonLayout';
import { atomLoginUser } from '@/jotai/loginUser';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

const ProfileLoginCheck = () => {
    const loginUser = useAtomValue(atomLoginUser);
    const { gtype } = useParams();

    if (loginUser) {
        if (gtype === 'gf') {
            return (
                <CommonLayout>
                    <Navigate replace to={`/skill/2/${loginUser.id}/gf/1/1`} />
                </CommonLayout>
            )
        }
        return (
            <CommonLayout>
                <Navigate replace to={`/skill/2/${loginUser.id}/dm/1/1`} />
            </CommonLayout>
        )
    }
    return (
        <CommonLayout>
            <Navigate replace to={`/login`} />
        </CommonLayout>
    )
};

export default ProfileLoginCheck;
