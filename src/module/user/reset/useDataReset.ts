import { apiResetData } from '@/api/updateUserData';
import { atomLoginUser } from '@/jotai/loginUser';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';

type ResetReturn = [boolean, () => void]

const useDataReset = (): ResetReturn => {
    const [redirect, setRedirect] = useState(false);
    const loginUser = useAtomValue(atomLoginUser);
    const resetData = () => {
        if (loginUser) {
            const data = new URLSearchParams();
            data.append('id', loginUser.id);

            apiResetData(data)
                .then(() => {
                    setRedirect(true);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    return [redirect, resetData];
};

export default useDataReset;