import { getSnapshotList } from '@/api/getUserData';
import { useEffect, useState } from 'react';

const useSnapshotList = (id?: string) => {
    const [glist, setGList] = useState(Array<string>());
    const [dlist, setDList] = useState(Array<string>());

    const snapshotList = () => {
        if (id) {
            getSnapshotList(id).then((json) => {
                const list = JSON.parse(json.list);

                const gflist = [];
                const dmlist = [];

                // '.'과 '_'으로 split
                for (let i = 0; i < list.length; i += 1) {
                    const c = list[i].split('.')[0].split('_');
                    if (c[1] === 'gf') gflist.push(c[0]);
                    else if (c[1] === 'dm') dmlist.push(c[0]);
                }

                gflist.sort((a, b) => {
                    if (a > b) return 1;
                    if (b > a) return -1;
                    return 0;
                });

                dmlist.sort((a, b) => {
                    if (a > b) return 1;
                    if (b > a) return -1;
                    return 0;
                });

                setGList(gflist);
                setDList(dmlist);
            });
        }
    };

    useEffect(() => {
        snapshotList();
    }, []);

    return { glist, dlist };
};

export default useSnapshotList;
