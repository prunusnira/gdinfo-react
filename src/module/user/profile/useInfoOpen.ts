import { apiForceCountUpdate, apiSubmitDataOpen } from '@/api/updateUserData';
import { atomLoginUser } from '@/jotai/loginUser';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';

const useInfoOpen = (setOpenUserInfo: (s: string) => void) => {
    const [isInfoOpen, setInfoOpen] = useState(false);
    const loginUser = useAtomValue(atomLoginUser);

    const setInfoDlgOpen = () => {
        setInfoOpen(true);
    };

    const setInfoDlgClose = () => {
        setInfoOpen(false);
    };

    const submitOpen = (id: string, open: string) => {
        apiSubmitDataOpen(id, open)
            .then(() => {
                setInfoDlgClose();
            });
    };

    const updateOpenValue = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        setOpenUserInfo(e.currentTarget.value);
    };

    const forceCountUpdate = () => {
        if (loginUser) {
            apiForceCountUpdate(loginUser.id)
                .then(() => {
                    window.location.reload();
                });
        }
    };

    return {
        isInfoOpen, setInfoDlgOpen, setInfoDlgClose, submitOpen, forceCountUpdate, updateOpenValue,
    };
};

export default useInfoOpen;