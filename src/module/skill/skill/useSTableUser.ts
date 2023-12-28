import { getUserFromId } from '@/api/getUserData';
import { IProfile } from '@/data/IProfile';
import { atomLoginUser } from '@/jotai/loginUser';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';

interface Props {
    userid?: string;
    ptype?: string;
}

const useSTableUser = ({ userid, ptype }: Props) => {
    const [user, setUser] = useState<IProfile>();
    const [ownAccount, setOwnAccount] = useState(false);
    const loginUser = useAtomValue(atomLoginUser);

    const setUserInfo = () => {
        // 페이지를 연 사용자가 로그인 한 본인과 동일한지 확인
        if (loginUser && userid === loginUser.id.toString()) {
            setOwnAccount(true);
        }

        if (ptype === '1000') {
            setUser(undefined);
        }
        // 서버에서 사용자 정보를 가져옴
        if (userid) {
            getUserFromId(userid).then((data) => {
                const json = JSON.parse(data.mydata) as IProfile;
                setUser(json);
            });
        }
    };

    // URL이 변경되면 새로 useEffect를 호출하여 내용을 갱신
    // (react-router-dom을 위한 설정)
    useEffect(() => {
        // id 값에서 사용자정보 불러오기
        setUserInfo();
    }, [window.location.href]);

    return { user, ownAccount };
};

export default useSTableUser;
