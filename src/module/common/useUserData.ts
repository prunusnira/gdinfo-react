import { getUserFromId } from '@/api/getUserData';
import { useEffect, useState } from 'react';

const useUserData = (userid?: string) => {
    const [userName, setUserName] = useState('');
    const [profileLink, setProfLink] = useState('');
    const [titleTower, setTitleTower] = useState('');

    const loadUserData = () => {
        if (userid) {
            getUserFromId(userid).then((data) => {
                const json = JSON.parse(data.mydata);
                setUserName(json.name);
                setProfLink(`/profile/${userid}`);
                setTitleTower(json.titletower);
            });
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    return { userName, profileLink, titleTower };
};

export default useUserData;
