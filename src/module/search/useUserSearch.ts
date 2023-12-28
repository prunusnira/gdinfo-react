import { getSearchResult } from '@/api/getSearchResult';
import { IRecent } from '@/data/IRecent';
import { useEffect, useState } from 'react';

interface Props {
    type?: string,
    page?: string,
    value?: string,
    setAllPage?: (p: number) => void
}

const useUserSearch = ({
                           type, page, value, setAllPage,
                       }: Props) => {
    const [userlist, setUserlist] = useState(Array<IRecent>());

    const getUserList = () => {
        if (type && page && value && setAllPage) {
            getSearchResult(type, value, page).then((json) => {
                const userList = JSON.parse(json.userList);
                const userlistDisp = [];
                if (JSON.parse(json.resultexist) === 'yes') {
                    for (let i = 0; i < userList.length; i += 1) {
                        const cur = userList[i];
                        const obj: IRecent = {
                            id: 0,
                            titletower: '',
                            name: '',
                            gskill: 0,
                            dskill: 0,
                            updatetime: '',
                            uptimelong: 0,
                            opencount: '',
                        };
                        if (cur.titletower !== '') {
                            obj.titletower = cur.titletower;
                        } else {
                            obj.titletower = '';
                        }
                        obj.id = cur.id;
                        obj.name = cur.name;
                        obj.gskill = cur.gskill;
                        obj.dskill = cur.dskill;
                        obj.uptimelong = cur.updatetime;

                        userlistDisp.push(obj);
                    }

                    setUserlist(userlistDisp);
                    setAllPage(parseInt(json.pages, 10));
                }
            });
        }
    };

    useEffect(() => {
        if (type !== 'music') getUserList();
    }, [page]);

    return { userlist };
};

export default useUserSearch;
