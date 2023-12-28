import { apiNewUser } from '@/api/updateUserData';
import { ILoginInfo } from '@/data/ILoginInfo';
import { atomLoginUser } from '@/jotai/loginUser';
import { useAtomValue } from 'jotai/index';

const useUserAdd = (
    updateUserInfo: (info: ILoginInfo, isSignIn: boolean, isNewUser: boolean) => void,
    setMoveToIndex: (b: boolean) => void,
) => {
    const loginUser = useAtomValue(atomLoginUser);

    const addNewUser = () => {
        if (loginUser) {
            const params = new URLSearchParams();
            params.append('token', loginUser.token);
            apiNewUser(params)
                .then((data) => {
                    const json = JSON.parse(data.loginData);
                    const loginData: ILoginInfo = {
                        id: json.id,
                        token: json.token,
                    };
                    switch (json.stat) {
                        case 'login':
                            updateUserInfo(loginData, true, false);
                            setMoveToIndex(true);
                            break;
                        case 'error':
                        default:
                            setMoveToIndex(true);
                            break;
                    }
                });
        }
    };

    return addNewUser;
};

export default useUserAdd;