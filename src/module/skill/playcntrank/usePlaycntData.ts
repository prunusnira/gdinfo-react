import { getPlayCountRank } from '@/api/getSkillData';
import { IPlayCountRank } from '@/data/IPlayCountRank';
import { atomLanguage } from '@/jotai/language';
import TxtCommonEn from '@/lang/common/txtCommon-en';
import TxtCommonJp from '@/lang/common/txtCommon-jp';
import TxtCommonKo from '@/lang/common/txtCommon-ko';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';

const usePlaycntData = (page?: string) => {
    const [list, setList] = useState(Array<IPlayCountRank>());
    const [allPage, setAllPage] = useState(0);

    const lang = useAtomValue(atomLanguage);

    const TxtCommon = lang === 'ko' ? TxtCommonKo : lang === 'jp' ? TxtCommonJp : TxtCommonEn;

    const updateData = () => {
        if (page) {
            getPlayCountRank(page).then((json) => {
                const crlist = new Array<IPlayCountRank>();
                const rank = JSON.parse(json.rank);

                for (let i = 0; i < rank.length; i += 1) {
                    const cur = rank[i];

                    const obj: IPlayCountRank = {
                        index: 30 * (parseInt(page, 10) - 1) + i + 1,
                        towertitle: cur.titletower,
                        prlink: `/profile/${cur.id}`,
                        name: cur.name,
                        gfcnt: cur.countgf,
                        dmcnt: cur.countdm,
                        allcnt: cur.countgf + cur.countdm,
                    };

                    if (cur.opencount === 'N') {
                        obj.towertitle = '';
                        obj.prlink = '#none';
                        obj.name = TxtCommon.emptyname;
                    }

                    crlist.push(obj);
                }

                setList(crlist);
                setAllPage(json.pages);
            });
        }
    };

    useEffect(() => {
        if (page) {
            updateData();
        }
    }, [page]);

    return { list, allPage };
};

export default usePlaycntData;
